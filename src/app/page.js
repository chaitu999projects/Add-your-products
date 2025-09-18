import Link from 'next/link';
import GetProd from './getprods/page';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
     

      {/* Hero Section */}
      <section className="relative bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Welcome to <span className="text-blue-500">MidnightGlow</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Discover premium products with exceptional quality and style. 
              Experience the difference of our carefully curated collection.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/getprods" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
              >
                Shop Now
              </Link>
              <Link 
                href="/about" 
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <GetProd />
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We are committed to excellence in every aspect of our business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-900 text-blue-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Premium Quality</h3>
              <p className="text-gray-400">
                All our products undergo rigorous quality checks to ensure excellence.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-900 text-blue-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Secure Shopping</h3>
              <p className="text-gray-400">
                Your privacy and security are our top priorities. Shop with confidence.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-800 rounded-lg border border-gray-700">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-blue-900 text-blue-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-400">
                We ship quickly and efficiently to get your products to you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default HomePage;