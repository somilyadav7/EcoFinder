import React from "react";
import OrderService from "../../Service/OrderService";
import { useNavigate, useParams } from "react-router-dom";

class ViewOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
    this.navigate = props.navigate; 
  }

  componentDidMount() {
    const { username } = this.props.params;
    OrderService.getOrderByUsername(username).then((response) => {
      this.setState({ orders: response.data });
    });
  }

  handleUpdate = (orderId) => {
    console.log("Updating order with ID:", orderId); 
    this.navigate(`/order-update/${orderId}`);
  };

  handleDelete = (orderId) => {
    console.log("Deleting order with ID:", orderId);
    OrderService.deleteOrder(orderId).then((response) => {
      this.setState((prevState) => ({
        orders: prevState.orders.filter((order) => order._id !== orderId),
      }));
    });
  };

  render() {
    return (
      <div>
        <div className="my-8">
          <h1 className="text-center text-2xl font-semibold mb-2">Orders List</h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200">Product Name</th>
                <th className="px-4 py-2 bg-gray-200">Phone</th>
                <th className="px-4 py-2 bg-gray-200">Price</th>
                <th className="px-4 py-2 bg-gray-200">Facility</th>
                <th className="px-4 py-2 bg-gray-200">Username</th>
                <th className="px-4 py-2 bg-gray-200">Location</th>
                <th className="px-4 py-2 bg-gray-200">Category</th>
                <th className="px-4 py-2 bg-gray-200">Status</th>
                <th className="px-4 py-2 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order.model}</td>
                  <td className="border px-4 py-2">{order.phone}</td>
                  <td className="border px-4 py-2">{order.price}</td>
                  <td className="border px-4 py-2">{order.facility}</td>
                  <td className="border px-4 py-2">{order.username}</td>
                  <td className="border px-4 py-2">{order.location}</td>
                  <td className="border px-4 py-2">{order.category}</td>
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
        </div>
      </div>
    );
  }
}

const OrdersProfileWithNavigate = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  return <ViewOrder {...props} navigate={navigate} params={params} />;
};

export default OrdersProfileWithNavigate;
