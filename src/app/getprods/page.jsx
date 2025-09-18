import { DBConnection } from "../utils/lib/config/connection";
import ProductModel from "../models/Product";
import Image from "next/image";
import Link from "next/link";

// Always fetch fresh data (no build-time prerender)
export const revalidate = 0;

const GetProd = async () => {
  await DBConnection();

  let allProds = [];
  
  try {
    allProds = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
    
    // Convert MongoDB objects to plain objects for Next.js
    allProds = allProds.map(product => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Unknown date'
    }));
  } catch (error) {
    console.error("Database error:", error);
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center p-8 rounded-lg bg-gray-800 border border-red-500 max-w-md">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-red-300 mb-2">Database Error</h2>
          <p className="text-gray-300">Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!allProds || allProds.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="text-center p-8 rounded-2xl bg-gray-800/70 backdrop-blur-md border border-gray-700 max-w-md shadow-2xl">
          <div className="text-blue-400 text-5xl mb-4 animate-pulse">✨</div>
          <h2 className="text-2xl font-bold text-white mb-2">No products found</h2>
          <p className="text-gray-400 mb-6">Be the first to add a product to our collection</p>
          <Link 
            href="/addprods" 
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Add Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
            Product Collection
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover our curated selection of premium products
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/addprods" 
              className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Product
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-blue-400 mb-2">{allProds.length}</div>
            <div className="text-gray-400">Total Products</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {allProds.filter(p => p.image && p.image.includes('cloudinary')).length}
            </div>
            <div className="text-gray-400">Products with Images</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {new Set(allProds.map(p => p.category || 'Uncategorized')).size}
            </div>
            <div className="text-gray-400">Categories</div>
          </div>
        </div>

        {/* Debug Info (remove in production) */}
        <div className="mb-8 p-4 bg-yellow-900/30 border border-yellow-700 rounded-lg">
          <h3 className="text-yellow-400 font-medium mb-2">Debug Info ({allProds.length} products loaded)</h3>
          <div className="text-yellow-200 text-sm">
            {allProds.map((p, i) => (
              <div key={i} className="mb-1">
                #{i+1}: {p.title} - {p.image ? 'Has image' : 'No image'}
                {p.image && p.image.includes('cloudinary') && ' (Cloudinary)'}
              </div>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProds.map((item) => (
            <div
              key={item._id}
              className="group bg-gray-800/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-64 w-full overflow-hidden">
                {item.image && item.image.includes('cloudinary') ? (
                  <>
                    {/* Cloudinary Image */}
                    <Image
                      src={item.image}
                      alt={item.title || 'Product image'}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback in case image fails to load */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center ">
                      <span className="text-gray-500 text-sm">Image failed to load</span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1 group-hover:text-blue-300 transition-colors">
                  {item.title || 'Untitled Product'}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {item.description || 'No description available'}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Added: {item.createdAt || 'Unknown date'}
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm font-medium">
                    View Details
                  </button>
                  <button className="w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-300">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetProd;