import React, { useState } from 'react';
import { GraduationCap, BookOpen, Library, MessageCircleQuestion, Bell, Award, LogOut, FileText, ClipboardCheck, TrendingUp, BookMarked, Mail, Phone, MessageCircle, Clock, Sparkles, ArrowRight } from 'lucide-react';
import StudentNavbar from './StudentNavbar';

export default function StudentStudyPage() {
  const [activeTab, setActiveTab] = useState('study');
  const [notificationCount] = useState(3);
  const studentName = "Pritam Bhunia";

  const navItems = [
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'courses', label: 'Courses', icon: Library },
    { id: 'doubtbox', label: 'Doubt Box', icon: MessageCircleQuestion },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationCount },
    { id: 'scholarship', label: 'Scholarship', icon: Award }
  ];

  const studyCards = [
    {
      id: 'mycourses',
      title: 'My Courses',
      icon: BookOpen,
      description: 'Continue your learning journey',
      color: 'from-purple-500 to-purple-700',
      stats: '12 Active'
    },
    {
      id: 'tests',
      title: 'Tests',
      icon: FileText,
      description: 'Practice and assess your knowledge',
      color: 'from-blue-500 to-blue-700',
      stats: '5 Pending'
    },
    {
      id: 'assignments',
      title: 'Assignments',
      icon: ClipboardCheck,
      description: 'Complete your pending tasks',
      color: 'from-green-500 to-green-700',
      stats: '3 Due Soon'
    },
    {
      id: 'progress',
      title: 'Progress',
      icon: TrendingUp,
      description: 'Track your academic growth',
      color: 'from-orange-500 to-orange-700',
      stats: '78% Complete'
    },
    {
      id: 'library',
      title: 'Library',
      icon: BookMarked,
      description: 'Access learning resources',
      color: 'from-pink-500 to-pink-700',
      stats: '250+ Resources'
    }
  ];

  const handleCardClick = (cardId) => {
    console.log(`Navigated to: ${cardId}`);
    alert(`Opening ${cardId}...`);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    alert('Logging out...');
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
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .nav-badge { animation: bounce 2s ease-in-out infinite; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .float-animation { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* Navbar */}
      <StudentNavbar/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12 animate-fadeIn">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 shimmer"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-yellow-300 float-animation" size={28} />
                  <p className="text-purple-200 text-lg">Welcome back,</p>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3">{studentName}</h1>
                <p className="text-purple-100 text-lg">Ready to continue your learning journey today?</p>
              </div>
              <div className="hidden md:block">
                <div className="bg-purple bg-opacity-20 p-6 rounded-2xl backdrop-blur-sm">
                  <GraduationCap size={80} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Cards Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen className="text-purple-600" size={28} />
            Quick Access
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {studyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`bg-gradient-to-br ${card.color} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{card.description}</p>
                  <div className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block mb-4">
                    {card.stats}
                  </div>
                  <button
                    onClick={() => handleCardClick(card.id)}
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  >
                    Visit
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact & Support Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle size={28} />
              Need Help? We're Here for You!
            </h2>
            <p className="text-purple-100 mt-2">Our support team is available 24/7 to assist you</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Email Support */}
              <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-all duration-300 group cursor-pointer">
                <div className="bg-purple-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Email Support</h3>
                  <p className="text-sm text-gray-600 mb-2">Get help via email</p>
                  <a href="mailto:support@learnex.com" className="text-purple-600 font-semibold hover:text-purple-700">
                    support@learnex.com
                  </a>
                </div>
              </div>

              {/* Toll-Free Number */}
              <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-all duration-300 group cursor-pointer">
                <div className="bg-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Toll-Free Number</h3>
                  <p className="text-sm text-gray-600 mb-2">Call us anytime</p>
                  <a href="tel:1800-123-4567" className="text-blue-600 font-semibold hover:text-blue-700">
                    1800-123-4567
                  </a>
                </div>
              </div>

              {/* Customer Care */}
              <div className="flex items-start gap-4 p-6 bg-green-50 rounded-2xl hover:bg-green-100 transition-all duration-300 group cursor-pointer">
                <div className="bg-green-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Customer Care</h3>
                  <p className="text-sm text-gray-600 mb-2">Direct support line</p>
                  <a href="tel:+91-7908673050" className="text-green-600 font-semibold hover:text-green-700">
                    +91-7908673050
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-sm text-gray-600">
                <strong>Support Hours:</strong> Monday - Sunday, 24/7 | 
                <strong className="ml-2">Average Response Time:</strong> Under 2 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}