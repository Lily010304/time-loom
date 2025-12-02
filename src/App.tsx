import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ErasPage } from './pages/ErasPage';
import { GalleryPage } from './pages/GalleryPage';
import { EventExplorerPage } from './pages/EventExplorerPage';
import { HistoricalMapPage } from './pages/HistoricalMapPage';
import { TimelinePage } from './pages/TimelinePage';
import { EventDetailPage } from './pages/EventDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page - Home */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Eras Page */}
        <Route path="/eras" element={<ErasPage />} />
        
        {/* Gallery/Chronicles & Stories Page */}
        <Route path="/gallery" element={<GalleryPage />} />
        
        {/* Event Explorer Page */}
        <Route path="/explorer" element={<EventExplorerPage />} />
        
        {/* Historical Map Page */}
        <Route path="/map" element={<HistoricalMapPage />} />
        
        {/* Timeline World Page */}
        <Route path="/timeline" element={<TimelinePage />} />
        
        {/* Event Detail Page */}
        <Route path="/event/:id" element={<EventDetailPage />} />
        
        {/* Story Detail Page (placeholder) */}
        <Route path="/story/:id" element={<EventDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
