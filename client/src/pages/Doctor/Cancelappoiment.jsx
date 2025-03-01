import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [Reason, setReason] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [FeedId, setFeedId] = useState("");
  const currentuserId = currentUser ? currentUser._id : null;
  const [formId, setformId] = useState("");
  console.log("arra", Reason);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  useEffect(() => {
    const fetchform = async () => {
      try {
        const res = await fetch(`/api/reason/Rget`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setReason(data.reason);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchform();
  }, []);

 

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/reason/Rdelete/${formId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setReason((prev) => prev.filter((formm) => formm._id !== formId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Reason]);
    } else {
      // If there's a query, filter the data
      const filteredData = Reason.filter(
        (formm) =>
          formm.name && formm.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Reason]);

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
        

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {filter && filter.length > 0 ? (
              <>
                {filter.slice(0, showMore ? filter.length : 2).map((formm) => (
                  <div
                    key={formm._id}
                    className=" w-[600px] h-[300px]   mt-10 mb-40 rounded  shadow-xl "
                  >
                    <div className="px-6 py-4">

                      <div className="flex gap-4">
                        
                      <div className="font-extralight text-xl">Name:</div>
                      <div className="font-bold text-xl mb-2 max-w-[100px] break-words">
                        {formm.name}
                      </div>


                      </div>
                     
                      <div className="flex gap-4">
                      <div className="font-extralight text-xl">Phone:</div>
                      <div className="text-gray-700 text-xl  max-w-[200px] break-words">
                        {formm.Phone}
                      </div>
                      </div>

                      <div className="flex gap-4">
                         

                      <div className="font-extralight text-xl">Description:</div>


                      <div className="text-gray-700 text-xl  max-w-[200px] break-words">
                        {formm.desc}
                      </div>


                      </div>
                     
                      

                      <div className="mt-10 ml-56">
                        <span
                          onClick={() => {
                            setformId(formm._id);
                            handleDelete();
                          }}
                          className="hidden sm:inline    bg-red-700 hover:bg-red-500  text-white font-serif  py-2 px-4  rounded-full  mt-10cursor-pointer"
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {!showMore && Reason.length > 2 && (
                  <div className="mt-4 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                      onClick={() => setShowMore(true)}
                    >
                      Show More
                    </button>
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
