import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pets from "./pets.jpg";
import { useSelector } from "react-redux";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Formadd = {
        currentuserId: currentUser._id,
        ...formData,
      };

      setErrorMessage(null);

      const res = await fetch("/api/from/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Formadd),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        navigate("/allappointment");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 mt-12 mb-10">
      <div className="flex gap-6 justify-center items-center">
        <div className="hidden lg:block">
          <img className="w-[600px] h-[500px] rounded-lg shadow-lg" src="https://images.pexels.com/photos/18968426/pexels-photo-18968426/free-photo-of-cute-terrier-puppy.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Pets" />
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Fill the Form</h2>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Owner Name */}
            <div>
              <label htmlFor="name" className="block text-gray-600 font-semibold">Owner Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-gray-600 font-semibold">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-gray-600 font-semibold">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            {/* Pet Type */}
            <div>
              <label htmlFor="type" className="block text-gray-600 font-semibold">Pet Type</label>
              <select
                id="type"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Pet Name */}
            <div>
              <label htmlFor="petname" className="block text-gray-600 font-semibold">Pet Name</label>
              <input
                type="text"
                id="petname"
                placeholder="Enter pet's name"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-5 bg-red-200 text-red-600 p-3 text-center rounded-lg">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
