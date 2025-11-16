import React, { useState, useEffect } from 'react';
import { 
  User, BookOpen, Users, Star, MessageCircle, TrendingUp, DollarSign, 
  Award, Bell, Settings, Video, FileText, BarChart3, Calendar, 
  Upload, Edit, Eye, CheckCircle, Clock, Mail, Globe, Github, Linkedin,
  MessageSquare, Flag, Shield, Download, Plus, Search, Filter, 
  ChevronRight, Play, Pause, MoreVertical, Target, Zap, Heart,
  ArrowRight, Sparkles, GraduationCap, ClipboardCheck, AlertCircle, LogOut
} from 'lucide-react';

export default function InstructorPage() {
  const [viewMode, setViewMode] = useState('dashboard'); // 'dashboard' or 'profile'
  const [activeTab, setActiveTab] = useState('overview');
  const [notificationCount] = useState(5);
  const [teacherId, setTeacherId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for teacher ID in localStorage on component mount
  useEffect(() => {
    const storedTeacherId = localStorage.getItem('teacherId');
    if (storedTeacherId) {
      setTeacherId(storedTeacherId);
      setIsLoggedIn(true);
    }
  }, []);

  // Simulate login function (you can call this after successful login)
  const handleLogin = (id) => {
    localStorage.setItem('teacherId', id);
    setTeacherId(id);
    setIsLoggedIn(true);
    console.log('Teacher logged in with ID:', id);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('teacherId');
    setTeacherId(null);
    setIsLoggedIn(false);
    console.log('Teacher logged out');
    alert('You have been logged out successfully!');
    // You can redirect to login page here if needed
    // window.location.href = '/login';
  };

  // Sample instructor data
  const instructorData = {
    name: "Dr. Priya Sharma",
    title: "AI/ML Engineer & Data Scientist",
    headline: "Transforming complex AI concepts into practical skills for 50,000+ students worldwide",
    avatar: "PS",
    rating: 4.8,
    totalStudents: 52340,
    totalCourses: 15,
    avgResponseTime: "2 hours",
    followers: 12500,
    bio: "With over 15 years of experience in AI and Machine Learning, I've worked with leading tech companies and now focus on making advanced technology accessible to everyone. My teaching philosophy centers on practical, project-based learning that prepares students for real-world challenges.",
    languages: ["English", "Hindi", "Bengali"],
    credentials: ["PhD in Computer Science - MIT", "Microsoft Certified Azure AI Engineer", "Google Cloud ML Engineer"],
    social: {
      linkedin: "linkedin.com/in/priyasharma",
      website: "priyasharma.tech",
      github: "github.com/drpriyasharma"
    },
    stats: {
      totalEnrollments: 52340,
      enrollmentsLast30d: 1240,
      revenue: 145230,
      avgRating: 4.8,
      activeStudents: 8450,
      newMessages: 23,
      pendingDoubts: 45
    }
  };

  const dashboardCards = [
    {
      title: 'Total Enrollments',
      value: '52,340',
      change: '+1,240 this month',
      icon: Users,
      color: 'from-blue-500 to-blue-700',
      trend: 'up'
    },
    {
      title: 'Revenue',
      value: '₹14.5L',
      change: '+₹45K this month',
      icon: DollarSign,
      color: 'from-green-500 to-green-700',
      trend: 'up'
    },
    {
      title: 'Average Rating',
      value: '4.8',
      change: '+0.2 from last month',
      icon: Star,
      color: 'from-yellow-500 to-yellow-700',
      trend: 'up'
    },
    {
      title: 'Active Students',
      value: '8,450',
      change: '67% engagement rate',
      icon: Target,
      color: 'from-purple-500 to-purple-700',
      trend: 'up'
    }
  ];

  const quickActions = [
    { id: 'create', label: 'Create Course', icon: Plus, color: 'purple' },
    { id: 'edit', label: 'Edit Courses', icon: Edit, color: 'blue' },
    { id: 'doubts', label: 'Answer Doubts', icon: MessageCircle, color: 'orange', badge: 45 },
    { id: 'assignments', label: 'Grade Work', icon: ClipboardCheck, color: 'green', badge: 12 },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'indigo' },
    { id: 'schedule', label: 'Live Classes', icon: Video, color: 'red' }
  ];

  const recentCourses = [
    { id: 1, title: 'Machine Learning Fundamentals', students: 8450, rating: 4.9, revenue: 45000, status: 'published' },
    { id: 2, title: 'Deep Learning with PyTorch', students: 6230, rating: 4.8, revenue: 38000, status: 'published' },
    { id: 3, title: 'Natural Language Processing', students: 4120, rating: 4.7, revenue: 28000, status: 'published' },
    { id: 4, title: 'Computer Vision Mastery', students: 3890, rating: 4.9, revenue: 25000, status: 'draft' }
  ];

  const recentReviews = [
    { id: 1, student: 'Rahul Kumar', rating: 5, comment: 'Best ML course I have ever taken! Dr. Sharma explains complex concepts so clearly.', course: 'Machine Learning Fundamentals', date: '2 days ago' },
    { id: 2, student: 'Anita Patel', rating: 5, comment: 'Practical projects and excellent support. Highly recommend!', course: 'Deep Learning with PyTorch', date: '5 days ago' },
    { id: 3, student: 'Vikram Singh', rating: 4, comment: 'Great content, would love more advanced topics in future modules.', course: 'NLP Course', date: '1 week ago' }
  ];

  const renderPublicProfile = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 shimmer"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-purple-700 text-4xl font-bold shadow-2xl">
                {instructorData.avatar}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2">
                <Award className="text-purple-700" size={24} />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Shield className="text-yellow-300" size={20} />
                <span className="text-yellow-300 text-sm font-semibold">Verified Instructor</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{instructorData.name}</h1>
              <p className="text-xl text-purple-100 mb-4">{instructorData.title}</p>
              <p className="text-lg text-purple-50 mb-6 max-w-3xl">{instructorData.headline}</p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{instructorData.totalStudents.toLocaleString()}</div>
                  <div className="text-sm text-purple-200">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{instructorData.totalCourses}</div>
                  <div className="text-sm text-purple-200">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold flex items-center justify-center gap-1">
                    <Star size={20} fill="currentColor" />
                    {instructorData.rating}
                  </div>
                  <div className="text-sm text-purple-200">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{instructorData.avgResponseTime}</div>
                  <div className="text-sm text-purple-200">Response Time</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="bg-white text-purple-700 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center gap-2 shadow-lg">
                  <Heart size={20} />
                  Follow Instructor
                </button>
                <button className="bg-purple-500 bg-opacity-30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-40 transition-all duration-300 flex items-center gap-2 border border-white border-opacity-30">
                  <MessageSquare size={20} />
                  Send Message
                </button>
                <button className="bg-purple-500 bg-opacity-30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-40 transition-all duration-300 flex items-center gap-2 border border-white border-opacity-30">
                  <BookOpen size={20} />
                  View All Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User size={24} className="text-purple-600" />
              About
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">{instructorData.bio}</p>
            
            <h3 className="text-lg font-bold text-gray-800 mb-3">Credentials</h3>
            <div className="space-y-2">
              {instructorData.credentials.map((cred, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle size={18} className="text-green-500" />
                  <span>{cred}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Reviews */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Star size={24} className="text-purple-600" />
              Top Reviews
            </h2>
            <div className="space-y-6">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-800">{review.student}</div>
                      <div className="text-sm text-gray-500">{review.course}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Languages */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Globe size={20} className="text-purple-600" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {instructorData.languages.map((lang, index) => (
                <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Connect</h3>
            <div className="space-y-3">
              <a href={`https://${instructorData.social.linkedin}`} className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors">
                <Linkedin size={20} />
                <span className="text-sm">LinkedIn</span>
              </a>
              <a href={`https://${instructorData.social.website}`} className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors">
                <Globe size={20} />
                <span className="text-sm">Website</span>
              </a>
              <a href={`https://${instructorData.social.github}`} className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors">
                <Github size={20} />
                <span className="text-sm">GitHub</span>
              </a>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-2">Have Questions?</h3>
            <p className="text-sm text-purple-100 mb-4">Get in touch and I'll respond within {instructorData.avgResponseTime}</p>
            <button className="w-full bg-white text-purple-700 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 shimmer"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-yellow-300" size={24} />
              <p className="text-purple-200">Welcome back,</p>
            </div>
            <h1 className="text-4xl font-bold mb-2">{instructorData.name}</h1>
            <p className="text-purple-100">Here's what's happening with your courses today</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className={`bg-gradient-to-br ${card.color} p-3 rounded-xl w-fit mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <div className="text-sm text-gray-600 mb-1">{card.title}</div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{card.value}</div>
              <div className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp size={14} />
                {card.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Zap className="text-purple-600" size={28} />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const colorMap = {
              purple: 'from-purple-500 to-purple-700',
              blue: 'from-blue-500 to-blue-700',
              orange: 'from-orange-500 to-orange-700',
              green: 'from-green-500 to-green-700',
              indigo: 'from-indigo-500 to-indigo-700',
              red: 'from-red-500 to-red-700'
            };
            return (
              <button
                key={action.id}
                className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative group"
              >
                {action.badge && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {action.badge}
                  </div>
                )}
                <div className={`bg-gradient-to-br ${colorMap[action.color]} p-3 rounded-lg mb-3 mx-auto w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-sm font-semibold text-gray-800">{action.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Courses Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6 text-white flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <BookOpen size={24} />
                  Your Courses
                </h2>
                <p className="text-purple-100 text-sm mt-1">Manage and track your course performance</p>
              </div>
              <button className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all duration-300 flex items-center gap-2">
                <Plus size={18} />
                New Course
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {course.students.toLocaleString()} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={14} />
                            ₹{course.revenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === 'published' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {course.status}
                        </span>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                        <Edit size={16} />
                        Edit
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                        <BarChart3 size={16} />
                        Analytics
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                        <Eye size={16} />
                        Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Star size={24} className="text-purple-600" />
                Recent Reviews
              </h2>
              <button className="text-purple-600 text-sm font-semibold hover:text-purple-700 flex items-center gap-1">
                View All
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-gray-800">{review.student}</div>
                      <div className="text-xs text-gray-500">{review.course} • {review.date}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                  <button className="text-xs text-purple-600 font-semibold hover:text-purple-700">
                    Respond to review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="text-orange-500" size={20} />
              Pending Tasks
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <div className="text-sm font-semibold text-gray-800">Answer Doubts</div>
                  <div className="text-xs text-gray-600">45 pending questions</div>
                </div>
                <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  45
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <div className="text-sm font-semibold text-gray-800">Grade Assignments</div>
                  <div className="text-xs text-gray-600">12 submissions</div>
                </div>
                <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  12
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <div className="text-sm font-semibold text-gray-800">New Messages</div>
                  <div className="text-xs text-gray-600">23 unread</div>
                </div>
                <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                  23
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Live Classes */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-purple-600" size={20} />
              Upcoming Classes
            </h3>
            <div className="space-y-3">
              <div className="border-l-4 border-purple-600 pl-3 py-2">
                <div className="text-sm font-semibold text-gray-800">ML Fundamentals Q&A</div>
                <div className="text-xs text-gray-600">Today, 5:00 PM</div>
              </div>
              <div className="border-l-4 border-blue-600 pl-3 py-2">
                <div className="text-sm font-semibold text-gray-800">Deep Learning Workshop</div>
                <div className="text-xs text-gray-600">Tomorrow, 3:00 PM</div>
              </div>
            </div>
            <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold">
              Schedule New Class
            </button>
          </div>

          {/* Earnings */}
          <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
              <DollarSign size={20} />
              This Month's Earnings
            </h3>
            <div className="text-3xl font-bold mb-1">₹45,230</div>
            <div className="text-sm text-green-100 mb-4">+18% from last month</div>
            <button className="w-full bg-white text-green-700 py-2 rounded-lg hover:bg-green-50 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
              <Download size={16} />
              Request Payout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Top Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-2 rounded-xl">
                <GraduationCap className="text-white" size={28} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Learnex
              </span>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 rounded-xl p-1 flex gap-1">
                <button
                  onClick={() => setViewMode('dashboard')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    viewMode === 'dashboard'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setViewMode('profile')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    viewMode === 'profile'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  Public Profile
                </button>
              </div>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={24} className="text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Settings */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={24} className="text-gray-600" />
              </button>

              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Login Button (for testing) - Remove in production */}
      {!isLoggedIn && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 m-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-800 font-semibold">Demo Mode: Not logged in</p>
              <p className="text-yellow-700 text-sm">Click the button to simulate login (Teacher ID will be saved to localStorage)</p>
            </div>
            <button
              onClick={() => handleLogin('TCHR123456')}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Simulate Login
            </button>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div className="bg-green-100 border-l-4 border-green-500 p-4 m-4 rounded-lg">
          <p className="text-green-800 font-semibold">✓ Logged in as Teacher ID: {teacherId}</p>
          <p className="text-green-700 text-sm">Teacher ID is stored in localStorage</p>
        </div>
      )}

      {/* Main Content */}
      {viewMode === 'dashboard' ? renderDashboard() : renderPublicProfile()}
    </div>
  );
}