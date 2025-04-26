// import { useState } from "react";
// import { useLocation } from "react-router-dom";
// import {
//   Home,
//   FileText,
//   MessageSquare,
//   Users,
//   Settings,
//   BarChart2,
//   LogOut,
//   Image,
//   ChevronDown
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import './adminSidebarStyles.css';
// import logo from '../../../assets/orpus.png';

// export default function AdminSidebar() {
//   const [openSection, setOpenSection] = useState({
//     posts: false,
//   });
//   const location = useLocation();

//   const toggleSection = (key) => {
//     setOpenSection((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const isMainActive = (path) => location.pathname === path;
//   const isSubActive = (path) => location.pathname === path;
//   const isAnySubActive = ["/posts", "/create-post", "/categories", "/tags"].includes(location.pathname);

//   return (
//     <div className="w-70 h-screen bg-gray-900 text-gray-100 flex flex-col shadow-lg">
//       {/* Header */}
//       <div className="h-16 flex items-center justify-center">
//         <Link to="/admin" className="text-xl font-semibold tracking-tight hover:text-blue-300 transition-colors">
//           {/* <img src={logo}  className="p-7 mt-5" alt="logo"></img> */}
//         </Link>
//       </div>

//       {/* Navigation */}
//       <ul className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-hide">
//         <li>
//           <Link
//             to="/dashboard"
//             className={`flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//               isMainActive("/dashboard") ? "bg-gray-800 text-blue-300" : ""
//             }`}
//           >
//             <Home className="w-5 h-5 mr-3" />
//             <span>Dashboard</span>
//           </Link>
//         </li>

//         {/* Posts (Collapsible) */}
//         <li>
//           <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 transition-colors">
//             <Link
//               to="/posts"
//               className={`flex items-center flex-1 hover:text-gray-300 transition-colors ${
//                 isMainActive("/posts") && !isAnySubActive ? "text-blue-300" : ""
//               }`}
//             >
//               <FileText className="w-5 h-5 mr-3" />
//               <span>Posts</span>
//             </Link>
//             <ChevronDown
//               className={`w-4 h-4 cursor-pointer transition-transform ${openSection.posts ? "rotate-180" : ""}`}
//               onClick={() => toggleSection("posts")}
//             />
//           </div>
//           {openSection.posts && (
//             <ul className="pl-6 ml-4 mt-1 space-y-1 border-l border-gray-400">
//               <li>
//                 <Link
//                   to="/posts"
//                   className={`flex items-center p-2 text-sm rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//                     isSubActive("/posts") ? "bg-gray-800 text-gray-200" : ""
//                   }`}
//                 >
//                   All Posts
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/create-post"
//                   className={`flex items-center p-2 text-sm rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//                     isSubActive("/create-post") ? "bg-gray-800 text-gray-200" : ""
//                   }`}
//                 >
//                   Add New
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/categories"
//                   className={`flex items-center p-2 text-sm rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//                     isSubActive("/categories") ? "bg-gray-800 text-gray-200" : ""
//                   }`}
//                 >
//                   Categories
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/tags"
//                   className={`flex items-center p-2 text-sm rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//                     isSubActive("/tags") ? "bg-gray-800 text-gray-200" : ""
//                   }`}
//                 >
//                   Tags
//                 </Link>
//               </li>
//             </ul>
//           )}
//         </li>

//         <li>
//           <Link
//             to="/media"
//             className={`flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//               isMainActive("/media") ? "bg-gray-800 text-blue-300" : ""
//             }`}
//           >
//             <Image className="w-5 h-5 mr-3" />
//             <span>Media</span>
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/comments"
//             className={`flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//               isMainActive("/comments") ? "bg-gray-800 text-blue-300" : ""
//             }`}
//           >
//             <MessageSquare className="w-5 h-5 mr-3" />
//             <span>Comments</span>
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/users"
//             className={`flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//               isMainActive("/users") ? "bg-gray-800 text-blue-300" : ""
//             }`}
//           >
//             <Users className="w-5 h-5 mr-3" />
//             <span>Users</span>
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/settings"
//             className={`flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//               isMainActive("/settings") ? "bg-gray-800 text-blue-300" : ""
//             }`}
//           >
//             <Settings className="w-5 h-5 mr-3" />
//             <span>Settings</span>
//           </Link>
//         </li>

//         <li>
//           <Link
//             to="/analytics"
//             className={`flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//               isMainActive("/analytics") ? "bg-gray-800 text-blue-300" : ""
//             }`}
//           >
//             <BarChart2 className="w-5 h-5 mr-3" />
//             <span>Analytics</span>
//           </Link>
//         </li>
        
//         <li>
//           <Link
//             to="/adSense"
//             className={`flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors ${
//               isMainActive("/adSense") ? "bg-gray-800 text-blue-300" : ""
//             }`}
//           >
//             <BarChart2 className="w-5 h-5 mr-3" />
//             <span>AdSense</span>
//           </Link>
//         </li>
//       </ul>

