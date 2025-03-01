import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [publishError, setPublishError] = useState(null);
  
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(formData);
  const { healthId } = useParams();


  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };




  useEffect(() => {
    try {
      const fetchForm = async () => {
        const res = await fetch(
          `/api/health/Health?HealthId=${healthId}`
        );
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedform = data.health.find((formm) => formm._id === healthId);
          if (selectedform) {
            setFormData(selectedform);
          }
        }
      };
      fetchForm();
    } catch (error) {
      console.log(error.message);
    }
  }, [healthId]);
  




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/health/updatehealth/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
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
                className="bg-slate-100 p-3 rounded-lg w-[600px] h-12 "
                id="type"
                onChange={handlchange}
                value={formData.type}
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
                  value={formData.name}
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
                  value={formData.desc}
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
