
import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { StatCard } from "@/components/ui/stat-card";
import { TransactionItem } from "@/components/ui/transaction-item";
import { Wallet, LineChart, ArrowRight, Banknote, TrendingUp, TrendingDown } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "monthly">("daily");

  const transactions = [
    {
      id: "1",
      title: "Grocery Shopping",
      amount: 67.99,
      date: new Date(2023, 8, 15, 14, 30),
      type: "expense" as const,
      category: "shopping" as const,
    },
    {
      id: "2",
      title: "Coffee Shop",
      amount: 5.75,
      date: new Date(2023, 8, 15, 9, 15),
      type: "expense" as const,
      category: "food" as const,
    },
    {
      id: "3",
      title: "Salary Deposit",
      amount: 2750.00,
      date: new Date(2023, 8, 14, 9, 0),
      type: "income" as const,
      category: "other" as const,
    },
    {
      id: "4",
      title: "Uber Ride",
      amount: 12.55,
      date: new Date(2023, 8, 14, 19, 20),
      type: "expense" as const,
      category: "transport" as const,
    },
    {
      id: "5",
      title: "Movie Tickets",
      amount: 24.00,
      date: new Date(2023, 8, 13, 20, 0),
      type: "expense" as const,
      category: "entertainment" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-appBackground">
      <Header title="FinTrack" showMenu={true} />
      
      <main className="page-container">
        {/* Balance Card */}
        <DashboardCard
          icon={<Wallet size={24} />}
          title="Total Balance"
          subtitle="September 2023"
          className="mb-6 animate-scale-in"
          isGlass={true}
        >
          <div className="flex flex-col items-center py-6">
            <h1 className="text-4xl font-bold text-textPrimary mb-3">$4,252.15</h1>
            <div className="flex items-center justify-center gap-8 mt-3">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary/10 text-secondary mb-2">
                  <TrendingUp size={20} />
                </div>
                <span className="text-sm text-textSecondary">Income</span>
                <span className="font-bold text-secondary">$6,238.12</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-danger/10 text-danger mb-2">
                  <TrendingDown size={20} />
                </div>
                <span className="text-sm text-textSecondary">Expenses</span>
                <span className="font-bold text-danger">$1,985.97</span>
              </div>
            </div>
          </div>
        </DashboardCard>
        
        {/* Tabs */}
        <div className="flex p-1 bg-divider rounded-full mb-6 animate-fade-in animate-delay-100">
          <button
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === "daily"
                ? "bg-white text-primary shadow-sm"
                : "text-textSecondary"
            }`}
            onClick={() => setActiveTab("daily")}
          >
            Daily
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              activeTab === "monthly"
                ? "bg-white text-primary shadow-sm"
                : "text-textSecondary"
            }`}
            onClick={() => setActiveTab("monthly")}
          >
            Monthly
          </button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 animate-stagger">
          <StatCard
            title="Today's Spending"
            value="$122.54"
            valueColor="text-danger"
            icon={<Banknote size={18} />}
            trend={{ value: 12.5, isPositive: false }}
          />
          <StatCard
            title="Daily Average"
            value="$86.35"
            icon={<LineChart size={18} />}
            trend={{ value: 6.2, isPositive: true }}
          />
        </div>
        
        {/* Recent Transactions */}
        <DashboardCard
          title="Recent Transactions"
          actionIcon={<ArrowRight size={18} />}
          onActionClick={() => window.location.href = "/transactions"}
          className="mb-6 animate-fade-in animate-delay-300"
        >
          <div className="space-y-3">
            {transactions.slice(0, 3).map((transaction) => (
              <TransactionItem key={transaction.id} {...transaction} />
            ))}
            <button className="btn-tertiary w-full mt-2">View All Transactions</button>
          </div>
        </DashboardCard>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Index;
