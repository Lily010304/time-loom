import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout/Navigation';
import { Button } from '../components/UI/Button';
import { PageContainer } from '../components/UI/Container';
import { fetchEvents } from '../services/api';
import { HistoricalEvent } from '../types';

// Historical World Map Page - matching screenshot 5
export const HistoricalMapPage: React.FC = () => {
  const navigate = useNavigate();
  const [_events, setEvents] = useState<HistoricalEvent[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<HistoricalEvent[]>([]);
  const [filters, setFilters] = useState({
    eventCategory: 'Event Title',
    year: '',
    civilization: '',
    category: ''
  });

  useEffect(() => {
    // Fetch events data
    fetchEvents().then(data => {
      setEvents(data);
      setSelectedEvents(data.slice(0, 3)); // Show first 3 events in sidebar
    });
  }, []);

  return (
    <PageContainer>
      <Navbar />

      <div className="pt-20 min-h-screen relative">
        {/* Header */}
        <div className="absolute top-24 left-0 right-0 z-[1000] px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl font-display text-yellow-500 mb-2 text-center">
              Historical World Map
            </h1>
            <p className="text-xl text-gray-400 text-center">
              Explore the geographic origins of major world events
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="absolute top-48 left-0 right-0 bottom-0 flex">
          {/* Left Sidebar - Filters & Event List */}
          <div className="w-80 bg-black/90 backdrop-blur-md p-6 overflow-y-auto border-r-2 border-yellow-700/30">
            <h3 className="text-yellow-500 font-semibold mb-4">Event Category:</h3>
            
            {/* Filter Dropdowns */}
            <div className="space-y-3 mb-6">
              <select 
                className="w-full bg-black/60 border border-yellow-700/50 rounded px-3 py-2 text-white"
                value={filters.eventCategory}
                onChange={(e) => setFilters({...filters, eventCategory: e.target.value})}
              >
                <option>Event Title</option>
                <option>Wars</option>
                <option>Science</option>
                <option>Culture</option>
              </select>

              <select 
                className="w-full bg-black/60 border border-yellow-700/50 rounded px-3 py-2 text-white"
                value={filters.year}
                onChange={(e) => setFilters({...filters, year: e.target.value})}
              >
                <option value="">Year</option>
                <option>Ancient</option>
                <option>Medieval</option>
                <option>Modern</option>
              </select>

              <select 
                className="w-full bg-black/60 border border-yellow-700/50 rounded px-3 py-2 text-white"
                value={filters.civilization}
                onChange={(e) => setFilters({...filters, civilization: e.target.value})}
              >
                <option value="">Civilization/Region</option>
                <option>Egyptian</option>
                <option>Greek</option>
                <option>Roman</option>
              </select>

              <select 
                className="w-full bg-black/60 border border-yellow-700/50 rounded px-3 py-2 text-white"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">Category</option>
                <option>Architecture</option>
                <option>Political</option>
                <option>Cultural</option>
              </select>

              <Button variant="outline" className="w-full !py-2">
                View Details
              </Button>
            </div>

            {/* Event List */}
            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-black/60 border border-yellow-700/30 rounded p-3 hover:border-yellow-500 transition-colors cursor-pointer"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm mb-1">
                        {event.title},
                      </h4>
                      <p className="text-gray-400 text-xs">
                        {event.country}-{Math.abs(event.year)}{event.year < 0 ? 'BCE' : 'CE'}-{event.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center - 3D Globe/Map */}
          <div className="flex-1 relative">
            {/* Globe background image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-4xl max-h-4xl">
                {/* 3D Globe visualization */}
                <div 
                  className="w-full h-full bg-center bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200")',
                    filter: 'sepia(0.8) hue-rotate(20deg) brightness(0.6)'
                  }}
                />
                
                {/* Event markers on globe */}
                <div className="absolute top-1/4 left-1/3 flex items-center gap-2 group cursor-pointer">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full relative z-10"></div>
                  <div className="hidden group-hover:block bg-black/90 border-2 border-yellow-600 rounded px-3 py-2 text-sm whitespace-nowrap">
                    <div className="text-yellow-500 font-semibold">📜 EventTitle</div>
                  </div>
                </div>

                <div className="absolute top-1/3 right-1/3 flex items-center gap-2 group cursor-pointer">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full relative z-10"></div>
                  <div className="hidden group-hover:block bg-black/90 border-2 border-yellow-600 rounded px-3 py-2 text-sm whitespace-nowrap">
                    <div className="text-yellow-500 font-semibold">⚔️ EventTitle</div>
                  </div>
                </div>

                <div className="absolute bottom-1/3 left-1/4 flex items-center gap-2 group cursor-pointer">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping absolute"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full relative z-10"></div>
                  <div className="hidden group-hover:block bg-black/90 border-2 border-yellow-600 rounded px-3 py-2 text-sm whitespace-nowrap">
                    <div className="text-yellow-500 font-semibold">🏛️ EventTitle</div>
                  </div>
                </div>

                {/* Orbital ring effect */}
                <div className="absolute inset-0 border-4 border-yellow-600/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Selectors */}
          <div className="w-64 bg-black/90 backdrop-blur-md p-6 border-l-2 border-yellow-700/30">
            <div className="space-y-6">
              {/* Era Selector */}
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">EraSelector:</h3>
                <p className="text-xs text-gray-500 mb-2">
                  nearY
                  <br />
                  Wars, Science, Empire,
                  <br />
                  Culture,Disasters
                </p>
                <div className="text-yellow-500 font-semibold">Era Selector</div>
                <p className="text-xs text-gray-400">
                  Ancient/Medieval
                  <br />
                  Renaissance/Modern
                </p>
              </div>

              {/* Continent Filter */}
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Continent</h3>
                <p className="text-xs text-gray-400">
                  Filter
                  <br />
                  Africa,
                  <br />
                  Euspe,
                  <br />
                  Acolia,
                  <br />
                  Amearia
                </p>
                <div className="text-yellow-500 font-semibold mt-2">Continent</div>
                <p className="text-xs text-gray-400">
                  Africi,
                  <br />
                  Europe,
                  <br />
                  Acodia,
                  <br />
                  Oceania
                </p>
              </div>

              {/* Time Range */}
              <div>
                <h3 className="text-yellow-500 font-semibold mb-2">Time Range</h3>
                <p className="text-xs text-gray-400">
                  sia,Americas,Oceania
                </p>
                
                {/* Timeline slider */}
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Time</span>
                    <span>Time</span>
                  </div>
                  <div className="h-2 bg-yellow-900/30 rounded-full relative">
                    <div className="absolute left-0 w-3 h-3 bg-yellow-500 rounded-full top-1/2 -translate-y-1/2"></div>
                    <div className="absolute right-0 w-3 h-3 bg-yellow-500 rounded-full top-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 border-t-2 border-yellow-700/30 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-serif text-yellow-500 mb-4">
              Trace the footsteps of ancient
              <br />
              civilizations across the globe
            </h2>
            
            <div className="flex gap-6 justify-center flex-wrap mt-6">
              <Button onClick={() => navigate('/timeline')}>
                Explore Timeline
              </Button>
              <Button variant="outline" onClick={() => navigate('/explorer')}>
                Opn Event Explorer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </PageContainer>
  );
};
