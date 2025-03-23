
import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { TransactionItem } from "@/components/ui/transaction-item";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Search, Filter, Calendar, AlertCircle } from "lucide-react";

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
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
    {
      id: "6",
      title: "Internet Bill",
      amount: 59.99,
      date: new Date(2023, 8, 12, 8, 30),
      type: "expense" as const,
      category: "housing" as const,
    },
    {
      id: "7",
      title: "Freelance Payment",
      amount: 450.00,
      date: new Date(2023, 8, 10, 15, 0),
      type: "income" as const,
      category: "other" as const,
    },
  ];

  const filteredTransactions = transactions.filter(transaction => 
    transaction.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = transaction.date.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="min-h-screen bg-appBackground">
      <Header showBackButton title="Transactions" />
      
      <main className="page-container">
        {/* Search and Filter */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-textSecondary" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              className="form-input w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3 rounded-lg bg-white border border-divider text-textSecondary">
            <Filter size={20} />
          </button>
          <button className="p-3 rounded-lg bg-white border border-divider text-textSecondary">
            <Calendar size={20} />
          </button>
        </div>
        
        {/* Transactions List */}
        <div className="space-y-6 animate-stagger">
          {sortedDates.length > 0 ? (
            sortedDates.map(date => (
              <div key={date} className="animate-fade-in">
                <h3 className="text-sm font-medium text-textSecondary mb-3">
                  {new Date(date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </h3>
                <div className="space-y-3">
                  {groupedTransactions[date].map(transaction => (
                    <TransactionItem key={transaction.id} {...transaction} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <DashboardCard className="py-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-divider p-3 rounded-full mb-4">
                  <AlertCircle size={24} className="text-textSecondary" />
                </div>
                <h3 className="text-lg font-medium text-textPrimary mb-2">No transactions found</h3>
                <p className="text-textSecondary mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button 
                  className="btn-secondary"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </button>
              </div>
            </DashboardCard>
          )}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Transactions;
