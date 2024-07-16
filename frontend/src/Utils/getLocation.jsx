import mapboxgl from "mapbox-gl";

// Function to get the user's current location and address using Mapbox
const getLocation = async () => {
  // Set the Mapbox access token
  mapboxgl.accessToken =
    "<mapboxapikey>";

  // Return a promise that resolves with the user's coordinates and address
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Define options for geolocation
      const options = {
        enableHighAccuracy: true,
        timeout: 1000000000,
        maximumAge: 0,
      };

      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const coordinates = [lon, lat];
          console.log(coordinates)
          // Fetch the address using Mapbox's reverse geocoding API
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapboxgl.accessToken}`)
            .then((response) => response.json())
            .then((data) => {
              // Extract the address from the API response
              const address = data.features[0]?.place_name || null;
              resolve({ coordinates, address });
            })
            .catch((error) => {
              // Log any errors and resolve with null address
              console.error("Error fetching address:", error);
              resolve({ coordinates, address: null });
            });
        },
        (error) => {
          // Log any errors and resolve with null coordinates and address
          console.error(error);
          resolve({ coordinates: null, address: null });
        },
        options
      );
    } else {
      // Log an error if geolocation is not supported and resolve with null values
      console.error("Geolocation is not supported by this browser.");
      resolve({ coordinates: null, address: null });
    }
  });
};

export default getLocation;
