import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  Users,
  TrendingUp,
  ChevronRight,
  Play,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Heart
} from 'lucide-react';
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
      <LearnexNavbar />

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

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-purple-700 bg-opacity-20 p-2 rounded-xl backdrop-blur-sm">
                  <GraduationCap className="text-purple-300" size={40} />
                </div>
                <span className="text-2xl font-bold">Learnex</span>
              </div>
              <p className="text-purple-200 leading-relaxed">
                Empowering learners worldwide with quality education and innovative learning experiences.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#', color: 'text-blue-500' },
                  { icon: Twitter, href: '#', color: 'text-sky-400' },
                  { icon: Instagram, href: '#', color: 'text-pink-500' },
                  { icon: Linkedin, href: '#', color: 'text-blue-600' },
                  { icon: Youtube, href: '#', color: 'text-red-500' }
                ].map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white bg-opacity-20 p-2 rounded-lg hover:bg-opacity-30 transition-all duration-300 hover:scale-110"
                    >
                      <Icon size={20} className={`${social.color}`} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Courses', 'Instructors', 'Success Stories', 'Blog', 'Careers'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'FAQs', 'Terms of Service', 'Privacy Policy', 'Refund Policy'].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-purple-200 hover:text-white transition-colors flex items-center gap-2 group">
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="text-purple-300 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-purple-200 text-sm">Email</p>
                    <a href="mailto:support@learnex.com" className="text-white hover:text-purple-200 transition-colors">
                      support@learnex.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-purple-300 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-purple-200 text-sm">Phone</p>
                    <a href="tel:+91-7908673050" className="text-white hover:text-purple-200 transition-colors">
                      +91-7908673050
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="text-purple-300 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-purple-200 text-sm">Address</p>
                    <p className="text-white">
                      Salt Lake Sector 4, Bidhannagar<br />
                      Kolkata-700098
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-purple-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-purple-200 text-sm">
              © 2025 Learnex. All rights reserved.
            </p>
            <p className="text-purple-200 text-sm flex items-center gap-2">
              Made with <Heart className="text-red-400 fill-red-400" size={16} /> for learners worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
