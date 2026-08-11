import React from 'react';
import { GraduationCap, BookOpen, Library, MessageCircleQuestion, Bell, Award, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function StudentNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const notificationCount = 3;

  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    alert('Logging out...');
    localStorage.removeItem("userEmail");
    navigate("/stdlogin");
  };

  // helper: checks if current URL includes a given section
  const isActive = (section) => location.pathname.includes(section);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .nav-badge { animation: bounce 2s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-2 rounded-xl shadow-lg animate-pulse-slow">
              <GraduationCap className="text-white" size={28} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Learnex
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-2">

            <Link to={`/${userEmail}/study`}>
              <button
                className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive("study")
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <BookOpen size={20} />
                <span className="hidden md:inline">Study</span>
              </button>
            </Link>

            <Link to={`/${userEmail}/courses`}>
              <button
                className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive("courses")
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <Library size={20} />
                <span className="hidden md:inline">Courses</span>
              </button>
            </Link>

            <Link to={`/${userEmail}/doubts`}>
              <button
                className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive("doubt")
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <MessageCircleQuestion size={20} />
                <span className="hidden md:inline">Doubt Box</span>
              </button>
            </Link>

            <Link to={`/${userEmail}/notifications`}>
              <button
                className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive("notifications")
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <Bell size={20} />
                <span className="hidden md:inline">Notifications</span>
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center nav-badge">
                    {notificationCount}
                  </span>
                )}
              </button>
            </Link>

            <Link to={`/${userEmail}/scholarship`}>
              <button
                className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive("scholarship")
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <Award size={20} />
                <span className="hidden md:inline">Scholarship</span>
              </button>
            </Link>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-300 mx-2"></div>

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

      {/* Mobile View */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link to={`/${userEmail}/study`}>
            <button
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive("study") ? 'text-purple-600' : 'text-gray-600'
              }`}
            >
              <BookOpen size={22} />
              <span className="text-xs font-medium">Study</span>
            </button>
          </Link>

          <Link to={`/${userEmail}/courses`}>
            <button
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive("courses") ? 'text-purple-600' : 'text-gray-600'
              }`}
            >
              <Library size={22} />
              <span className="text-xs font-medium">Courses</span>
            </button>
          </Link>

          <Link to={`/${userEmail}/doubts`}>
            <button
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive("doubt") ? 'text-purple-600' : 'text-gray-600'
              }`}
            >
              <MessageCircleQuestion size={22} />
              <span className="text-xs font-medium">Doubt Box</span>
            </button>
          </Link>

          <Link to={`/${userEmail}/notifications`}>
            <button
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive("notifications") ? 'text-purple-600' : 'text-gray-600'
              }`}
            >
              <Bell size={22} />
              <span className="text-xs font-medium">Notifications</span>
              {notificationCount > 0 && (
                <span className="absolute top-0 right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </Link>

          <Link to={`/${userEmail}/scholarship`}>
            <button
              className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive("scholarship") ? 'text-purple-600' : 'text-gray-600'
              }`}
            >
              <Award size={22} />
              <span className="text-xs font-medium">Scholarship</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
