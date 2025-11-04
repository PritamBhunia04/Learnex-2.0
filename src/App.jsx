import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LearnexLanding from './components/LearnexLanding'
import StudentSignup from './components/StudentSignup';
import StudentLogin from './components/StudentLogin';
import InstructorLogin from './components/InstructorLogin';
import StudentStudyPage from './components/StudentStudyPage'

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
              ? <Navigate to={`/${localStorage.getItem("userEmail")}/home`} />
              : <LearnexLanding/>
          }
        />
            
        <Route path="/stdsignup" element={<StudentSignup />} />
        <Route path="/stdlogin" element={<StudentLogin />} />
        <Route path="/inslogin" element={<InstructorLogin />} />

        <Route path=":name/study" element={<StudentStudyPage />} />
e

        </Routes>
      </Router>
    </>
  )
}

export default App
