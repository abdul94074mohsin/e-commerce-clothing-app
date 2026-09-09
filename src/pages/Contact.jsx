import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 space-y-6">
      <h1 className="text-4xl font-black uppercase text-center">Contact Us</h1>
      <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }} className="space-y-4">
        <input type="text" placeholder="Your Name" required className="w-full border p-3 rounded-lg" />
        <input type="email" placeholder="Your Email" required className="w-full border p-3 rounded-lg" />
        <textarea placeholder="Your Message" rows="5" required className="w-full border p-3 rounded-lg"></textarea>
        <button type="submit" className="w-full bg-black text-white py-3 font-bold uppercase rounded-lg">Send Message</button>
      </form>
    </div>
  );
}