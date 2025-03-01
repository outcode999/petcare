import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

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
      const res = await fetch("/api/item/Itemcreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-50 rounded-xl shadow-lg">
      <h1 className="text-center text-3xl my-7 font-semibold text-slate-900">
        Add Pet Item
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className="flex gap-6 items-center justify-between border-none p-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            className="w-40 h-12 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-all"
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

        {/* Input Fields Section */}
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Pet Name"
            required
            id="Iname"
            onChange={(e) =>
              setFormData({ ...formData, Iname: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Price"
            required
            id="price"
            className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>

        {/* Error Message for Image Upload */}
        {imageUploadError && (
          <p className="mt-3 text-red-600 bg-red-200 w-full text-center rounded-lg py-2">
            {imageUploadError}
          </p>
        )}

        {/* Preview Image with Pet-themed Background */}
        {formData.image && (
          <div
            className="w-full h-72 mt-4 rounded-lg bg-cover bg-center"
            style={{
              backgroundImage: `url(${formData.image})`,
              backgroundColor: "rgba(255, 255, 255, 0.6)", // Semi-transparent background for text contrast
              backgroundBlendMode: "overlay",
            }}
          >
            <div className="w-full h-full bg-gray-900 bg-opacity-40 flex items-center justify-center">
              <p className="text-white text-lg font-bold">Pet Item Preview</p>
            </div>
          </div>
        )}

        {/* Phone Input */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Phone"
            required
            id="phone"
            className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {/* Description Input */}
        <div className="flex gap-4">
          <textarea
            placeholder="Description"
            required
            id="desc"
            maxLength={200}
            className="flex-1 bg-white p-4 rounded-lg shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 h-32"
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-red-600 text-white p-4 rounded-lg w-full hover:bg-green-700 transition-all mt-6"
        >
          Add Pet Item
        </button>

        {/* Error Message for Publishing */}
        {publishError && (
          <p className="mt-3 text-red-600 bg-red-200 w-full text-center rounded-lg py-2">
            {publishError}
          </p>
        )}
      </form>
    </div>
  );
}
