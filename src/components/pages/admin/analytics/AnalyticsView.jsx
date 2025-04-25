import React from "react";
import { Eye, Users, MousePointerClick, TrendingUp ,ArrowUp ,ArrowDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../common/card/Card";
import TopNavbar from "../../../common/topNavbar/topNavbar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import clsx from "clsx";

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AnalyticsView = ({
  stats,
  weeklyTrafficData,
  userGrowthData,
  trafficSources,
  userData,
  onSearch,
  notificationCount,
  toggleSidebar,
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Chart options aligned with DashboardView.jsx
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 12, family: "'Inter', sans-serif" },
          color: (context) =>
            context.chart.canvas.classList.contains("dark") ? "#D1D5DB" : "#4B5563", // gray-300 in dark, gray-600 in light
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: (context) =>
          context.chart.canvas.classList.contains("dark") ? "#374151" : "#1F2937", // gray-700 in dark, gray-800 in light
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
          color: (context) =>
            context.chart.canvas.classList.contains("dark") ? "#4B5563" : "#E5E7EB", // gray-600 in dark, gray-200 in light
        },
        ticks: {
          font: { size:12, family: "'Inter', sans-serif" },
          color: (context) =>
            context.chart.canvas.classList.contains("dark") ? "#D1D5DB" : "#4B5563", // gray-300 in dark, gray-600 in light
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 12, family: "'Inter', sans-serif" },
          color: (context) =>
            context.chart.canvas.classList.contains("dark") ? "#D1D5DB" : "#4B5563", // gray-300 in dark, gray-600 in light
        },
      },
    },
    animation: {
      duration: 800,
      easing: "easeOutQuad",
    },
  };

  // Stat card component
  const StatCard = ({ title, value, icon: Icon, change }) => (
    <Card className="p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700">
      <CardContent className="flex items-center space-x-3">
        <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-700">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">{value}</h3>
          <div className="flex items-center gap-1">
            {change.positive ? (
              <ArrowUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            )}
            <span
              className={clsx(
                "text-xs font-medium",
                change.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              )}
            >
              {change.value}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Line chart component
  const LineChart = ({ title, data, lines }) => {
    // Fallback if data is undefined or lacks datasets
    if (!data || !data.labels || !data.datasets || !Array.isArray(data.datasets)) {
      return (
        <Card className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">No data available</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <Line
              data={{
                labels: data.labels,
                datasets: data.datasets.map((dataset, index) => ({
                  label: lines[index]?.name || dataset.label || "Data",
                  data: dataset.data,
                  borderColor: lines[index]?.stroke || dataset.borderColor,
                  backgroundColor: (lines[index]?.stroke || dataset.borderColor) + "33",
                  tension: 0.4,
                  fill: true,
                })),
              }}
              options={chartOptions}
              className="dark"
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div
      className={clsx(
        "min-h-screen bg-gray-100 dark:bg-gray-900 font-inter text-gray-900 dark:text-gray-100 transition-colors duration-200"
      )}
    >
      <div className="flex flex-col min-h-screen">
        <TopNavbar
          userData={userData}
          onSearch={onSearch}
          notificationCount={notificationCount}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
        />
        <main className="w-[100%] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Analytics
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                View detailed performance metrics and traffic analytics for your blog.
              </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Page Views"
                value={stats.viewsCount}
                icon={Eye}
                change={{ value: "12%", positive: true }}
              />
              <StatCard
                title="Unique Visitors"
                value={Math.floor(stats.viewsCount * 0.6)}
                icon={Users}
                change={{ value: "8%", positive: true }}
              />
              <StatCard
                title="Avg. Session"
                value={stats.avgReadTime}
                icon={MousePointerClick}
                change={{ value: "3%", positive: true }}
              />
              <StatCard
                title="Bounce Rate"
                value={stats.bounceRate}
                icon={TrendingUp}
                change={{ value: "5%", positive: false }}
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LineChart
                title="Weekly Traffic"
                data={weeklyTrafficData}
                lines={[
                  { name: "Page Views", stroke: "#1e40af" },
                  { name: "Unique Visitors", stroke: "#3b82f6" },
                ]}
              />
              <LineChart
                title="User Growth"
                data={userGrowthData}
                lines={[{ name: "User Growth", stroke: "#0f766e" }]}
              />
            </div>

            {/* Traffic Sources */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Traffic Sources
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Where your visitors are coming from
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((item) => (
                    <div key={item.source} className="flex items-center">
                      <div className="w-32 flex-shrink-0 text-gray-900 dark:text-gray-100">
                        {item.source}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 dark:bg-blue-400"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-20 text-right text-gray-900 dark:text-gray-100">
                        {item.percentage}%
                      </div>
                      <div className="w-20 text-right text-gray-600 dark:text-gray-400">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsView;