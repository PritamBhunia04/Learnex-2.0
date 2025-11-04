import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Sparkles, Award, Users, TrendingUp, ChevronRight, Play, CheckCircle } from 'lucide-react';
import LearnexNavbar from './LearnexNavbar';

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

export default function LearnexLanding() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
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
          <Award size={60} className="text-purple-400" />
        </FloatingIcon>
        <FloatingIcon delay={1.5} duration={11} x={80} y={65}>
          <Sparkles size={65} className="text-purple-300" />
        </FloatingIcon>
        <FloatingIcon delay={0.5} duration={7} x={50} y={80}>
          <Users size={75} className="text-purple-400" />
        </FloatingIcon>
      </div>

      {/* Navigation */}
      <LearnexNavbar/>
      

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block animate-fadeInUp">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                <Sparkles size={16} />
                Transform Your Learning Journey
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight animate-fadeInUp delay-100">
              Master New Skills at{' '}
              <span className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent">
                Your Own Pace
              </span>
            </h1>
            <p className="text-xl text-gray-600 animate-fadeInUp delay-200">
              Join thousands of learners worldwide. Access expert-led courses, interactive content, and achieve your goals with Learnex.
            </p>
            <div className="flex gap-4 animate-fadeInUp delay-300">
              <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
                Start Learning Free
                <ChevronRight size={20} />
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center gap-2">
                <Play size={20} />
                Watch Demo
              </button>
            </div>
            <div className="flex gap-8 pt-4 animate-fadeInUp delay-400">
              <div>
                <div className="text-3xl font-bold text-purple-600">50K+</div>
                <div className="text-gray-600">Active Learners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">1000+</div>
                <div className="text-gray-600">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">98%</div>
                <div className="text-gray-600">Satisfaction</div>
              </div>
            </div>
          </div>
          <div className="relative animate-slideInRight">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-3xl blur-3xl opacity-30 animate-pulse-slow"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-3 rounded-xl">
                    <BookOpen className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-purple-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shimmer" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Course Progress: 75%</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {['Introduction to Design', 'Advanced Concepts', 'Final Project'].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="text-purple-600" size={20} />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-gradient-to-br from-purple-500 to-purple-700 p-4 rounded-xl text-white">
                    <TrendingUp size={24} />
                    <div className="text-2xl font-bold mt-2">+25%</div>
                    <div className="text-sm opacity-90">This Week</div>
                  </div>
                  <div className="flex-1 bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-xl text-white">
                    <Award size={24} />
                    <div className="text-2xl font-bold mt-2">12</div>
                    <div className="text-sm opacity-90">Certificates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-purple-600">Learnex?</span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to succeed in your learning journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Expert Content', desc: 'Learn from industry professionals with real-world experience' },
              { icon: Users, title: 'Community Support', desc: 'Connect with fellow learners and grow together' },
              { icon: Award, title: 'Certificates', desc: 'Earn recognized certificates to boost your career' },
              { icon: Sparkles, title: 'Interactive Learning', desc: 'Engage with hands-on projects and quizzes' },
              { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor your growth with detailed analytics' },
              { icon: GraduationCap, title: 'Flexible Learning', desc: 'Study at your own pace, anytime, anywhere' }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10 shimmer"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold text-white mb-4 animate-fadeInUp">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-purple-100 mb-8 animate-fadeInUp delay-100">
                Join 50,000+ learners already transforming their careers with Learnex
              </p>
              <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-fadeInUp delay-200">
                Get Started Today - It's Free!
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}