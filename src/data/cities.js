export const AVAILABLE_CITIES = [
  // --- NEPAL ---
  { name: "Kathmandu", country: "Nepal", timezone: "Asia/Kathmandu", lat: 27.7172, lon: 85.3240, baseTemp: 20, climate: "temperate", region: "Nepal" },
  { name: "Pokhara", country: "Nepal", timezone: "Asia/Kathmandu", lat: 28.2096, lon: 83.9856, baseTemp: 22, climate: "temperate", region: "Nepal" },
  { name: "Lalitpur", country: "Nepal", timezone: "Asia/Kathmandu", lat: 27.6644, lon: 85.3188, baseTemp: 20, climate: "temperate", region: "Nepal" },
  { name: "Chitwan", country: "Nepal", timezone: "Asia/Kathmandu", lat: 27.5291, lon: 84.3542, baseTemp: 28, climate: "humid", region: "Nepal" },
  { name: "Butwal", country: "Nepal", timezone: "Asia/Kathmandu", lat: 27.7000, lon: 83.4500, baseTemp: 29, climate: "humid", region: "Nepal" },
  { name: "Dharan", country: "Nepal", timezone: "Asia/Kathmandu", lat: 26.8120, lon: 87.2834, baseTemp: 26, climate: "temperate", region: "Nepal" },
  { name: "Biratnagar", country: "Nepal", timezone: "Asia/Kathmandu", lat: 26.4525, lon: 87.2718, baseTemp: 30, climate: "hot", region: "Nepal" },

  // --- JAPAN ---
  { name: "Tokyo", country: "Japan", timezone: "Asia/Tokyo", lat: 35.6762, lon: 139.6503, baseTemp: 16, climate: "temperate", region: "Japan" },
  { name: "Osaka", country: "Japan", timezone: "Asia/Tokyo", lat: 34.6937, lon: 135.5023, baseTemp: 17, climate: "temperate", region: "Japan" },
  { name: "Fukuoka", country: "Japan", timezone: "Asia/Tokyo", lat: 33.5902, lon: 130.4017, baseTemp: 18, climate: "humid", region: "Japan" },
  { name: "Nagoya", country: "Japan", timezone: "Asia/Tokyo", lat: 35.1815, lon: 136.9066, baseTemp: 16, climate: "temperate", region: "Japan" },
  { name: "Sapporo", country: "Japan", timezone: "Asia/Tokyo", lat: 43.0618, lon: 141.3545, baseTemp: 8, climate: "cold", region: "Japan" },
  { name: "Okinawa", country: "Japan", timezone: "Asia/Tokyo", lat: 26.2124, lon: 127.6809, baseTemp: 24, climate: "humid", region: "Japan" },
  { name: "Shinjuku City", country: "Japan", timezone: "Asia/Tokyo", lat: 35.6938, lon: 139.7034, baseTemp: 16, climate: "temperate", region: "Japan" },

  // --- USA ---
  { name: "New York (Queens)", country: "USA", timezone: "America/New_York", lat: 40.7282, lon: -73.7949, baseTemp: 15, climate: "temperate", region: "North America" },
  { name: "Dallas (Irving)", country: "USA", timezone: "America/Chicago", lat: 32.8140, lon: -96.9489, baseTemp: 22, climate: "warm", region: "North America" },
  { name: "Washington DC", country: "USA", timezone: "America/New_York", lat: 38.9072, lon: -77.0369, baseTemp: 16, climate: "temperate", region: "North America" },
  { name: "San Francisco", country: "USA", timezone: "America/Los_Angeles", lat: 37.7749, lon: -122.4194, baseTemp: 16, climate: "sunny", region: "North America" },
  { name: "Baltimore", country: "USA", timezone: "America/New_York", lat: 39.2904, lon: -76.6122, baseTemp: 14, climate: "temperate", region: "North America" },
  { name: "Boston", country: "USA", timezone: "America/New_York", lat: 42.3601, lon: -71.0589, baseTemp: 12, climate: "cold", region: "North America" },
  { name: "Chicago", country: "USA", timezone: "America/Chicago", lat: 41.8781, lon: -87.6298, baseTemp: 11, climate: "windy", region: "North America" },
  { name: "Denver", country: "USA", timezone: "America/Denver", lat: 39.7392, lon: -104.9903, baseTemp: 10, climate: "dry", region: "North America" },
  { name: "Sonoma", country: "USA", timezone: "America/Los_Angeles", lat: 38.2919, lon: -122.4580, baseTemp: 18, climate: "sunny", region: "North America" },
  { name: "Artesia", country: "USA", timezone: "America/Los_Angeles", lat: 33.8658, lon: -118.0831, baseTemp: 22, climate: "sunny", region: "North America" },

  // --- UK & EUROPE ---
  { name: "London", country: "UK", timezone: "Europe/London", lat: 51.5074, lon: -0.1278, baseTemp: 12, climate: "rainy", region: "Europe" },
  { name: "Aldershot", country: "UK", timezone: "Europe/London", lat: 51.2480, lon: -0.7630, baseTemp: 11, climate: "rainy", region: "Europe" },
  { name: "Reading", country: "UK", timezone: "Europe/London", lat: 51.4543, lon: -0.9781, baseTemp: 12, climate: "rainy", region: "Europe" },
  { name: "Folkestone", country: "UK", timezone: "Europe/London", lat: 51.0780, lon: 1.1850, baseTemp: 11, climate: "windy", region: "Europe" },
  { name: "Lisbon", country: "Portugal", timezone: "Europe/Lisbon", lat: 38.7223, lon: -9.1393, baseTemp: 18, climate: "sunny", region: "Europe" },
  { name: "Berlin", country: "Germany", timezone: "Europe/Berlin", lat: 52.5200, lon: 13.4050, baseTemp: 11, climate: "cloudy", region: "Europe" },
  { name: "Munich", country: "Germany", timezone: "Europe/Berlin", lat: 48.1351, lon: 11.5820, baseTemp: 10, climate: "cold", region: "Europe" },
  { name: "Frankfurt", country: "Germany", timezone: "Europe/Berlin", lat: 50.1109, lon: 8.6821, baseTemp: 12, climate: "cloudy", region: "Europe" },
  { name: "Paris", country: "France", timezone: "Europe/Paris", lat: 48.8566, lon: 2.3522, baseTemp: 14, climate: "temperate", region: "Europe" },
  { name: "Amsterdam", country: "Netherlands", timezone: "Europe/Amsterdam", lat: 52.3676, lon: 4.9041, baseTemp: 11, climate: "rainy", region: "Europe" },

  // --- AUSTRALIA ---
  { name: "Sydney (Auburn)", country: "Australia", timezone: "Australia/Sydney", lat: 33.8487, lon: 151.0330, baseTemp: 22, climate: "sunny", region: "Australia" },
  { name: "Sydney (Rockdale)", country: "Australia", timezone: "Australia/Sydney", lat: 33.9522, lon: 151.1312, baseTemp: 22, climate: "sunny", region: "Australia" },
  { name: "Melbourne", country: "Australia", timezone: "Australia/Melbourne", lat: 37.8136, lon: 144.9631, baseTemp: 17, climate: "variable", region: "Australia" },
  { name: "Brisbane", country: "Australia", timezone: "Australia/Brisbane", lat: 27.4698, lon: 153.0251, baseTemp: 24, climate: "humid", region: "Australia" },
  { name: "Hobart (Tasmania)", country: "Australia", timezone: "Australia/Hobart", lat: 42.8821, lon: 147.3272, baseTemp: 14, climate: "cold", region: "Australia" },

  // --- MIDDLE EAST & ASIA ---
  { name: "Doha", country: "Qatar", timezone: "Asia/Qatar", lat: 25.276987, lon: 51.520008, baseTemp: 32, climate: "desert", region: "Middle East" },
  { name: "Dubai", country: "UAE", timezone: "Asia/Dubai", lat: 25.276987, lon: 55.296249, baseTemp: 35, climate: "desert", region: "Middle East" },
  { name: "Riyadh", country: "Saudi Arabia", timezone: "Asia/Riyadh", lat: 24.7136, lon: 46.6753, baseTemp: 36, climate: "desert", region: "Middle East" },
  { name: "Kuwait City", country: "Kuwait", timezone: "Asia/Kuwait", lat: 29.3759, lon: 47.9774, baseTemp: 34, climate: "desert", region: "Middle East" },
  { name: "Kuala Lumpur", country: "Malaysia", timezone: "Asia/Kuala_Lumpur", lat: 3.1390, lon: 101.6869, baseTemp: 30, climate: "humid", region: "Asia" },
  { name: "Seoul", country: "South Korea", timezone: "Asia/Seoul", lat: 37.5665, lon: 126.9780, baseTemp: 15, climate: "temperate", region: "Asia" },
  { name: "Hong Kong", country: "China", timezone: "Asia/Hong_Kong", lat: 22.3193, lon: 114.1694, baseTemp: 24, climate: "humid", region: "Asia" },
];

/*
--------------------------------------------------------------
Example to add a new city:

{
  name: "Helsinki",
  country: "Finland",
  timezone: "Europe/Helsinki",
  lat: 60.1699,
  lon: 24.9384,
  baseTemp: 10,
  climate: "cold",
  region: "Europe"
}

--------------------------------------------------------------
*/
