import React, { useState } from 'react';
import { GraduationCap, ChevronDown, User, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom'

export default function LearnexNavbar() {
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

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
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={"/"}>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 animate-pulse-slow">
              <GraduationCap className="text-white" size={28} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Learnex
            </span>
          </div>
          </Link>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            {/* Sign Up Button */}
            <Link to={`/stdsignup`}>
              <button className="px-6 py-2 text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300">
                Sign Up
              </button>
            </Link>

            {/* Login Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                

                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
              >
                Login
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${showLoginDropdown ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {showLoginDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
                  <div className="py-2">
                    {/* Student Login */}
                    <Link to={`/stdlogin`}>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors duration-200 flex items-center gap-3 group"
                      >
                        <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <User size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Student Login</div>
                          <div className="text-xs text-gray-500">Access your courses</div>
                        </div>
                      </button>
                    </Link>

                    {/* Divider */}
                    <div className="my-1 border-t border-gray-100"></div>

                    {/* Instructor Login */}

                    <Link to={`/inslogin`}>
                      <button
                        className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors duration-200 flex items-center gap-3 group"
                      >
                        <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <Briefcase size={18} className="text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">Instructor Login</div>
                          <div className="text-xs text-gray-500">Manage your classes</div>
                        </div>
                      </button>
                    </Link>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}