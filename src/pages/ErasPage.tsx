import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout/Navigation';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { PageContainer, Section } from '../components/UI/Container';
import { fetchEras } from '../data/mockData';
import { Era } from '../types';

// Eras Page - matching screenshot 2
export const ErasPage: React.FC = () => {
  const navigate = useNavigate();
  const [eras, setEras] = useState<Era[]>([]);

  useEffect(() => {
    // Fetch eras data
    fetchEras().then(setEras);
  }, []);

  // Icon mapping for eras
  const getEraIcon = (eraId: string) => {
    const icons: Record<string, string> = {
      'dawn': '🏛️',
      'age-of-empires': '⚱️',
      'eastern-dynasties': '⚔️',
      'mystical-civilizations': '☸️',
      'lost-worlds': '🌟'
    };
    return icons[eraId] || '📜';
  };

  return (
    <PageContainer>
      <Navbar />

      {/* Hero Section */}
      <Section className="pt-32 pb-12 relative">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'grayscale(1)'
          }}
        />

        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-12 py-4">
          <div className="text-yellow-700 text-3xl">⚜</div>
          <div className="text-yellow-700 text-3xl">☥</div>
          <div className="text-yellow-700 text-3xl">⚜</div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display text-yellow-500 mb-6">
            Eras of the Ancient World
          </h1>
          <h2 className="text-3xl font-serif text-white mb-4">
            A journey through the civilizations
            <br />
            that shaped humanity.
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Discover the rise, triumph, and fall of the world's greatest civilizations.
            <br />
            Each era holds untold stories, forgotten knowe, avrilett.
          </p>
        </div>
      </Section>

      {/* Eras Grid */}
      <Section className="pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {eras.map((era) => (
            <Card 
              key={era.id}
              variant="corner"
              className="text-center hover:scale-105 transition-transform"
              onClick={() => navigate(`/timeline?era=${era.id}`)}
            >
              {/* Icon */}
              <div className="text-6xl mb-4 filter drop-shadow-lg">
                {getEraIcon(era.id)}
              </div>

              {/* Title */}
              <h3 className="text-xl font-display text-yellow-500 mb-3">
                {era.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {era.description}
              </p>
            </Card>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-6 justify-center mt-16 flex-wrap">
          <Button variant="outline" onClick={() => navigate('/')}>
            Begin Your Journey
          </Button>
          <Button onClick={() => navigate('/timeline')}>
            Explore Timeline
          </Button>
        </div>
      </Section>

      {/* Decorative bottom border */}
      <div className="absolute bottom-20 left-0 right-0 flex justify-between items-center px-12 py-4 opacity-30">
        <div className="text-yellow-700 text-3xl">☸</div>
        <div className="text-yellow-700 text-3xl">⚔️</div>
        <div className="text-yellow-700 text-3xl">☸</div>
      </div>

      <Footer />
    </PageContainer>
  );
};
