import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [Form, setform] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const currentuserId = currentUser ? currentUser._id : null;
  console.log("arra", Form);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  useEffect(() => {
    const fetchform = async () => {
      try {
        const res = await fetch(`/api/from/getAllpets`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setform(data.form);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchform();
  }, []);

  //report
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    // Add house details to PDF
    doc.setFontSize(16);
    doc.text(20, yPos, "Appoiment Details:");
    yPos += 10;

    Form.forEach((formm) => {
      doc.setFontSize(12);
      doc.text(20, yPos, `Name: ${formm.name}`);
      doc.text(20, yPos + 5, `Adrress: ${formm.Address}`);
      doc.text(20, yPos + 10, `Phone: ${formm.Phone}`);
      doc.text(20, yPos + 15, `Type: ${formm.type}`);
      doc.text(20, yPos + 20, `PetName: ${formm.petname}`);

      yPos += 35;
    });

    // Save the PDF
    doc.save("petcare_appoiment.pdf");
  };

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Form]);
    } else {
      // If there's a query, filter the data
      const filteredData = Form.filter(
        (formm) =>
          formm.name && formm.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Form]);

  return (
    <div>
   <div className="flex justify-center items-center mt-12 mb-6">
  <h1 className="text-5xl sm:text-3xl font-extrabold text-black tracking-wide leading-tight text-center relative">
    Today Appointments
    <span className="absolute bottom-0 left-0 w-24 h-1 bg-black rounded-full"></span>
  </h1>
  
  
</div>



<div className="ml-8 mt-7 flex justify-center items-center">
  <form className="relative w-[350px]">
    {/* Search Icon */}
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="text-gray-500" viewBox="0 0 16 16">
        <path d="M11.742 10.742a6 6 0 1 0-1.416 1.415 7.001 7.001 0 0 1 1.415 1.415l4 4a1 1 0 1 0 1.414-1.414l-4-4zM12 6a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
      </svg>
    </div>
    {/* Input Box */}
    <input
      type="text"
      placeholder="Search... "
      className="w-full h-12 pl-10 pr-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
      onChange={(e) => setQuery(e.target.value)}
    />
  </form>
</div>


<div className="mt-8">
  <div className="flex justify-center items-center gap-6">
    {currentUser.isDoctor && (
      <>
        {/* Generate Report Button */}
        <div className="flex justify-center items-center">
          <button
            className="bg-red-700 hover:bg-red-500 text-white font-serif py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            type="button"
            onClick={() => generatePDF()}
          >
            Generate Report
          </button>
        </div>

        {/* Cancel Appointment Button */}
        <div className="flex justify-center items-center">
          <Link to="/cancel">
            <button
              className="bg-red-700 hover:bg-red-500 text-white font-serif py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              type="button"
            >
              Cancel Appointments
            </button>
          </Link>
        </div>

        {/* Add Blog Button */}
        <div className="flex justify-center items-center">
          <Link to="/healthblog">
            <button
              className="bg-red-700 hover:bg-red-500 text-white font-serif py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              type="button"
            >
              Add Blog
            </button>
          </Link>
        </div>
      </>
    )}
  </div>



  <div className="flex justify-center mt-4">
  <div className="flex flex-wrap justify-center gap-8">
    {filter && filter.length > 0 ? (
      <>
        {filter.slice(0, showMore ? filter.length : 2).map((formm) => (
          <div
            key={formm._id}
            className="w-[350px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-auto bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-[200px]">
              <img
                src={formm.image || 'https://images.pexels.com/photos/12975265/pexels-photo-12975265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} // Add a default image fallback
                alt={formm.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>

            {/* Content Section */}
            <div className="px-6 py-4">
              <h3 className="font-semibold text-xl text-slate-900 mb-2 truncate">{formm.name}</h3>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <span className="font-extralight text-lg text-gray-600">Address:</span>
                  <span className="text-gray-800 text-lg">{formm.Address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-extralight text-lg text-gray-600">Phone:</span>
                  <span className="text-gray-800 text-lg">{formm.Phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-extralight text-lg text-gray-600">Type:</span>
                  <span className="text-gray-800 text-lg">{formm.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-extralight text-lg text-gray-600">Pet Name:</span>
                  <span className="text-gray-800 text-lg">{formm.petname}</span>
                </div>
              </div>
            </div>

            {/* Bottom Action Section (Optional) */}
            <div className="px-6 py-3 flex justify-between items-center bg-gray-100 rounded-b-lg">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-all duration-200"
                onClick={() => alert('Details Clicked')} // Replace with your action
              >
                View Details
              </button>
            </div>
          </div>
        ))}

        {/* Show More Button */}
        {!showMore && filter.length > 2 && (
          <div className="mt-4 text-center w-full">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
              onClick={() => setShowMore(true)}
            >
              Show More
            </button>
          </div>
        )}
      </>
    ) : (
      <p className="text-gray-600 text-lg">No items available yet.</p>
    )}
  </div>
</div>

      </div>
    </div>
  );
}
