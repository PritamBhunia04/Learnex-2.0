import React, { useState } from 'react';
import { GraduationCap, BookOpen, Library, MessageCircleQuestion, Bell, Award, LogOut, Search, Filter, Settings, Check, CheckCheck, X, ChevronRight, AlertCircle, Calendar, Download, ExternalLink, Pin, Clock, Star, MessageSquare, BookMarked, Trophy, Megaphone, User, ChevronDown, Mail, Globe, Smartphone } from 'lucide-react';
import StudentNavbar from './StudentNavbar';

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notificationTab, setNotificationTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    type: 'all',
    status: 'all'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    courseUpdates: { website: true, email: true, push: false },
    doubtReplies: { website: true, email: true, push: true },
    deadlines: { website: true, email: true, push: true },
    achievements: { website: true, email: false, push: true },
    announcements: { website: true, email: false, push: false }
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'doubt-reply',
      icon: MessageSquare,
      title: 'Your doubt "Why pointers in C?" has a new reply',
      message: 'Prof. Michael Chen answered your doubt with detailed explanation and code examples.',
      timestamp: '2 hours ago',
      isRead: false,
      isPinned: false,
      priority: 'normal',
      actionLabel: 'View Discussion',
      actionLink: '/doubtbox/123',
      category: 'doubt'
    },
    {
      id: 2,
      type: 'course-update',
      icon: BookMarked,
      title: 'New lecture added to Python for Beginners',
      message: 'Module 5: "Advanced List Comprehensions" is now available. Complete it before the deadline.',
      timestamp: '5 hours ago',
      isRead: false,
      isPinned: true,
      priority: 'urgent',
      actionLabel: 'Open Course',
      actionLink: '/courses/python-beginners',
      category: 'course'
    },
    {
      id: 3,
      type: 'achievement',
      icon: Trophy,
      title: 'Congratulations! Certificate Ready',
      message: 'You completed "Data Science Masterclass". Your certificate is ready for download.',
      timestamp: '1 day ago',
      isRead: false,
      isPinned: false,
      priority: 'normal',
      actionLabel: 'Download Certificate',
      actionLink: '/certificates/ds-masterclass',
      category: 'achievement'
    },
    {
      id: 4,
      type: 'alert',
      icon: AlertCircle,
      title: 'Assignment Deadline Approaching',
      message: 'Submit your Web Development project by tomorrow 11:59 PM. Only 24 hours remaining!',
      timestamp: '3 hours ago',
      isRead: true,
      isPinned: true,
      priority: 'urgent',
      actionLabel: 'Submit Now',
      actionLink: '/assignments/web-dev-project',
      category: 'alert'
    },
    {
      id: 5,
      type: 'mentor-message',
      icon: User,
      title: 'Dr. Sarah Johnson mentioned you',
      message: 'Great work on your Python assignment! Keep up the excellent progress. I have some suggestions for improvement.',
      timestamp: '1 day ago',
      isRead: true,
      isPinned: false,
      priority: 'normal',
      actionLabel: 'View Message',
      actionLink: '/messages/sarah-johnson',
      category: 'mentor'
    },
    {
      id: 6,
      type: 'system',
      icon: Megaphone,
      title: 'System Maintenance Scheduled',
      message: 'Platform will be under maintenance on Dec 10, 2024 from 2:00 AM to 4:00 AM IST. Plan your study schedule accordingly.',
      timestamp: '2 days ago',
      isRead: true,
      isPinned: false,
      priority: 'normal',
      actionLabel: 'Learn More',
      actionLink: '/announcements/maintenance',
      category: 'system'
    },
    {
      id: 7,
      type: 'course-update',
      icon: BookMarked,
      title: 'New Course Enrolled: Mobile App Development',
      message: 'Welcome to Mobile App Development! Start with Module 1: Introduction to React Native.',
      timestamp: '3 days ago',
      isRead: true,
      isPinned: false,
      priority: 'normal',
      actionLabel: 'Start Learning',
      actionLink: '/courses/mobile-app-dev',
      category: 'course'
    },
    {
      id: 8,
      type: 'achievement',
      icon: Star,
      title: 'You earned a new badge: Fast Learner',
      message: 'Completed 3 courses in 30 days! You are on fire! 🔥',
      timestamp: '4 days ago',
      isRead: true,
      isPinned: false,
      priority: 'normal',
      actionLabel: 'View Badge',
      actionLink: '/profile/badges',
      category: 'achievement'
    }
  ]);

  const categoryTabs = [
    { id: 'all', label: 'All Notifications', icon: Bell },
    { id: 'course', label: 'Course Updates', icon: BookOpen },
    { id: 'doubt', label: 'Doubt Replies', icon: MessageCircleQuestion },
    { id: 'achievement', label: 'Achievements', icon: Award },
    { id: 'system', label: 'System Alerts', icon: Megaphone },
    { id: 'mentor', label: 'Mentor Messages', icon: User }
  ];

  const getPriorityColor = (priority) => {
    return priority === 'urgent' ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-50';
  };

  const getPriorityIcon = (priority) => {
    return priority === 'urgent' ? AlertCircle : Clock;
  };

  const toggleRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: !n.isRead } : n
    ));
  };

  const togglePin = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isPinned: !n.isPinned } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications
    .filter(n => {
      if (notificationTab !== 'all' && n.category !== notificationTab) return false;
      if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !n.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filters.type !== 'all' && n.category !== filters.type) return false;
      if (filters.status === 'unread' && n.isRead) return false;
      if (filters.status === 'read' && !n.isRead) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const toggleSettingCategory = (category, method) => {
    setNotificationSettings({
      ...notificationSettings,
      [category]: {
        ...notificationSettings[category],
        [method]: !notificationSettings[category][method]
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          font-size: 10px;
          font-weight: bold;
          padding: 2px 6px;
          border-radius: 10px;
          border: 2px solid white;
        }
      `}</style>

      {/* Navbar */}
     <StudentNavbar/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Bell className="text-purple-600" size={40} />
                Notifications
                {unreadCount > 0 && (
                  <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </h1>
              <p className="text-gray-600 text-lg">Stay updated with all your course activities and achievements</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-white border-2 border-purple-200 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center gap-2 shadow-md"
              >
                <CheckCheck size={20} />
                Mark All Read
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Settings size={20} />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 animate-fadeIn">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notifications..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              <Filter size={20} className="text-purple-600" />
              <span className="font-semibold">Filters</span>
              <ChevronDown size={18} className={`text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 bg-white rounded-xl shadow-lg p-6 animate-fadeIn border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="course">Course Updates</option>
                    <option value="doubt">Doubt Replies</option>
                    <option value="achievement">Achievements</option>
                    <option value="system">System Alerts</option>
                    <option value="mentor">Mentor Messages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="all">All</option>
                    <option value="unread">Unread Only</option>
                    <option value="read">Read Only</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="mb-6 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-lg p-2 flex flex-wrap gap-2">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = notificationTab === tab.id;
              const count = tab.id === 'all' 
                ? notifications.length 
                : notifications.filter(n => n.category === tab.id).length;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setNotificationTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20' : 'bg-gray-200'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications List */}
        <div className="animate-fadeIn">
          {filteredNotifications.length === 0 ? (
            // Empty State
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-purple-100 rounded-full mb-4">
                  <Bell className="text-purple-600" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">You're All Caught Up! 📭</h3>
                <p className="text-gray-600 text-lg mb-6">No new updates right now. Check back later for exciting news!</p>
              </div>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <Library size={20} />
                  Browse Courses
                </button>
                <button className="px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center gap-2">
                  <MessageCircleQuestion size={20} />
                  Ask a Doubt
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotifications.map((notification, index) => {
                const Icon = notification.icon;
                const PriorityIcon = getPriorityIcon(notification.priority);
                
                return (
                  <div
                    key={notification.id}
                    className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${
                      notification.priority === 'urgent' ? 'border-red-500' : 'border-purple-500'
                    } ${!notification.isRead ? 'bg-purple-50' : ''}`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                          notification.priority === 'urgent' ? 'bg-red-100' : 'bg-purple-100'
                        }`}>
                          <Icon className={notification.priority === 'urgent' ? 'text-red-600' : 'text-purple-600'} size={24} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className={`text-lg font-bold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {notification.isPinned && (
                                <Pin className="text-purple-600" size={16} />
                              )}
                              {!notification.isRead && (
                                <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">{notification.message}</p>
                          
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Clock size={14} />
                              <span>{notification.timestamp}</span>
                            </div>
                            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)}`}>
                              <PriorityIcon size={12} />
                              <span className="font-semibold capitalize">{notification.priority}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              onClick={() => setSelectedNotification(notification)}
                              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm"
                            >
                              {notification.actionLabel}
                              <ChevronRight size={16} />
                            </button>
                            
                            <button
                              onClick={() => toggleRead(notification.id)}
                              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center gap-1 text-sm"
                            >
                              {notification.isRead ? <Check size={16} /> : <CheckCheck size={16} />}
                              <span>{notification.isRead ? 'Mark Unread' : 'Mark Read'}</span>
                            </button>
                            
                            <button
                              onClick={() => togglePin(notification.id)}
                              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
                              title={notification.isPinned ? 'Unpin' : 'Pin'}
                            >
                              <Pin size={16} className={notification.isPinned ? 'fill-purple-600 text-purple-600' : ''} />
                            </button>
                            
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300"
                              title="Delete"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  {React.createElement(selectedNotification.icon, { size: 24 })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedNotification.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Clock size={14} />
                    <span>{selectedNotification.timestamp}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                  getPriorityColor(selectedNotification.priority)
                }`}>
                  {React.createElement(getPriorityIcon(selectedNotification.priority), { size: 14 })}
                  <span className="capitalize">{selectedNotification.priority} Priority</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">{selectedNotification.message}</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <ExternalLink size={16} className="text-purple-600" />
                  Related Link
                </h3>
                <a href={selectedNotification.actionLink} className="text-purple-600 hover:text-purple-700 underline">
                  {selectedNotification.actionLink}
                </a>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    toggleRead(selectedNotification.id);
                    setSelectedNotification(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {selectedNotification.actionLabel}
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={() => toggleRead(selectedNotification.id)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                >
                  <CheckCheck size={20} />
                  {selectedNotification.isRead ? 'Mark Unread' : 'Mark Read'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideIn">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings size={28} />
                <h2 className="text-2xl font-bold">Notification Settings</h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6">Customize how you receive notifications across different channels</p>
              
              <div className="space-y-6">
                {Object.entries(notificationSettings).map(([category, methods]) => {
                  const categoryLabels = {
                    courseUpdates: { title: 'Course Updates', icon: BookOpen, desc: 'New lectures, materials, and course announcements' },
                    doubtReplies: { title: 'Doubt Replies', icon: MessageSquare, desc: 'Responses to your questions and discussions' },
                    deadlines: { title: 'Deadlines & Reminders', icon: Calendar, desc: 'Assignment deadlines and important dates' },
                    achievements: { title: 'Achievements & Certificates', icon: Trophy, desc: 'Course completions, badges, and milestones' },
                    announcements: { title: 'Platform Announcements', icon: Megaphone, desc: 'System updates and maintenance notices' }
                  };
                  
                  const categoryInfo = categoryLabels[category];
                  const Icon = categoryInfo.icon;
                  
                  return (
                    <div key={category} className="bg-gray-50 rounded-xl p-5 border-2 border-gray-100">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="text-purple-600" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">{categoryInfo.title}</h3>
                          <p className="text-sm text-gray-600">{categoryInfo.desc}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-14">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Globe size={18} className="text-purple-600" />
                            <span className="font-medium text-gray-700">Website</span>
                          </div>
                          <button
                            onClick={() => toggleSettingCategory(category, 'website')}
                            className={`w-12 h-6 rounded-full transition-all duration-300 ${
                              methods.website ? 'bg-purple-600' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                              methods.website ? 'translate-x-6' : 'translate-x-0.5'
                            }`}></div>
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Mail size={18} className="text-blue-600" />
                            <span className="font-medium text-gray-700">Email</span>
                          </div>
                          <button
                            onClick={() => toggleSettingCategory(category, 'email')}
                            className={`w-12 h-6 rounded-full transition-all duration-300 ${
                              methods.email ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                              methods.email ? 'translate-x-6' : 'translate-x-0.5'
                            }`}></div>
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2">
                            <Smartphone size={18} className="text-green-600" />
                            <span className="font-medium text-gray-700">Push</span>
                          </div>
                          <button
                            onClick={() => toggleSettingCategory(category, 'push')}
                            className={`w-12 h-6 rounded-full transition-all duration-300 ${
                              methods.push ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                              methods.push ? 'translate-x-6' : 'translate-x-0.5'
                            }`}></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-purple-50 rounded-xl border-2 border-purple-100">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-purple-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-purple-900 mb-1">Important Note</h4>
                    <p className="text-sm text-purple-700">
                      Some critical notifications (like security alerts) will always be sent regardless of your preferences to ensure account safety.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Check size={20} />
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}