import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSilce";
import { FaUserAlt, FaSignOutAlt, FaHome, FaRegHeart } from 'react-icons/fa';

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gray-800">
      <div className="flex justify-between items-center px-8 py-4 max-w-6xl mx-auto">
        <ul className="flex items-center gap-12 text-white">
          <li>
            <Link to="/" className="flex items-center text-lg hover:text-gray-400 transition-all">
              <FaHome className="mr-2" />
              Home
            </Link>
          </li>

          <li>
            <Link to="/" className="flex items-center text-lg hover:text-gray-400 transition-all">
              <FaRegHeart className="mr-2" />
              About Us
            </Link>
          </li>

          <li>
            <Link to="/" className="flex items-center text-lg hover:text-gray-400 transition-all">
              <FaUserAlt className="mr-2" />
              Profile
            </Link>
          </li>

          {currentUser && (
            <li>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-lg text-white hover:text-gray-400 focus:outline-none"
              >
                Welcome, {currentUser.username}
              </button>
            </li>
          )}

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute mt-12 bg-white shadow-lg rounded-md w-48 z-10 right-8"
            >
              {currentUser.isDoctor && (
                <div className="px-4 py-3">
                  <h1 className="text-gray-700">Hi Doctor</h1>
                  <Link to="/view" className="block text-gray-700 py-2 hover:bg-gray-100 px-4">Appointments</Link>
                  <Link to="/cancel" className="block text-gray-700 py-2 hover:bg-gray-100 px-4">Cancel Appointment</Link>
                </div>
              )}

              {currentUser.isinvntryManager && (
                <div className="px-4 py-3">
                  <h1 className="text-gray-700">Hi Seller</h1>
                  <Link to="/create-item" className="block text-gray-700 py-2 hover:bg-gray-100 px-4">Add Items</Link>
                  <Link to="/" className="block text-gray-700 py-2 hover:bg-gray-100 px-4">Manage Items</Link>
                </div>
              )}

              {currentUser && !currentUser.isDoctor && !currentUser.isinvntryManager && (
                <div className="px-4 py-3">
                  <h1 className="text-gray-700">Hi Pet Owner</h1>
                  <Link to="/appointment" className="block text-gray-700 py-2 hover:bg-gray-100 px-4">Add Appointment</Link>
                  <Link to="/allappointments" className="block text-gray-700 py-2 hover:bg-gray-100 px-4">Appointments</Link>
                  <Link to="/paydetails" className="block text-gray-700 py-2 hover:bg-gray-100 px-4">Manage Payment</Link>
                </div>
              )}
            </div>
          )}
        </ul>

        <div className="flex items-center gap-6">
          {currentUser ? (
            <button
              onClick={handleSignout}
              className="flex items-center text-white text-lg hover:text-gray-400 transition-all"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          ) : (
            <Link to="/sign-in" className="text-white text-lg hover:text-gray-400 transition-all">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
