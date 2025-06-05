import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import OnboardingForms from './components/OnboardingForms/OnboardingForms'
import LoginForm from './components/features/Loginform'
import ProtectedRoute from './ProtectedRoute'
// import other components as needed

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
              <Route
                  path="/onboarding"
                  element={
                      <ProtectedRoute>
                          <OnboardingForms />
                      </ProtectedRoute>
                  }
              />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  )
}

export default AppRoutes