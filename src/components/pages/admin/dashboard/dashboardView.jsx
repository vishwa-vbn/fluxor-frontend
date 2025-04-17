import React from "react";
import { FileText, Users, Eye, PlusCircle, Upload, UserPlus } from "lucide-react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
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
import TopNavbar from "../../../common/topNavbar/topNavbar";

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

export default function DashboardView({
  stats,
  barData,
  doughnutData,
  lineData,
  quickStats,
  userData,
  handleSearch,
}) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12, family: "'Inter', sans-serif" },
          color: "#4B5563",
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: "#1F2937",
        bodyFont: { size: 12, family: "'Inter', sans-serif" },
        titleFont: { size: 13, family: "'Inter', sans-serif" },
        padding: 10,
        cornerRadius: 4,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#E5E7EB" },
        ticks: {
          font: { size: 12, family: "'Inter', sans-serif" },
          color: "#4B5563",
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 12, family: "'Inter', sans-serif" },
          color: "#4B5563",
        },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuad",
    },
  };

  const trends = {
    postsCount: "+5%",
    usersCount: "+3%",
    viewsCount: "+8%",
    pendingReviews: "-2%",
    activeVisitors: "+15%",
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-900">
      <div className="flex flex-col min-h-screen">
        <TopNavbar
          userData={userData}
          onSearch={handleSearch}
          notificationCount={3}
        />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Monitor key metrics and manage your platform effectively.
              </p>
            </div>

            {/* Stats Section - Grid Layout */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Posts"
                value={stats.postsCount}
                icon={<FileText className="w-6 h-6 text-blue-600" />}
                trend={trends.postsCount}
              />
              <StatCard
                title="Total Users"
                value={stats.usersCount}
                icon={<Users className="w-6 h-6 text-purple-600" />}
                trend={trends.usersCount}
              />
              <StatCard
                title="Total Views"
                value={stats.viewsCount}
                icon={<Eye className="w-6 h-6 text-green-600" />}
                trend={trends.viewsCount}
              />
              <StatCard
                title="Active Users"
                value={stats.usersCount}
                icon={<Users className="w-6 h-6 text-amber-600" />}
                trend={trends.activeVisitors}
              />
            </section>

            {/* Quick Actions Section */}
            <section className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Link to="/admin/posts/create">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                    <PlusCircle className="w-4 h-4" />
                    New Post
                  </button>
                </Link>
                <Link to="/admin/media">
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                    <Upload className="w-4 h-4" />
                    Upload Media
                  </button>
                </Link>
                <Link to="/admin/users">
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium">
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </button>
                </Link>
              </div>
            </section>

            {/* Charts Section 1 */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ChartCard title="Weekly Traffic" className="lg:col-span-2">
                <Bar data={barData} options={chartOptions} />
              </ChartCard>
              <ChartCard title="Post Status">
                <Doughnut
                  data={doughnutData}
                  options={{ ...chartOptions, cutout: "70%" }}
                />
              </ChartCard>
            </section>

            {/* Charts Section 2 */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ChartCard title="User Growth" className="lg:col-span-2">
                <Line data={lineData} options={chartOptions} />
              </ChartCard>
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Read Time</span>
                    <span className="text-sm font-medium text-gray-900">
                      {quickStats.avgReadTime}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Bounce Rate</span>
                    <span className="text-sm font-medium text-gray-900">
                      {quickStats.bounceRate}
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Top Category</span>
                    <span className="text-sm font-medium text-gray-900">
                      {quickStats.topCategory}
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-100 rounded-md">{icon}</div>
        <div>
          <h4 className="text-sm text-gray-600">{title}</h4>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
          <span
            className={`text-xs font-medium ${
              trend.startsWith("+") ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children, className }) {
  return (
    <div className={`bg-white shadow-sm rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      <div className="h-80">{children}</div>
    </div>
  );
}