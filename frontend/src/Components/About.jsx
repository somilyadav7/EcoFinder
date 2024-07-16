import Logo from '../banner.png';

const About = () => {
  return (
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
  );
};

export default About;
