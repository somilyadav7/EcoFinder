import { useState } from 'react';
import { adminLoginAPICall, setUser, setUserID, setUserName, setFullname, getEmail, getFullname, setEmail} from '../Auth'
import { useNavigate } from 'react-router-dom'; // Update to use useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSignin = (props) => {
  const [email, setEmail1] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Update to use useNavigate

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        toast.loading("Loading..");
        const response = await adminLoginAPICall(email, password);
        const user = response.data;
        console.log(user);
        //localStorage.setItem("user", JSON.stringify(user));

        if(user){
          setUser(user);
          setUserName(user.username);
          setFullname(user.name);
          setEmail(user.email);
          setUserID(user.id);
          props.setUser(user.name);
        }

        console.log("name"+getFullname());
        console.log("mail"+getEmail());
        toast.dismiss();
        toast.success('Sign in successful!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true
        });

        navigate('/adminprofile'); // Use navigate instead of history.push
      } catch (error) {
        toast.dismiss();
        toast.error('Invalid credentials. Please try again.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true
        });
        console.error(error);
      }

      console.log('Signing in with:', email, password);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-4 text-blue-700 text-center">Welcome Admin</h1>
          <p className="text-lg mb-4 text-center">Please enter your details</p>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail1(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-gray-600"
                >
                  {showPassword ? 'Hide' : 'Show'} Password
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full">
                Sign In
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
    </>
  );
};

export default AdminSignin;
