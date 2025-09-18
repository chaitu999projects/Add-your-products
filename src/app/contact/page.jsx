import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f7f4] to-[#f1eee8] text-gray-800">
      {/* Hero */}
      <section className="bg-[#2f2f2f] py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">Contact Us</h1>
        <p className="mt-4 text-lg font-light max-w-2xl mx-auto">
          We’d love to hear from you. Whether it’s a custom order, a question,
          or feedback, feel free to reach out!
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-serif font-semibold text-[#3d3d3d]">
            Get in Touch
          </h2>
          <p className="text-gray-700 leading-relaxed font-light">
            Our team is always ready to assist you. Contact us through any of
            the methods below or use the form.
          </p>

          <div className="space-y-4">
            <p>
              📍 <span className="font-semibold">Location:</span> Bangalore,
              India
            </p>
            <p>
              📞 <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:+918019716330" className="text-[#2f4f2f]">
                +91 80197 16330
              </a>
            </p>
            <p>
              📧 <span className="font-semibold">Email:</span>{" "}
              <a
                href="mailto:chaitumulagani@gmail.com"
                className="text-[#2f4f2f]"
              >
                chaitumulagani@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-[#e2ddd3]">
          <h2 className="text-2xl font-serif font-semibold mb-6 text-[#2f2f2f]">
            Send us a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-[#cbbd9b] rounded-xl bg-[#faf8f5] p-3 font-serif focus:ring-2 focus:ring-[#8a7d65] outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-[#cbbd9b] rounded-xl bg-[#faf8f5] p-3 font-serif focus:ring-2 focus:ring-[#8a7d65] outline-none"
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-[#cbbd9b] rounded-xl bg-[#faf8f5] p-3 font-serif focus:ring-2 focus:ring-[#8a7d65] outline-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#4a6741] to-[#2f4f2f] text-white font-serif py-3 rounded-xl shadow-md hover:from-[#2f4f2f] hover:to-[#1e3921] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.748190226653!2d77.59456261413574!3d12.971598090855654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670a7d4aefb%3A0x3baf5d4f21c5e6e!2sBangalore!5e0!3m2!1sen!2sin!4v1639132589601!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
