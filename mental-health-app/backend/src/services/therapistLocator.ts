import axios from 'axios';

interface Therapist {
  id: string;
  name: string;
  specialty: string[];
  address: string;
  phone: string;
  distance?: number;
  rating?: number;
  acceptingNewPatients: boolean;
  insuranceAccepted?: string[];
  website?: string;
  lat?: number;
  lng?: number;
}

interface LocationCoordinates {
  lat: number;
  lng: number;
}

class TherapistLocatorService {
  private googleApiKey: string;

  constructor() {
    this.googleApiKey = process.env.GOOGLE_MAPS_API_KEY || '';
  }

  /**
   * Get user's location from IP or browser geolocation
   */
  async getUserLocation(ip?: string): Promise<LocationCoordinates | null> {
    try {
      // Try to get location from IP address
      if (ip) {
        const response = await axios.get(`http://ip-api.com/json/${ip}`);
        if (response.data.status === 'success') {
          return {
            lat: response.data.lat,
            lng: response.data.lon
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting user location:', error);
      return null;
    }
  }

  /**
   * Find nearby therapists using Google Places API or mock data
   */
  async findNearbyTherapists(
    location: LocationCoordinates | string,
    radius: number = 10000, // 10km default
    specialty?: string
  ): Promise<Therapist[]> {
    // If Google API key is not available, return mock data
    if (!this.googleApiKey || this.googleApiKey === 'your_google_maps_api_key_here') {
      return this.getMockTherapists(specialty);
    }

    try {
      let coordinates: LocationCoordinates;
      
      // Convert address to coordinates if needed
      if (typeof location === 'string') {
        const geocodeResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json`,
          {
            params: {
              address: location,
              key: this.googleApiKey
            }
          }
        );
        
        if (geocodeResponse.data.results.length > 0) {
          const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
          coordinates = { lat, lng };
        } else {
          throw new Error('Location not found');
        }
      } else {
        coordinates = location;
      }

      // Search for therapists/mental health professionals
      const placesResponse = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${coordinates.lat},${coordinates.lng}`,
            radius: radius,
            type: 'health',
            keyword: `therapist counselor psychologist ${specialty || ''}`,
            key: this.googleApiKey
          }
        }
      );

      // Transform Google Places results to our Therapist format
      const therapists: Therapist[] = placesResponse.data.results.map((place: any) => ({
        id: place.place_id,
        name: place.name,
        specialty: this.inferSpecialty(place.name, place.types),
        address: place.vicinity,
        phone: place.formatted_phone_number || 'Contact for details',
        distance: this.calculateDistance(coordinates, place.geometry.location),
        rating: place.rating,
        acceptingNewPatients: true, // This would need real data
        website: place.website,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      }));

      return therapists.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } catch (error) {
      console.error('Error finding therapists:', error);
      // Fallback to mock data
      return this.getMockTherapists(specialty);
    }
  }

  /**
   * Get mock therapist data for demonstration
   */
  private getMockTherapists(specialty?: string): Therapist[] {
    const mockTherapists: Therapist[] = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson, PhD',
        specialty: ['Anxiety', 'Depression', 'Cognitive Behavioral Therapy'],
        address: '123 Wellness Center Dr, Suite 100',
        phone: '(555) 123-4567',
        distance: 2.5,
        rating: 4.8,
        acceptingNewPatients: true,
        insuranceAccepted: ['Blue Cross', 'Aetna', 'UnitedHealth'],
        website: 'https://example.com/drjohnson'
      },
      {
        id: '2',
        name: 'Michael Chen, LMFT',
        specialty: ['Couples Therapy', 'Family Counseling', 'Trauma'],
        address: '456 Mental Health Blvd, Floor 3',
        phone: '(555) 234-5678',
        distance: 3.8,
        rating: 4.9,
        acceptingNewPatients: true,
        insuranceAccepted: ['Cigna', 'Humana', 'Medicare'],
        website: 'https://example.com/chentherapy'
      },
      {
        id: '3',
        name: 'Dr. Emily Rodriguez, PsyD',
        specialty: ['Child Psychology', 'ADHD', 'Behavioral Therapy'],
        address: '789 Healing Path Way',
        phone: '(555) 345-6789',
        distance: 5.2,
        rating: 4.7,
        acceptingNewPatients: false,
        insuranceAccepted: ['Kaiser', 'Anthem', 'Medicaid'],
        website: 'https://example.com/rodriguez-psychology'
      },
      {
        id: '4',
        name: 'James Wilson, LCSW',
        specialty: ['Addiction Counseling', 'PTSD', 'Group Therapy'],
        address: '321 Recovery Road, Suite 205',
        phone: '(555) 456-7890',
        distance: 6.7,
        rating: 4.6,
        acceptingNewPatients: true,
        insuranceAccepted: ['Blue Shield', 'Molina', 'Self-pay options'],
        website: 'https://example.com/wilsonrecovery'
      },
      {
        id: '5',
        name: 'Dr. Lisa Park, MD',
        specialty: ['Psychiatry', 'Medication Management', 'Bipolar Disorder'],
        address: '654 Medical Plaza, Building B',
        phone: '(555) 567-8901',
        distance: 8.1,
        rating: 4.5,
        acceptingNewPatients: true,
        insuranceAccepted: ['Most major insurance accepted'],
        website: 'https://example.com/parkpsychiatry'
      }
    ];

