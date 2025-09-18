import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f4] to-[#f1eee8] text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh]">
        <Image
          src="https://i.pinimg.com/736x/0a/bf/9e/0abf9e5c732b4dcd1f8bf0ab0f9a0f37.jpg" // add your resin art image in public/images
          alt="Resin Art Banner"
          fill
          className="object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-serif text-white font-bold drop-shadow-lg">
            About Us
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center text-[#3d3d3d] mb-8">
          Our Story
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 font-light text-center max-w-3xl mx-auto">
          At <span className="font-semibold">Junnu’s Resin Arts</span>, we
          believe that every creation tells a story. Our journey began with a
          passion for turning simple materials into timeless works of art.
          Inspired by nature, elegance, and individuality, we craft resin art
          pieces that are not just decor — they’re expressions of beauty and
          creativity.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-[#f6f3ef] py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Image
              src="https://i.pinimg.com/1200x/b6/a2/64/b6a26481b6e4a01ea705d83c5f3262ed.jpg" // replace with your resin product image
              alt="Resin Art Product"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-semibold text-[#2f2f2f] mb-6">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 font-light">
              We aim to bring elegance into everyday spaces with handcrafted
              resin art. Each product is designed with precision and love,
              ensuring that our customers receive not just art, but an
              experience that lasts a lifetime. From home decor to custom
              creations, we put heart and craftsmanship into everything we make.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-serif font-semibold text-[#3d3d3d] mb-10">
          What We Value
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 bg-white rounded-2xl shadow-md border border-[#e2ddd3]">
            <h3 className="text-xl font-serif font-semibold mb-3">
              Creativity
            </h3>
            <p className="text-gray-600 text-sm">
              Every design is unique, crafted to reflect individuality and
              personal style.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md border border-[#e2ddd3]">
            <h3 className="text-xl font-serif font-semibold mb-3">Quality</h3>
            <p className="text-gray-600 text-sm">
              We use premium materials and techniques to ensure timeless beauty
              in every piece.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-md border border-[#e2ddd3]">
            <h3 className="text-xl font-serif font-semibold mb-3">Passion</h3>
            <p className="text-gray-600 text-sm">
              Resin art is more than a business to us — it’s our love and
              devotion transformed into design.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
