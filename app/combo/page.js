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

const ThreeDayPassPage = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { setIsLoading } = useLoading();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    screenshot: null,
    screenshotPreview: null
  });
  const [formErrors, setFormErrors] = useState({});

  // Pass option
  const passOption = {
    id: 1,
    name: "3-Day Festival Pass",
    price: 499,
    originalPrice: 799,
    savings: 300,
    description: "Complete access to all 3 days of ECHOES Cultural Fest 2025",
    features: [
      "Access to all events across 3 days",
      "Main stage performances",
      "Workshop participations",
      "Food court access",
    ],
    color: "from-purple-500 to-pink-500",
    popular: true
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    else if (formData.name.trim().length < 2) errors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Please enter a valid email address";

    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))) errors.phone = "Please enter a valid 10-digit Indian phone number";

    if (!formData.quantity || formData.quantity < 1) errors.quantity = "Please select at least 1 pass";

    if (!formData.screenshot) errors.screenshot = "Payment screenshot is required";

    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormErrors(prev => ({ ...prev, screenshot: "Please upload an image file" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, screenshot: "File size must be less than 5MB" }));
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData(prev => ({ ...prev, screenshot: file, screenshotPreview: ev.target.result }));
    };
    reader.readAsDataURL(file);

    if (formErrors.screenshot) setFormErrors(prev => ({ ...prev, screenshot: "" }));
  };

  const removeScreenshot = () => {
    setFormData(prev => ({ ...prev, screenshot: null, screenshotPreview: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleProceedToDetails = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // simulate submission and go to success
      setIsSubmitting(true);
      setIsLoading(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsLoading(false);
        setCurrentStep(2);
      }, 1200);
    } else {
      setFormErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const element = document.querySelector(`[name="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className={`${DeliusRegular.className} min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white`}>
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
          <motion.button onClick={() => router.push("/")} whileHover={{ scale: 1.03 }} className="flex items-center gap-2 text-pink-600 hover:text-pink-600 bg-white p-2 rounded-xl transition-colors mb-4 mx-auto">
            <FaArrowLeft /> Back to Event
          </motion.button>

          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
            3-Day Festival Pass
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Experience the complete ECHOES Cultural Fest 2025</p>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                {/* SIDE-BY-SIDE: grid with 2 columns on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pass Card */}
                  <motion.div variants={itemVariants} className="relative bg-gray-800/50 backdrop-blur-sm border-2 rounded-2xl p-6 border-pink-400 ring-2 ring-pink-400/20">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-emerald-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </div>

                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${passOption.color} flex items-center justify-center mb-4 mx-auto`}>
                      <FaTicketAlt className="text-2xl" />
                    </div>

                    <h3 className="text-xl font-bold text-center mb-2">{passOption.name}</h3>

                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold inline-flex items-center justify-center">
                        <FaRupeeSign className="mr-1" />
                        {passOption.price}
                      </span>
                      <span className="text-gray-400 line-through text-lg ml-3">₹{passOption.originalPrice}</span>
                      <div className="text-green-400 text-sm mt-1">Save ₹{passOption.savings}</div>
                    </div>

                    <p className="text-gray-300 text-sm text-center mb-4">{passOption.description}</p>

                    <ul className="space-y-2 mb-2 px-2">
                      {passOption.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <FaCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Form + QR Card */}
                  <motion.div variants={itemVariants} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700">
                    <h3 className="text-2xl font-bold mb-4 text-center">Attendee Information & Payment</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors ${formErrors.name ? "border-red-500" : "border-gray-600 focus:border-pink-400"}`} placeholder="Enter your full name" />
                        {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors ${formErrors.email ? "border-red-500" : "border-gray-600 focus:border-pink-400"}`} placeholder="Enter your email" />
                        {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full px-4 py-3 bg-gray-700/50 border rounded-lg focus:outline-none transition-colors ${formErrors.phone ? "border-red-500" : "border-gray-600 focus:border-pink-400"}`} placeholder="10-digit mobile number" maxLength="10" />
                        {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Number of Passes *</label>
                        <input type="text" name="quantity" value="1 Pass" disabled className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white cursor-not-allowed" />
                        <input type="hidden" name="quantity" value="1" />
                        {formErrors.quantity && <p className="text-red-400 text-sm mt-1">{formErrors.quantity}</p>}
                      </div>
                    </div>

                    {/* QR & Payment info */}
                    <div className="text-center mb-6">
                      <div className="inline-block bg-white p-4 rounded-lg mb-3">
                        <img src="/qr.png" alt="Payment QR" className="w-44 h-44 border border-gray-600 rounded-lg object-contain" />
                      </div>
                      <p className="text-gray-300 text-sm mb-2">Scan QR code to make payment</p>
                      <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 inline-block">
                        <p className="text-yellow-400 text-sm font-semibold">Amount: ₹{passOption.price}</p>
                        <p className="text-yellow-300 text-xs">UPI ID: mab.037325000800070@axisbank</p>
                      </div>
                    </div>

                    {/* Screenshot upload */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Upload Payment Screenshot *</label>

                      {formData.screenshotPreview ? (
                        <div className="relative">
                          <img src={formData.screenshotPreview} alt="Payment screenshot" className="w-full h-40 object-cover rounded-lg border-2 border-green-500" />
                          <button type="button" onClick={removeScreenshot} className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs">×</button>
                        </div>
                      ) : (
                        <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${formErrors.screenshot ? "border-red-500" : "border-gray-600 hover:border-pink-400"}`} onClick={() => fileInputRef.current?.click()}>
                          <FaUpload className="text-3xl text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-300">Click to upload payment screenshot</p>
                          <p className="text-gray-400 text-sm">PNG, JPG up to 5MB</p>
                          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleScreenshotUpload} className="hidden" />
                        </div>
                      )}

                      {formErrors.screenshot && <p className="text-red-400 text-sm mt-1">{formErrors.screenshot}</p>}
                    </div>

                    <div className="text-center">
                      <button onClick={handleProceedToDetails} disabled={isSubmitting} className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:opacity-90 transition-opacity text-lg">
                        {isSubmitting ? "Verifying..." : `Complete Registration`}
                      </button>
                      <p className="text-gray-400 text-sm mt-3">* All fields are mandatory</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Success */}
            {currentStep === 2 && (
              <motion.div key="success" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.45 }} className="max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaCheck className="text-3xl text-white" />
                </motion.div>
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Registration Complete!</h2>
                <p className="text-gray-300 mb-2">Your 3-Day Pass registration has been successfully completed.</p>
                <p className="text-gray-300 mb-4">Show Dates: October 10-12, 2025</p>
                <p className="text-gray-300 mb-6">Check your email for confirmation and e-pass details.</p>

                <div className="space-y-3">
                  <button onClick={() => router.push("/")} className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold hover:opacity-90 transition-opacity">
                    Back to Event Page
                  </button>

                  <button onClick={() => {
                    setCurrentStep(1);
                    setFormData({ name: "", email: "", phone: "", quantity: 1, screenshot: null, screenshotPreview: null });
                    setFormErrors({});
                  }} className="text-pink-400 hover:text-pink-300 block mx-auto">
                    Book Another Pass
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ThreeDayPassPage;