//       {/* Footer / Logout */}
//       <div className="p-3 border-t border-gray-800">
//         <button className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 hover:text-gray-300 transition-colors">
//           <LogOut className="w-5 h-5 mr-3" />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  MessageSquare,
  Users,
  Settings,
  BarChart2,
  LogOut,
  Image,
  ChevronDown,
  GalleryHorizontalEnd,
} from "lucide-react";
import { Link } from "react-router-dom";
import './adminSidebarStyles.css';
import logo from '../../../assets/orpus-w.png';

export default function AdminSidebar({logout}) {
  const [openSection, setOpenSection] = useState({
    posts: false,
  });
  const location = useLocation();

  const toggleSection = (key) => {
    setOpenSection((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isMainActive = (path) => location.pathname === path;
  const isSubActive = (path) => location.pathname === path;
  const isAnySubActive = ["/posts", "/create-post", "/categories", "/tags"].includes(location.pathname);

  const handleLogout =() =>
  {
    logout()

  }
  return (
    <div className="w-70 h-screen border-r-1 border-gray-300 dark:border-gray-700 bg-gray-800  dark:bg-gray-800 text-gray-100 dark:text-gray-200 flex flex-col shadow-lg dark:shadow-gray-800 transition-colors duration-200">
      {/* Header */}
      <div className="h-12.5 flex items-center justify-center border-b border-gray-800 dark:border-gray-700">
        <Link to="/admin" className="text-xl flex  align-middle justify-center font-semibold tracking-tight text-gray-100 dark:text-gray-200 hover:text-blue-300 dark:hover:text-blue-400 transition-colors">
          <img src={logo} className="p-7 mt-0" alt="logo"></img>
        </Link>
      </div>

      {/* Navigation */}
      <ul className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-thumb-gray-500 scrollbar-track-gray-800 dark:scrollbar-track-gray-900">
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
              isMainActive("/dashboard") ? "bg-gray-800 dark:bg-gray-900 text-blue-300 dark:text-blue-400" : ""
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            <span>Dashboard</span>
          </Link>
        </li>

        {/* Posts (Collapsible) */}
        <li>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 transition-colors">
            <Link
              to="/posts"
              className={`flex items-center flex-1 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
                isMainActive("/posts") && !isAnySubActive ? "text-blue-300 dark:text-blue-400" : ""
              }`}
            >
              <FileText className="w-5 h-5 mr-3" />
              <span>Posts</span>
            </Link>
            <ChevronDown
              className={`w-4 h-4 cursor-pointer transition-transform text-gray-400 dark:text-gray-300 ${openSection.posts ? "rotate-180" : ""}`}
              onClick={() => toggleSection("posts")}
            />
          </div>
          {openSection.posts && (
            <ul className="pl-6 ml-4 mt-1 space-y-1 border-l border-gray-400 dark:border-gray-600">
              <li>
                <Link
                  to="/posts"
                  className={`flex items-center p-2 text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
                    isSubActive("/posts") ? "bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-100" : ""
                  }`}
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/create-post"
                  className={`flex items-center p-2 text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
                    isSubActive("/create-post") ? "bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-100" : ""
                  }`}
                >
                  Add New
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className={`flex items-center p-2 text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
                    isSubActive("/categories") ? "bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-100" : ""
                  }`}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/tags"
                  className={`flex items-center p-2 text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
                    isSubActive("/tags") ? "bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-100" : ""
                  }`}
                >
                  Tags
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link
            to="/media"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
              isMainActive("/media") ? "bg-gray-800 dark:bg-gray-900 text-blue-300 dark:text-blue-400" : ""
            }`}
          >
            <Image className="w-5 h-5 mr-3" />
            <span>Media</span>
          </Link>
        </li>

        <li>
          <Link
            to="/comments"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
              isMainActive("/comments") ? "bg-gray-800 dark:bg-gray-900 text-blue-300 dark:text-blue-400" : ""
            }`}
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            <span>Comments</span>
          </Link>
        </li>

        <li>
          <Link
            to="/users"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
              isMainActive("/users") ? "bg-gray-800 dark:bg-gray-900 text-blue-300 dark:text-blue-400" : ""
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            <span>Users</span>
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
              isMainActive("/settings") ? "bg-gray-800 dark:bg-gray-900 text-blue-300 dark:text-blue-400" : ""
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </Link>
        </li>

        <li>
          <Link
            to="/analytics"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
              isMainActive("/analytics") ? "bg-gray-800 dark:bg-gray-900 text-blue-300 dark:text-blue-400" : ""
            }`}
          >
            <BarChart2 className="w-5 h-5 mr-3" />
            <span>Analytics</span>
          </Link>
        </li>
        
        <li>
          <Link
            to="/adSense"
            className={`flex items-center p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors ${
              isMainActive("/adSense") ? "bg-gray-800 dark:bg-gray-900 text-blue-300 dark:text-blue-400" : ""
            }`}
          >
            <GalleryHorizontalEnd className="w-5 h-5 mr-3" />
            <span>AdSense</span>
          </Link>
        </li>
      </ul>

      {/* Footer / Logout */}
      <div className="p-3 border-t border-gray-800 dark:border-gray-700">
        <button onClick={()=>handleLogout()} className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900 hover:text-gray-300 dark:hover:text-gray-100 transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}