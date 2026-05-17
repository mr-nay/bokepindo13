/* ============================================
   StreamBox - API Module
   Handles all fetch requests to external API
   ============================================ */

// API Configuration
const API_BASE_URL = 'https://api.jejaring.cc/videos.php';

// Sample video IDs for homepage (since no list endpoint is specified)
const VIDEO_IDS = [
  '690a489gl4',
  'MJ21yWAPAu',
  'ub0dg1buk6',
  '4Qvl2tym6O',
  'JeQatjNAMX',
  'Vm1xQGvotV',
  'B2WlfZ9Cvi',
  'r3zlgtwiwe',
  'sjhojyi3q8',
  '3s14dza788',
  '4a307e6q9j',
  'cator0dwxs',
  'gjvdw0io39',
  '6eq2e9l15g',
  '8fv7p8r6c8',
  '0928n5f6xm',
  '7z53i01616',
  'w7iff04991',
  'a829vo0713',
  '7b23egb99f',
  '4m2k97n5i3',
  '236s2sr938',
  'oy2foe237b',
  '2aqpzgbut9',
  '9h5y36dh94',
  'fp0h5uusmo'
];

/**
 * Fetch single video data from API
 * @param {string} videoId - The video code/ID
 * @returns {Promise<Object|null>} Video data or null on error
 */
async function fetchVideo(videoId) {
    try {
        const response = await fetch(`${API_BASE_URL}?id=${videoId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === 'success' && data.video) {
            return data.video;
        }

        return null;
    } catch (error) {
        console.warn(`Failed to fetch video ${videoId}:`, error.message);
        return null;
    }
}

/**
 * Fetch multiple videos for homepage
 * @param {string[]} ids - Array of video IDs to fetch
 * @returns {Promise<Object[]>} Array of video data objects
 */
async function fetchMultipleVideos(ids) {
    const promises = ids.map(id => fetchVideo(id));
    const results = await Promise.allSettled(promises);

    return results
        .filter(result => result.status === 'fulfilled' && result.value !== null)
        .map(result => result.value);
}

/**
 * Get all video IDs for the homepage
 * @returns {string[]} Array of video IDs
 */
function getVideoIds() {
    return VIDEO_IDS;
}

/**
 * Get video ID from URL parameters
 * @returns {string|null} Video ID or null
 */
function getVideoIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || params.get('code') || null;
}

/**
 * Generate a fallback/demo video object for display purposes
 * @param {string} id - Video ID
 * @param {number} index - Index for variety
 * @returns {Object} Demo video object
 */
function generateDemoVideo(id, index) {
    const titles = [
        'Film Action Terbaik 2026', 'Drama Korea Romantis', 'Anime Populer Episode Terbaru',
        'Thriller Misterius yang Mencekam', 'Komedi Lucu Menghibur', 'Film Horror Terbaru',
        'Dokumenter Alam Semesta', 'Film Sci-Fi Futuristik', 'Adventure Epic Journey',
        'Film Superhero Terbaru', 'Romance Movie 2026', 'Fantasy World Adventure',
        'Crime Investigation Series', 'War Movie Epic Battle', 'Musical Drama Show',
        'Sports Documentary', 'Animated Movie Kids', 'Western Classic Remastered',
        'Cyberpunk Future City', 'Historical Drama Empire', 'Space Exploration Film',
        'Underwater Adventure', 'Mountain Climbing Story', 'Racing Championship'
    ];
    const actors = [
        'John Smith', 'Kim Soo-hyun', 'Takeshi Yamamoto', 'Maria Garcia',
        'Chris Evans', 'Park Min-young', 'Sato Takeru', 'Emma Watson',
        'Tom Holland', 'Song Hye-kyo', 'Keanu Reeves', 'Scarlett Johansson'
    ];
    const genres = [
        'Action,Thriller', 'Drama,Romance', 'Anime,Fantasy', 'Horror,Mystery',
        'Comedy,Family', 'Sci-Fi,Adventure', 'Documentary,Nature', 'Crime,Drama'
    ];

    return {
        code: id,
        title: titles[index % titles.length],
        description: `Saksikan ${titles[index % titles.length]} - film berkualitas tinggi dengan alur cerita yang menarik dan akting memukau. Streaming gratis hanya di StreamBox.`,
        actor: actors[index % actors.length],
        genre: genres[index % genres.length],
        poster: `https://poster.imgvid.com/${id}.jpg`,
        embed: `https://gdplayer.ornop.org/e/${id}`,
        videos: `https://gdplayer.ornop.org/e/${id}`,
        download: `https://gdplayer.ornop.org/e/${id}`,
        views: Math.floor(Math.random() * 100000) + 5000,
        date: `2026-0${Math.floor(Math.random() * 5) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
    };
}
