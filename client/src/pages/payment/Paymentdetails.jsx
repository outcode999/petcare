import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import moment from 'moment';

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [payment, setpayment] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const currentuserId = currentUser ? currentUser._id : null;
  const [paymentId, setpaymentId] = useState("");
  const [showCheckoutPopup, setShowCheckoutPopup] = useState(false);
  console.log("arra", formData);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");


  useEffect(() => {
    const fetchform = async () => {
      try {
        const res = await fetch(`/api/payment/Pget/${currentuserId}`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setpayment(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchform();
  }, [currentuserId]);

  //report
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    // Add house details to PDF
    doc.setFontSize(16);
    doc.text(20, yPos, "Payment details:");
    yPos += 10;

    payment.forEach((pay) => {
      const formattedDate = moment(pay.createdAt).format('MMMM Do YYYY, h:mm:ss a');
      doc.setFontSize(12);
      doc.text(20, yPos, `Name: ${pay.name}`);
      doc.text(20, yPos + 5, `Adress: ${pay.Address}`);
      doc.text(20, yPos + 10, `Phone: ${pay.Phone}`);
      doc.text(20, yPos + 15, `Type: ${pay.type}`);
      doc.text(20, yPos + 20, `Name: ${pay.petname}`);
      doc.text(20, yPos + 25, `Time: ${formattedDate}`);

      yPos += 40;
    });

    // Save the PDF
    doc.save("pet_Payment.pdf");
  };

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...payment]);
    } else {
      // If there's a query, filter the data
      const filteredData = payment.filter(
        (pay) =>
          pay.name && pay.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, payment]);

  //add popup window
  const handleCheckout = (id) => {
    setShowCheckoutPopup((prev) => ({
      ...prev,
      [id]: true,
    }));
    setEmpId(id);
  };

  // popup close
  const handleClosePopup = () => {
    setShowCheckoutPopup(false);
  };

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Formadd = {
        ...formData,
      };

    
      setErrorMessage(null);

      const res = await fetch("/api/reason/Rcreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Formadd),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      
      if (res.ok) {
        handleDelete();
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage(error.message);
    
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/payment/Pdelete/${paymentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setpayment((prev) => prev.filter((pay) => pay._id !== paymentId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center text-3xl font-serif mt-4 text-slate-900">
        <h1>Appiments</h1>
      </div>

      <div className="ml-8 mt-7 flex justify-center items-center">
        <form>
          <input
            type="text"
            placeholder="Search... "
            className=" w-[300px] h-8 rounded-lg shadow-xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>

      <div>
        <div className="flex justify-center items-center mt-4 ml-8">
          {currentUser && (
            <>
              <div className="flex justify-center items-center gap-2">
                <button
                  className="hidden sm:inline  bg-red-700 hover:bg-red-500  text-white font-serif  py-2 px-4  rounded-full"
                  type="button"
                  gradientDuoTone="purpleToPink"
                  onClick={() => generatePDF()}
                >
                  Generate Report
                </button>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {filter && filter.length > 0 ? (
              <>
                {filter.slice(0, showMore ? filter.length : 2).map((pay) => (
                  <div
                    key={pay._id}
                    className="w-[600px] h-[350px]  mt-10 mb-40 rounded  shadow-xl bg-red-200 bg-opacity-10 "
                  >
                    <div className="px-6 py-4">
                      <div className="flex">
                        <div className="font-extralight text-xl">Name:</div>

                        <div className="font-bold text-xl mb-2 max-w-[400px] break-words">
                          {pay.name}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="font-extralight text-lg">Address:</div>
                        <div className="text-gray-700 text-lg">
                          {pay.Address}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="font-extralight text-lg">Phone:</div>
                        <div className="text-gray-700 text-lg max-w-[400px] break-words">
                          {pay.Phone}
                        </div>
                      </div>

                      <div className="flex ">
                        <div className="font-extralight text-lg">Type:</div>
                        <div className="text-gray-700 text-lg  max-w-[400px] break-words">
                          {pay.type}
                        </div>
                      </div>

                      <div className="flex">
                        <div className="font-extralight text-lg">Petname:</div>
                        <div className="text-gray-700  text-lg max-w-4200px] break-words">
                          {pay.petname}
                        </div>
                      </div>

                      <div className="text-gray-700  max-w-[200px] break-words">
                        Card ************
                      </div>
                      <div className="text-gray-700  max-w-[200px] break-words">
                        Date *****
                      </div>
                      <div className="text-gray-700  max-w-[200px] break-words">
                        Cvc ***
                      </div>

                      {currentUser && currentUser._id === pay.currentuserId && (
                        <>
                          <div className="flex justify-center items-center gap-6 mt-8">
                            
                            <div>
                              <span
                                onClick={() => {
                                  setpaymentId(pay._id);
                                  handleCheckout(pay._id);
                                }}
                                className="hidden sm:inline   bg-red-700 hover:bg-red-500  text-white font-serif  py-2 px-4  rounded-full cursor-pointer"
                              >
                                Cancel
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {!showMore && payment.length > 2 && (
                  <div className="mt-4 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
                    <button
                      className="bg-red-600 hover:opacity-60 text-white font-bold rounded"
                      onClick={() => setShowMore(true)}
                    >
                      Show More
                    </button>
                  </div>
                )}

                {showCheckoutPopup && (
                  <div>
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-40"></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 bg-opacity-30 shadow-lg rounded-lg p-4 text-white z-50">
                      <div className="overflow-y-auto max-h-[350px]">
                        <form
                          className="flex flex-col gap-4"
                          onSubmit={handleSubmit}
                        >
                          <div>
                            <input
                              className=" bg-slate-100 text-black p-3 rounded-lg w-[460px] h-11"
                              type="text"
                              placeholder="Name"
                              id="name"
                              onChange={handlchange}
                            />
                          </div>
                          <div>
                            <input
                              className=" bg-slate-100 p-3 text-black rounded-lg w-[460px] h-11"
                              type="text"
                              placeholder="Phone"
                              id="Phone"
                              onChange={handlchange}
                            />
                          </div>
                          <div>
                            <textarea
                              className=" bg-slate-100 p-3 h-36 text-black rounded-lg w-[460px] "
                              type="text"
                              placeholder="desc"
                              id="desc"
                              onChange={handlchange}
                            />
                          </div>

                          <button
                            className=" bg-red-500 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                            type="submit"
                          >
                            submit
                          </button>
                        </form>

                        <button
                          className="bg-red-600 hover:opacity-40 text-white font-bold py-2 px-4 rounded mt-4 ml-48"
                          onClick={handleClosePopup}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p>You have no items yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
