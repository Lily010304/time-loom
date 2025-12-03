import { HistoricalEvent } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface BackendEvent {
  _id: string;
  id: string;
  title: string;
  year: number;
  era?: string;
  category?: string;
  shortDescription?: string;
  longDescription?: string;
  continent?: string;
  country?: string;
  locationName?: string;
  location?: {
    lat: number;
    lng: number;
  };
  coordinates?: {
    type: string;
    coordinates: [number, number]; // [lng, lat]
  };
  imageUrl?: string;
}

const mapBackendEventToHistoricalEvent = (event: BackendEvent): HistoricalEvent => {
  // Use location object if available, otherwise fall back to coordinates array
  let lat = 0, lng = 0;
  if (event.location) {
    lat = event.location.lat;
    lng = event.location.lng;
  } else if (event.coordinates?.coordinates) {
    [lng, lat] = event.coordinates.coordinates;
  }

  return {
    id: event.id, // Use the custom id field instead of _id
    title: event.title,
    year: event.year,
    category: (event.category as HistoricalEvent['category']) || 'Science',
    continent: (event.continent as HistoricalEvent['continent']) || 'Asia',
    country: event.country || event.locationName || 'Unknown',
    location: {
      lat,
      lng
    },
    shortDescription: event.shortDescription || '',
    fullDescription: event.longDescription || event.shortDescription || '',
    globalImpact: '',
    imageUrl: event.imageUrl || 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200',
    era: (event.era as HistoricalEvent['era']) || 'Ancient'
  };
};

export const fetchEvents = async (): Promise<HistoricalEvent[]> => {
  const response = await fetch(`${API_BASE}/events`);

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const json = await response.json();
  const events: BackendEvent[] = Array.isArray(json) ? json : json.data || [];

  return events.map(mapBackendEventToHistoricalEvent);
};

export const fetchEventById = async (id: string): Promise<HistoricalEvent | null> => {
  const response = await fetch(`${API_BASE}/events/${id}`);

  if (!response.ok) {
    return null;
  }

  const event = (await response.json()) as BackendEvent;
  return mapBackendEventToHistoricalEvent(event);
};
