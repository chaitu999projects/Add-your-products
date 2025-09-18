import { DBConnection } from "../utils/lib/config/connection";
import ProductModel from "../models/Product";
import cloudinary from "../utils/lib/cloudinary";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default function AddProds() {
  // server action
  const formFn = async (formData) => {
    "use server";

    await DBConnection();

    // get file
    const file = formData.get("image");
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");

    let imageUrl = "";

    if (file && file.size > 0) {
      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to Cloudinary using promise-based approach
      try {
        imageUrl = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (error) {
                reject(new Error("Cloudinary upload failed: " + error.message));
              } else {
                resolve(result.secure_url);
              }
            }
          );
          
          // Pipe buffer into upload stream
          uploadStream.end(buffer);
        });
      } catch (error) {
        console.error("Upload error:", error);
        throw error;
      }
    }

    // Create product with the image URL
    await ProductModel.create({ 
      image: imageUrl, 
      title, 
      description,
      category 
    });
    
    // Return success message
    return { success: true, message: "Product added successfully!" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            Add New Product
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Fill out the form below to add a new product to our collection
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Products
            </Link>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 p-8">
          <form
            action={formFn}
            className="flex flex-col gap-6"
            encType="multipart/form-data"
          >
            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-white font-medium">
                Product Image
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-xl bg-gray-900/50">
                <div className="space-y-1 text-center">
                  <div className="flex text-sm text-gray-400">
                    <label className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="sr-only"
                        required
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-white font-medium">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter product title"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Category Input */}
            <div className="space-y-2">
              <label className="text-white font-medium">
                Category
              </label>
              <input
                type="text"
                name="category"
                placeholder="Enter product category"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-white font-medium">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter product description"
                className="w-full bg-gray-900/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                rows={4}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 mt-4"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}