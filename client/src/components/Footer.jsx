import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserAlt, FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400 text-sm">
              We are committed to providing the best services for your needs. Your satisfaction is our priority.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-400 text-sm">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-400 text-sm">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gray-400 text-sm">Services</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gray-400 text-sm">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <FaPhoneAlt className="mr-2" />
                <span>+1 234 567 890</span>
              </li>
              <li className="text-sm">Email: info@example.com</li>
              <li className="text-sm">Address: 123 Main St, City, Country</li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-600">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-500">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Saffic Private limited (Pvt Ltd) . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
