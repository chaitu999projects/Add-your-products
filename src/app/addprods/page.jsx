import { DBConnection } from "../utils/lib/config/connection";
import ProductModel from "../models/Product";
import cloudinary from "../utils/lib/cloudinary";

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
    await ProductModel.create({ image: imageUrl, title, description });
    
    // Return success message
    return { success: true, message: "Product added successfully!" };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f4f0] to-[#e8e3dd] px-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm border border-[#d6c9b6] rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-serif font-semibold text-[#2f2f2f] mb-6 text-center">
          Add a New Product
        </h1>

        <form
          action={formFn}
          className="flex flex-col gap-5"
          encType="multipart/form-data"
        >
          <label className="block">
            <span className="text-[#3d3d3d] font-medium font-serif">
              Upload Image
            </span>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="mt-2 block w-full text-sm text-gray-700 border border-[#cbbd9b] rounded-xl bg-[#faf8f5] p-2 focus:ring-2 focus:ring-[#8a7d65] focus:outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="text-[#3d3d3d] font-medium font-serif">Title</span>
            <input
              type="text"
              name="title"
              placeholder="Enter product title"
              className="mt-2 block w-full border border-[#cbbd9b] rounded-xl bg-[#faf8f5] p-3 font-serif focus:ring-2 focus:ring-[#8a7d65] focus:outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="text-[#3d3d3d] font-medium font-serif">
              Description
            </span>
            <textarea
              name="description"
              placeholder="Enter product description"
              className="mt-2 block w-full border border-[#cbbd9b] rounded-xl bg-[#faf8f5] p-3 font-serif focus:ring-2 focus:ring-[#8a7d65] focus:outline-none"
              rows={4}
              required
            />
          </label>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#4a6741] to-[#2f4f2f] text-[#fdfcf9] font-serif py-3 rounded-xl shadow-md hover:from-[#2f4f2f] hover:to-[#1e3921] transition-all duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}