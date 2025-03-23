
import React from "react";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { EditProfileForm } from "@/components/profile/EditProfileForm";
import {
  User,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  DollarSign,
  PieChart,
  Lock,
  Upload,
  Download,
  Moon,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-appBackground">
      <Header showBackButton title="Profile" />
      
      <main className="page-container">
        {/* User Profile Card */}
        <DashboardCard
          className="mb-6 animate-fade-in"
          isGlass={true}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">
              JS
            </div>
            <div>
              <h2 className="text-xl font-bold">John Smith</h2>
              <p className="text-textSecondary">john.smith@example.com</p>
            </div>
          </div>
        </DashboardCard>
        
        {/* Edit Profile Form */}
        <div className="mb-6">
          <EditProfileForm />
        </div>
        
        {/* Settings Categories */}
        <div className="space-y-6 animate-stagger">
          {/* Account Settings */}
          <DashboardCard
            title="Account"
            icon={<User size={18} />}
          >
            <div className="space-y-1">
              <SettingsItem
                icon={<CreditCard size={18} className="text-secondary" />}
                label="Payment Methods"
              />
              <SettingsItem
                icon={<DollarSign size={18} className="text-primary" />}
                label="Currency"
                value="USD"
              />
              <SettingsItem
                icon={<Lock size={18} className="text-tertiary" />}
                label="Privacy & Security"
              />
            </div>
          </DashboardCard>
          
          {/* Preferences */}
          <DashboardCard
            title="Preferences"
            icon={<PieChart size={18} />}
          >
            <div className="space-y-1">
              <SettingsItem
                icon={<Bell size={18} className="text-danger" />}
                label="Notifications"
              />
              <SettingsItem
                icon={<Moon size={18} className="text-tertiary" />}
                label="Theme"
                value="Light"
              />
            </div>
          </DashboardCard>
          
          {/* Data Management */}
          <DashboardCard
            title="Data"
            icon={<Upload size={18} />}
          >
            <div className="space-y-1">
              <SettingsItem
                icon={<Upload size={18} className="text-secondary" />}
                label="Export Data"
              />
              <SettingsItem
                icon={<Download size={18} className="text-primary" />}
                label="Backup & Restore"
              />
            </div>
          </DashboardCard>
          
          {/* Support */}
          <DashboardCard
            title="Support"
            icon={<HelpCircle size={18} />}
          >
            <div className="space-y-1">
              <SettingsItem
                icon={<HelpCircle size={18} className="text-tertiary" />}
                label="Help & Support"
              />
              <SettingsItem
                icon={<LogOut size={18} className="text-danger" />}
                label="Logout"
              />
            </div>
          </DashboardCard>
        </div>
        
        <div className="text-center mt-8 mb-4 text-sm text-textSecondary animate-fade-in animate-delay-500">
          <p>FinTrack v1.0.0</p>
          <p className="mt-1">© 2023 FinTrack App</p>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

interface SettingsItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onClick?: () => void;
}

const SettingsItem = ({ icon, label, value, onClick }: SettingsItemProps) => {
  return (
    <button
      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-divider/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-textSecondary">{value}</span>}
        <ChevronRight size={18} className="text-textSecondary" />
      </div>
    </button>
  );
};

export default Profile;
