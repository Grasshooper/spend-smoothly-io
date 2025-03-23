
import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatCard } from "@/components/ui/stat-card";
import { PieChart, LineChart, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Statistics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  
  // Sample pieData for category breakdown
  const pieData = [
    { name: "Food", value: 350, color: "#1976D2" },
    { name: "Shopping", value: 520, color: "#7B1FA2" },
    { name: "Transport", value: 200, color: "#2E7D32" },
    { name: "Entertainment", value: 180, color: "#E53935" },
    { name: "Housing", value: 450, color: "#FF9800" },
    { name: "Other", value: 150, color: "#607D8B" },
  ];
  
  // Sample data for spending trends
  const trendData = [
    { day: "Mon", amount: 65 },
    { day: "Tue", amount: 120 },
    { day: "Wed", amount: 80 },
    { day: "Thu", amount: 150 },
    { day: "Fri", amount: 210 },
    { day: "Sat", amount: 180 },
    { day: "Sun", amount: 90 },
  ];

  const periods = ["Last Week", "This Month", "Last Month", "This Year"];
  const currentPeriodIndex = periods.indexOf(selectedPeriod);

  const handlePrevPeriod = () => {
    const prevIndex = (currentPeriodIndex - 1 + periods.length) % periods.length;
    setSelectedPeriod(periods[prevIndex]);
  };

  const handleNextPeriod = () => {
    const nextIndex = (currentPeriodIndex + 1) % periods.length;
    setSelectedPeriod(periods[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-appBackground">
      <Header showBackButton title="Statistics" />
      
      <main className="page-container">
        {/* Date Range Selector */}
        <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm mb-6 animate-fade-in">
          <button 
            className="p-2 rounded-full hover:bg-divider transition-colors"
            onClick={handlePrevPeriod}
          >
            <ChevronLeft size={20} className="text-textSecondary" />
          </button>
          <button className="flex items-center gap-2 py-2 px-4 font-medium">
            <Calendar size={16} />
            <span>{selectedPeriod}</span>
          </button>
          <button 
            className="p-2 rounded-full hover:bg-divider transition-colors"
            onClick={handleNextPeriod}
          >
            <ChevronRight size={20} className="text-textSecondary" />
          </button>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6 animate-stagger">
          <StatCard
            title="Total Spent"
            value="$1,850.00"
            valueColor="text-danger"
            trend={{ value: 3.2, isPositive: false }}
          />
          <StatCard
            title="Total Income"
            value="$3,200.00"
            valueColor="text-secondary"
            trend={{ value: 8.5, isPositive: true }}
          />
        </div>
        
        {/* Spending Trends Chart */}
        <DashboardCard
          title="Spending Trends"
          icon={<LineChart size={20} />}
          className="mb-6 animate-fade-in animate-delay-200"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={trendData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666666" }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666666" }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Spent"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#2E7D32"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#2E7D32", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#2E7D32", strokeWidth: 0 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
        
        {/* Spending by Category */}
        <DashboardCard
          title="Spending by Category"
          icon={<PieChart size={20} />}
          className="mb-6 animate-fade-in animate-delay-300"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  formatter={(value, entry, index) => {
                    const { color } = pieData[index];
                    return (
                      <span style={{ color: "#333333", fontWeight: 500 }}>
                        {value} (${pieData[index].value})
                      </span>
                    );
                  }}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, "Spent"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Statistics;
