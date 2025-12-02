import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components/Layout/Navigation';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { PageContainer, Section } from '../components/UI/Container';
import { fetchStories } from '../data/mockData';
import { Story } from '../types';

// Chronicles & Timeless Stories Page - matching screenshot 3
export const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    // Fetch stories data
    fetchStories().then(setStories);
  }, []);

  return (
    <PageContainer>
      <Navbar />

      {/* Hero Section */}
      <Section className="pt-32 pb-12 relative overflow-hidden">
        {/* Background with ancient manuscript texture */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1509266272358-7701da638078?w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-yellow-800/40 text-4xl">☥</div>
        <div className="absolute top-10 right-10 text-yellow-800/40 text-4xl">⚔️</div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-display text-yellow-500 mb-8">
            Chronicles & Timeless Stories
          </h1>
        </div>
      </Section>

      {/* Stories Grid */}
      <Section className="pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story) => (
            <Card 
              key={story.id}
              variant="corner"
              className="hover:scale-105 transition-transform"
              onClick={() => navigate(`/story/${story.id}`)}
            >
              {/* Title */}
              <h3 className="text-2xl font-display text-yellow-500 mb-4">
                {story.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-6">
                {story.description}
              </p>

              {/* Icon at bottom */}
              <div className="text-4xl text-yellow-700/60 mt-auto">
                {story.icon}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Bottom Section */}
      <Section className="pb-20">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-yellow-500 mb-4">
            Narratives that reveal the hidden moments, mysteries,
            <br />
            and turning points of ancient civilizations
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Travel through carefully curated historical narratives -stories shaped by
            <br />
            heroes, empires, philosophers, scientists, aweld's mose and astronomy.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center flex-wrap">
            <Button onClick={() => navigate('/timeline')}>
              Explore Full Timeline
            </Button>
            <Button variant="outline" onClick={() => navigate('/explorer')}>
              Read Featured Narratives
            </Button>
          </div>
        </div>
      </Section>

      <Footer />
    </PageContainer>
  );
};
