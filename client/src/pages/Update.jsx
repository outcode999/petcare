import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { app } from "../firebase";
  import { useEffect, useState } from "react";
  import { CircularProgressbar } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  import { useNavigate, useParams } from "react-router-dom";



  
  export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    console.log(formData);
    const { updateId } = useParams();
  
    const navigate = useNavigate();


    useEffect(() => {
        try {
          const fetchForm = async () => {
            const res = await fetch(
              `/api/item/Itemget?UpdateId=${updateId}`
            );
            const data = await res.json();
            console.log("data", data);
    
            if (!res.ok) {
              console.log(data.message);
              setPublishError(data.message);
              return;
            }
            if (res.ok) {
              const selectedform = data.item.find((formm) => formm._id === updateId);
              if (selectedform) {
                setFormData(selectedform);
              }
            }
          };
          fetchForm();
        } catch (error) {
          console.log(error.message);
        }
      }, [updateId]);




  
    const handleUpdloadImage = async () => {
      try {
        if (!file) {
          setImageUploadError("Please select an image");
          return;
        }
        setImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "-" + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageUploadError("Image upload failed");
            setImageUploadProgress(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUploadProgress(null);
              setImageUploadError(null);
              setFormData({ ...formData, image: downloadURL });
            });
          }
        );
      } catch (error) {
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
        console.log(error);
      }
    };
  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch(`/api/item/updatepet/${formData._id}`, {
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
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-serif">
          Update items
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center justify-between border-none p-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="border-none   rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className=" w-40 h-10 rounded-lg bg-red-500 text-white hover:opacity-90"
              size="sm"
              onClick={handleUpdloadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
          
            <input
              className=" flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
              type="text"
              placeholder="Item Name"
              required
              id="Iname"
              onChange={(e) => setFormData({ ...formData, Iname: e.target.value })}
              value={formData.Iname}
            />
            <input
              type="text"
              placeholder="price"
              required
              id="price"
              className="flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              value={formData.price}
            />
          </div>
          
          {imageUploadError && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
              {imageUploadError}
            </p>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="w-full h-72 object-cover"
            />
          )}
  
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Phone"
              required
              id="phone"
              maxLength={10}
              className="flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              value={formData.phone}
            />
  
           
          </div>
  
          <div className="flex gap-4">
            <textarea
              type="text"
              placeholder="Description"
              required
              id="desc"
              maxLength={100}
              className="flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-32"
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              value={formData.desc}
            />
  
           
          </div>
  
          <button
            type="submit"
            className=" bg-red-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90 lg:w-full"
          >
            Add
          </button>
          {publishError && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
              {publishError}
            </p>
          )}
        </form>
      </div>
    );
  }
  