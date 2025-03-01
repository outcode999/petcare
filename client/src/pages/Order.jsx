import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.type || !formData.name || !formData.desc) {
      setErrorMessage("All fields are required");
      return;
    }

    setErrorMessage(null);


    // Generate PDF
const doc = new jsPDF();

// Set font size and style
doc.setFontSize(12);
doc.setFont("helvetica", "normal");

// Set initial y position
let y = 20;

// Add title
doc.setFontSize(16);
doc.text("Order Details", 10, y);
y += 15; // Increase y position

// Reset font size
doc.setFontSize(12);

// Add horizontal lines and content
const lineY = y - 5; // Position of the horizontal lines
doc.line(10, lineY, 200, lineY); // Horizontal line under the title

y += 10; // Increase y position

doc.text("Type:", 10, y);
doc.text(`${formData.type}`, 50, y);
doc.line(50, y + 2, 200, y + 2); // Horizontal line under the type

y += 10;

doc.text("Name:", 10, y);
doc.text(`${formData.name}`, 50, y);
doc.line(50, y + 2, 200, y + 2); // Horizontal line under the name

y += 10;

doc.text("Quantity:", 10, y);
doc.text(`${formData.Quantity}`, 50, y);
doc.line(50, y + 2, 200, y + 2); // Horizontal line under the quantity

y += 10;

// Split the description into lines if it exceeds 200px width
const descriptionLines = doc.splitTextToSize(formData.more, 200);
doc.text("Description:", 10, y);

// Check if the description fits in one line or needs to be split
if (descriptionLines.length > 1) {
    doc.text(descriptionLines[0], 50, y);
    doc.text(descriptionLines[1], 50, y + 10);
} else {
    doc.text(`${formData.more}`, 50, y);
}

y += 20; // Increase y position

doc.line(50, y + 2, 200, y + 2); // Horizontal line under the description

// Save the PDF
doc.save("Order_order.pdf");

  




  }

  return (
    <div className="min-h-screen  mt-36 mb-10">
      <div className="flex justify-center items-center gap-2">
        <div className="hidden lg:block"></div>
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <h className="text-3xl text-gray-800 font-serif ">New Order</h>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <select
                className="bg-slate-100 p-3 rounded-lg w-[600px] h-11"
                id="type"
                onChange={handlchange}
              >
                <option value="">Select </option>
                <option value="Food and Treats">Food and Treats</option>
                <option value="Feeding Accessories">Feeding Accessories</option>
                <option value="Grooming Supplies">Grooming Supplies</option>
              </select>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Items Names</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[600px] h-11"
                  type="text"
                  placeholder=""
                  id="name"
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Quantity</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[600px] h-11"
                  type="number"
                  placeholder=""
                  id="Quantity"
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">more</h3>
                <textarea
                  className="bg-slate-100 p-3 rounded-lg w-[600px] h-44"
                  type="text"
                  placeholder=""
                  id="more"
                  onChange={handlchange}
                />
              </div>
              <button
                className="bg-red-700 text-white p-3 rounded-lg w-[600px] h-11 hover:opacity-90"
                type="submit"
              >
                Submit
              </button>
            </form>
            {errorMessage && (
              <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
