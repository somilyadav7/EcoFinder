import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderService from '../../Service/OrderService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState({
    model: '',
    phone: '',
    date: '',
    price: '',
    facility: ''
  });

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

  useEffect(() => {
    OrderService.getOrderById(id).then((response) => {
      setOrder(response.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    OrderService.updateOrder(id, order)
      .then((response) => {
        toast.success('Order updated successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        navigate('/userprofile');
      })
      .catch((error) => {
        toast.error('Error updating order. Please try again.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">Update Order</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="model" className="block font-medium">
              Product Name
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={order.model}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={order.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="date" className="block font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={order.date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]} // Set min attribute to today's date
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="price" className="block font-medium">
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={order.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block font-medium">
              Address
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={order.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="facility" className="block font-medium">
              Facility
            </label>
            <select
              id="facility"
              name="facility"
              value={order.facility}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a facility</option>
              {facilities.map((facility) => (
                <option key={facility} value={facility}>
                  {facility}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default UpdateOrder;
