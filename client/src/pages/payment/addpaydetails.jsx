import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Pets from "./pets.jpg";
import { useSelector } from "react-redux";

export default function Update() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(formData);
  const currentuserId = currentUser ? currentUser._id : null;
  const { payId } = useParams();

  useEffect(() => {
    try {
      const fetchForm = async () => {
        const res = await fetch(
          `/api/from/getpets/${currentuserId}?UpdateId=${payId}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedform = data.find((formm) => formm._id === payId);
          if (selectedform) {
            setFormData(selectedform);
          }
        }
      };
      fetchForm();
    } catch (error) {
      console.log(error.message);
    }
  }, [payId]);

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

      const res = await fetch("/api/payment/Pcreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Formadd),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        navigate(`/paydetails`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen  mt-36 mb-10">
      <div className="flex justify-center items-center gap-2">
        <div className="hidden lg:block">
          <img className="w-[600px] h-[500px] ml-10  mt-6" src={Pets} alt="" />
        </div>

        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <h className="text-3xl text-gray-800 font-serif ">
              Add payment details
            </h>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <input
                  className="border-none font-extralight"
                  type="text"
                  placeholder="Name"
                  id="name"
                  onChange={handlchange}
                  value={formData.name}
                  disabled
                />
              </div>
              <div>
                <input
                  className="border-none font-extralight"
                  type="text"
                  placeholder="Address"
                  id="Address"
                  onChange={handlchange}
                  value={formData.Address}
                  disabled
                />
              </div>
              <div>
                <input
                  className="border-none font-extralight"
                  type="text"
                  placeholder="Phone"
                  id="Phone"
                  onChange={handlchange}
                  value={formData.Phone}
                  disabled
                />
              </div>

              <select
                className=" border-none font-extralight"
                id="type"
                onChange={handlchange}
                value={formData.type}
                disabled
              >
                <option value="">Select </option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>

              <div>
                <input
                  className=" border-none font-extralight"
                  type="text"
                  placeholder="Petname"
                  id="petname"
                  onChange={handlchange}
                  value={formData.petname}
                  disabled
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">
                  Card Number
                </h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="CardNumber"
                  id="CardNumber"
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Date</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder=" (mm/yy)"
                  id="Date"
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">CVC</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="cvc"
                  id="cvc"
                  onChange={handlchange}
                />
              </div>

              <button
                className=" bg-red-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
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
