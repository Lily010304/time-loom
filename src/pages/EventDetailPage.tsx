import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout/Navigation';
import { Button } from '../components/UI/Button';
import { PageContainer, Section } from '../components/UI/Container';
import { fetchEventById } from '../services/api';
import { HistoricalEvent } from '../types';

// Event Details Page
export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<HistoricalEvent | null>(null);

  useEffect(() => {
    if (id) {
      fetchEventById(id).then(setEvent);
    }
  }, [id]);

  if (!event) {
    return (
      <PageContainer>
        <Navbar />
        <Section className="pt-32">
          <div className="text-center text-yellow-500">Loading...</div>
        </Section>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Navbar />

      <Section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button 
            onClick={() => navigate(-1)}
            className="text-yellow-500 hover:text-yellow-400 mb-8 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Explorer
          </button>

          {/* Event image */}
          <div className="mb-8 rounded-lg overflow-hidden border-2 border-yellow-700/30">
            <img 
              src={event.imageUrl || 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200'} 
              alt={event.title}
              className="w-full h-96 object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200';
              }}
            />
          </div>

          {/* Event details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-display text-yellow-500 mb-2">
                {event.title}
              </h1>
              <div className="flex gap-4 text-gray-400">
                <span>{Math.abs(event.year)} {event.year < 0 ? 'BCE' : 'CE'}</span>
                <span>•</span>
                <span>{event.category}</span>
                <span>•</span>
                <span>{event.era}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-yellow-700/30">
              <div>
                <h3 className="text-yellow-500 font-semibold mb-1">Location</h3>
                <p className="text-gray-300">{event.country}, {event.continent}</p>
              </div>
              {event.civilization && (
                <div>
                  <h3 className="text-yellow-500 font-semibold mb-1">Civilization</h3>
                  <p className="text-gray-300">{event.civilization}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-yellow-500 font-semibold mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {event.fullDescription}
              </p>
            </div>

            <div>
              <h3 className="text-yellow-500 font-semibold mb-2">Global Impact</h3>
              <p className="text-gray-300 leading-relaxed">
                {event.globalImpact}
              </p>
            </div>

            <div className="flex gap-4 pt-6">
              <Button onClick={() => navigate('/map')}>
                View on Map
              </Button>
              <Button variant="outline" onClick={() => navigate('/timeline')}>
                View in Timeline
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </PageContainer>
  );
};
