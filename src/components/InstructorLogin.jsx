import React, { useState } from 'react';
import { GraduationCap, User, Lock, Eye, EyeOff, BookOpen, Award, ArrowRight, Briefcase, Users } from 'lucide-react';
import { Link } from 'react-router-dom'

const FloatingIcon = ({ children, delay, duration, x, y }) => (
  <div
    className="absolute opacity-10"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animation: `float ${duration}s ease-in-out ${delay}s infinite`
    }}
  >
    {children}
  </div>
);

export default function InstructorLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    instructorId: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.instructorId || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Login submitted:', formData);
    alert('Login successful!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden relative flex items-center justify-center p-4">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Floating Background Icons */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingIcon delay={0} duration={8} x={10} y={20}>
          <BookOpen size={80} className="text-purple-400" />
        </FloatingIcon>
        <FloatingIcon delay={1} duration={10} x={85} y={15}>
          <Briefcase size={70} className="text-purple-300" />
        </FloatingIcon>
        <FloatingIcon delay={2} duration={9} x={15} y={70}>
          <Users size={60} className="text-purple-400" />
        </FloatingIcon>
        <FloatingIcon delay={1.5} duration={11} x={80} y={75}>
          <Award size={65} className="text-purple-300" />
        </FloatingIcon>
        <FloatingIcon delay={0.5} duration={7} x={50} y={10}>
          <GraduationCap size={55} className="text-purple-400" />
        </FloatingIcon>
      </div>

      {/* Logo */}
      <Link to={"/"}>
      <div className="absolute top-8 left-8 flex items-center gap-2 animate-fadeIn">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-2 rounded-xl shadow-lg animate-pulse-slow">
          <GraduationCap className="text-white" size={28} />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          Learnex
        </span>
      </div>
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-20"></div>
            <div className="relative z-10 text-center">
              <div className="inline-block bg-white p-4 rounded-2xl mb-4">
                <Briefcase className='text-purple-600' size={60} />
              </div>
              <h1 className="text-3xl font-bold mb-2">Instructor Portal</h1>
              <p className="text-purple-100">Login to manage your courses and students</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Instructor ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Instructor ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                <input
                  type="text"
                  name="instructorId"
                  value={formData.instructorId}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Enter your instructor ID"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <a href="#forgot" className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              Access Dashboard
              <ArrowRight size={20} />
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-300">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Protected by reCAPTCHA and subject to the{' '}
          <a href="#privacy" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}