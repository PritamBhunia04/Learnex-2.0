import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LearnexLanding from './components/LearnexLanding'
import StudentSignup from './components/StudentSignup';
import StudentLogin from './components/StudentLogin';
import InstructorLogin from './components/InstructorLogin';
import StudentStudyPage from './components/StudentStudyPage'
import ProtectedRoutes from './components/ProtectedRoutes';
import CoursePage from './components/CoursePage';
import DoubtBoxPage from './components/DoubtBoxPage';
import ScholarshipPage from './components/ScholarshipPage';
import NotificationPage from './components/NotificationPage';
import CourseDetailsPage from './components/CourseDetailsPage';
import InstructorPage from './components/InstructorPage'

function App() {

  return (
    <>

    <Router>
        <Routes>
        {/* Landing page */}

        <Route
          path="/"
          element={
            localStorage.getItem("userEmail")
              ? <Navigate to={`/${localStorage.getItem("userEmail")}/study`} />
              : <LearnexLanding/>
          }
        />
            
        <Route path="/stdsignup" element={<StudentSignup />} />
        <Route path="/stdlogin" element={<StudentLogin />} />
        <Route path="/inslogin" element={<InstructorLogin />} />


          <Route path="/:name/study" element={
            <ProtectedRoutes>
              <StudentStudyPage />
            </ProtectedRoutes>
            } />


          <Route path="/:name/courses" element={
            <ProtectedRoutes>
              <CoursePage />
            </ProtectedRoutes>
            } />

          <Route path="/:name/courses/details" element={
            <ProtectedRoutes>
              <CourseDetailsPage />
            </ProtectedRoutes>
            } />


          <Route path="/:name/doubts" element={
            <ProtectedRoutes>
              <DoubtBoxPage />
            </ProtectedRoutes>
            } />


          <Route path="/:name/scholarship" element={
            <ProtectedRoutes>
              <ScholarshipPage />
            </ProtectedRoutes>
            } />


          <Route path="/:name/notifications" element={
            <ProtectedRoutes>
              <NotificationPage />
            </ProtectedRoutes>
            } />

          <Route path="/:id/insthome" element={
              <InstructorPage />
            } />
e

        </Routes>
      </Router>
    </>
  )
}

export default App
