import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import dog from "../img/dog.png";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);
  const [form, setform] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [formId, setformId] = useState("");
  const [blogId, setblogId] = useState("");
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [health, sethealth] = useState([]);

  const blogPosts = [
    {
      title: "Essential Pet Care Tip: Keep Your Furry Friend Happy & Healthy",
      content: "Regular exercise, a balanced diet, and routine vet check-ups are key to your pet’s well-being. Make sure to provide plenty of love, mental stimulation, and quality time for a healthy, happy life for your furry companion.",
      image: "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Demo image for blog
    },
    {
      title: "Top Pet Care Tip: Grooming for Health & Happiness",
      content: "Regular grooming not only keeps your pet looking great but also promotes healthy skin and coat. Brushing, nail trimming, and ear cleaning are essential for preventing health issues and keeping your pet comfortable.",
      image: "https://images.pexels.com/photos/8176935/pexels-photo-8176935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Demo image for blog
    },
    
  ];

  const services = [
    {
      name: "Pet Grooming",
      description: "Professional grooming services to keep your pet clean and healthy.",
      image: "https://via.placeholder.com/150", // Demo image for service
    },
    {
      name: "Pet Training",
      description: "Expert training services to help your pet learn new skills.",
      image: "https://via.placeholder.com/150", // Demo image for service
    },
    {
      name: "Veterinary Care",
      description: "Comprehensive veterinary care to ensure your pet's health.",
      image: "https://via.placeholder.com/150", // Demo image for service
    },
  ];

  const petOwners = [
    
    {
      name: "Jane Smith",
      message: "My cat is the sweetest companion. She loves to cuddle!",
      pet: "Cat",
      image: "https://images.pexels.com/photos/29540843/pexels-photo-29540843/free-photo-of-portrait-of-a-woman-with-glasses-against-vibrant-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Demo image for pet owner
    },
    {
      name: "Sarah Lee",
      message: "Fluffy my rabbit is so playful and energetic!",
      pet: "Rabbit",
      image: "https://images.pexels.com/photos/3785069/pexels-photo-3785069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", // Demo image for pet owner
    },
  ];


  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`/api/item/Itemget`);
        const data = await res.json();
        if (res.ok) {
          setform(data.item);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchForm();
  }, []);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(`/api/health/Health`);
        const data = await res.json();
        if (res.ok) {
          sethealth(data.health);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchHealth();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;
    doc.setFontSize(16);
    doc.text(20, yPos, "Items Details:");
    yPos += 10;

    form.forEach((formm) => {
      doc.setFontSize(12);
      doc.text(20, yPos, `Item Name: ${formm.Iname}`);
      doc.text(20, yPos + 5, `Price: ${formm.price}`);
      doc.text(20, yPos + 10, `Phone: ${formm.phone}`);
      doc.text(20, yPos + 15, `Description: ${formm.desc}`);
      yPos += 30;
    });

    doc.save("items_pet.pdf");
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/item/Idelete/${formId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setform((prev) => prev.filter((formm) => formm._id !== formId));
      } else {
        console.log("Error deleting item.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...form]);
    } else {
      const filteredData = form.filter(
        (formm) =>
          formm.name && formm.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, form]);

  const handleDeleteblog = async () => {
    try {
      const res = await fetch(`/api/health/health/${blogId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Health Quote deleted successfully");
        sethealth((prev) => prev.filter((fomm) => fomm._id !== blogId));
      } else {
        console.log("Error deleting health quote.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
     {/* Banner Image */}
     <img src={dog} alt="dog" className="h-[500px] w-full object-cover  rounded-lg shadow-md" />

{/* Text Overlay */}
<div className="absolute inset-0 flex justify-center items-center mt-[205px] w-[1470px] ml-6  h-[500px] bg-black bg-opacity-40  rounded-lg">
  <div className="text-center px-4   py-6">
    <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-4">Welcome to Pet Clinic</h1>
    <p className="text-white text-lg sm:text-xl font-medium">
      Your trusted partner in pet care. We provide the best services for your furry friends.
    </p>
  </div>
</div>

      {/* Search Bar */}
<div className="flex justify-center mt-6 mb-6">
  <div className="relative w-[350px]">
    <input
      type="text"
      placeholder="Search Items..."
      className="w-full h-12 rounded-lg shadow-lg px-4 pl-10 text-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
      onChange={(e) => setQuery(e.target.value)}
    />
    {/* Search Icon */}
    <svg
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        fill="none"
        d="M0 0h24v24H0z"
      />
      <path
        d="M10 2a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8zm0 14a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6zm10 4h-3.6l-2.4-2.4a9.96 9.96 0 0 0 1.6-5.6 10 10 0 1 0-10 10c1.4 0 2.7-.4 3.9-1.1l2.4 2.4h3.6a1 1 0 0 0 0-2z"
      />
    </svg>
  </div>
</div>


      {/* Product Details Section */}
<div className="flex justify-center mb-8">
  <div className="text-center">
    <h2 className="text-3xl font-semibold text-gray-800 tracking-wide uppercase mb-2">
      Product Details
    </h2>
    <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>
    <p className="text-lg text-gray-600 font-medium">
      Detailed information about the product. Learn more about features, benefits, and specifications.
    </p>
  </div>
</div>


      {/* Actions for Admin/Inventory Manager */}
      {currentUser?.isinvntryManager && (
        <div className="flex justify-center gap-6 mb-6">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
            onClick={generatePDF}
          >
            Generate Report
          </button>
          <Link to="/create-item" className="bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700">
            Add New Item
          </Link>
          <Link to="/order" className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700">
            New Order
          </Link>
        </div>
      )}

     {/* Item List */}
<div className="flex justify-center flex-wrap gap-8">
  {filter && filter.length > 0 ? (
    <>
      {filter.slice(0, showMore ? filter.length : 4).map((formm) => (
        <div key={formm._id} className="w-[300px] h-[450px] bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="p-6">
            {/* Image Section */}
            <div className="flex justify-center mb-6">
              <img
                src={formm.image}
                alt="Item"
                className="w-[120px] h-[120px] rounded-full object-cover border-2 border-gray-200"
              />
            </div>
            {/* Item Info Section */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{formm.Iname}</h3>
              <p className="text-lg font-medium text-gray-700 mb-2">Rs. {formm.price}</p>
              <p className="text-gray-600 text-sm">{formm.desc}</p>
            </div>
            {/* Action Buttons */}
            {currentUser?.isinvntryManager && (
              <div className="flex justify-center gap-4 mt-6">
                <Link
                  to={`/update-item/${formm._id}`}
                  className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 text-sm font-semibold transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    setformId(formm._id);
                    handleDelete();
                  }}
                  className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  ) : (
    <p className="text-xl text-gray-600">No items found</p>
  )}
</div>


     {/* Health Quotes Section */}
<div className="mt-10 px-4 md:px-10">
  <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Health Quotes</h2>
  <div className="flex justify-center flex-wrap gap-8 mt-6">
    {health && health.length > 0 ? (
      <>
        {health.slice(0, showMore ? health.length : 2).map((fomm) => (
          <div key={fomm._id} className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="p-6">
              {/* Quote Type and Name */}
              <h3 className="text-2xl font-semibold text-gray-800 uppercase mb-2">{fomm.type}</h3>
              <p className="text-lg text-gray-700 mb-4">Variety: {fomm.name}</p>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-6">{fomm.desc}</p>
              
              {/* Action Buttons (for Doctor Role) */}
              {currentUser?.isDoctor && (
                <div className="flex justify-center gap-4 mt-6">
                  <Link
                    to={`/updatehealth/${fomm._id}`}
                    className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 text-sm font-semibold transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      setblogId(fomm._id);
                      handleDeleteblog();
                    }}
                    className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 text-sm font-semibold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Show More Button */}
        {!showMore && health.length > 2 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowMore(true)}
              className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 text-sm font-semibold transition-colors"
            >
              Show More
            </button>
          </div>
        )}
      </>
    ) : (
      <p className="text-gray-600 text-lg">No health quotes available.</p>
    )}
  </div>
</div>




<div className="relative mt-4 mb-6 overflow-hidden rounded-lg">
  {/* Banner Image */}
  <img
    src="https://images.pexels.com/photos/14532919/pexels-photo-14532919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="dog"
    className="h-[300px] w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 hover:opacity-90"
  />

  {/* Text Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="text-center px-6 py-8 md:px-12 md:py-12">
      <h1 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight mb-4 opacity-100 hover:opacity-90 transition-opacity duration-300">
        Discover the Best Pet Care Tips
      </h1>
      <p className="text-white text-lg sm:text-xl font-medium opacity-90 md:opacity-100">
        Get expert advice on how to keep your furry friends healthy and happy. Stay updated with the latest trends in pet care!
      </p>
    </div>
  </div>
</div>

     {/* Blog Section */}
<div className="mt-10 px-4 md:px-10">
  <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
    Blog Posts
  </h2>
  <div className="flex justify-center flex-wrap gap-8 mt-6">
    {blogPosts.map((post, index) => (
      <div
        key={index}
        className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div className="p-6">
          {/* Image Section */}
          <div className="flex justify-center mb-6">
            <img
              src={post.image}
              alt={post.title}
              className="w-[120px] h-[120px] object-cover rounded-full border-4 border-gray-300 shadow-md"
            />
          </div>
          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            {post.title}
          </h3>
          {/* Content Preview */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            {post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}
          </p>
          {/* Read More Button */}
          <div className="flex justify-center">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 text-sm font-medium transition-colors">
              Read More
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      

     {/* Pet Owner Section */}
<div className="mt-10 px-4 md:px-10">
  <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
    Pet Owner Messages
  </h2>
  <div className="flex justify-center flex-wrap gap-8 mt-6">
    {petOwners.map((owner, index) => (
      <div
        key={index}
        className="w-full sm:w-[400px] md:w-[500px] lg:w-[600px] bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 shadow-xl rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      >
        {/* Profile Picture and Information */}
        <div className="p-6 bg-white rounded-lg">
          {/* Owner Image */}
          <div className="flex justify-center mb-6">
            <img
              src={owner.image}
              alt={owner.name}
              className="w-[120px] h-[120px] object-cover rounded-full border-4 border-white shadow-xl"
            />
          </div>
          {/* Owner Name */}
          <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center tracking-wide">
            {owner.name}
          </h3>
          {/* Message */}
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
            {owner.message.length > 100 ? owner.message.slice(0, 100) + "..." : owner.message}
          </p>
          {/* Pet Details */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-gray-500 text-sm font-medium">Pet: {owner.pet}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.5 3h-3L15 17zM5 17h5l-1.5 3h-3L5 17z"
              />
            </svg>
          </div>
          {/* Action Button */}
          <div className="flex justify-center">
            <button className="bg-blue-700 text-white py-2 px-6 rounded-full hover:bg-blue-800 transition-colors font-semibold">
              View Profile
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    </div>



      
    
  );
}
