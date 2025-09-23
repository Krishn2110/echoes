"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext"; 

const CulturalRegistration = () => {
  const searchParams = useSearchParams();
  const selectedEvent = searchParams.get("event");
  const selectedPrice = searchParams.get("price");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enrollment: "",
    event: "",
    screenshot: null,
    additionalInfo: "",
    price: "",
  });

    const { setIsLoading } = useLoading();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [eventPrice, setEventPrice] = useState(null);

  const events = [
    {
      id: 1,
      title: "Scavenger Hunt",
      date: "Oct 10, 2025 | 11:00 AM - 3:30 PM",
      description:
        "Team up and race against time to solve clues and find hidden treasures across the campus.",
      category: "games",
      featured: true,
      price: 100,
    },
    {
      id: 2,
      title: "Fusion Dance",
      date: "Oct 10, 2025 | 10:00 AM - 6:00 PM",
      description:
        "A high-energy performance blending classical and contemporary dance styles from around the world.",
      category: "dance",
      featured: true,
      price: 100,
    },
    {
      id: 3,
      title: "Standup Comedy",
      date: "Oct 10, 2025 | 4:00 PM - 5:00 PM",
      description:
        "Laugh out loud as comedians bring the stage alive with relatable humor and witty punchlines.",
      category: "comedy",
      featured: true,
      price: 100,
    },
    {
      id: 4,
      title: "Monologue Acting",
      date: "Oct 10, 2025 | 6:30 PM - 7:30 PM",
      description:
        "Watch powerful solo performances as actors deliver dramatic, emotional, and humorous monologues.",
      category: "theatre",
      featured: false,
      price: 100,
    },
    {
      id: 5,
      title: "DJ Competition",
      date: "Oct 10, 2025 | 8:30 PM - 10:00 PM",
      description:
        "Top DJs battle it out on the decks with electrifying mixes and killer beats.",
      category: "music",
      featured: false,
      price: 100,
    },
    {
      id: 6,
      title: "Painting Competition",
      date: "Oct 11, 2025 | 10:00 AM - 11:30 AM",
      description:
        "Showcase your creativity with colors in this live painting contest themed around cultural fusion.",
      category: "art",
      featured: false,
      price: 100,
    },
    {
      id: 7,
      title: "Music",
      date: "Oct 11, 2025 | 4:00 PM - 5:30 PM",
      description:
        "Enjoy live performances across genres including classical, pop, rock, and folk music.",
      category: "music",
      featured: false,
      price: 100,
    },
    {
      id: 8,
      title: "Rap Battle",
      date: "Oct 11, 2025 | 5:30 PM - 6:30 PM",
      description:
        "Watch lyricists go head-to-head in a freestyle showdown full of rhythm and wordplay.",
      category: "music",
      featured: false,
      price: 100,
    },
    {
      id: 9,
      title: "Dance Competition",
      date: "Oct 11, 2025 | 6:30 PM - 8:00 PM",
      description:
        "Teams and solo dancers compete in various styles from hip-hop to classical.",
      category: "dance",
      featured: false,
      price: 100,
    },
    {
      id: 10,
      title: "Fashion Show",
      date: "Oct 11, 2025 | 8:00 PM - 9:30 PM",
      description:
        "A glamorous runway show featuring innovative designs and traditional attire from various cultures.",
      category: "fashion",
      featured: false,
      price: 100,
    },
    {
      id: 11,
      title: "Bliss Twilight",
      date: "Oct 11, 2025 | 9:00 PM - 10:00 PM",
      description:
        "An enchanting musical night under the stars with ambient lighting and soulful tunes.",
      category: "music",
      featured: false,
      price: 100,
    },
    {
      id: 12,
      title: "Cooking Competition",
      date: "Oct 12, 2025 | 10:00 AM - 1:00 PM",
      description:
        "Show off your culinary skills and impress the judges with delicious and creative dishes.",
      category: "food",
      featured: false,
      price: 150,
    },
    {
      id: 13,
      title: "Short-Film Competition",
      date: "Oct 12, 2025 | 2:00 PM - 3:30 PM",
      description:
        "A showcase of creativity through short films that tell impactful stories in limited time.",
      category: "film",
      featured: false,
      price: 150,
    },
  ];

  useEffect(() => {
  setIsLoading(true);

  // Simulate page load delay
  const timeout = setTimeout(() => {
    setIsLoading(false);
  }, 500); // adjust duration as needed

  return () => clearTimeout(timeout); // cleanup
}, []);

  useEffect(() => {
    if (selectedEvent) {
      setFormData((prev) => ({ ...prev, event: selectedEvent }));
    }
  }, [selectedEvent]);

  useEffect(() => {
    const eventObj = events.find((ev) => ev.title === formData.event);
    if (eventObj) {
      setEventPrice(eventObj.price);
    } else {
      setEventPrice(null);
    }
  }, [formData.event]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "screenshot") {
      setFormData((prev) => ({ ...prev, screenshot: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsLoading(false);  
      setSubmissionSuccess(true);
    }, 1500);
  };

  const handleBackClick = () => {
    window.location.href = "/";
  };

  return (
    <div className="font-delius min-h-screen bg-gray-950 text-white overflow-hidden relative">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Delius&display=swap");
        .font-delius {
          font-family: "Delius", cursive;
        }
        .glow-text {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        }
      `}</style>

      {/* Particle Background */}
      <div className="absolute inset-0 bg-grid-pink-500/[0.02] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-pink">CULTURAL FEST</span>
            <span className="text-neon-purple"> REGISTRATION</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Register for Echoes Cultural Fest events and performances
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Form Section */}
            <div className="p-8">
              {submissionSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-green-500 mb-4">
                    Registration Successful!
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Thank you for registering for Echoes Cultural Fest. We've sent a
                    confirmation to your email.
                  </p>
                  <button
                    onClick={() => setSubmissionSuccess(false)}
                    className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                  >
                    Register Again
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-neon-pink">
                    Cultural Fest Registration
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-400 mb-2 text-lg">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2 text-lg">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-400 mb-2 text-lg">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2 text-lg">
                          Enrollment Number
                        </label>
                        <input
                          type="text"
                          name="enrollment"
                          value={formData.enrollment}
                          onChange={handleChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Enter your enrollment number"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2 text-lg">
                        Select Event
                      </label>
                      <div className="relative">
                        <select
                          name="event"
                          value={formData.event}
                          onChange={handleChange}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                          required
                        >
                          <option value="">Choose a cultural event</option>
                          {events.map((event) => (
                            <option key={event.id} value={event.title}>
                              {event.title} - {event.date}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2 text-lg">
                        Upload Payment Screenshot
                      </label>
                      <input
                        type="file"
                        name="screenshot"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:transition-colors cursor-pointer"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2 text-lg">
                        Special Requirements
                      </label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        rows="3"
                        placeholder="Costume requirements, instrument needs, dietary restrictions, etc."
                      />
                    </div>

                    <div className="flex items-center mb-6">
                      <input
                        id="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-pink-600 border-gray-700 rounded focus:ring-pink-500"
                      />
                      <label htmlFor="terms" className="ml-2 block text-gray-300">
                        I agree to the{" "}
                        <span className="text-pink-400 hover:underline cursor-pointer">
                          Terms and Conditions
                        </span>
                      </label>
                    </div>

                    {eventPrice && (
                      <div className="mb-6 text-center">
                        <h3 className="text-lg font-semibold text-neon-purple mb-2">
                          Registration Fee: ₹{eventPrice}
                        </h3>
                        <p className="text-gray-400 mb-2">Scan the QR code to make the payment:</p>

                       <div className="flex justify-center">
  <img
    src="/qr.png"
    alt="Payment QR"
    className="w-44 h-44 border border-gray-600 rounded-lg"
  />
</div>
<p className="text-xs text-gray-500 mt-2 italic">
  Scan with any UPI app to pay
</p>


                        <p className="text-xs text-gray-500 mt-2 italic">UPI ID: mab.037325000800070@axisbank</p>
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-4 rounded-lg cursor-pointer text-lg font-bold text-white transition ${
                          isSubmitting
                            ? "bg-gray-700 cursor-not-allowed"
                            : "bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90"
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Processing...
                          </div>
                        ) : (
                          "Complete Registration"
                        )}
                      </button>
                      <motion.button
                        onClick={handleBackClick}
                        className="z-50 bg-gray-900/70 backdrop-blur-md border border-neon-pink text-neon-pink px-4 py-3 rounded-lg justify-center cursor-pointer flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        whileHover={{ backgroundColor: "#ff00c830" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Back to Cultural Fest
                      </motion.button>
                    </div>
                  </form>
                </>
              )}
            </div>

            {/* Info Section */}
            <div className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 p-8 border-l border-gray-700">
              <div className="h-full flex flex-col justify-center">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/20 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-pink-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Echoes Cultural Fest</h3>
                  <p className="text-gray-300">
                    Celebrating diversity through music, dance, art, and cuisine from around the
                    world
                  </p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-300">Experience diverse cultural performances</p>
                  </li>

                  <li className="flex items-center">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-300">Participate in interactive workshops</p>
                  </li>

                  <li className="flex items-center">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-300">Showcase your cultural heritage</p>
                  </li>

                  <li className="flex items-center">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="ml-3 text-gray-300">Taste authentic global cuisine</p>
                  </li>
                </ul>

                <div className="mt-auto pt-6 border-t border-gray-700">
                  <h4 className="text-lg font-bold text-white mb-3">Need Help?</h4>
                  <div className="flex items-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>Cultural Fest Coordinator: +1 (555) 123-CULT</span>
                  </div>
                  <div className="flex items-center text-gray-400 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>culture@echoesfest.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CulturalRegistration;
