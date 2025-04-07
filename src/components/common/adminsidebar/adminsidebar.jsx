import { useState } from "react";
import {
  Home,
  FileText,
  MessageSquare,
  Users,
  Settings,
  BarChart2,
  LogOut,
  Image,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom"; // optional, or replace with <a href=""> if not using react-router

export default function AdminSidebar() {
  const [openSection, setOpenSection] = useState({
    posts: true,
  });

  const toggleSection = (key) => {
    setOpenSection((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-64 min-h-screen bg-neutral text-neutral-content flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center justify-center bg-neutral-focus text-xl font-bold">
        <Link to="/admin">Blog Admin</Link>
      </div>

      {/* Navigation */}
      <ul className="menu p-4 flex-1 overflow-y-auto">
        <li>
          <Link to="/dashboard">
            <Home className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
        </li>

        {/* Posts (Collapsible) */}
        <li>
          <details open={openSection.posts} onClick={() => toggleSection("posts")}>
            <summary className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Posts
            </summary>
            <ul>
              <li>
                <Link to="/posts">All Posts</Link>
              </li>
              <li>
                <Link to="/create-post">Add New</Link>
              </li>
              <li>
                <Link to="/categories">Categories</Link>
              </li>

              <li>
                <Link to="/tags">Tags</Link>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <Link to="/media">
            <Image className="w-5 h-5 mr-2" />
            Media
          </Link>
        </li>

        <li>
          <Link to="/comments">
            <MessageSquare className="w-5 h-5 mr-2" />
            Comments
          </Link>
        </li>

        <li>
          <Link to="/users">
            <Users className="w-5 h-5 mr-2" />
            Users
          </Link>
        </li>

        <li>
          <Link to="/settings">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </Link>
        </li>

        <li>
          <Link to="/analytics">
            <BarChart2 className="w-5 h-5 mr-2" />
            Analytics
          </Link>
        </li>
      </ul>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-neutral-content/10">
        <button className="btn btn-ghost w-full flex items-center justify-start">
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
