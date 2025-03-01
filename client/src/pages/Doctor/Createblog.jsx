import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(formData);

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

      const res = await fetch("/api/health/Healthcreate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Formadd),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
     
      if (res.ok) {
        navigate("/");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen  mt-36 mb-10">
      <div className="flex justify-center items-center gap-2">
        <div className="hidden lg:block">
        
        </div>

        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <h className="text-3xl text-gray-800 font-serif ">Health Quotes</h>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              
             
              

              <select
                className="bg-slate-100 p-3 rounded-lg w-[600px] h-11 "
                id="type"
                onChange={handlchange}
              >
                <option value="">Select </option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>
             
                  

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Variety Names</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[600px] h-11"
                  type="text"
                  placeholder=""
                  id="name"
                  onChange={handlchange}
                />
              </div>


              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Health Quotes</h3>
                <textarea
                  className=" bg-slate-100 p-3 rounded-lg w-[600px] h-44"
                  type="text"
                  placeholder="health quotes"
                  id="desc"
                  onChange={handlchange}
                />
              </div>

              <button
                className=" bg-red-700 text-white p-3 rounded-lg w-[600px] h-11 hover:opacity-90"
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
