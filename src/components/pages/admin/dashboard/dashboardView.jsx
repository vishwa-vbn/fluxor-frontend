import {
  FileText,
  MessageSquare,
  Users,
  Eye,
  PlusCircle,
  Upload,
  UserPlus,
  Bell,
  Settings,
} from "lucide-react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import Button from "../../../controls/button/buttonView";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Link } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);
import TopNavbar from "../../../common/topNavbar/topNavbar";

export default function AdminDashboard() {
  const stats = {
    postsCount: 120,
    commentsCount: 432,
    usersCount: 87,
    viewsCount: 9320,
    pendingReviews: 15,
    activeVisitors: 243,
  };

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Page Views",
        data: [1200, 1900, 1500, 2200, 1800, 2500, 2300],
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
        borderRadius: 6,
        hoverBackgroundColor: "rgba(59, 130, 246, 1)",
      },
    ],
  };

  const doughnutData = {
    labels: ["Published", "Drafts", "Scheduled", "Archived"],
    datasets: [
      {
        data: [85, 25, 15, 10],
        backgroundColor: [
          "#10b981", // emerald-500
          "#f59e0b", // amber-500
          "#3b82f6", // blue-500
          "#ef4444", // red-500
        ],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [50, 62, 75, 87, 98, 105],
        borderColor: "#8b5cf6", // violet-500
        backgroundColor: "rgba(139, 92, 246, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { font: { size: 12 } } },
      tooltip: { backgroundColor: "#1f2937", bodyFont: { size: 12 } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(0, 0, 0, 0.05)" } },
      x: { grid: { display: false } },
    },
  };

  const sampleUserData = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Implement search logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={sampleUserData}
          onSearch={handleSearch}
          notificationCount={3}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
  
        <main className="flex-1 max-w-11/12 w-full mx-auto px-6 py-8 space-y-8">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <StatCard title="Posts" value={stats.postsCount} icon={<FileText />} color="bg-blue-600" trend="+5%" />
            <StatCard title="Comments" value={stats.commentsCount} icon={<MessageSquare />} color="bg-emerald-600" trend="+12%" />
            <StatCard title="Users" value={stats.usersCount} icon={<Users />} color="bg-violet-600" trend="+3%" />
            <StatCard title="Views" value={stats.viewsCount} icon={<Eye />} color="bg-amber-600" trend="+8%" />
            <StatCard title="Pending" value={stats.pendingReviews} icon={<FileText />} color="bg-rose-600" trend="-2%" />
            <StatCard title="Active" value={stats.activeVisitors} icon={<Users />} color="bg-indigo-600" trend="+15%" />
          </section>
  
          <section className="bg-white rounded-[5px] p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Link to="/admin/posts/create">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    New Post
                  </Button>
                </Link>
                <Link to="/admin/media">
                  <Button variant="primary" size="sm" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Media
                  </Button>
                </Link>
                <Link to="/admin/users">
                  <Button variant="success" size="sm" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </Button>
                </Link>
              </div>
            </div>
          </section>
  
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <ChartCard title="Weekly Traffic" className="lg:col-span-8">
              <Bar data={barData} options={chartOptions} />
            </ChartCard>
            <ChartCard title="Post Status" className="lg:col-span-4">
              <Doughnut data={doughnutData} options={{ ...chartOptions, cutout: "65%" }} />
            </ChartCard>
          </section>
  
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <ChartCard title="User Growth" className="lg:col-span-8">
              <Line data={lineData} options={chartOptions} />
            </ChartCard>
            <div className="lg:col-span-4 bg-white rounded-[5px] shadow-sm p-6 hover:shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex justify-between items-center">
                  <span>Avg. Read Time</span>
                  <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-[5px]">4.2 min</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Bounce Rate</span>
                  <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-[5px]">32%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Top Category</span>
                  <span className="font-medium text-gray-800 bg-gray-100 px-2 py-1 rounded-[5px]">Tech</span>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
  
}

function SidebarLink({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors"
    >
      <span className="w-5 h-5">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

function StatCard({ title, value, icon, color, trend }) {
  return (
    <div className="bg-white rounded-[5px] shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all transform hover:-translate-y-1">
      <div className={`${color} text-white rounded-[5px] p-3`}>{icon}</div>
      <div className="flex-1">
        <h4 className="text-sm text-gray-500 font-medium">{title}</h4>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        <span
          className={`text-xs ${
            trend.startsWith("+") ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}

function ChartCard({ title, children, className }) {
  return (
    <div
      className={`bg-white rounded-[5px] shadow-sm p-6 h-[420px] transition-all hover:shadow-md ${className}`}
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="h-[340px]">{children}</div>
    </div>
  );
}
