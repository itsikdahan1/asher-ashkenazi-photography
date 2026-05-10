/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';
import WhatsAppButton from './components/WhatsAppButton';
import AccessibilityButton from './components/AccessibilityButton';
import { useEffect } from 'react';
import { ContentProvider } from './contexts/ContentContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <WhatsAppButton />
        <AccessibilityButton />
      </Router>
    </ContentProvider>
  );
}
