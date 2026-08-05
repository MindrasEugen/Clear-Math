import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { SIDEBAR_WIDTH, HEADER_HEIGHT, COLORS } from '../data/constants';

/**
 * Componente Layout principale
 * Contiene Header, Sidebar e gestisce lo spazio per il contenuto
 */
export default function Layout({ children }) {
  return (
    <div 
      className="min-vh-100"
      style={{ 
        backgroundColor: COLORS.BACKGROUND,
        paddingTop: HEADER_HEIGHT
      }}
    >
      {/* Header */}
      <Header />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main 
        className="position-relative"
        style={{
          marginLeft: SIDEBAR_WIDTH,
          minHeight: `calc(100vh - ${HEADER_HEIGHT})`
        }}
      >
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
