import React, { useState } from 'react';
import { GraduationCap, BookOpen, Library, MessageCircleQuestion, Bell, Award, LogOut, Search, Filter, Star, Users, Clock, TrendingUp, Flame, Trophy, Sparkles, ChevronDown, X } from 'lucide-react';
import StudentNavbar from './StudentNavbar';
import { Link } from 'react-router-dom';

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    subject: '',
    difficulty: '',
    duration: '',
    language: '',
    instructor: '',
    rating: ''
  });

  const searchSuggestions = [
    'Python for Beginners',
    'Advanced Python Projects',
    'Data Science with Python',
    'Python Web Development',
    'Machine Learning with Python'
  ];

  const featuredSections = [
    { id: 'trending', title: '🔥 Trending Now', icon: Flame },
    { id: 'enrolled', title: 'Most Enrolled', icon: Users },
    { id: 'editors', title: "Editor's Picks", icon: Trophy },
    { id: 'new', title: 'Newly Launched', icon: Sparkles }
  ];

  const courses = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
      title: 'Python for Beginners',
      instructor: 'Dr. ',
      description: 'Learn Python from scratch with hands-on projects and real-world examples.',
      rating: 4.8,
      students: 12500,
      duration: '8 weeks',
      level: 'Beginner',
      category: 'trending'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      title: 'Data Science Masterclass',
      instructor: 'Prof. Michael Chen',
      description: 'Master data analysis, visualization, and machine learning techniques.',
      rating: 4.9,
      students: 8900,
      duration: '12 weeks',
      level: 'Advanced',
      category: 'enrolled'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      title: 'Web Development Bootcamp',
      instructor: 'Emily Rodriguez',
      description: 'Build modern websites with HTML, CSS, JavaScript, and React.',
      rating: 4.7,
      students: 15200,
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'editors'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400',
      title: 'Mobile App Development',
      instructor: 'James Williams',
      description: 'Create stunning mobile apps for iOS and Android platforms.',
      rating: 4.6,
      students: 6700,
      duration: '14 weeks',
      level: 'Intermediate',
      category: 'new'
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400',
      title: 'Artificial Intelligence Fundamentals',
      instructor: 'Dr. Alan Turing',
      description: 'Explore AI concepts, neural networks, and deep learning basics.',
      rating: 4.9,
      students: 9300,
      duration: '16 weeks',
      level: 'Advanced',
      category: 'trending'
    },
    {
      id: 6,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      title: 'Digital Marketing Pro',
      instructor: 'Lisa Anderson',
      description: 'Master SEO, social media marketing, and content strategy.',
      rating: 4.5,
      students: 11000,
      duration: '6 weeks',
      level: 'Beginner',
      category: 'enrolled'
    }
  ];

  const filterOptions = {
    subject: ['All Subjects', 'Programming', 'Data Science', 'Web Development', 'Mobile Development', 'AI & ML', 'Marketing'],
    difficulty: ['All Levels', 'Beginner', 'Intermediate', 'Advanced'],
    duration: ['Any Duration', 'Short (0-6 weeks)', 'Medium (6-12 weeks)', 'Long (12+ weeks)'],
    language: ['All Languages', 'English', 'Spanish', 'Hindi', 'Mandarin', 'French'],
    instructor: ['All Instructors', 'Dr. Sarah Johnson', 'Prof. Michael Chen', 'Emily Rodriguez', 'James Williams'],
    rating: ['All Ratings', '4.5+ Stars', '4.0+ Stars', '3.5+ Stars']
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const clearFilters = () => {
    setFilters({
      subject: '',
      difficulty: '',
      duration: '',
      language: '',
      instructor: '',
      rating: ''
    });
  };

  const filteredSuggestions = searchQuery 
    ? searchSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

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
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Navbar */}
        <StudentNavbar/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Explore Courses</h1>
          <p className="text-gray-600 text-lg">Discover your next learning adventure from thousands of courses</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 animate-fadeIn">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for courses (e.g., Python, Data Science, Web Development...)"
              className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors text-lg shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fadeIn">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(suggestion)}
                  className="w-full px-6 py-3 text-left hover:bg-purple-50 transition-colors flex items-center gap-3 border-b border-gray-100 last:border-b-0"
                >
                  <Search size={16} className="text-purple-600" />
                  <span className="text-gray-700">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-purple-500"
          >
            <Filter size={20} className="text-purple-600" />
            <span className="font-semibold text-gray-800">Filters</span>
            <ChevronDown size={18} className={`text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {showFilters && (
            <div className="mt-4 bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Filter Courses</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(filterOptions).map(([filterType, options]) => (
                  <div key={filterType}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                      {filterType}
                    </label>
                    <select
                      value={filters[filterType]}
                      onChange={(e) => handleFilterChange(filterType, e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    >
                      {options.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Featured Sections */}
        {featuredSections.map((section) => {
          const Icon = section.icon;
          const sectionCourses = courses.filter(c => c.category === section.id);

          return (
            <div key={section.id} className="mb-12 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <Icon className="text-purple-600" size={32} />
                <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectionCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-purple-600">
                        {course.level}
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">By {course.instructor}</p>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-500 fill-yellow-500" size={16} />
                          <span className="font-semibold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users size={16} />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{course.duration}</span>
                        </div>
                      </div>

                      <Link to={`/${localStorage.getItem("userEmail")}/courses/details`} className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}