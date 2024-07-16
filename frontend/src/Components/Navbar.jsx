import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin } from "react-icons/fi"; // Importing icons from react-icons
import Logo from "../logo4.jpg";
import { handleLogout } from "./Auth";

function Navbar(props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [locations, setLocation] = useState("");

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  useEffect(() => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw`
          )
            .then((response) => response.json())
            .then((data) => {
              const city = data.features[0].context.find((context) =>
                context.id.includes("place")
              ).text;
              const state = data.features[0].context.find((context) =>
                context.id.includes("region")
              ).text;
              setLocation(`${city}, ${state}`);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        },
        (error) => {
          console.error(error);
        },
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex items-center justify-between border-b">
      <div className="flex items-center">
        <img className="h-12 w-auto mr-4" src={Logo} alt="Logo" />
      </div>

      <div className="flex flex-grow justify-center">
        <Link
          to="/"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          About
        </Link>
        <Link
          to="/facilities"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          E-Facilities
        </Link>
        <Link
          to="/recycle"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          Recycle
        </Link>
        <Link
          to="/ewaste"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          E-Waste
        </Link>
        <Link
          to="/contact"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          Contact Us
        </Link>
        <Link
          to="/rules"
          className="text-black text-xl mx-4 hover:text-blue-400 focus:text-blue-400"
        >
          Rules
        </Link>
      </div>

      <h1 className="font-montserrat font-bold mr-5 md:ml-4 md:text-xl text-emerald-600 flex items-center gap-[1vh]">
        <FiMapPin aria-hidden="true" role="img" />
        {locations || "Loading..."}
      </h1>

      <div className="flex justify-end relative">
        {user ? (
          <div className="relative">
            <button
              className="md:mr-8 text-sm md:text-xl font-semibold"
              onClick={handleToggleDropdown}
            >
              {user}
            </button>
            {isDropdownOpen && (
              <div className="absolute top-12 right-0 p-4 shadow-md divide-y rounded-lg w-44 mt-2 bg-white">
                <Link
                  to={user === 'admin' ? "/adminprofile" : "/userprofile"}
                  className="block py-2 text-center hover:text-emerald-500"
                >
                  Profile
                </Link>
                <button
                  className="block w-full py-2 text-center hover:text-emerald-500"
                  onClick={() => {
                    handleLogout();
                    setUser(null);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/signin"
            className="text-black text-lg px-3 py-1 rounded-md border border-black hover:bg-blue-400 hover:text-white focus:bg-blue-400 focus:text-white mb-1"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
