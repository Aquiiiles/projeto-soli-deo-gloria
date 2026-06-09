// Centralized image URLs — replace these with actual project photos when available.
// Currently using Unsplash free images that match the project's theme.
// To swap: just change the URL string. All pages reference this file.

const unsplash = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Homepage — About section
  aboutPreview: unsplash('photo-1500382017468-9049fed747ef', 800), // green countryside

  // Homepage — Cafe section
  cafePreview: unsplash('photo-1495474472287-4d71bcdd2085', 800), // coffee shop

  // Homepage — Space gallery
  space1: unsplash('photo-1500534314263-0869cef07bab', 600), // aerial nature
  space2: unsplash('photo-1518005020951-eccb494ad742', 600), // chapel
  space3: unsplash('photo-1441974231531-c6227db76b6e', 600), // forest path
  space4: unsplash('photo-1470071459604-3b5ec3a7fe05', 900), // nature panoramic
  space5: unsplash('photo-1504280390367-361c6d9f38f4', 600), // camp tent

  // About page — panoramic banner
  aboutPanorama: unsplash('photo-1506905925346-21bda4d32df4', 1200), // mountain panorama

  // Space page — gallery items
  gallery: [
    unsplash('photo-1500534314263-0869cef07bab', 900),  // aerial view
    unsplash('photo-1518005020951-eccb494ad742', 600),   // chapel
    unsplash('photo-1464226184884-fa280b87c399', 600),   // garden/plantation
    unsplash('photo-1501785888041-af3ef285b470', 600),   // river nature
    unsplash('photo-1517457373958-b7bdd4587205', 600),   // common area outdoor
    unsplash('photo-1441974231531-c6227db76b6e', 600),   // forest trail
    unsplash('photo-1504280390367-361c6d9f38f4', 600),   // lodging/camp
    unsplash('photo-1596394516093-501ba68a0ba6', 900),   // outdoor activities
  ],

  // Space page — map
  locationMap: unsplash('photo-1524661135-423995f22d0b', 800), // map/aerial

  // Cafe page
  cafeHero: unsplash('photo-1445116572660-236099ec97a0', 1200), // cafe wide banner
  cafeInterior: unsplash('photo-1554118811-1e0d58224f24', 600), // cafe interior
  cafeDrinks: unsplash('photo-1509042239860-f550ce710b93', 600), // artisan coffee
  cafePastries: unsplash('photo-1486427944544-d2c246c4df7c', 600), // cakes/pastries

  // Courses page
  institute: unsplash('photo-1524178232363-1fb2b075b655', 800), // classroom/education

  // Contact page
  contactMap: unsplash('photo-1524661135-423995f22d0b', 800), // location map

  // Team — default portrait placeholder
  teamDefault: unsplash('photo-1472099645785-5658abf4ff4e', 400), // portrait

  // YouTube videos
  videos: {
    turma01: 'qB6ASealh-Y',
    turma03: 'EBS4oC3WTWc',
  },
} as const;
