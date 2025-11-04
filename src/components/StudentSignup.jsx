import React, { useState } from 'react';
import { GraduationCap, User, Mail, Phone, BookOpen, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
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

export default function StudentSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    parentEmail: '',
    phoneNo: '',
    standard: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Account created successfully!');
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
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
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
          <GraduationCap size={70} className="text-purple-300" />
        </FloatingIcon>
        <FloatingIcon delay={2} duration={9} x={15} y={70}>
          <Sparkles size={60} className="text-purple-400" />
        </FloatingIcon>
        <FloatingIcon delay={1.5} duration={11} x={80} y={75}>
          <BookOpen size={65} className="text-purple-300" />
        </FloatingIcon>
      </div>

      {/* Logo */}
      <Link to={"/"}>
      <div className="absolute top-8 left-8 flex items-center gap-2 animate-fadeIn">
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-2 rounded-xl shadow-lg">
          <GraduationCap className="text-white" size={28} />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          Learnex
        </span>
      </div>
      </Link>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-2xl animate-fadeIn">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-20"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Create Student Account</h1>
              <p className="text-purple-100">Join thousands of learners on Learnex</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Student Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              {/* Student Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                  <input
                    type="email"
                    name="studentEmail"
                    value={formData.studentEmail}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="student@example.com"
                    required
                  />
                </div>
              </div>

              {/* Parent Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Parent Email ID
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                  <input
                    type="email"
                    name="parentEmail"
                    value={formData.parentEmail}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="parent@example.com"
                    required
                  />
                </div>
              </div>

              {/* Student Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Student Phone No
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="+91 12345 67890"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Standard */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Standard
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                <select
                  name="standard"
                  value={formData.standard}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors appearance-none bg-white"
                  required
                >
                  <option value="">Select your standard</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Enter password"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-500 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] mt-6"
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to={`/stdlogin`} className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 text-sm text-gray-600">
          By signing up, you agree to our{' '}
          <a href="#terms" className="text-purple-600 hover:text-purple-700">Terms of Service</a>
          {' '}and{' '}
          <a href="#privacy" className="text-purple-600 hover:text-purple-700">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}