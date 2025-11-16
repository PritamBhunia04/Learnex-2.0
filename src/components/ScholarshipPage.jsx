import React, { useState } from 'react';
import { GraduationCap, BookOpen, Library, MessageCircleQuestion, Bell, Award, LogOut, Search, Filter, Star, Users, Clock, TrendingUp, Flame, Trophy, Sparkles, ChevronDown, X, Calendar, DollarSign, FileText, Upload, CheckCircle, XCircle, AlertCircle, Download, Share2, Mail, Phone, MapPin, Edit, Eye, Plus, Target, Heart, Zap, Gift } from 'lucide-react';
import StudentNavbar from './StudentNavbar';

export default function ScholarshipPage() {
  const [activeTab, setActiveTab] = useState('scholarships');
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    amount: '',
    deadline: ''
  });

  const [applicationForm, setApplicationForm] = useState({
    fullName: 'John Doe',
    email: 'john.doe@student.learnex.edu',
    phone: '',
    rollNumber: '',
    semester: '',
    cgpa: '',
    attendance: '',
    statement: '',
    declaration: false
  });

  const scholarshipCategories = [
    { id: 'merit', name: 'Merit-Based', icon: Trophy, color: 'from-yellow-500 to-orange-500', count: 8 },
    { id: 'need', name: 'Need-Based', icon: Heart, color: 'from-pink-500 to-red-500', count: 5 },
    { id: 'performance', name: 'Performance-Based', icon: Target, color: 'from-blue-500 to-indigo-500', count: 6 },
    { id: 'course', name: 'Course-Specific', icon: BookOpen, color: 'from-green-500 to-teal-500', count: 7 },
    { id: 'community', name: 'Community Awards', icon: Users, color: 'from-purple-500 to-pink-500', count: 4 }
  ];

  const scholarships = [
    {
      id: 1,
      title: 'Academic Excellence Scholarship 2025',
      category: 'merit',
      description: 'Recognizing outstanding academic achievement and dedication to learning.',
      shortDesc: 'For students with exceptional CGPA (9.0+)',
      amount: '₹5,000',
      deadline: '2025-12-15',
      status: 'active',
      eligibility: ['CGPA ≥ 9.0', 'Minimum 85% attendance', 'No backlogs'],
      documents: ['Transcript', 'ID Proof', 'Recommendation Letter'],
      perks: ['Full tuition coverage', 'Certificate of Excellence', 'Mentorship program'],
      applicants: 245,
      selected: 10,
      fullDescription: 'This prestigious scholarship aims to reward students who demonstrate exceptional academic performance and commitment to their studies. Recipients will receive comprehensive support for their educational journey.',
      selectionProcess: 'Applications are evaluated based on CGPA, attendance records, extracurricular activities, and a personal statement. Top candidates will be interviewed by the scholarship committee.',
      contact: 'scholarships@learnex.edu'
    },
    {
      id: 2,
      title: 'Future Innovators Grant',
      category: 'performance',
      description: 'Supporting students who excel in competitive assessments and projects.',
      shortDesc: 'Based on quiz rankings and project scores',
      amount: '₹3,500',
      deadline: '2025-11-30',
      status: 'active',
      eligibility: ['Top 50 in platform leaderboard', 'Completed 5+ projects', 'Active participation'],
      documents: ['Portfolio', 'Project Reports', 'Performance Certificate'],
      perks: ['Cash award', 'Industry internship opportunity', 'Research funding'],
      applicants: 189,
      selected: 15,
      fullDescription: 'Designed for innovative thinkers who consistently perform well in assessments and demonstrate practical application of knowledge through projects.',
      selectionProcess: 'Based on leaderboard rankings, project quality, peer reviews, and innovation potential.',
      contact: 'innovation@learnex.edu'
    },
    {
      id: 3,
      title: 'Financial Aid Support Program',
      category: 'need',
      description: 'Providing financial assistance to deserving students facing economic challenges.',
      shortDesc: 'Need-based financial support',
      amount: '₹4,000',
      deadline: '2025-12-01',
      status: 'active',
      eligibility: ['Family income criteria', 'Good academic standing (CGPA ≥ 7.0)', 'Financial need proof'],
      documents: ['Income Certificate', 'Bank Statements', 'Academic Records'],
      perks: ['Tuition assistance', 'Book allowance', 'Monthly stipend'],
      applicants: 312,
      selected: 20,
      fullDescription: 'This program ensures that financial constraints do not hinder talented students from pursuing their educational goals.',
      selectionProcess: 'Applications reviewed by financial aid committee considering family income, academic performance, and genuine financial need.',
      contact: 'financialaid@learnex.edu'
    },
    {
      id: 4,
      title: 'Data Science Excellence Award',
      category: 'course',
      description: 'Exclusive scholarship for top performers in Data Science courses.',
      shortDesc: 'For Data Science course toppers',
      amount: '₹2,500',
      deadline: '2026-01-15',
      status: 'upcoming',
      eligibility: ['Enrolled in Data Science program', 'Course completion rate ≥ 90%', 'Final project score ≥ 95%'],
      documents: ['Course Certificate', 'Project Documentation', 'Instructor Recommendation'],
      perks: ['Certificate', 'Industry networking event access', 'Premium course access'],
      applicants: 0,
      selected: 5,
      fullDescription: 'Celebrating excellence in the field of Data Science and encouraging specialization in this high-demand domain.',
      selectionProcess: 'Based on course grades, project quality, and contribution to course discussions.',
      contact: 'datascience@learnex.edu'
    },
    {
      id: 5,
      title: 'Community Champion Award',
      category: 'community',
      description: 'Honoring students who actively contribute to the learning community.',
      shortDesc: 'For peer mentors and helpful contributors',
      amount: '₹1,500',
      deadline: '2025-11-25',
      status: 'active',
      eligibility: ['Helped 20+ peers', 'Active in forums', 'Positive feedback rating'],
      documents: ['Community Contribution Report', 'Peer Testimonials'],
      perks: ['Recognition badge', 'Featured on platform', 'Mentor certification'],
      applicants: 156,
      selected: 8,
      fullDescription: 'Recognizing students who embody the spirit of collaborative learning and support their peers.',
      selectionProcess: 'Evaluated based on forum activity, peer ratings, quality of help provided, and community impact.',
      contact: 'community@learnex.edu'
    },
    {
      id: 6,
      title: 'Women in Tech Scholarship',
      category: 'merit',
      description: 'Empowering female students pursuing technology education.',
      shortDesc: 'Supporting women in technology fields',
      amount: '₹4,500',
      deadline: '2025-12-10',
      status: 'active',
      eligibility: ['Female students', 'CGPA ≥ 8.5', 'Tech-related courses'],
      documents: ['Academic Transcript', 'Statement of Purpose', 'ID Proof'],
      perks: ['Full scholarship', 'Mentorship', 'Networking events'],
      applicants: 198,
      selected: 12,
      fullDescription: 'Promoting diversity and inclusion in technology by supporting talented female students.',
      selectionProcess: 'Academic merit, leadership potential, and commitment to technology field.',
      contact: 'diversity@learnex.edu'
    }
  ];

  const myApplications = [
    {
      id: 1,
      scholarshipName: 'Academic Excellence Scholarship 2025',
      appliedDate: '2025-10-15',
      status: 'under_review',
      lastUpdated: '2025-10-28'
    },
    {
      id: 2,
      scholarshipName: 'Future Innovators Grant',
      appliedDate: '2025-10-20',
      status: 'approved',
      lastUpdated: '2025-11-01'
    },
    {
      id: 3,
      scholarshipName: 'Community Champion Award',
      appliedDate: '2025-10-10',
      status: 'pending',
      lastUpdated: '2025-10-10'
    }
  ];

  const results = [
    {
      id: 1,
      scholarshipName: 'Future Innovators Grant',
      studentName: 'John Doe',
      award: '₹3,500',
      date: '2025-11-01',
      certificate: true
    },
    {
      id: 2,
      scholarshipName: 'Community Champion Award',
      studentName: 'Sarah Johnson',
      award: '₹1,500',
      date: '2025-10-28',
      certificate: true
    }
  ];

  const faqs = [
    {
      question: 'Who can apply for scholarships?',
      answer: 'All enrolled students who meet the specific eligibility criteria for each scholarship can apply. Requirements vary by scholarship type.'
    },
    {
      question: 'How are scholarship recipients selected?',
      answer: 'Selection is based on a combination of academic performance, eligibility criteria, submitted documents, and evaluation by the scholarship committee. Some scholarships may also require interviews.'
    },
    {
      question: 'Can I apply for multiple scholarships?',
      answer: 'Yes, you can apply for multiple scholarships as long as you meet the eligibility criteria for each. However, you may only receive one major scholarship per academic year.'
    },
    {
      question: 'What documents do I need to submit?',
      answer: 'Required documents vary by scholarship but typically include transcripts, ID proof, recommendation letters, and specific certificates. Check each scholarship\'s requirements carefully.'
    },
    {
      question: 'How will I be notified about my application status?',
      answer: 'You will receive email notifications for all status updates. You can also track your application status in the "My Applications" section.'
    },
    {
      question: 'What happens after I\'m selected?',
      answer: 'Selected candidates will receive an award letter via email and can download their certificate from the platform. Awards are disbursed according to the scholarship terms.'
    }
  ];

  const filterOptions = {
    category: ['All Categories', 'Merit-Based', 'Need-Based', 'Performance-Based', 'Course-Specific', 'Community Awards'],
    status: ['All Status', 'Active', 'Upcoming', 'Closed'],
    amount: ['Any Amount', '₹1,000 - ₹2,000', '₹2,000 - ₹4,000', '₹4,000+'],
    deadline: ['Any Deadline', 'This Month', 'Next Month', 'This Quarter']
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved': return <CheckCircle className="text-green-500" size={20} />;
      case 'rejected': return <XCircle className="text-red-500" size={20} />;
      case 'under_review': return <Clock className="text-blue-500" size={20} />;
      default: return <AlertCircle className="text-yellow-500" size={20} />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'under_review': return 'Under Review';
      default: return 'Pending Review';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'under_review': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      status: '',
      amount: '',
      deadline: ''
    });
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    alert('Application submitted successfully! You will receive a confirmation email shortly.');
    setShowApplicationForm(false);
    setSelectedScholarship(null);
  };

  const handleInputChange = (field, value) => {
    setApplicationForm({ ...applicationForm, [field]: value });
  };

  const filteredScholarships = scholarships.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.5s ease-out forwards; }
      `}</style>

      {/* Navbar */}
      <StudentNavbar/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Award className="text-purple-600" size={40} />
            Scholarship Portal
          </h1>
          <p className="text-gray-600 text-lg">Unlock opportunities for financial support and recognition</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-2 flex gap-2 animate-fadeIn">
          {[
            { id: 'overview', label: 'Active Scholarships', icon: Sparkles },
            { id: 'applications', label: 'My Applications', icon: FileText },
            { id: 'results', label: 'Results', icon: Trophy },
            { id: 'faqs', label: 'FAQs & Help', icon: MessageCircleQuestion }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSection(tab.id);
                  setSelectedScholarship(null);
                  setShowApplicationForm(false);
                }}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-purple-50'
                }`}
              >
                <Icon size={20} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* OVERVIEW SECTION */}
        {activeSection === 'overview' && !selectedScholarship && !showApplicationForm && (
          <>
            {/* Search Bar */}
            <div className="mb-8 animate-fadeIn">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search scholarships by name, category, or keywords..."
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
            </div>

            {/* Category Cards */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {scholarshipCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <div
                      key={cat.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group"
                    >
                      <div className={`bg-gradient-to-br ${cat.color} p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="text-white" size={32} />
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1">{cat.name}</h3>
                      <p className="text-sm text-gray-500">{cat.count} scholarships</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Filters */}
            <div className="mb-8">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-purple-500"
              >
                <Filter size={20} className="text-purple-600" />
                <span className="font-semibold text-gray-800">Advanced Filters</span>
                <ChevronDown size={18} className={`text-gray-600 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              {showFilters && (
                <div className="mt-4 bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Filter Scholarships</h3>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
                    >
                      Clear All
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

            {/* Scholarship Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredScholarships.map((scholarship) => {
                const categoryData = scholarshipCategories.find(c => c.id === scholarship.category);
                const Icon = categoryData?.icon || Award;
                
                return (
                  <div
                    key={scholarship.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className={`bg-gradient-to-br ${categoryData?.color || 'from-purple-500 to-purple-700'} p-6 relative`}>
                      <div className="flex items-start justify-between mb-4">
                        <Icon className="text-white" size={32} />
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          scholarship.status === 'active' ? 'bg-green-500 text-white' :
                          scholarship.status === 'upcoming' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {scholarship.status.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{scholarship.title}</h3>
                      <p className="text-white text-opacity-90 text-sm">{scholarship.shortDesc}</p>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="text-green-600" size={20} />
                          <span className="text-2xl font-bold text-gray-800">{scholarship.amount}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Users size={16} />
                          <span>{scholarship.applicants} applied</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Calendar size={16} />
                        <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2 font-semibold">Eligibility:</p>
                        <div className="flex flex-wrap gap-2">
                          {scholarship.eligibility.slice(0, 2).map((criteria, index) => (
                            <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs">
                              {criteria}
                            </span>
                          ))}
                          {scholarship.eligibility.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                              +{scholarship.eligibility.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedScholarship(scholarship)}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                      >
                        View Details & Apply
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* SCHOLARSHIP DETAILS PAGE */}
        {selectedScholarship && !showApplicationForm && (
          <div className="animate-fadeIn">
            <button
              onClick={() => setSelectedScholarship(null)}
              className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              <ChevronDown size={20} className="rotate-90" />
              Back to Scholarships
            </button>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className={`bg-gradient-to-br ${scholarshipCategories.find(c => c.id === selectedScholarship.category)?.color || 'from-purple-500 to-purple-700'} p-8`}>
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl font-bold text-white">{selectedScholarship.title}</h1>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    selectedScholarship.status === 'active' ? 'bg-green-500 text-white' :
                    selectedScholarship.status === 'upcoming' ? 'bg-blue-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {selectedScholarship.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-white text-opacity-90 text-lg">{selectedScholarship.description}</p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 p-6 rounded-xl">
                    <DollarSign className="text-green-600 mb-2" size={32} />
                    <p className="text-sm text-gray-600 mb-1">Award Amount</p>
                    <p className="text-2xl font-bold text-gray-800">{selectedScholarship.amount}</p>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <Calendar className="text-blue-600 mb-2" size={32} />
                    <p className="text-sm text-gray-600 mb-1">Application Deadline</p>
                    <p className="text-xl font-bold text-gray-800">{new Date(selectedScholarship.deadline).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <Users className="text-purple-600 mb-2" size={32} />
                    <p className="text-sm text-gray-600 mb-1">Applicants / Selected</p>
                    <p className="text-xl font-bold text-gray-800">{selectedScholarship.applicants} / {selectedScholarship.selected}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Full Description</h2>
                    <p className="text-gray-600 leading-relaxed">{selectedScholarship.fullDescription}</p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
                    <ul className="space-y-2">
                      {selectedScholarship.eligibility.map((criteria, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Required Documents</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedScholarship.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                          <FileText className="text-purple-600" size={20} />
                          <span className="text-gray-700">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits & Perks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedScholarship.perks.map((perk, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                          <Gift className="text-purple-600" size={20} />
                          <span className="text-gray-700">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Selection Process</h2>
                    <p className="text-gray-600 leading-relaxed">{selectedScholarship.selectionProcess}</p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Mail className="text-blue-600" size={24} />
                      Contact Information
                    </h2>
                    <p className="text-gray-600">For queries about this scholarship, contact: <a href={`mailto:${selectedScholarship.contact}`} className="text-purple-600 hover:text-purple-700 font-semibold">{selectedScholarship.contact}</a></p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <FileText size={24} />
                    Apply Now
                  </button>
                  <button className="px-6 py-4 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all duration-300">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* APPLICATION FORM */}
        {showApplicationForm && selectedScholarship && (
          <div className="animate-fadeIn">
            <button
              onClick={() => setShowApplicationForm(false)}
              className="mb-6 flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              <ChevronDown size={20} className="rotate-90" />
              Back to Details
            </button>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Application Form</h1>
              <p className="text-gray-600 mb-6">Fill in all required fields to submit your application for <span className="font-semibold text-purple-600">{selectedScholarship.title}</span></p>

              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={applicationForm.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={applicationForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={applicationForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Roll Number / Student ID *
                    </label>
                    <input
                      type="text"
                      value={applicationForm.rollNumber}
                      onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Semester / Year *
                    </label>
                    <select
                      value={applicationForm.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">Select Semester</option>
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      <option value="3">Semester 3</option>
                      <option value="4">Semester 4</option>
                      <option value="5">Semester 5</option>
                      <option value="6">Semester 6</option>
                      <option value="7">Semester 7</option>
                      <option value="8">Semester 8</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      CGPA / Percentage *
                    </label>
                    <input
                      type="text"
                      value={applicationForm.cgpa}
                      onChange={(e) => handleInputChange('cgpa', e.target.value)}
                      placeholder="e.g., 9.2 or 85%"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Attendance Record (%)
                    </label>
                    <input
                      type="text"
                      value={applicationForm.attendance}
                      onChange={(e) => handleInputChange('attendance', e.target.value)}
                      placeholder="e.g., 92%"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Statement of Purpose / Justification *
                  </label>
                  <textarea
                    value={applicationForm.statement}
                    onChange={(e) => handleInputChange('statement', e.target.value)}
                    placeholder="Explain why you are applying for this scholarship and how it will help you..."
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Upload Required Documents *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedScholarship.documents.map((doc, index) => (
                      <div key={index} className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-purple-500 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="text-purple-600" size={32} />
                          <p className="text-sm font-semibold text-gray-700">{doc}</p>
                          <p className="text-xs text-gray-500">Click to upload or drag and drop</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl flex items-start gap-3">
                  <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                  <p className="text-sm text-gray-700">
                    Supported formats: PDF, JPG, PNG. Maximum file size: 5MB per document.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={applicationForm.declaration}
                    onChange={(e) => handleInputChange('declaration', e.target.checked)}
                    className="mt-1"
                    required
                  />
                  <label className="text-sm text-gray-700">
                    I hereby declare that all the information provided above is true and accurate to the best of my knowledge. I understand that any false information may lead to disqualification.
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300"
                  >
                    Save Draft
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MY APPLICATIONS SECTION */}
        {activeSection === 'applications' && (
          <div className="animate-fadeIn">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">My Applications</h2>
              <div className="flex gap-2">
                {['all', 'pending', 'approved', 'rejected'].map((status) => (
                  <button
                    key={status}
                    className="px-4 py-2 rounded-lg font-semibold text-sm bg-white border-2 border-gray-200 hover:border-purple-500 transition-colors capitalize"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {myApplications.map((app) => (
                <div key={app.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{app.scholarshipName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>Updated: {new Date(app.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getStatusColor(app.status)}`}>
                      {getStatusIcon(app.status)}
                      <span className="font-semibold text-sm">{getStatusText(app.status)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors flex items-center gap-2">
                      <Eye size={18} />
                      View Details
                    </button>
                    {app.status === 'pending' && (
                      <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                        <Edit size={18} />
                        Edit Application
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS SECTION */}
        {activeSection === 'results' && (
          <div className="animate-fadeIn">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Scholarship Results</h2>
              <p className="text-gray-600">Congratulations to all the selected candidates!</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Scholarship Name</th>
                      <th className="px-6 py-4 text-left font-bold">Student Name</th>
                      <th className="px-6 py-4 text-left font-bold">Award Amount</th>
                      <th className="px-6 py-4 text-left font-bold">Announcement Date</th>
                      <th className="px-6 py-4 text-left font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result, index) => (
                      <tr key={result.id} className={`border-b border-gray-100 hover:bg-purple-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-6 py-4 font-semibold text-gray-800">{result.scholarshipName}</td>
                        <td className="px-6 py-4 text-gray-700">{result.studentName}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                            {result.award}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{new Date(result.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors" title="Download Certificate">
                              <Download size={18} />
                            </button>
                            <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors" title="Share Achievement">
                              <Share2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <Trophy size={48} className="flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                  <p className="text-white text-opacity-90 mb-4">
                    You have been selected for the Future Innovators Grant. Your award letter and certificate are now available for download.
                  </p>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                      <Download size={20} />
                      Download Award Letter
                    </button>
                    <button className="px-6 py-3 bg-purple-800 text-white rounded-xl font-bold hover:bg-purple-900 transition-all duration-300 flex items-center gap-2">
                      <Share2 size={20} />
                      Share on LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQS SECTION */}
        {activeSection === 'faqs' && (
          <div className="animate-fadeIn">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find answers to common questions about scholarships</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-start gap-3">
                      <MessageCircleQuestion className="text-purple-600 flex-shrink-0 mt-1" size={24} />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed pl-9">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Mail size={24} />
                    Need Help?
                  </h3>
                  <p className="text-white text-opacity-90 mb-6">
                    Can't find what you're looking for? Our support team is here to help!
                  </p>
                  <button className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
                    Contact Support
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <a href="#" className="flex items-center gap-3 text-purple-600 hover:text-purple-700 font-semibold">
                      <FileText size={18} />
                      Scholarship Guidelines
                    </a>
                    <a href="#" className="flex items-center gap-3 text-purple-600 hover:text-purple-700 font-semibold">
                      <Download size={18} />
                      Application Template
                    </a>
                    <a href="#" className="flex items-center gap-3 text-purple-600 hover:text-purple-700 font-semibold">
                      <Users size={18} />
                      Past Recipients
                    </a>
                    <a href="#" className="flex items-center gap-3 text-purple-600 hover:text-purple-700 font-semibold">
                      <Bell size={18} />
                      Notification Settings
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}