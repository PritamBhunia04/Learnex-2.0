import React, { useState } from 'react';
import { GraduationCap, BookOpen, Library, MessageCircleQuestion, Bell, Award, LogOut } from 'lucide-react';

export default function StudentNavbar() {
  const [activeTab, setActiveTab] = useState('study');
  const [notificationCount] = useState(3);

  const navItems = [
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'courses', label: 'Courses', icon: Library },
    { id: 'doubtbox', label: 'Doubt Box', icon: MessageCircleQuestion },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationCount },
    { id: 'scholarship', label: 'Scholarship', icon: Award }
  ];

  const handleNavClick = (itemId) => {
    setActiveTab(itemId);
    console.log(`Navigated to: ${itemId}`);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    alert('Logging out...');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .nav-badge { animation: bounce 2s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 animate-pulse-slow">
              <GraduationCap className="text-white" size={28} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Learnex
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden md:inline">{item.label}</span>
                  
                  {/* Notification Badge */}
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center nav-badge">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Divider */}
            <div className="h-8 w-px bg-gray-300 mx-2"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-all duration-300 flex items-center gap-2 group"
            >
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile View - Simplified */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-purple-600'
                    : 'text-gray-600'
                }`}
              >
                <Icon size={22} />
                <span className="text-xs font-medium">{item.label}</span>
                
                {/* Mobile Notification Badge */}
                {item.badge && item.badge > 0 && (
                  <span className="absolute top-0 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}