import React from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../Service/UserService";
import { getEmail, getUserName, getFullname } from "../Auth";

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.navigate = props.navigate; // Add navigate to the class component
  }

  componentDidMount() {
    UserService.getUsers().then((response) => {
      this.setState({ users: response.data });
    });
  }

  handleUpdate = (userId) => {
    this.navigate(`/update-user/${userId}`);
  };

  handleOrder = (username) => {
    this.navigate(`/view-order/${username}`);
  };

  handleDelete = (userId) => {
    UserService.deleteUser(userId).then((response) => {
      this.setState((prevState) => ({
        users: prevState.users.filter((user) => user._id !== userId),
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
        <div className="my-8">
          <h1 className="text-center text-2xl font-semibold mb-2">User List</h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200">Name</th>
                <th className="px-4 py-2 bg-gray-200">Username</th>
                <th className="px-4 py-2 bg-gray-200">User Email</th>
                <th className="px-4 py-2 bg-gray-200">City</th>
                <th className="px-4 py-2 bg-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.city}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md mr-2"
                      onClick={() => this.handleOrder(user.username)}
                    >
                      View Orders
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                      onClick={() => this.handleUpdate(user._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                      onClick={() => this.handleDelete(user._id)}
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
            onClick={() => this.navigate("/signup")}
          >
            Add users
          </button>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 mt-4 ml-2 rounded-md"
            onClick={() => this.navigate("/orderprofile")}
          >
            View Orders
          </button>
        </div>
      </div>
    );
  }
}

const WithNavigate = (props) => {
  const navigate = useNavigate();
  return <AdminProfile {...props} navigate={navigate} />;
};

export default WithNavigate;
