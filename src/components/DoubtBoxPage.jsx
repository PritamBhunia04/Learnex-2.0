import React, { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Library, MessageCircleQuestion, Bell, Award, LogOut, Search, Filter, Plus, ChevronDown, X, Upload, Image, Code, Send, MessageSquare, ThumbsUp, ThumbsDown, Clock, CheckCircle2, AlertCircle, Flag, Pin, TrendingUp, Flame, Users, Calendar, Tag, Eye, MoreVertical, Edit, Trash2, Lock, Trophy } from 'lucide-react';
import StudentNavbar from './StudentNavbar';

export default function DoubtBoxPage() {
  const [activeTab, setActiveTab] = useState('doubtbox');
  const [view, setView] = useState('browse'); // browse, myDoubts, discussion, newDoubt
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    course: '',
    status: '',
    date: '',
    sortBy: ''
  });

  const [doubtForm, setDoubtForm] = useState({
    title: '',
    description: '',
    course: '',
    tags: [],
    files: []
  });
  const [isDragging, setIsDragging] = useState(false);

  const onDropFiles = (fileList) => {
    const maxSize = 5 * 1024 * 1024; // 5MB per file
    const accepted = Array.from(fileList).filter(f => f.size <= maxSize);
    const rejected = Array.from(fileList).filter(f => f.size > maxSize);
    if (rejected.length) {
      alert(`Some files were too large (>5MB):\n${rejected.map(f=>f.name).join(', ')}`);
    }
    setDoubtForm(prev => ({ ...prev, files: [...prev.files, ...accepted] }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
      onDropFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const fileInputRef = React.useRef(null);

  const openFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length) {
      onDropFiles(e.target.files);
      e.target.value = '';
    }
  };

  const removeFile = (idx) => {
    setDoubtForm(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== idx) }));
  };

  const [newTag, setNewTag] = useState('');
  const [replyText, setReplyText] = useState('');
  const [postingReply, setPostingReply] = useState(false);
  const [myDoubtsFilter, setMyDoubtsFilter] = useState('all'); // all, resolved, unresolved

  const courses = [
    'Python for Beginners',
    'Data Science Masterclass',
    'Web Development Bootcamp',
    'Mobile App Development',
    'AI Fundamentals',
    'Digital Marketing Pro'
  ];

  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDoubts = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      // Optionally send filters to server; keeping client-side filtering by default
      const res = await fetch(`http://localhost:3000/doubts?${params.toString()}`);
      const data = await res.json();
      setDoubts(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to fetch doubts', e);
      setError('Failed to load doubts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  const replies = [
    {
      id: 1,
      author: 'Dr. Sarah Johnson',
      authorRole: 'Instructor',
      content: 'Great question! Recursion is a technique where a function calls itself. Here\'s a simple example:\n\n```python\ndef factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * factorial(n-1)\n```\n\nThe key is having a base case to stop the recursion.',
      upvotes: 45,
      timestamp: '2 days ago',
      isPinned: true
    },
    {
      id: 2,
      author: 'Alex Kumar',
      authorRole: 'Student',
      content: 'This helped me understand! Thanks for the clear example.',
      upvotes: 8,
      timestamp: '1 day ago',
      isPinned: false
    }
  ];

  const topHelpers = [
    { name: 'Dr. Sarah Johnson', points: 1250, avatar: '👩‍🏫', replies: 89 },
    { name: 'Alex Kumar', points: 890, avatar: '👨‍💻', replies: 67 },
    { name: 'Emily Chen', points: 765, avatar: '👩‍💼', replies: 54 },
    { name: 'Michael Brown', points: 650, avatar: '👨‍🎓', replies: 48 }
  ];

  const trendingDoubts = [
    { title: 'Understanding async/await in JavaScript', views: 1234 },
    { title: 'Git merge conflicts resolution', views: 987 },
    { title: 'Database normalization concepts', views: 756 }
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !doubtForm.tags.includes(newTag.trim())) {
      setDoubtForm({ ...doubtForm, tags: [...doubtForm.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setDoubtForm({ ...doubtForm, tags: doubtForm.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleSubmitDoubt = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!doubtForm.title || !doubtForm.description || !doubtForm.course) return;
      const payload = {
        title: doubtForm.title,
        description: doubtForm.description,
        course: doubtForm.course,
        tags: doubtForm.tags,
        authorEmail: userEmail,
        status: 'pending',
      };
      const res = await fetch('http://localhost:3000/doubts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to submit');
      await fetchDoubts();
      setDoubtForm({ title: '', description: '', course: '', tags: [], files: [] });
      setView('myDoubts');
    } catch (e) {
      console.error('Submit doubt failed', e);
      alert('Failed to submit doubt');
    }
  };

  const clearDoubtForm = () => {
    setDoubtForm({ title: '', description: '', course: '', tags: [], files: [] });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'resolved':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            <CheckCircle2 size={14} />
            Resolved
          </span>
        );
      case 'in_discussion':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
            <MessageSquare size={14} />
            In Discussion
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
            <Clock size={14} />
            Pending
          </span>
        );
      default:
        return null;
    }
  };

  const enrichedDoubts = doubts.map(d => ({
    ...d,
    author: d.authorEmail === localStorage.getItem('userEmail') ? 'You' : (d.author || d.authorEmail || 'Student'),
    isMyDoubt: d.authorEmail === localStorage.getItem('userEmail'),
    postedDate: d.createdAt ? new Date(d.createdAt).toLocaleString() : 'Just now',
    replies: typeof d.replies === 'number' ? d.replies : 0,
    upvotes: typeof d.upvotes === 'number' ? d.upvotes : 0,
    views: typeof d.views === 'number' ? d.views : 0,
    tags: Array.isArray(d.tags) ? d.tags : []
  }));

  const filteredDoubts = enrichedDoubts.filter(doubt => {
    const matchesSearch = doubt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doubt.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = !filters.course || doubt.course === filters.course;
    const matchesStatus = !filters.status || doubt.status === filters.status;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const myDoubts = enrichedDoubts.filter(d => d.isMyDoubt);
  const filteredMyDoubts = myDoubtsFilter === 'all' 
    ? myDoubts 
    : myDoubtsFilter === 'resolved'
    ? myDoubts.filter(d => d.status === 'resolved')
    : myDoubts.filter(d => d.status !== 'resolved');

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
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.4s ease-out forwards; }
      `}</style>

      {/* Navbar */}
     <StudentNavbar/>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <div className="hidden lg:block w-64 animate-slideIn">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Filter size={20} className="text-purple-600" />
                Filters
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course</label>
                  <select
                    value={filters.course}
                    onChange={(e) => setFilters({ ...filters, course: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-sm"
                  >
                    <option value="">All Courses</option>
                    {courses.map((course, idx) => (
                      <option key={idx} value={course}>{course}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_discussion">In Discussion</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <select
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-sm"
                  >
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-sm"
                  >
                    <option value="">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="views">Most Viewed</option>
                    <option value="replies">Most Replies</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({ course: '', status: '', date: '', sortBy: '' })}
                  className="w-full py-2 text-sm text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Header with Search and Actions */}
            <div className="mb-6 animate-fadeIn">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">Doubt Box</h1>
                  <p className="text-gray-600">Ask questions, get answers, help others learn</p>
                </div>
                <button
                  onClick={() => setView('newDoubt')}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Plus size={20} />
                  Ask New Doubt
                </button>
              </div>

              {/* View Tabs */}
              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setView('browse')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    view === 'browse'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  Browse All
                </button>
                <button
                  onClick={() => setView('myDoubts')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    view === 'myDoubts'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  My Doubts
                </button>
              </div>

              {/* Search Bar */}
              {(view === 'browse' || view === 'myDoubts') && (
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doubts by keyword, course, or topic..."
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
              )}
            </div>

            {/* New Doubt Form */}
            {view === 'newDoubt' && (
              <div className="bg-white rounded-2xl shadow-xl p-8 animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ask Your Doubt</h2>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={doubtForm.title}
                      onChange={(e) => setDoubtForm({ ...doubtForm, title: e.target.value })}
                      placeholder="Brief summary of your doubt..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Course / Topic <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={doubtForm.course}
                      onChange={(e) => setDoubtForm({ ...doubtForm, course: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    >
                      <option value="">Select a course</option>
                      {courses.map((course, idx) => (
                        <option key={idx} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={doubtForm.description}
                      onChange={(e) => setDoubtForm({ ...doubtForm, description: e.target.value })}
                      placeholder="Explain your doubt in detail. You can include code snippets, error messages, etc."
                      rows="6"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Code size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Image size={18} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tags (Optional)
                    </label>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                        placeholder="Add tags (press Enter)"
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    {doubtForm.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {doubtForm.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold"
                          >
                            {tag}
                            <button onClick={() => handleRemoveTag(tag)}>
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Attachments (Optional)
                    </label>
                    <div
                      onClick={openFileDialog}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                        isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-500'
                      }`}
                    >
                      <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                      <p className="text-gray-600 text-sm">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Screenshots, code files (Max 5MB)
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                    </div>
                    {doubtForm.files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {doubtForm.files.map((f, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2">
                            <span className="text-sm text-gray-700 truncate mr-2">{f.name} ({Math.ceil(f.size/1024)} KB)</span>
                            <button onClick={(e)=>{ e.stopPropagation(); removeFile(idx); }} className="text-gray-500 hover:text-red-600">
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <button
                      onClick={handleSubmitDoubt}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send size={20} />
                      Submit Doubt
                    </button>
                    <button
                      onClick={clearDoubtForm}
                      className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Browse All Doubts */}
            {view === 'browse' && (
              <div className="space-y-4 animate-fadeIn">
                {filteredDoubts.map((doubt) => (
                  <div
                    key={doubt.id}
                    onClick={() => {
                      setSelectedDoubt(doubt);
                      setView('discussion');
                    }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                          {doubt.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {doubt.description}
                        </p>
                      </div>
                      {getStatusBadge(doubt.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {doubt.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-purple-50 text-purple-600 rounded-lg text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-purple-600">{doubt.course}</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare size={16} />
                          {doubt.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp size={16} />
                          {doubt.upvotes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={16} />
                          {doubt.views}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span>by {doubt.author}</span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {doubt.postedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* My Doubts Dashboard */}
            {view === 'myDoubts' && (
              <div className="animate-fadeIn">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setMyDoubtsFilter('all')}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        myDoubtsFilter === 'all'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Doubts ({myDoubts.length})
                    </button>
                    <button
                      onClick={() => setMyDoubtsFilter('resolved')}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        myDoubtsFilter === 'resolved'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Resolved ({myDoubts.filter(d => d.status === 'resolved').length})
                    </button>
                    <button
                      onClick={() => setMyDoubtsFilter('unresolved')}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        myDoubtsFilter === 'unresolved'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Unresolved ({myDoubts.filter(d => d.status !== 'resolved').length})
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredMyDoubts.map((doubt) => (
                    <div
                      key={doubt.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {doubt.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {doubt.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(doubt.status)}
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MessageSquare size={16} />
                            {doubt.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {doubt.postedDate}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedDoubt(doubt);
                            setView('discussion');
                          }}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        >
                          View Discussion
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Discussion Thread */}
            {view === 'discussion' && selectedDoubt && (
              <div className="space-y-6 animate-fadeIn">
                <button
                  onClick={() => setView('browse')}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
                >
                  ← Back to Doubts
                </button>

                {/* Original Question */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        {selectedDoubt.title}
                      </h2>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
                        <span className="font-semibold">Asked by {selectedDoubt.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {selectedDoubt.postedDate}
                        </span>
                        <span>•</span>
                        <span className="text-purple-600 font-semibold">{selectedDoubt.course}</span>
                      </div>
                    </div>
                    {getStatusBadge(selectedDoubt.status)}
                  </div>

                  <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                    {selectedDoubt.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {selectedDoubt.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold"
                      >
                        <Tag size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <ThumbsUp size={18} />
                      <span className="font-semibold">{selectedDoubt.upvotes}</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                      <ThumbsDown size={18} />
                    </button>
                    {selectedDoubt.isMyDoubt && selectedDoubt.status !== 'resolved' && (
                      <button
                        onClick={async () => {
                          try {
                            const id = selectedDoubt._id || selectedDoubt.id;
                            const res = await fetch(`http://localhost:3000/doubts/${id}/status`, {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ status: 'resolved' })
                            });
                            if (!res.ok) throw new Error('Failed to update status');
                            await fetchDoubts();
                            const updated = doubts.find(d => (d._id || d.id) === id);
                            if (updated) setSelectedDoubt(updated);
                          } catch (e) {
                            console.error(e);
                            alert('Failed to mark as resolved');
                          }
                        }}
                        className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle2 size={18} />
                        Mark as Resolved
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Flag size={18} />
                      Report
                    </button>
                  </div>
                </div>

                {/* Replies Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <MessageSquare className="text-purple-600" size={24} />
                    {selectedDoubt.replies || 0} Replies
                  </h3>

                  <div className="space-y-6">
                    {replies.map((reply) => (
                      <div
                        key={reply.id}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          reply.isPinned
                            ? 'border-yellow-300 bg-yellow-50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold">
                              {reply.author[0]}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-800">{reply.author}</span>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                  reply.authorRole === 'Instructor'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-gray-200 text-gray-700'
                                }`}>
                                  {reply.authorRole}
                                </span>
                                {reply.isPinned && (
                                  <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                    <Pin size={12} />
                                    Pinned
                                  </span>
                                )}
                              </div>
                              <span className="text-sm text-gray-600">{reply.timestamp}</span>
                            </div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </div>

                        <div className="text-gray-700 leading-relaxed mb-4 whitespace-pre-wrap">
                          {reply.content}
                        </div>

                        <div className="flex items-center gap-3">
                          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                            <ThumbsUp size={16} />
                            <span className="font-semibold text-sm">{reply.upvotes}</span>
                          </button>
                          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                            <ThumbsDown size={16} />
                          </button>
                          <button className="px-3 py-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-sm font-semibold">
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Reply Box */}
                  <div className="mt-8 pt-6 border-t-2 border-gray-200">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Add Your Reply</h4>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Share your thoughts, solutions, or ask follow-up questions..."
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Code size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                          <Image size={18} />
                        </button>
                      </div>
                      <button
                        disabled={postingReply || !replyText.trim()}
                        onClick={async () => {
                          try {
                            if (!replyText.trim()) return;
                            setPostingReply(true);
                            const userEmail = localStorage.getItem('userEmail');
                            const res = await fetch(`http://localhost:3000/doubts/${selectedDoubt._id || selectedDoubt.id}/replies`, {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ authorEmail: userEmail, content: replyText.trim() })
                            });
                            if (!res.ok) throw new Error('Failed to post reply');
                            setReplyText('');
                            await fetchDoubts();
                            // Refresh selected doubt from updated list to get latest replies count
                            const refreshed = (await (async ()=>{
                              const found = doubts.find(d => (d._id || d.id) === (selectedDoubt._id || selectedDoubt.id));
                              return found || selectedDoubt;
                            })());
                            setSelectedDoubt(refreshed);
                          } catch (e) {
                            console.error(e);
                            alert('Failed to post reply');
                          } finally {
                            setPostingReply(false);
                          }
                        }}
                        className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                          postingReply || !replyText.trim() ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg'
                        }`}
                      >
                        <Send size={18} />
                        {postingReply ? 'Posting...' : 'Post Reply'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Leaderboard & Trending */}
          <div className="hidden xl:block w-80 space-y-6 animate-slideIn">
            {/* Top Helpers Leaderboard */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="text-yellow-300" size={24} />
                Top Helpers This Week
              </h3>
              <div className="space-y-3">
                {topHelpers.map((helper, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all"
                  >
                    <div className="text-3xl">{helper.avatar}</div>
                    <div className="flex-1">
                      <div className="font-bold text-sm">{helper.name}</div>
                      <div className="text-xs text-purple-200">{helper.replies} answers</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-yellow-300">{helper.points}</div>
                      <div className="text-xs text-purple-200">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Doubts */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Flame className="text-orange-500" size={22} />
                Trending Doubts
              </h3>
              <div className="space-y-3">
                {trendingDoubts.map((doubt, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    <div className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                      {doubt.title}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Eye size={12} />
                      {doubt.views.toLocaleString()} views
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-700">Questions Asked</span>
                  <span className="text-xl font-bold text-purple-600">2</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-700">Answers Given</span>
                  <span className="text-xl font-bold text-green-600">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-700">Total Points</span>
                  <span className="text-xl font-bold text-yellow-600">340</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}