import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout/Navigation';
import { Button } from '../components/UI/Button';
import { PageContainer, Section } from '../components/UI/Container';
import { fetchEvents } from '../services/api';
import { HistoricalEvent } from '../types';

// Timeline World Page
export const TimelinePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [yearRange, setYearRange] = useState({ from: 0, to: 2025 });
  const [selectedEra, setSelectedEra] = useState(searchParams.get('era') || 'all');

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  // Group events by century for timeline display
  const groupedEvents = events.reduce((acc, event) => {
    const century = Math.floor(Math.abs(event.year) / 100) * 100;
    const key = event.year < 0 ? `-${century}` : `${century}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(event);
    return acc;
  }, {} as Record<string, HistoricalEvent[]>);

  const sortedCenturies = Object.keys(groupedEvents).sort((a, b) => {
    const numA = parseInt(a);
    const numB = parseInt(b);
    return numA - numB;
  });

  return (
    <PageContainer>
      <Navbar />

      <Section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-display text-yellow-500 mb-4 text-center">
            Timeline World
          </h1>
          <p className="text-xl text-gray-400 text-center mb-8">
            A journey through time from year 0 to the present
          </p>

          {/* Era filters */}
          <div className="flex gap-4 justify-center mb-8 flex-wrap">
            {['all', 'Ancient', 'Medieval', 'Renaissance', 'Industrial', 'Modern'].map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`px-6 py-2 rounded-full border-2 transition-all ${
                  selectedEra === era
                    ? 'bg-yellow-600 border-yellow-600 text-black'
                    : 'border-yellow-700/50 text-yellow-500 hover:border-yellow-500'
                }`}
              >
                {era === 'all' ? 'All Eras' : era}
              </button>
            ))}
          </div>

          {/* Custom date range inputs */}
          <div className="flex gap-4 justify-center items-center mb-12">
            <input
              type="number"
              placeholder="From Year"
              value={yearRange.from}
              onChange={(e) => setYearRange({ ...yearRange, from: parseInt(e.target.value) || 0 })}
              className="px-4 py-2 bg-black/60 border border-yellow-700/50 rounded text-white w-32"
            />
            <span className="text-yellow-500">to</span>
            <input
              type="number"
              placeholder="To Year"
              value={yearRange.to}
              onChange={(e) => setYearRange({ ...yearRange, to: parseInt(e.target.value) || 2025 })}
              className="px-4 py-2 bg-black/60 border border-yellow-700/50 rounded text-white w-32"
            />
          </div>
        </div>
      </Section>

      {/* Horizontal Timeline */}
      <Section className="pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Timeline visualization */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900"></div>

            {/* Timeline events */}
            <div className="relative space-y-12">
              {sortedCenturies.map((century) => (
                <div key={century} className="relative">
                  {/* Century marker */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <h3 className="text-2xl font-display text-yellow-500">
                      {Math.abs(parseInt(century))}s {parseInt(century) < 0 ? 'BCE' : 'CE'}
                    </h3>
                  </div>

                  {/* Events in this century */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-8">
                    {groupedEvents[century]
                      .filter(event => selectedEra === 'all' || event.era === selectedEra)
                      .map((event) => (
                        <div
                          key={event.id}
                          onClick={() => navigate(`/event/${event.id}`)}
                          className="bg-black/40 border-2 border-yellow-700/30 rounded-lg p-4 hover:border-yellow-500 hover:scale-105 transition-all cursor-pointer"
                        >
                          <h4 className="text-yellow-500 font-semibold mb-2">
                            {event.title}
                          </h4>
                          <p className="text-gray-400 text-sm mb-2">
                            {Math.abs(event.year)} {event.year < 0 ? 'BCE' : 'CE'} • {event.category}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {event.shortDescription}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button onClick={() => navigate('/explorer')}>
              Explore All Events
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </PageContainer>
  );
};
