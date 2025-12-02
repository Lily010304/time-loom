import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout/Navigation';
import { Button } from '../components/UI/Button';
import { PageContainer, Section } from '../components/UI/Container';
import { fetchEvents } from '../services/api';
import { HistoricalEvent } from '../types';

// Event Explorer Page - matching screenshot 4
export const EventExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [filters, _setFilters] = useState({
    era: 'Ancient-Medieval-Renaissance-Industrial-Modern',
    continent: 'Africa-Asia-Europe-Americas-Oceania',
    category: 'Wars-Science-Discoveries-Culture-Catastrophes'
  });

  useEffect(() => {
    // Fetch events data
    fetchEvents().then(setEvents);
  }, []);

  return (
    <PageContainer>
      <Navbar />

      {/* Header Section */}
      <Section className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-display text-yellow-500 mb-4">
            Event Explorer
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Browse, filter, and navigate through the world's most influential historical eventsv
          </p>
          <p className="text-gray-500">
            search across centuries of human history. Filter events by continent, era, category, or timeline to uncover the
            <br />
            connectionoverinasctvime lininas
          </p>
        </div>
      </Section>

      {/* Filters Section */}
      <Section className="py-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter Pills */}
          <div className="space-y-4 mb-8">
            {/* Era Filter */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-yellow-500 font-semibold min-w-[120px]">
                Era({filters.era.split('-').length})
              </span>
              <div className="flex-1 bg-black/40 border border-yellow-700/30 rounded-full px-6 py-3 text-gray-400">
                {filters.era}
              </div>
            </div>

            {/* Continent Filter */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-yellow-500 font-semibold min-w-[120px]">
                Continent({filters.continent.split('-').length})
              </span>
              <div className="flex-1 bg-black/40 border border-yellow-700/30 rounded-full px-6 py-3 text-gray-400">
                {filters.continent}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-yellow-500 font-semibold min-w-[120px]">
                Category ({filters.category.split('-').length})
              </span>
              <div className="flex-1 bg-black/40 border border-yellow-700/30 rounded-full px-6 py-3 text-gray-400">
                {filters.category}
              </div>
            </div>
          </div>

          {/* Timeline Slider */}
          <div className="relative">
            <div className="h-2 bg-yellow-900/30 rounded-full relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full" style={{ width: '70%' }}></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-black cursor-pointer"></div>
            </div>
            <div className="flex justify-end mt-2">
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </Section>

      {/* Events Table */}
      <Section className="pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="border-2 border-yellow-700/30 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 bg-black/60 px-6 py-4 border-b-2 border-yellow-700/30">
              <div className="col-span-3 text-yellow-500 font-semibold">Event Title</div>
              <div className="col-span-1 text-yellow-500 font-semibold text-center">Year</div>
              <div className="col-span-3 text-yellow-500 font-semibold">Location</div>
              <div className="col-span-2 text-yellow-500 font-semibold">Category</div>
              <div className="col-span-2 text-yellow-500 font-semibold">Short Description</div>
              <div className="col-span-1 text-yellow-500 font-semibold text-center">View Details</div>
            </div>

            {/* Table Rows */}
            {events.map((event, index) => (
              <div 
                key={event.id}
                className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-yellow-900/10 transition-colors cursor-pointer ${
                  index % 2 === 0 ? 'bg-black/20' : 'bg-black/40'
                }`}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <div className="col-span-3 text-white font-semibold flex items-center gap-2">
                  {event.title}, {Math.abs(event.year)} {event.year < 0 ? 'BCE' : 'CE'} •
                </div>
                <div className="col-span-1 text-gray-400 text-center">
                  {Math.abs(event.year)} {event.year < 0 ? 'BCE' : 'CE'}
                </div>
                <div className="col-span-3 text-gray-400">
                  {event.country} - {event.shortDescription.substring(0, 30)}...
                </div>
                <div className="col-span-2 text-gray-400">
                  {event.category}
                </div>
                <div className="col-span-2 text-gray-400">
                  {event.shortDescription}
                </div>
                <div className="col-span-1 flex justify-center items-center">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Buttons */}
      <Section className="pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex gap-6 justify-center flex-wrap">
            <Button onClick={() => navigate('/map')}>
              View Historical Map
            </Button>
            <Button onClick={() => navigate('/timeline')}>
              Explore Timeline
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </PageContainer>
  );
};
