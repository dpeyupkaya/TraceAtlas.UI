// src/pages/map/services/locationService.js

let mockLocations = [
  {
    id: 1,
    title: 'Galata Kulesi, İstanbul',
    description: 'Tarihi yarımada ve boğaz manzarası.',
    latitude: 41.0256,
    longitude: 28.9741,
    creatorUsername: 'Aga',
    imageBase64: '/deneme-resimler/1.jpg',
    tags: ['Tarih', 'Manzara', 'İstanbul', 'Gezi']
  },
  {
    id: 2,
    title: 'İzmir Saat Kulesi',
    description: 'Konak meydanındaki buluşma noktası.',
    latitude: 38.4189,
    longitude: 27.1287,
    creatorUsername: 'EyupKaya',
    imageBase64: '/deneme-resimler/2.jpg',
    tags: ['İzmir', 'Meydan', 'Sembol']
  },
  {
    id: 3,
    title: 'Akdamar Adası, Van',
    description: 'Van Gölü üzerindeki tarihi kilise ve ada.',
    latitude: 38.3406,
    longitude: 43.0353,
    creatorUsername: 'Admin',
    imageBase64: '/deneme-resimler/3.jpg',
    tags: ['Doğa', 'Tarih', 'Van Gölü', 'Kilise']
  },
  {
    id: 4,
    title: 'Kaleiçi, Antalya',
    description: 'Turistik ve tarihi eski yerleşim yeri.',
    latitude: 36.8841,
    longitude: 30.7056,
    creatorUsername: 'Tester1',
    imageBase64: '/deneme-resimler/4.jpg',
    tags: ['Antalya', 'Eski Evler', 'Turizm', 'Deniz']
  },
  {
    id: 5,
    title: 'Sümela Manastırı, Trabzon',
    description: 'Dağ yamacına kurulu tarihi manastır.',
    latitude: 40.6900,
    longitude: 39.6582,
    creatorUsername: 'Aga',
    tags: ['Karadeniz', 'Manastır', 'Dağ', 'Tarih']
  },
  {
    id: 6,
    title: 'Eski Mardin Evleri',
    description: 'Taş mimarisi ve mezopotamya manzarası.',
    latitude: 37.3122,
    longitude: 40.7350,
    creatorUsername: 'DoğaSever',
    tags: ['Mardin', 'Mimari', 'Mezopotamya', 'Fotoğraf']
  },
  {
    id: 7,
    title: 'Kırşehir Kaman Japon Bahçesi',
    description: 'Görülmeye değer.',
    latitude: 39.3628,
    longitude:  33.7866,
    creatorUsername: 'Mertcan',
    imageBase64: '/deneme-resimler/7.jpg',
    tags: ['Doğa', 'hağhkbank', 'Kırşehir', 'Fotoğraf']
  },
  {id: 8,
    title: 'Ünye Kumu',
    description: 'Çok değerliymiş',
    latitude: 41.1272,
    longitude: 37.2886,
    creatorUsername: 'Unyeli',
    imageBase64: '/deneme-resimler/8.jpg',
    tags: ['Doğa', 'Termal', 'değerli', 'Tarih']
  }
];

export const getLocations = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(mockLocations), 500));
};

export const createLocation = async (data) => {
  // Eğer yeni eklenen veride tags yoksa boş dizi ata
  const newLocation = { id: Date.now(), tags: [], ...data };
  mockLocations.push(newLocation);
  return new Promise((resolve) => setTimeout(() => resolve(newLocation), 500));
};