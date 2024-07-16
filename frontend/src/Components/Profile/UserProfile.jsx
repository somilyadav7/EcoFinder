import React from "react";
import OrderService from "../../Service/OrderService";
import { getEmail, getUserName, getFullname,getUserID } from "../Auth";
import { useNavigate } from "react-router-dom";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };

    this.navigate = props.navigate; 
  }

  componentDidMount() {
    OrderService.getOrderByUsername(getUserName()).then((response) => {
      this.setState({ orders: response.data });
    });
  }

  handleUpdate = (orderId) => {
    console.log("Updating order with ID:", orderId); // Debug log
    this.navigate(`/update-order/${orderId}`);
  };

  handleUserUpdate = (userId) => {
    this.navigate(`/user-update/${userId}`);
  };

  handleDelete = (orderId) => {
    console.log("Deleting order with ID:", orderId); // Debug log
    OrderService.deleteOrder(orderId).then((response) => {
      this.setState((prevState) => ({
        orders: prevState.orders.filter((order) => order._id !== orderId),
      }));
    });
  };

  render() {
    return (
      <div>
        <div className="container mx-auto p-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="md:w-1/3 w-full">
              <div className="bg-white rounded-lg shadow-lg py-6">
                <div className="photo-wrapper p-2 flex justify-center">
                  <div className="rounded-full overflow-hidden border-4 border-emerald-500">
                    <img
                      className="w-32 h-32 object-cover"
                      src="https://avatars.githubusercontent.com/u/52039279?v=4"
                      alt="John Doe"
                    />
                  </div>
                </div>
                <div className="p-2 text-center">
                  <h3 className="text-2xl text-gray-900 font-semibold">
                    {getFullname()}
                  </h3>
                  <table className="my-3 text-xl mx-auto">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2 text-left text-gray-500 font-semibold">
                          Email
                        </td>
                        <td className="px-2 py-2 text-left">{getEmail()}</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-left text-gray-500 font-semibold">
                          Username
                        </td>
                        <td className="px-2 py-2 text-left">{getUserName()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
          onClick={() => this.handleUserUpdate(getUserID())}
        >
          Update Profile
        </button>
        <div className="my-8">
          <h1 className="text-center text-2xl font-semibold mb-2">
            Orders List
          </h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200">Order Id</th>
                <th className="px-4 py-2 bg-gray-200">Product Name</th>
                <th className="px-4 py-2 bg-gray-200">Phone No.</th>
                <th className="px-4 py-2 bg-gray-200">Facility</th>
                <th className="px-4 py-2 bg-gray-200">Address</th>
                <th className="px-4 py-2 bg-gray-200">Status</th>
                <th className="px-4 py-2 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">{order.model}</td>
                  <td className="border px-4 py-2">{order.phone}</td>
                  <td className="border px-4 py-2">{order.facility}</td>
                  <td className="border px-4 py-2">{order.location}</td>
                  <td className="border px-4 py-2">{order.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-2"
                      onClick={() => this.handleUpdate(order._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                      onClick={() => this.handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-4 rounded-md"
            onClick={() => this.navigate("/recycle")}
          >
            Add Orders
          </button>
        </div>
      </div>
    );
  }
}

const UserProfileWithNavigate = (props) => {
  const navigate = useNavigate();
  return <UserProfile {...props} navigate={navigate} />;
};

export default UserProfileWithNavigate;
