import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, Clock, Globe, Award, Heart, Share2, PlayCircle, ChevronDown, ChevronUp, Check, Lock, Download, MessageCircle, BookOpen, Video, FileText, Trophy, Shield, Smartphone, Monitor, X, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';

export default function CourseDetailsPage() {
  const { id: idParam, email } = useParams();
  const courseId = Number(idParam);
  const [expandedModules, setExpandedModules] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeReviewFilter, setActiveReviewFilter] = useState('all');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock catalog synced with CoursePage ids
  const catalog = [
    {
      id: 1,
      title: 'Python for Beginners: Complete Masterclass',
      subtitle: 'Learn Python programming from scratch with hands-on projects and real-world examples',
      category: 'Programming',
      level: 'Beginner',
      language: 'English',
      rating: 4.8,
      totalEnrollments: 12500,
      duration: '8 weeks',
      lastUpdated: 'October 2024',
      price: 49.99,
      originalPrice: 99.99,
      thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      instructor: {
        name: 'Dr. Sarah Johnson',
        title: 'Senior Software Engineer & Python Expert',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        rating: 4.9,
        totalStudents: 45000,
        totalCourses: 8,
        bio: 'Dr. Sarah Johnson is a seasoned software engineer with over 15 years of experience in Python development. She has worked with leading tech companies and has a passion for teaching programming to beginners. Her teaching style focuses on practical, real-world applications.'
      }
    },
    {
      id: 2,
      title: 'Data Science Masterclass',
      subtitle: 'Master data analysis, visualization, and machine learning techniques.',
      category: 'Data Science',
      level: 'Advanced',
      language: 'English',
      rating: 4.9,
      totalEnrollments: 8900,
      duration: '12 weeks',
      lastUpdated: 'October 2024',
      price: 69.99,
      originalPrice: 129.99,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      instructor: {
        name: 'Prof. Michael Chen',
        title: 'Data Scientist & ML Researcher',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200',
        rating: 4.8,
        totalStudents: 38000,
        totalCourses: 5,
        bio: 'Professor Chen specializes in applied machine learning and data visualization with a focus on practical, industry-relevant skills.'
      }
    },
    {
      id: 3,
      title: 'Web Development Bootcamp',
      subtitle: 'Build modern websites with HTML, CSS, JavaScript, and React.',
      category: 'Web Development',
      level: 'Intermediate',
      language: 'English',
      rating: 4.7,
      totalEnrollments: 15200,
      duration: '10 weeks',
      lastUpdated: 'October 2024',
      price: 59.99,
      originalPrice: 119.99,
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      instructor: {
        name: 'Emily Rodriguez',
        title: 'Frontend Engineer & Educator',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
        rating: 4.7,
        totalStudents: 52000,
        totalCourses: 6,
        bio: 'Emily teaches modern web development with a focus on building real-world, responsive applications.'
      }
    },
    {
      id: 4,
      title: 'Mobile App Development',
      subtitle: 'Create stunning mobile apps for iOS and Android platforms.',
      category: 'Mobile Development',
      level: 'Intermediate',
      language: 'English',
      rating: 4.6,
      totalEnrollments: 6700,
      duration: '14 weeks',
      lastUpdated: 'October 2024',
      price: 79.99,
      originalPrice: 149.99,
      thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800',
      instructor: {
        name: 'James Williams',
        title: 'Mobile Engineer',
        avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200',
        rating: 4.6,
        totalStudents: 21000,
        totalCourses: 4,
        bio: 'James builds high-quality cross-platform apps and shares best practices for performance and UX.'
      }
    },
    {
      id: 5,
      title: 'Artificial Intelligence Fundamentals',
      subtitle: 'Explore AI concepts, neural networks, and deep learning basics.',
      category: 'AI & ML',
      level: 'Advanced',
      language: 'English',
      rating: 4.9,
      totalEnrollments: 9300,
      duration: '16 weeks',
      lastUpdated: 'October 2024',
      price: 89.99,
      originalPrice: 169.99,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
      instructor: {
        name: 'Dr. Alan Turing',
        title: 'AI Researcher',
        avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200',
        rating: 4.9,
        totalStudents: 33000,
        totalCourses: 7,
        bio: 'Dr. Turing covers the fundamentals of AI with accessible explanations and practical examples.'
      }
    },
    {
      id: 6,
      title: 'Digital Marketing Pro',
      subtitle: 'Master SEO, social media marketing, and content strategy.',
      category: 'Marketing',
      level: 'Beginner',
      language: 'English',
      rating: 4.5,
      totalEnrollments: 11000,
      duration: '6 weeks',
      lastUpdated: 'October 2024',
      price: 39.99,
      originalPrice: 79.99,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      instructor: {
        name: 'Lisa Anderson',
        title: 'Marketing Strategist',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
        rating: 4.5,
        totalStudents: 29000,
        totalCourses: 3,
        bio: 'Lisa teaches effective digital marketing strategies with practical, hands-on projects.'
      }
    }
  ];

  const courseData = catalog.find(c => c.id === courseId) || catalog[0];

  const learningOutcomes = [
    'Master Python fundamentals and syntax',
    'Build real-world projects and applications',
    'Understand object-oriented programming',
    'Work with data structures and algorithms',
    'Debug and optimize Python code',
    'Use popular Python libraries and frameworks'
  ];

  const modules = [
    {
      id: 1,
      title: 'Introduction to Python',
      duration: '2 hours',
      lessonCount: 8,
      summary: 'Get started with Python basics, installation, and your first program',
      lessons: [
        { title: 'Welcome to the Course', type: 'Video', duration: '5 min', locked: false },
        { title: 'Installing Python', type: 'Video', duration: '12 min', locked: false },
        { title: 'Your First Python Program', type: 'Video', duration: '18 min', locked: false },
        { title: 'Variables and Data Types', type: 'Video', duration: '25 min', locked: true },
        { title: 'Quiz: Python Basics', type: 'Quiz', duration: '10 min', locked: true },
        { title: 'Basic Operations', type: 'Video', duration: '20 min', locked: true },
        { title: 'Assignment: Hello World Project', type: 'Assignment', duration: '30 min', locked: true },
        { title: 'Module Summary', type: 'Video', duration: '8 min', locked: true }
      ]
    },
    {
      id: 2,
      title: 'Control Flow and Functions',
      duration: '3 hours',
      lessonCount: 10,
      summary: 'Learn conditional statements, loops, and how to write reusable functions',
      lessons: [
        { title: 'If-Else Statements', type: 'Video', duration: '22 min', locked: true },
        { title: 'While Loops', type: 'Video', duration: '18 min', locked: true },
        { title: 'For Loops', type: 'Video', duration: '20 min', locked: true },
        { title: 'Quiz: Control Flow', type: 'Quiz', duration: '15 min', locked: true },
        { title: 'Defining Functions', type: 'Video', duration: '25 min', locked: true }
      ]
    },
    {
      id: 3,
      title: 'Data Structures',
      duration: '4 hours',
      lessonCount: 12,
      summary: 'Master lists, dictionaries, tuples, and sets in Python',
      lessons: [
        { title: 'Working with Lists', type: 'Video', duration: '28 min', locked: true },
        { title: 'Dictionaries Deep Dive', type: 'Video', duration: '32 min', locked: true },
        { title: 'Tuples and Sets', type: 'Video', duration: '24 min', locked: true }
      ]
    }
  ];

  const reviews = [
    {
      id: 1,
      reviewer: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 5,
      date: 'November 10, 2024',
      title: 'Excellent course for beginners!',
      comment: 'This course exceeded my expectations. The instructor explains everything clearly and the hands-on projects really helped me understand the concepts.',
      helpful: 45,
      verified: true
    },
    {
      id: 2,
      reviewer: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      rating: 5,
      date: 'November 8, 2024',
      title: 'Best Python course I\'ve taken',
      comment: 'Great pace, comprehensive content, and practical examples. Highly recommended for anyone starting with Python.',
      helpful: 32,
      verified: true
    },
    {
      id: 3,
      reviewer: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      rating: 4,
      date: 'November 5, 2024',
      title: 'Very good course',
      comment: 'Solid content and good teaching style. Would have liked more advanced topics but overall great for beginners.',
      helpful: 18,
      verified: true
    }
  ];

  const faqs = [
    { question: 'Will I get a certificate?', answer: 'Yes! Upon completion, you\'ll receive a verified certificate of completion.' },
    { question: 'How long do I have access?', answer: 'You get lifetime access to the course materials, including all future updates.' },
    { question: 'What are the prerequisites?', answer: 'No prior programming experience required. Just bring your enthusiasm to learn!' },
    { question: 'Is there a refund policy?', answer: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied.' }
  ];

  const relatedCourses = [
    {
      id: 1,
      title: 'Advanced Python Programming',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300',
      rating: 4.7,
      students: 8900,
      price: 59.99
    },
    {
      id: 2,
      title: 'Python Data Science',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
      rating: 4.9,
      students: 11200,
      price: 69.99
    },
    {
      id: 3,
      title: 'Python Web Development',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300',
      rating: 4.6,
      students: 7500,
      price: 54.99
    }
  ];

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const expandAll = () => setExpandedModules(modules.map(m => m.id));
  const collapseAll = () => setExpandedModules([]);

  const ratingBreakdown = [
    { stars: 5, percentage: 75, count: 9375 },
    { stars: 4, percentage: 18, count: 2250 },
    { stars: 3, percentage: 5, count: 625 },
    { stars: 2, percentage: 1, count: 125 },
    { stars: 1, percentage: 1, count: 125 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Sticky Enrollment Bar */}
      {showStickyBar && (
        <div className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50 py-4 px-6 animate-fadeIn">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-gray-800 truncate max-w-md">{courseData.title}</h3>
              <div className="flex items-center gap-2 text-sm">
                <Star className="text-yellow-500 fill-yellow-500" size={16} />
                <span className="font-semibold">{courseData.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">${courseData.price}</p>
                <p className="text-sm text-gray-500 line-through">${courseData.originalPrice}</p>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="text-sm mb-4 flex items-center gap-2 text-purple-200">
            <Link to={`/${email || localStorage.getItem('userEmail')}`}>Home</Link>
            <span>/</span>
            <span>Explore Courses</span>
            <span>/</span>
            <span>{courseData.category}</span>
            <span>/</span>
            <span className="text-white">{courseData.title}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 animate-fadeIn">
              <h1 className="text-4xl font-bold mb-3">{courseData.title}</h1>
              <p className="text-xl text-purple-100 mb-4">{courseData.subtitle}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{courseData.category}</span>
                <span className="bg-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{courseData.level}</span>
                <span className="bg-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{courseData.language}</span>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={18} />
                  <span className="font-semibold">{courseData.rating}</span>
                  <span className="text-purple-200">({courseData.totalEnrollments.toLocaleString()} ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>{courseData.totalEnrollments.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={18} />
                  <span>{courseData.language}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <img src={courseData.instructor.avatar} alt={courseData.instructor.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="text-sm text-purple-200">Created by</p>
                  <p className="font-semibold hover:text-purple-200 cursor-pointer">{courseData.instructor.name}</p>
                </div>
              </div>

              <div className="mt-4">
                <span className="bg-yellow-500 text-purple-900 px-3 py-1 rounded-full text-sm font-bold">⭐ Bestseller</span>
              </div>
            </div>

            {/* Right Column - Course Card */}
            <div className="lg:col-span-1 animate-fadeIn">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden sticky top-8">
                <div className="relative">
                  <img src={courseData.thumbnail} alt={courseData.title} className="w-full h-48 object-cover" />
                  <button 
                    onClick={() => setShowVideoModal(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-all group"
                  >
                    <PlayCircle className="text-white group-hover:scale-110 transition-transform" size={64} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-bold text-purple-600">${courseData.price}</span>
                      <span className="text-lg text-gray-500 line-through">${courseData.originalPrice}</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-bold">50% OFF</span>
                    </div>
                    <p className="text-sm text-red-600 font-semibold">🔥 Limited time offer!</p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-[1.02] mb-3">
                    Enroll Now
                  </button>

                  <div className="flex gap-2 mb-4">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`flex-1 border-2 ${isWishlisted ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700'} py-2 rounded-xl font-semibold hover:border-purple-500 hover:text-purple-600 transition-all flex items-center justify-center gap-2`}
                    >
                      <Heart className={isWishlisted ? 'fill-red-500' : ''} size={18} />
                      Wishlist
                    </button>
                    <button className="flex-1 border-2 border-gray-300 text-gray-700 py-2 rounded-xl font-semibold hover:border-purple-500 hover:text-purple-600 transition-all flex items-center justify-center gap-2">
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>

                  <div className="border-t pt-4 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Shield className="text-green-600" size={18} />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="text-purple-600" size={18} />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="text-blue-600" size={18} />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Smartphone className="text-orange-600" size={18} />
                      <span>Access on mobile and desktop</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* About This Course */}
            <section className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">About This Course</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                This comprehensive Python course is designed for absolute beginners who want to learn programming from scratch. You'll start with the basics and gradually build up to creating your own projects. No prior experience needed!
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">Who This Course Is For</h3>
              <p className="text-gray-700 mb-6">
                This course is perfect for anyone who wants to start their programming journey, career switchers looking to enter tech, students preparing for computer science courses, or professionals wanting to automate tasks with Python.
              </p>

              <h3 className="text-xl font-bold text-gray-800 mb-4">Learning Format</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-xl text-center">
                  <Video className="text-purple-600 mx-auto mb-2" size={32} />
                  <p className="font-semibold text-gray-800">45 Videos</p>
                  <p className="text-sm text-gray-600">HD lectures</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-center">
                  <FileText className="text-blue-600 mx-auto mb-2" size={32} />
                  <p className="font-semibold text-gray-800">12 Quizzes</p>
                  <p className="text-sm text-gray-600">Test yourself</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl text-center">
                  <Trophy className="text-green-600 mx-auto mb-2" size={32} />
                  <p className="font-semibold text-gray-800">3 Projects</p>
                  <p className="text-sm text-gray-600">Hands-on</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl text-center">
                  <BookOpen className="text-orange-600 mx-auto mb-2" size={32} />
                  <p className="font-semibold text-gray-800">8 Assignments</p>
                  <p className="text-sm text-gray-600">Practice</p>
                </div>
              </div>
            </section>

            {/* What You'll Learn */}
            <section className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Curriculum */}
            <section className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Course Curriculum</h2>
                  <p className="text-gray-600">{modules.length} modules • {modules.reduce((acc, m) => acc + m.lessonCount, 0)} lessons • 25 hours total</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={expandAll} className="text-sm text-purple-600 hover:text-purple-700 font-semibold">Expand All</button>
                  <span className="text-gray-400">|</span>
                  <button onClick={collapseAll} className="text-sm text-purple-600 hover:text-purple-700 font-semibold">Collapse All</button>
                </div>
              </div>

              <div className="space-y-3">
                {modules.map((module) => (
                  <div key={module.id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-colors">
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4 text-left">
                        {expandedModules.includes(module.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">Module {module.id}: {module.title}</h3>
                          <p className="text-sm text-gray-600">{module.lessonCount} lessons • {module.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{module.lessonCount} lessons</span>
                      </div>
                    </button>

                    {expandedModules.includes(module.id) && (
                      <div className="px-6 py-4 bg-white">
                        <p className="text-gray-600 mb-4">{module.summary}</p>
                        <div className="space-y-2">
                          {module.lessons.map((lesson, index) => (
                            <div key={index} className="flex items-center justify-between py-3 px-4 hover:bg-purple-50 rounded-lg transition-colors group">
                              <div className="flex items-center gap-3">
                                {lesson.type === 'Video' && <Video size={18} className="text-purple-600" />}
                                {lesson.type === 'Quiz' && <FileText size={18} className="text-blue-600" />}
                                {lesson.type === 'Assignment' && <BookOpen size={18} className="text-orange-600" />}
                                <span className="text-gray-700 group-hover:text-purple-700">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500">{lesson.duration}</span>
                                {lesson.locked ? (
                                  <Lock size={16} className="text-gray-400" />
                                ) : (
                                  <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">Preview</button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Prerequisites */}
            <section className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Prerequisites & Requirements</h2>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">Required Knowledge</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>No prior programming experience required</li>
                <li>Basic computer skills (file management, web browsing)</li>
                <li>Enthusiasm to learn and willingness to practice</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">Technical Requirements</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Windows, Mac, or Linux computer</li>
                <li>Stable internet connection (5+ Mbps recommended)</li>
                <li>At least 2GB of free disk space</li>
                <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">Time Commitment</h3>
              <p className="text-gray-700">We recommend dedicating <span className="font-bold">5-7 hours per week</span> to complete the course within the 8-week timeframe. However, you can go at your own pace with lifetime access.</p>
            </section>

            {/* Instructor Section */}
            <section className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Your Instructor</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <img src={courseData.instructor.avatar} alt={courseData.instructor.name} className="w-32 h-32 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{courseData.instructor.name}</h3>
                  <p className="text-purple-600 font-semibold mb-4">{courseData.instructor.title}</p>
                  
                  <div className="flex flex-wrap gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="font-semibold">{courseData.instructor.rating} rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{courseData.instructor.totalStudents.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} />
                      <span>{courseData.instructor.totalCourses} courses</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">{courseData.instructor.bio}</p>

                  <div className="flex gap-3">
                    <button className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all">
                      Follow Instructor
                    </button>
                    <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-purple-600 hover:text-purple-600 transition-all">
                      Contact
                    </button>
                  </div>
                </div>
              </div>

                              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">More Courses by This Instructor</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {relatedCourses.slice(0, 3).map((course) => (
                    <div key={course.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                      <img src={course.thumbnail} alt={course.title} className="w-full h-32 object-cover" />
                      <div className="p-3">
                        <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2">{course.title}</h4>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="text-yellow-500 fill-yellow-500" size={14} />
                            <span>{course.rating}</span>
                          </div>
                          <span className="font-bold text-purple-600">${course.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Student Reviews */}
            <section className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Student Reviews</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-1 text-center">
                  <div className="text-6xl font-bold text-gray-800 mb-2">{courseData.rating}</div>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="text-yellow-500 fill-yellow-500" size={24} />
                    ))}
                  </div>
                  <p className="text-gray-600">12,500 reviews</p>
                </div>

                <div className="md:col-span-2 space-y-2">
                  {ratingBreakdown.map((item) => (
                    <div key={item.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-16">
                        <span className="text-sm font-semibold text-gray-700">{item.stars}</span>
                        <Star className="text-yellow-500 fill-yellow-500" size={14} />
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full transition-all" 
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-16 text-right">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 border-b pb-4">
                <button 
                  onClick={() => setActiveReviewFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeReviewFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  All Reviews
                </button>
                <button 
                  onClick={() => setActiveReviewFilter('5')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeReviewFilter === '5' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  5 Stars
                </button>
                <button 
                  onClick={() => setActiveReviewFilter('4')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeReviewFilter === '4' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  4 Stars
                </button>
              </div>

              <button className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all mb-8">
                Write a Review
              </button>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <img src={review.avatar} alt={review.reviewer} className="w-12 h-12 rounded-full" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-bold text-gray-800">{review.reviewer}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          {review.verified && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Verified Purchase</span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                              size={16} 
                            />
                          ))}
                        </div>

                        {review.title && (
                          <h5 className="font-bold text-gray-800 mb-2">{review.title}</h5>
                        )}
                        
                        <p className="text-gray-700 mb-3">{review.comment}</p>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-gray-600">Was this helpful?</span>
                          <button className="flex items-center gap-1 text-gray-700 hover:text-purple-600 transition-colors">
                            <ThumbsUp size={16} />
                            <span>{review.helpful}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-700 hover:text-purple-600 transition-colors">
                            <ThumbsDown size={16} />
                          </button>
                          <button className="flex items-center gap-1 text-gray-700 hover:text-red-600 transition-colors ml-auto">
                            <Flag size={16} />
                            <span>Report</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition-all">
                Load More Reviews
              </button>
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 transition-colors">
                    <summary className="font-bold text-gray-800 cursor-pointer flex items-center justify-between">
                      {faq.question}
                      <ChevronDown className="group-open:rotate-180 transition-transform" size={20} />
                    </summary>
                    <p className="text-gray-700 mt-3 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Resources */}
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Download size={24} className="text-purple-600" />
                  Resources
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-between group">
                    <span className="text-gray-700 group-hover:text-purple-700">Course Slides (PDF)</span>
                    <Download size={16} className="text-gray-400 group-hover:text-purple-600" />
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-between group">
                    <span className="text-gray-700 group-hover:text-purple-700">Practice Datasets</span>
                    <Download size={16} className="text-gray-400 group-hover:text-purple-600" />
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-between group">
                    <span className="text-gray-700 group-hover:text-purple-700">Code Examples</span>
                    <Download size={16} className="text-gray-400 group-hover:text-purple-600" />
                  </button>
                </div>
              </div>

              {/* Q&A Link */}
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MessageCircle size={24} className="text-purple-600" />
                  Q&A Discussion
                </h3>
                <p className="text-gray-600 mb-4">Have questions? Join the course discussion board.</p>
                <button className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all">
                  Ask a Question
                </button>
              </div>

              {/* Share */}
              <div className="bg-white rounded-2xl shadow-lg p-6 animate-fadeIn">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Share This Course</h3>
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                    LinkedIn
                  </button>
                  <button className="flex-1 bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-all">
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        <section className="mt-12 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Students Also Enrolled In</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group cursor-pointer">
                <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">{course.title}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="font-semibold text-gray-700">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users size={16} />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">${course.price}</span>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Video Preview Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={() => setShowVideoModal(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-bold text-gray-800">Course Preview</h3>
              <button onClick={() => setShowVideoModal(false)} className="text-gray-600 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <PlayCircle className="text-white" size={80} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}