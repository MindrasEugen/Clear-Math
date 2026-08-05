import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import WorkspacePage from './pages/WorkspacePage';
import ReviewPage from './pages/ReviewPage';

/**
 * Applicazione principale ClearMath
 * Gestisce routing e contesto globale
 */
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <DashboardPage />
            </Layout>
          } />
          <Route path="/dashboard" element={
            <Layout>
              <DashboardPage />
            </Layout>
          } />
          <Route path="/workspace" element={
            <Layout>
              <WorkspacePage />
            </Layout>
          } />
          <Route path="/review" element={
            <Layout>
              <ReviewPage />
            </Layout>
          } />
          {/* Fallback per route sconosciute */}
          <Route path="*" element={
            <Layout>
              <DashboardPage />
            </Layout>
          } />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
