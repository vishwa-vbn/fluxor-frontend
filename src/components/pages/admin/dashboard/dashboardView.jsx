import React,{useContext ,useMemo}from "react";
import {
  FileText,
  Users,
  Eye,
  PlusCircle,
  Upload,
  UserPlus,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../../common/tabs/Tabs";
import { ThemeContext } from "../../../../utils/ThemeContext";

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
  const { theme } = useContext(ThemeContext);
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: { size: 12, family: "'Inter', sans-serif" },
            color: theme === "dark" ? "#D1D5DB" : "#4B5563",
            padding: 16,
          },
        },
        tooltip: {
          backgroundColor: theme === "dark" ? "#374151" : "#1F2937",
          bodyFont: { size: 12, family: "'Inter', sans-serif" },
          titleFont: { size: 13, family: "'Inter', sans-serif" },
          padding: 10,
          cornerRadius: 4,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: theme === "dark" ? "#4B5563" : "#E5E7EB",
          },
          ticks: {
            font: { size: 12, family: "'Inter', sans-serif" },
            color: theme === "dark" ? "#D1D5DB" : "#4B5563",
          },
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { size: 12, family: "'Inter', sans-serif" },
            color: theme === "dark" ? "#D1D5DB" : "#4B5563",
          },
        },
      },
      animation: {
        duration: 800,
        easing: "easeOutQuad",
      },
    }),
    [theme]
  );

  const trends = {
    postsCount: "+5%",
    usersCount: "+3%",
    viewsCount: "+8%",
    pendingReviews: "-2%",
    activeVisitors: "+15%",
  };

  const recentPosts = [
    { id: 1, title: "Post Title 1" },
    { id: 2, title: "Post Title 2" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col min-h-screen">
        <TopNavbar
          userData={userData}
          onSearch={handleSearch}
          notificationCount={3}
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        />

        <main className="w-[100%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Monitor key metrics and manage your platform effectively.
              </p>
            </div>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Posts"
                value={stats.postsCount}
                icon={<FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                trend={trends.postsCount}
              />
              <StatCard
                title="Total Users"
                value={stats.usersCount}
                icon={<Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                trend={trends.usersCount}
              />
              <StatCard
                title="Total Views"
                value={stats.viewsCount}
                icon={<Eye className="w-6 h-6 text-green-600 dark:text-green-400" />}
                trend={trends.viewsCount}
              />
              <StatCard
                title="Active Users"
                value={stats.usersCount}
                icon={<Users className="w-6 h-6 text-amber-600 dark:text-amber-400" />}
                trend={trends.activeVisitors}
              />
            </section>

            {/* Quick Actions Section */}
            <section className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                Quick Actions
              </h2>
              <div className="flex flex-wrap gap-4">
                <Link to="/create-post">
                  <button  className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                    <PlusCircle className="w-4 h-4" />
                    New Post
                  </button>
                </Link>
                <Link to="/admin/media">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                    <Upload className="w-4 h-4" />
                    Upload Media
                  </button>
                </Link>
                <Link to="/users">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium">
                    <UserPlus className="w-4 h-4" />
                    Add User
                  </button>
                </Link>
              </div>
            </section>

            {/* Charts Section 1 */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="Weekly Traffic" theme={theme}>
                <Bar data={barData} options={chartOptions} key={`bar-${theme}`} />
              </ChartCard>
              <ChartCard title="Post Status">
                <Doughnut
                  data={doughnutData}
                  options={{ ...chartOptions, cutout: "70%" }}
                  className="dark"
                />
              </ChartCard>
            </section>

            {/* Charts Section 2 */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard title="User Growth" theme={theme}>
                <Line data={lineData} options={chartOptions} key={`line-${theme}`} />
              </ChartCard>
              <RecentActivityCard recentPosts={recentPosts} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend }) {
  const isPositive = trend.startsWith("+");
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">{icon}</div>
        <div>
          <h4 className="text-sm text-gray-600 dark:text-gray-400">{title}</h4>
          <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
            {value}
          </p>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            )}
            <span
              className={`text-xs font-medium ${
                isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h3>
      <div className="h-80">{children}</div>
    </div>
  );
}

function RecentActivityCard({ recentPosts }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Recent Activity
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Latest activities and updates on your blog
        </p>
      </div>
      <Tabs defaultValue="posts" className="text-gray-900 dark:text-gray-100">
        <TabsList className="bg-gray-100 dark:bg-gray-700">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            Recent Posts
          </TabsTrigger>
          <TabsTrigger
            value="comments"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800"
          >
            Recent Comments
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="posts"
          className="border-t border-gray-200 dark:border-gray-700 pt-2"
        >
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center border-b border-gray-200 dark:border-gray-700 py-2 last:border-none"
            >
              <FileText className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {post.title}
              </p>
            </div>
          ))}
        </TabsContent>
        <TabsContent
          value="comments"
          className="border-t border-gray-200 dark:border-gray-700 pt-2"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No recent comments found.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}