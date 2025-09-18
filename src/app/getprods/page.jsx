import { DBConnection } from "../utils/lib/config/connection";
import ProductModel from "../models/Product";
import Image from "next/image";

const GetProd = async () => {
  await DBConnection();

  const allProds = await ProductModel.find({}).lean();

  if (!allProds || allProds.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center p-8 rounded-lg bg-gray-800 border border-gray-700 max-w-md">
          <div className="text-blue-400 text-4xl mb-4">✨</div>
          <p className="text-xl text-gray-200">No products found.</p>
          <p className="text-gray-400 mt-2">Check back soon for new arrivals</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Product Collection
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
          Discover our curated selection of premium products
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProds.map((item) => (
          <div
            key={item._id.toString()}
            className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Product Image */}
            <div className="relative h-64 w-full">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-5 flex flex-col h-full">
              <h3 className="text-lg font-semibold text-white mb-2 truncate">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>

              <button className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto mt-16 text-center pt-8 border-t border-gray-800">
        <p className="text-gray-400 text-sm sm:text-base">
          © {new Date().getFullYear()} Your Brand Name
        </p>
      </div>
    </div>
  );
};

export default GetProd;
