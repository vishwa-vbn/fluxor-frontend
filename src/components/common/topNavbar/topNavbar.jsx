import { Bell, Settings, LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SearchBar from "../../controls/searchbar/searchbar"; // Adjust the import path as needed

export default function TopNavbar({ onSearch, notificationCount = 0, toggleSidebar }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get user data from Redux store
  const authState = useSelector((state) => state.auth);
  const userData = authState?.loginUser?.user || {};

  // Extract current route name dynamically and capitalize it
  const currentRoute = location.pathname
    .split("/")
    .filter(Boolean)
    .pop() || "dashboard";
  const routeName = currentRoute.charAt(0).toUpperCase() + currentRoute.slice(1);

  // Generate initials from user name
  const getInitials = (name) => {
    if (!name) return userData.username?.[0]?.toUpperCase() || "U";
    const nameParts = name.split(" ");
    return nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
      : nameParts[0][0].toUpperCase();
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle clicks outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Render profile image or initials
  const renderProfileImage = () => {
    if (userData.avatar) {
      return (
        <img
          src={userData.avatar}
          alt="Profile"
          className="w-7 h-7 rounded-full object-cover"
          onError={(e) =>
            (e.target.outerHTML = `<div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">${getInitials(
              userData.name
            )}</div>`)
          }
        />
      );
    }
    return (
      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm">
        {getInitials(userData.name)}
      </div>
    );
  };

  return (
    <nav className="bg-white h-[50px] sticky top-0 z-50 shadow-sm hidden md:flex items-center backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-md">
      <div className="max-w-[100%] mx-auto px-2    flex justify-between items-center w-full h-full">
        {/* Left: Burger Menu and Route Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="p-1 text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {routeName === "Dashboard" ? "Blog Dashboard" : `${routeName}`}
          </h1>
        </div>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search posts, users..."
              className="h-7 w-48 text-sm rounded-md"
            />
          </form>

          {/* Notifications */}
          <div className="relative">
            <button className="p-1 text-gray-600 hover:text-gray-800 relative focus:outline-none">
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 text-white text-[9px] rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          </div>

          {/* Settings */}
          <button className="p-1 text-gray-600 hover:text-gray-800 focus:outline-none">
            <Settings className="w-4 h-4" />
          </button>

          {/* User Profile */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 focus:outline-none"
            >
              {renderProfileImage()}
              {/* <span className="text-sm font-medium text-gray-700 hidden lg:block">
                {userData.name || userData.username || "User"}
              </span> */}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-10">
                <div className="py-1">
                  <Link
                    to="/admin/profile"
                    className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      console.log("Logout clicked");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3 h-3" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}