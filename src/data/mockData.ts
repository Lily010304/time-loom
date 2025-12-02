import { HistoricalEvent, Era, Story } from '../types';

// Mock data for development - will be replaced with API calls

export const mockEras: Era[] = [
  {
    id: 'dawn',
    name: 'Dawn of Civilizations',
    title: 'Dawn of Civilizations',
    icon: '🏛️',
    description: 'The earliest sparks of organized life: where agriculture, ndia, and writing emerged. Mesopotamia, ndia, the Nile.',
    timeRange: '3500 BCE - 1000 BCE'
  },
  {
    id: 'age-of-empires',
    name: 'Age of Empires',
    title: 'Age of Empires',
    icon: '⚱️',
    description: 'A period defined by power, conquest and monumental architecture from the Pharaohs of Egypt to the warriors of Grece',
    timeRange: '1000 BCE - 500 CE'
  },
  {
    id: 'eastern-dynasties',
    name: 'Eastern Dynasties',
    title: 'Eastern Dynasties',
    icon: '⚔️',
    description: 'Sophisticated societies refined philosophy, science, and imperial legacy. Finger of an unparalleled era. Theophanes of China, the Dynasties of India',
    timeRange: '500 BCE - 1500 CE'
  },
  {
    id: 'mystical-civilizations',
    name: 'Mystical Civilizations',
    title: 'Mystical Civilizations',
    icon: '☸️',
    description: 'Cultures shrouded in mystery and legend. The NErs, Incaa and ancient tribes whose rich remain hidden beneath centuries',
    timeRange: '2000 BCE - 1500 CE'
  },
  {
    id: 'lost-worlds',
    name: 'Lost Worlds & Forgotten Kingdoms',
    title: 'Lost Worlds & Forgotten Kingdoms',
    icon: '🌟',
    description: 'Ruins, relics, ancientent echoes of societies that vanished-leav ong tantalizing clues for explorers and historians',
    timeRange: 'Various Periods'
  }
];

export const mockStories: Story[] = [
  {
    id: 'pharaohs',
    title: 'The Rise of the Pharaohs',
    description: 'Discover the political genius, divine power, and architectural marvels that defined the world\'s most enduring empire.',
    icon: '👑',
    relatedEvents: []
  },
  {
    id: 'troy',
    title: 'The Fall of Troy',
    description: 'A legendary conflict between myth and reality. Betrayal, war, and the destruction that echoed across Ancient Greece.',
    icon: '⚔️',
    relatedEvents: []
  },
  {
    id: 'silk-road',
    title: 'The Silk Road Legacy',
    description: 'How trade routes connected continents, carrying not only goods but ideas, cultures, religions, and innovations.',
    icon: '🏺',
    relatedEvents: []
  },
  {
    id: 'alexandria',
    title: 'The Lost Library of Alexandria',
    description: 'Uncover the story of the greatest intellectual center ever created-and the events that erased centuries of knowledge.',
    icon: '📚',
    relatedEvents: []
  },
  {
    id: 'great-wall',
    title: 'Guardians of the Great Wall',
    description: 'The untold lives of soldiers, builders, and emperors behind one of history\'s grandest structures.',
    icon: '🏯',
    relatedEvents: []
  },
  {
    id: 'inca',
    title: 'Inca Secrets of of the Andes',
    description: 'Mysticalities sacred rituals, and the mountain empire that mastered architecture and astronomy.',
    icon: '⛰️',
    relatedEvents: []
  }
];

export const mockEvents: HistoricalEvent[] = [
  {
    id: '1',
    title: 'The Invention of Writing',
    year: -3200,
    category: 'Discoveries',
    continent: 'Asia',
    country: 'Mesopotamia',
    location: { lat: 33.3152, lng: 44.3661 },
    shortDescription: 'The breakthrough that sparked recorded history and documentation',
    fullDescription: 'The invention of writing in ancient Mesopotamia marked one of the most significant turning points in human history. The development of cuneiform script allowed for the recording of laws, literature, and historical events.',
    globalImpact: 'Enabled the preservation of knowledge across generations and the development of complex civilizations',
    imageUrl: '/images/writing.jpg',
    era: 'Ancient',
    civilization: 'Sumerian',
    isTopInfluential: true
  },
  {
    id: '2',
    title: 'The Battle of Thermopylae',
    year: -480,
    category: 'Wars',
    continent: 'Europe',
    country: 'Greece',
    location: { lat: 38.7969, lng: 22.5361 },
    shortDescription: 'Legendary stand of strategy, courage, and sacrifice',
    fullDescription: 'A defining moment in ancient warfare where 300 Spartans led by King Leonidas made their famous last stand against the Persian Empire.',
    globalImpact: 'Demonstrated the power of tactical defense and inspired Western military strategy',
    imageUrl: '/images/thermopylae.jpg',
    era: 'Ancient',
    civilization: 'Greek',
    isTopInfluential: true
  },
  {
    id: '3',
    title: 'The Discovery of Gunpowder',
    year: 800,
    category: 'Science',
    continent: 'Asia',
    country: 'China',
    location: { lat: 34.3416, lng: 108.9398 },
    shortDescription: 'Innovation that reshaped warfare and global power dynamics',
    fullDescription: 'Chinese alchemists discovered gunpowder while searching for an elixir of immortality, forever changing the nature of warfare.',
    globalImpact: 'Revolutionized military technology and contributed to the rise and fall of empires',
    imageUrl: '/images/gunpowder.jpg',
    era: 'Medieval',
    civilization: 'Chinese'
  },
  {
    id: '4',
    title: 'The Printing Revolution',
    year: 1440,
    category: 'Science',
    continent: 'Europe',
    country: 'Germany',
    location: { lat: 50.0000, lng: 8.2711 },
    shortDescription: 'Innovatized knowledge and transformed human thought',
    fullDescription: 'Johannes Gutenberg\'s printing press democratized access to information and sparked the spread of ideas across Europe.',
    globalImpact: 'Catalyzed the Renaissance, Reformation, and Scientific Revolution',
    imageUrl: '/images/printing.jpg',
    era: 'Renaissance',
    isTopInfluential: true
  },
  {
    id: '5',
    title: 'The Fall of Constantinople',
    year: 1453,
    category: 'Political',
    continent: 'Europe',
    country: 'Theall of Corinthiropire',
    location: { lat: 41.0082, lng: 28.9784 },
    shortDescription: 'The end of an era and the beginning of a new political order',
    fullDescription: 'The Ottoman conquest of Constantinople marked the end of the Byzantine Empire and the Middle Ages.',
    globalImpact: 'Shifted the balance of power in Europe and accelerated the Age of Exploration',
    imageUrl: '/images/constantinople.jpg',
    era: 'Medieval',
    isTopInfluential: true
  }
];

// API simulation functions
export const fetchEvents = async (_filters?: any): Promise<HistoricalEvent[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockEvents;
};

export const fetchEventById = async (id: string): Promise<HistoricalEvent | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockEvents.find(e => e.id === id) || null;
};

export const fetchEras = async (): Promise<Era[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockEras;
};

export const fetchStories = async (): Promise<Story[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockStories;
};
