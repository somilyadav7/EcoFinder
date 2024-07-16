import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!name || !email || !phone || !message) {
      toast.error('Please fill in all fields.');
      return;
    }

    // Name validation (only alphabets)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      toast.error('Name must contain only alphabets.');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Phone number validation (exactly 10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }

    // Message validation (not empty)
    if (message.trim() === '') {
      toast.error('Message cannot be empty.');
      return;
    }

    const templateParams = {
      name,
      email,
      phone,
      message,
    };

    emailjs.send('service_302g8j4', 'template_l76238i', templateParams, 'U7U8q3Eu7wfurMdAl')
      .then((result) => {
        console.log(result.text);
        toast.success('Message sent successfully!');
        // Reset form fields
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }, (error) => {
        console.log(error.text);
        toast.error('An error occurred, please try again.');
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">Contact Us</h1>
          <p className="text-lg mb-8">Have questions or inquiries? Get in touch with us!</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium">
                Your Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </>
  );
};

export default Contact;