    // Filter by specialty if provided
    if (specialty) {
      const specialtyLower = specialty.toLowerCase();
      return mockTherapists.filter(t => 
        t.specialty.some(s => s.toLowerCase().includes(specialtyLower))
      );
    }

    return mockTherapists;
  }

  /**
   * Calculate distance between two coordinates (in miles)
   */
  private calculateDistance(coord1: LocationCoordinates, coord2: LocationCoordinates): number {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRad(coord2.lat - coord1.lat);
    const dLon = this.toRad(coord2.lng - coord1.lng);
    const lat1 = this.toRad(coord1.lat);
    const lat2 = this.toRad(coord2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  }

  private toRad(value: number): number {
    return value * Math.PI / 180;
  }

  /**
   * Infer specialty from name and types
   */
  private inferSpecialty(name: string, types: string[]): string[] {
    const specialties: string[] = [];
    const nameLower = name.toLowerCase();
    
    if (nameLower.includes('psychiatr')) specialties.push('Psychiatry');
    if (nameLower.includes('psycholog')) specialties.push('Psychology');
    if (nameLower.includes('counsel')) specialties.push('Counseling');
    if (nameLower.includes('therapy')) specialties.push('Therapy');
    if (nameLower.includes('child') || nameLower.includes('pediatric')) specialties.push('Child & Adolescent');
    if (nameLower.includes('family')) specialties.push('Family Therapy');
    if (nameLower.includes('couples') || nameLower.includes('marriage')) specialties.push('Couples Therapy');
    
    if (specialties.length === 0) {
      specialties.push('Mental Health Services');
    }
    
    return specialties;
  }

  /**
   * Get online therapy options
   */
  getOnlineTherapyOptions(): any[] {
    return [
      {
        name: 'BetterHelp',
        description: 'Online therapy with licensed therapists',
        website: 'https://www.betterhelp.com',
        features: ['Video sessions', 'Messaging', 'Phone calls'],
        pricing: 'Starting from $60/week'
      },
      {
        name: 'Talkspace',
        description: 'Text, audio, and video therapy',
        website: 'https://www.talkspace.com',
        features: ['Unlimited messaging', 'Live sessions', 'Psychiatry services'],
        pricing: 'Starting from $69/week'
      },
      {
        name: 'Headspace',
        description: 'Meditation and mental health support',
        website: 'https://www.headspace.com',
        features: ['Guided meditation', 'Sleep support', 'Focus music'],
        pricing: 'Starting from $12.99/month'
      },
      {
        name: 'MDLIVE',
        description: 'Virtual mental health visits',
        website: 'https://www.mdlive.com',
        features: ['Board-certified therapists', 'Psychiatrists available', 'Insurance accepted'],
        pricing: 'Varies by insurance'
      },
      {
        name: '7 Cups',
        description: 'Free emotional support and paid therapy',
        website: 'https://www.7cups.com',
        features: ['Free peer support', 'Licensed therapy available', 'Self-help resources'],
        pricing: 'Free to $150/month'
      }
    ];
  }
}

export default TherapistLocatorService;
