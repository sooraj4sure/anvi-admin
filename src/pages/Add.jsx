import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [category, setCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("Necklace");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!name || !description || !price || !mrp) {
      toast.error("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }

    // Validate at least one image
    if (images.every(img => img === null)) {
      toast.error("Please upload at least one image");
      setIsSubmitting(false);
      return;
    }

    console.log("Selected images:", images.filter(img => img !== null));
    try {
      const formData = new FormData();
      
      // Append all fields
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("mrp", mrp);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      // Append images that exist (using the same field name "images")
    images.forEach((image, index) => {
      if (image) {
        console.log(`Appending image ${index}:`, image.name, image.size, image.type);
        formData.append("images", image);
      }
    });
      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );



      
      if (response.data.success) {
        toast.success("Product added successfully!");
        // Reset form state
        setName("");
        setDescription("");
        setPrice("");
        setMrp("");
        setCategory("Women");
        setSubCategory("Necklace");
        setBestseller(false);
        setSizes([]);
        setImages([null, null, null, null]);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Add product error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          "Failed to add product";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3 p-4">
      {/* Image Upload Section */}
      <div>
        <p className="mb-2 font-medium">Upload Images (At least one required)</p>
        <div className="flex gap-2">
          {images.map((image, index) => (
            <label key={index} htmlFor={`image-${index}`} className="cursor-pointer">
              <img
                className="w-20 h-20 object-cover border rounded-lg"
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt={`Product image ${index + 1}`}
              />
              <input
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                type="file"
                id={`image-${index}`}
                hidden
                accept="image/*"
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product Name <span className="text-red-500">*</span></p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border rounded"
          type="text"
          placeholder="Enter Product Name"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2 font-medium">Description <span className="text-red-500">*</span></p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2 border rounded h-24"
          placeholder="Type Description"
          required
        />
      </div>

      {/* Category, Price, etc. */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        {/* Category Dropdown */}
        <div className="w-full sm:w-auto">
          <p className="mb-2 font-medium">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        {/* Sub-Category Dropdown */}
        <div className="w-full sm:w-auto">
          <p className="mb-2 font-medium">Sub-Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Necklace">Necklace</option>
            <option value="Earings">Earings</option>
            <option value="Premium">Premium</option>
          </select>
        </div>

        {/* Price */}
        <div className="w-full sm:w-auto">
          <p className="mb-2 font-medium">Price <span className="text-red-500">*</span></p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border rounded"
            type="number"
            placeholder="99"
            min="0"
            required
          />
        </div>

        {/* MRP */}
        <div className="w-full sm:w-auto">
          <p className="mb-2 font-medium">MRP <span className="text-red-500">*</span></p>
          <input
            onChange={(e) => setMrp(e.target.value)}
            value={mrp}
            className="w-full px-3 py-2 border rounded"
            type="number"
            placeholder="349"
            min="0"
            required
          />
        </div>
      </div>

      {/* Sizes Selection */}
      <div>
        <p className="mb-2 font-medium">Available Sizes</p>
        <div className="flex gap-3">
          {["FREE", "S", "M", "L"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer rounded`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex gap-2 mt-2 items-center">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-4 h-4"
        />
        <label className="cursor-pointer font-medium" htmlFor="bestseller">
          Mark as Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        className={`w-36 py-3 mt-4 rounded-lg text-white font-semibold text-lg ${
          isSubmitting ? "bg-gray-400" : "bg-emerald-500 hover:bg-emerald-600"
        }`}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ) : "ADD"}
      </button>
    </form>
  );
};

export default Add;
