import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitRecyclingForm } from "./Api";
import emailjs from "@emailjs/browser";
import { getEmail, getFullname } from "../Auth";
import axios from "axios";

const OtherRecyclingForm = (props) => {
  const [model, setModel] = useState("");
  const [recycleItemPrice, setRecycleItemPrice] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading] = useState(false);
  const category = "Others";

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !model ||
      !recycleItemPrice ||
      !pickupDate ||
      !phone ||
      !address ||
      !selectedFacility
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (
      !model ||
      !recycleItemPrice ||
      !pickupDate ||
      !phone ||
      !address ||
      !selectedFacility
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    // Validate recycle item price
    if (parseFloat(recycleItemPrice) < 0) {
      toast.error("Recycle item price cannot be negative.");
      return;
    }

    const register = {
      user: props.user,
      model,
      phone,
      date: pickupDate,
      price: recycleItemPrice,
      facility: selectedFacility,
      category: category,
      location: address,
    };

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = "<serviceId>";
    const templateId = "<templateId>";
    const publicKey = "<publicKey>";

    // Create a new object that contains dynamic template params
    const templateParams = {
      to_name: getFullname(),
      to_mail: getEmail(),
      message:
        "Your Order for recycling " +
        model +
        " has been placed. Wait for further update.",
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
    submitRecyclingForm(register)
      .then((response) => {
        toast.success("Order placed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(response.data);

        // Reset form fields
        setModel("");
        setRecycleItemPrice("");
        setPickupDate("");
        setPhone("");
        setAddress("");
        setSelectedFacility("");
        setSelectedImage(null);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error(
            "User already exists. Please try a different username or email.",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          toast.error("Registration failed. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.error(error);
      });
  };

  // Handler for image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoic2h1ZW5jZSIsImEiOiJjbG9wcmt3czMwYnZsMmtvNnpmNTRqdnl6In0.vLBhYMBZBl2kaOh1Fh44Bw`
            );
            const address = response.data.features[0]?.place_name || "";
            setAddress(address);
          } catch (error) {
            toast.error("Failed to get address from coordinates.");
            console.error("Error getting address:", error);
          }
        },
        (error) => {
          toast.error("Failed to get current location.");
          console.error("Error getting location:", error);
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };
  // Dummy data for facility
  const facilities = [
    "iEnviroTech Solutions - Hubli",
    "Best E-waste Recyclers",
    "Ewaste Hub",
    "Escrappy Recyclers",
    "E-FRIENDLY WASTE RECYCLERS",
    "4R Recycling Pvt Ltd.",
    "Ash Recyclers",
    "Ecoglobe E-waste Recyclers",
    "Sogo Synergy Private Limited",
    "E Hasiru E Waste Recycling Company",
  ];

  return (
    <div className="container mx-auto p-8">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-6 text-center">Other Recycling</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Model */}
        <div>
          <label htmlFor="model" className="block font-semibold mb-1">
            Product Name:
          </label>
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Recycle Item Price */}
        <div>
          <label
            htmlFor="recycleItemPrice"
            className="block font-semibold mb-1"
          >
            Recycle Item Price:
          </label>
          <input
            type="number"
            id="recycleItemPrice"
            value={recycleItemPrice}
            onChange={(e) => setRecycleItemPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Pickup Date */}
        <div>
          <label htmlFor="pickupDate" className="block font-semibold mb-1">
            Pickup Date:
          </label>
          <input
            type="date"
            id="pickupDate"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full p-2 border rounded"
            min={new Date().toISOString().split("T")[0]} // Set min attribute to today's date
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="address" className="block font-semibold mb-1">
            Location:
          </label>
          <div className="flex">
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Use Current Location
            </button>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">
            Phone:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Facility Selection */}
        <div>
          <label htmlFor="facility" className="block font-semibold mb-1">
            Select Facility:
          </label>
          <select
            id="facility"
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Facility</option>
            {facilities.map((facility) => (
              <option key={facility} value={facility}>
                {facility}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="col-span-2">
          <label htmlFor="image" className="block font-semibold mb-1">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {selectedImage && (
            <div className="mt-4 flex justify-center">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="max-w-xs h-auto rounded"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtherRecyclingForm;
