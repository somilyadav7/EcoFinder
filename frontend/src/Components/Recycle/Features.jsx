import React from "react";
import './Features.css';

const elocateFeatures = [
  {
    number: "01",
    title: "Comprehensive E-Waste Collection",
    description:
      "A network of reliable and certified e-waste collection facilities to ensure responsible disposal.",
  },
  {
    number: "02",
    title: "Educational Resources",
    description:
      "Detailed information about e-waste and collection facilities to empower users with knowledge.",
  },
  {
    number: "03",
    title: "User-Friendly Interface",
    description:
      "A dynamic and easy-to-use platform for individuals and businesses seeking e-waste solutions.",
  },
  {
    number: "04",
    title: "Contact and Suggestion Portal",
    description:
      "A dedicated portal for users to contact us with inquiries and provide suggestions for improving our services.",
  },
  {
    number: "05",
    title: "Streamlined Booking System",
    description:
      "Efficient booking system with a credit mechanism to encourage responsible disposal practices.",
  },
  {
    number: "06",
    title: "Facility Management Dashboard",
    description:
      "Comprehensive dashboard for facility owners to manage bookings.",
  },
];

const Features = () => {
  return (
    <section id="features" aria-label="features">
      <div className="container mx-auto px-4 pb-4 text-center">
        <ul className="grid-list section py-20 my-2">
          {elocateFeatures.map((feature, index) => (
            <li className="lista" key={index}>
              <div className="features-card">
                <data className="card-number" value={feature.number}>
                  {feature.number}
                </data>
                <h3 className="h3 card-title">{feature.title}</h3>
                <p className="card-text">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Features;
