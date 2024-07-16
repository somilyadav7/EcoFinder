
// Function to convert degrees to radians
export const deg2rad = (deg) => deg * (Math.PI / 180);

// Function to calculate the distance between two geographical points using the Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1); // Difference in latitude in radians
  const dLon = deg2rad(lon2 - lon1); // Difference in longitude in radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Haversine formula
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Central angle
  const distance = R * c; // Distance in kilometers
  return distance;
};

  