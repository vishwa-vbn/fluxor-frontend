import React from "react";
import { Eye, Users, MousePointerClick, TrendingUp } from "lucide-react";
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

  // Stat card component
  const StatCard = ({ title, value, icon: Icon, change }) => (
    <Card className="p-4">
      <CardContent className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-200">{value}</h3>
          <p
            className={clsx(
              "text-sm",
              change.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}
          >
            {change.positive ? "+" : "-"}{change.value}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // Line chart component
  const LineChart = ({ title, data, lines }) => {
    // Fallback if data is undefined or lacks datasets
    if (!data || !data.labels || !data.datasets || !Array.isArray(data.datasets)) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No data available
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
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
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: false },
              },
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div
      className={clsx(
        "min-h-screen px-0 py-0 space-y-6",
        "bg-gray-50 dark:bg-gray-900"
      )}
    >
      <div className="flex-1 flex flex-col">
        <TopNavbar
          userData={userData}
          onSearch={onSearch}
          notificationCount={notificationCount}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 max-w-[100%] w-full mx-auto px-6 py-3 space-y-8">
          <div>
            <h1
              className={clsx(
                "text-3xl font-bold tracking-tight",
                "text-gray-800 dark:text-gray-200"
              )}
            >
              Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View detailed performance metrics and traffic analytics for your blog.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
              lines={[
                { name: "User Growth", stroke: "#0f766e" },
              ]}
            />
          </div>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Where your visitors are coming from
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((item) => (
                  <div key={item.source} className="flex items-center">
                    <div className="w-32 flex-shrink-0 text-gray-900 dark:text-gray-200">
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
                    <div className="w-20 text-right text-gray-900 dark:text-gray-200">
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
        </main>
      </div>
    </div>
  );
};

export default AnalyticsView;