import { Bell, Settings, Search, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function TopNavbar({ onSearch, notificationCount = 0 }) {
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
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => e.target.outerHTML = `<div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-lg">${getInitials(userData.name)}</div>`}
        />
      );
    }
    return (
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-lg">
        {getInitials(userData.name)}
      </div>
    );
  };

  return (
    <nav className="bg-transparent border-0 sticky top-0 z-50 hidden md:block">
      <div className="max-w-11/12 mx-auto px-0 py-3 flex justify-between items-center">
        {/* Left: Dynamic Route Name */}
        <h1 className="text-2xl font-bold text-gray-800">
          {routeName === "Dashboard" ? "Blog Dashboard" : `${routeName}`}
        </h1>

        {/* Right: Search, Notifications, Profile */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, users..."
              className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-700 placeholder-gray-400"
            />
            <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </form>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-800 relative">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>
          </div>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-gray-800">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div ref={dropdownRef} className="relative">
            <button 
              onClick={toggleDropdown}
              className="flex items-center gap-2 focus:outline-none"
            >
              {renderProfileImage()}
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {userData.name || userData.username || "User"}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-2">
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      console.log("Logout clicked");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
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