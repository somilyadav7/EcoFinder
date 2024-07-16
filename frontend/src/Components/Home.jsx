import { useState, useEffect } from 'react';
import Image from '../poster.jpg';
import { Link } from 'react-router-dom';
import Features from './Recycle/Features';
import Logo from '../banner.png';

function Home() {
  const [displayText, setDisplayText] = useState('E-Waste Recycling Solution');

  useEffect(() => {
    const solutions = ['Recycling Solution', 'Facility Locator', 'Disposable Solution'];
    let currentIndex = 0;
  
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % solutions.length;
      setDisplayText('E-Waste ' + solutions[currentIndex]);
    }, 3000); // Change text every 3 seconds
  
    return () => clearInterval(interval);
  }, []); // Run effect only once on component mount

  return (
    <>
        <div className="flex">
      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-center p-8">
        <div className="text-4xl font-bold mb-4 text-blue-800">
          Welcome to E-Waste EcoFinder
        </div>
        <div className="text-xl mb-6 text-gray-700">
          Your technology partner for Innovative and Impactful solutions.
        </div>

        {/* Dynamic Display Text */}
        <div className="text-2xl text-blue-700 p-4">
          {displayText}
        </div>
        <div className="text-lg mb-8 text-gray-800">
          E-Waste EcoFinder: Transforming E-Waste Management. Find E-waste facilities effortlessly with our platform. Your key to responsible recycling and sustainability.
        </div>
        <div className="flex justify-center flex-wrap m-4 space-x-4">
          <Link to='/recycle' className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg">
            Start Recycling
          </Link>
          <Link to='/facilities' className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg">
            Locate Facility
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="flex">
        <img className="w-[600px] h-[600px] bg-cover bg-center flex items-end p-20" src={Image} alt="Image" />
      </div>


    </div>

    <section className="section features" id="features" aria-label="features">
      <div className="container mx-auto px-4 text-center">
        <p className="section-subtitle font-bold text-gray-700 mb-2 p-2">
          -About E-Waste EcoFinder-
        </p>

        <h2 className="text-4xl section-title font-bold text-blue-700 mb-4">
          Revolutionizing E-Waste Locator and Management
        </h2>

        <div className="mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-between text-center md:text-left">
            <div className="md:w-1/2 mb-4 md:mb-0 md:pl-8">
              <p className="section-text text-xl text-gray-600 font-semibold leading-relaxed">
                In India, the improper disposal of e-waste contributes to the
                alarming annual collection of more than 1.65 million metric tons. Locating
                trustworthy e-waste collection facilities remains a significant
                challenge, intensifying this environmental issue. <br />
                The E-Waste EcoFinder Web Platform is conceived to directly address this
                issue. Our platform offers a dynamic, user-friendly interface for
                individuals and businesses seeking reliable e-waste collection
                facilities.
              </p>
              <div className="flex justify-center flex-wrap m-4 space-x-4">
                <button
                  onClick={() => {
                    // Handle click event for "Contact Us" button
                    window.location.href = "/contact"; // Navigate to "/contactus" page
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg"
                >
                  Contact Us
                </button>
                <button
                  onClick={() => {
                    // Handle click event for "Recycling Services" button
                    window.location.href = "/recycle"; // Navigate to "/recycle" page
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md text-lg"
                >
                  Recycling Services
                </button>
              </div>

            </div>
            <div className="md:w-1/2 flex justify-center section-banner has-before">
              <img
                src={Logo}
                alt="Logo"
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Features/>
    </>

    
  );
}

export default Home;
