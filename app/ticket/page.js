"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import {
  FaTicketAlt,
  FaCheck,
  FaArrowLeft,
  FaRupeeSign,
  FaUpload
} from "react-icons/fa";
import { useLoading } from "../context/LoadingContext";

const DeliusRegular = localFont({
  src: [
    {
      path: "../fonts/Delius-Regular.ttf",
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-delius-regular",
  display: "swap"
});

const BuyTicketsPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    screenshot: null,
    screenshotPreview: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const fileInputRef = useRef(null);
  const { setIsLoading } = useLoading();

  // Single ticket option
  const ticketOption = {
    id: 1,
    name: "Artist Show Pass",
    price: 399,
    type: "artist-show",
    description: "Access to the exclusive artist performance at ECHOES Cultural Fest 2025",
    features: [
      "Entry to the featured artist performance",
      "Reserved seating (if applicable)",
      "Access to artist Q&A session (limited)",
      "Exclusive show-only merchandise discounts"
    ],
    color: "from-purple-500 to-pink-500"
  };

  

  // Event details
  const eventDetails = {
    title: "ECHOES Cultural Fest 2025 - Artist Show",
    date: "October 12, 2025 | 6:30 PM onwards",
    time: "Artist Performance: 6:30 PM - 9:00 PM",
    location: "IITRAM Campus, Ahmedabad",
    venue: "Main Stage"
  };

  // Validation rules
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Please enter a valid 10-digit Indian phone number";
    }

    if (!formData.screenshot) {
      errors.screenshot = "Payment screenshot is required";
    }

    if (!formData.quantity || formData.quantity < 1) {
      errors.quantity = "Please select at least 1 ticket";
    }

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setFormErrors((prev) => ({ ...prev, screenshot: "Please upload an image file" }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors((prev) => ({ ...prev, screenshot: "File size must be less than 5MB" }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData((prev) => ({
          ...prev,
          screenshot: file,
          screenshotPreview: ev.target.result
        }));
      };
      reader.readAsDataURL(file);

      if (formErrors.screenshot) {
        setFormErrors((prev) => ({ ...prev, screenshot: "" }));
      }
    }
  };

  const removeScreenshot = () => {
    setFormData((prev) => ({ ...prev, screenshot: null, screenshotPreview: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
  // guard in case context isn't provided
  if (typeof setIsLoading !== "function") return;

  setIsLoading(true);
  const t = setTimeout(() => setIsLoading(false), 900); // choose duration you like
  return () => clearTimeout(t);
}, [setIsLoading]);


  // Proceed directly to final "Registration Complete" step after validation
  const handleProceedToDetails = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // simulate submission loading
      setIsSubmitting(true);
      setIsLoading(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        // go to success (step 2)
        setCurrentStep(2);
      }, 1200);
    } else {
      setFormErrors(errors);
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }
  };

  const calculateTotal = () => ticketOption.price * formData.quantity;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className={`${DeliusRegular.className} min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden`}>
      {/* Background Elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
          <motion.button onClick={() => router.back()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 text-neon-pink hover:text-pink-300 transition-colors p-2 bg-white rounded-xl mb-6 mx-auto md:mx-0">
            <FaArrowLeft />
            Back to Event
          </motion.button>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-neon-pink to-neon-purple">
            Artist Show Pass Booking
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">Secure your spot for the exclusive artist performance</p>
        </motion.header>

        {/* Progress Steps - now only 2 steps */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 md:space-x-4">
            {[1, 2].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 text-sm md:text-base ${currentStep >= step ? 'bg-neon-pink border-neon-pink' : 'border-gray-600'}`}>
                  <span className={`font-bold ${currentStep >= step ? 'text-black' : 'text-gray-400'}`}>{step}</span>
                </div>
                {step < 2 && <div className={`w-12 md:w-20 h-1 mx-2 md:mx-4 ${currentStep > step ? 'bg-neon-pink' : 'bg-gray-600'}`}></div>}
              </div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Ticket Selection & Form */}
          {currentStep === 1 && (
            <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Ticket Card */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm border-2 border-neon-pink rounded-2xl p-6 md:p-8 h-full">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 mx-auto">
                      <FaTicketAlt className="text-2xl md:text-3xl" />
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{ticketOption.name}</h2>

                    <div className="text-center mb-4">
                      <span className="text-3xl md:text-4xl font-bold flex items-center justify-center">
                        <FaRupeeSign className="mr-1" />
                        {ticketOption.price}
                      </span>
                      <div className="text-green-400 text-sm md:text-base">Single Pass</div>
                    </div>

                    <p className="text-gray-300 text-sm md:text-base mb-6">{ticketOption.description}</p>

                    <ul className="grid grid-cols-1 gap-3 mb-6 text-left">
                      {ticketOption.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm md:text-base">
                          <FaCheck className="text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Payment QR Code */}
              <motion.div variants={itemVariants} className="lg:col-span-1">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 h-full">
                  <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center">
                    Scan to Pay
                  </h3>

                  <div className="text-center mb-4">
                    <div className="bg-white p-4 rounded-lg inline-block mb-3">
                    
                        
                        <img src="/qr.png" alt="Payment QR" className="w-44 h-44 border border-gray-600 rounded-lg" />
                  
                    
                    </div>
                    <p className="text-gray-300 text-sm mb-2">Scan QR code to make payment</p>
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                      <p className="text-yellow-400 text-sm font-semibold">Amount: ₹{calculateTotal()}</p>
                      <p className="text-yellow-300 text-xs">UPI ID: mab.037325000800070@axisbank</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-gray-400">
                    <p>📱 Use any UPI app to scan</p>
                    <p>💳 Google Pay, PhonePe, Paytm supported</p>
                    <p>⏰ Payment verification takes 2-3 minutes</p>
                  </div>
                </div>
              </motion.div>

              {/* Attendee Information Form */}
              <motion.div variants={itemVariants} className="lg:col-span-1 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold mb-6 text-center">Booking Information</h3>

                <div className="space-y-4 mb-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors ${formErrors.name ? "border-red-500" : "border-gray-600 focus:border-neon-pink"}`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors ${formErrors.email ? "border-red-500" : "border-gray-600 focus:border-neon-pink"}`}
                      placeholder="Enter your email"
                    />
                    {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors ${formErrors.phone ? "border-red-500" : "border-gray-600 focus:border-neon-pink"}`}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                    />
                    {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
                  </div>

                  {/* Screenshot Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Payment Screenshot *</label>

                    {formData.screenshotPreview ? (
                      <div className="relative">
                        <img src={formData.screenshotPreview} alt="Payment screenshot" className="w-full h-32 object-cover rounded-lg border-2 border-green-500" />
                        <button type="button" onClick={removeScreenshot} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">×</button>
                      </div>
                    ) : (
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${formErrors.screenshot ? "border-red-500" : "border-gray-600 hover:border-neon-pink"}`} onClick={() => fileInputRef.current?.click()}>
                        <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-300">Click to upload payment screenshot</p>
                        <p className="text-gray-400 text-sm">PNG, JPG up to 5MB</p>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleScreenshotUpload} className="hidden" />
                      </div>
                    )}
                    {formErrors.screenshot && <p className="text-red-400 text-sm mt-1">{formErrors.screenshot}</p>}
                  </div>

                  {/* Quantity (Fixed) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Number of Tickets</label>
                    <input type="text" value="1 Ticket" disabled className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white cursor-not-allowed" />
                    <input type="hidden" name="quantity" value="1" />
                  </div>
                </div>

                <div className="text-center">
                  <button onClick={handleProceedToDetails} className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:opacity-90 transition-opacity text-lg">
                    Verify Payment
                  </button>
                  <p className="text-gray-400 text-sm mt-3">* All fields are mandatory</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Step 2: Registration Complete (success) */}
          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.5 }} className="text-center bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 max-w-2xl mx-auto">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-3xl text-white" />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">Registration Complete!</h2>
              <p className="text-gray-300 mb-2">Your Artist Show Pass registration has been successfully completed.</p>
              <p className="text-gray-300 mb-4">Show Date: {eventDetails.date}</p>
              <p className="text-gray-300 mb-6">Check your email for registration confirmation and e-ticket details.</p>

              <div className="space-y-4">
                <button onClick={() => router.push("/")} className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  Back to Event Page
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuyTicketsPage;
