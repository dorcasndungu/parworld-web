import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

// Types based on your Firebase data structure
export interface GolfItem {
  id: string;
  name: string;
  brand?: string;
  units?: string;
  price?: string;
  category?: string;
  condition: string;
  gender: string;
  description?: string;
  imageUrls: string[];
  isComplete: boolean;
  isVisible: boolean;
  createdBy: string;
  createdAt: any;
}

// Newsletter/Community Member interface
export interface CommunityMember {
  id?: string;
  email: string;
  name: string;
  phone?: string;
  interests?: string[];
  joinedAt: any;
  isActive: boolean;
}

// Utility functions for fetching data
export const fetchVisibleItems = async (): Promise<GolfItem[]> => {
  try {
    console.log('Fetching visible items from Firebase...');
    // Get all items first, then filter in JavaScript to avoid index issues
    const querySnapshot = await getDocs(collection(db, 'items'));
    console.log(`Found ${querySnapshot.docs.length} total items`);

    const allItems = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        brand: data.brand || null,
        units: data.units || null,
        price: data.price || null,
        category: data.category || null,
        condition: data.condition || 'Used',
        gender: data.gender || 'Unisex',
        description: data.description || null,
        imageUrls: data.imageUrls || [],
        isComplete: data.isComplete || false,
        isVisible: data.isVisible || false,
        createdBy: data.createdBy || '',
        createdAt: data.createdAt
      } as GolfItem;
    });

    // Filter for visible items in JavaScript
    const visibleItems = allItems.filter(item => item.isVisible === true);
    console.log(`Found ${visibleItems.length} visible items out of ${allItems.length} total`);

    return visibleItems;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};

export const fetchItemsByCategory = async (category: string): Promise<GolfItem[]> => {
  try {
    const q = query(
      collection(db, 'items'),
      where('isVisible', '==', true),
      where('isComplete', '==', true),
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as GolfItem));
  } catch (error) {
    console.error('Error fetching items by category:', error);
    return [];
  }
};

// Newsletter/Community Functions
export const addCommunityMember = async (memberData: Omit<CommunityMember, 'id' | 'joinedAt' | 'isActive'>): Promise<string | null> => {
  try {
    console.log('Adding community member:', memberData);

    // Check if email already exists
    const existingMemberQuery = query(
      collection(db, 'community_members'),
      where('email', '==', memberData.email)
    );

    const existingMembers = await getDocs(existingMemberQuery);

    if (!existingMembers.empty) {
      throw new Error('Email already registered in our community');
    }

    // Add new member
    const docRef = await addDoc(collection(db, 'community_members'), {
      ...memberData,
      joinedAt: serverTimestamp(),
      isActive: true
    });

    console.log('Community member added with ID:', docRef.id);
    return docRef.id;

  } catch (error) {
    console.error('Error adding community member:', error);
    throw error;
  }
};

export const getCommunityMemberCount = async (): Promise<number> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'community_members'));
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting community member count:', error);
    return 0;
  }
};

export const fetchFeaturedItems = async (limitCount: number = 3): Promise<GolfItem[]> => {
  try {
    console.log(`Fetching ${limitCount} featured items...`);
    // Get all items first, then filter and limit in JavaScript
    console.log(`Found ${querySnapshot.docs.length} total items`);

    const allItems = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || '',
        brand: data.brand || null,
        units: data.units || null,
        price: data.price || null,
        category: data.category || null,
        condition: data.condition || 'Used',
        gender: data.gender || 'Unisex',
        description: data.description || null,
        imageUrls: data.imageUrls || [],
        isComplete: data.isComplete || false,
        isVisible: data.isVisible || false,
        createdBy: data.createdBy || '',
        createdAt: data.createdAt
      } as GolfItem;
    });

    // For now, just return the first few items (any items) to test
    // Later we can filter by isVisible when your data is set up
    const featuredItems = allItems.slice(0, limitCount);
    console.log(`Returning ${featuredItems.length} featured items`);

    return featuredItems;
  } catch (error) {
    console.error('Error fetching featured items:', error);
    return [];
  }
};

// Test function to fetch all items (for debugging)
export const fetchAllItems = async (): Promise<GolfItem[]> => {
  try {
    console.log('Fetching ALL items for testing...');
    const querySnapshot = await getDocs(collection(db, 'items'));
    console.log(`Found ${querySnapshot.docs.length} total items in database`);

    const items = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log(`Item ${doc.id}:`, data);
      return {
        id: doc.id,
        name: data.name || '',
        brand: data.brand || null,
        units: data.units || null,
        price: data.price || null,
        category: data.category || null,
        condition: data.condition || 'Used',
        gender: data.gender || 'Unisex',
        description: data.description || null,
        imageUrls: data.imageUrls || [],
        isComplete: data.isComplete || false,
        isVisible: data.isVisible || false,
        createdBy: data.createdBy || '',
        createdAt: data.createdAt
      } as GolfItem;
    });

    return items;
  } catch (error) {
    console.error('Error fetching all items:', error);
    return [];
  }
};
