// app/stalls/registration/page.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaUpload, FaCheck, FaRupeeSign } from "react-icons/fa";
import { useLoading } from "../context/LoadingContext"; // adjust path if needed

const DeliusRegular = localFont({
  src: [{ path: "../fonts/Delius-Regular.ttf", weight: "700", style: "normal" }],
  variable: "--font-delius-regular",
  display: "swap",
});

export default function StallRegistrationPage() {
  const router = useRouter();
  const { setIsLoading } = useLoading?.() ?? {};
  const permitRef = useRef(null);
  const otherFileRef = useRef(null);

  const [formData, setFormData] = useState({
    stallName: "",
    ownerName: "",
    email: "",
    phone: "",
    category: "",
    staffCount: 1,
    electricity: "no",
    description: "",
    expectedFee: "",
    permitFile: null, // required for Food
    permitPreview: null,
    otherFile: null,
    otherFileName: "",
  });

  const [price, setPrice] = useState(null); // selected price depending on category
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // mount loading pulse
  useEffect(() => {
    if (typeof setIsLoading === "function") {
      setIsLoading(true);
      const t = setTimeout(() => setIsLoading(false), 600);
      return () => clearTimeout(t);
    }
    // otherwise do nothing
  }, [setIsLoading]);

  // only these categories now
  const categories = [
    { key: "Food", price: 200 },
    { key: "Art", price: 200 },
    { key: "Games", price: 250 },
  ];

  // helper: validate file type and size
  const validateFile = (file) => {
    if (!file) return "No file";
    const allowedMime = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!allowedMime.includes(file.type)) return "Only PNG/JPG/PDF allowed";
    if (file.size > 5 * 1024 * 1024) return "Max file size 5MB";
    return null;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      if (!file) return;
      const err = validateFile(file);
      if (name === "permitFile") {
        if (err) {
          setFormErrors((p) => ({ ...p, permitFile: err }));
          return;
        }
        // preview images
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            setFormData((p) => ({ ...p, permitFile: file, permitPreview: ev.target.result }));
          };
          reader.readAsDataURL(file);
        } else {
          setFormData((p) => ({ ...p, permitFile: file, permitPreview: null }));
        }
        setFormErrors((p) => ({ ...p, permitFile: "" }));
      } else if (name === "otherFile") {
        if (err) {
          setFormErrors((p) => ({ ...p, otherFile: err }));
          return;
        }
        setFormData((p) => ({ ...p, otherFile: file, otherFileName: file.name }));
        setFormErrors((p) => ({ ...p, otherFile: "" }));
      }
      return;
    }

    // handle category specially to set price
    if (name === "category") {
      const selected = categories.find((c) => c.key === value);
      if (selected) {
        setPrice(selected.price);
      } else {
        setPrice(null);
      }
      setFormData((p) => ({ ...p, [name]: value }));
      // clear category error
      setFormErrors((p) => (p && p.category ? { ...p, category: "" } : p));
      return;
    }

    // non-file fields
    setFormData((p) => ({ ...p, [name]: value }));
    // clear field error
    setFormErrors((p) => (p && p[name] ? { ...p, [name]: "" } : p));
  };

  const validate = () => {
    const errors = {};
    if (!formData.stallName.trim()) errors.stallName = "Stall name is required";
    if (!formData.ownerName.trim()) errors.ownerName = "Owner name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, "")))
      errors.phone = "Enter a valid 10-digit Indian phone number";
    if (!formData.category) errors.category = "Select a category";
    if (formData.category === "Food") {
      // permit required
      if (!formData.permitFile) errors.permitFile = "Food stalls must upload a food permit (PNG/JPG/PDF)";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length) {
      setFormErrors(errors);
      const first = Object.keys(errors)[0];
      const el = document.querySelector(`[name="${first}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus();
      }
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    if (typeof setIsLoading === "function") setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      if (typeof setIsLoading === "function") setIsLoading(false);
      setSubmissionSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      stallName: "",
      ownerName: "",
      email: "",
      phone: "",
      category: "",
      staffCount: 1,
      electricity: "no",
      description: "",
      expectedFee: "",
      permitFile: null,
      permitPreview: null,
      otherFile: null,
      otherFileName: "",
    });
    setPrice(null);
    setFormErrors({});
    setSubmissionSuccess(false);
    if (permitRef.current) permitRef.current.value = "";
    if (otherFileRef.current) otherFileRef.current.value = "";
  };

  return (
    <div className={`${DeliusRegular.className} min-h-screen bg-gray-950 text-white`}>
      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
          <button onClick={() => router.push("/")} className="text-pink-400 hover:text-pink-300 mb-4 flex items-center gap-2">
            <FaArrowLeft /> Back to Events
          </button>
          <h1 className="text-3xl font-bold mb-2">Stall Registration</h1>
          <p className="text-gray-300">Register your stall for Echoes Cultural Fest 2025</p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          {submissionSuccess ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-4">
                <FaCheck className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Stall Registered!</h2>
              <p className="text-gray-300 mb-6">Thank you — we've received your stall registration. We'll contact you with next steps.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => router.push("/events/cultural")} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold">Back to Events</button>
                <button onClick={resetForm} className="px-6 py-3 border border-pink-400 text-pink-400 rounded-lg">Register Another Stall</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Stall Name *</label>
                  <input name="stallName" value={formData.stallName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${formErrors.stallName ? "border-red-500" : "border-gray-700"} focus:outline-none`} placeholder="Name of the stall" />
                  {formErrors.stallName && <p className="text-red-400 text-sm mt-1">{formErrors.stallName}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Owner / Contact Person *</label>
                  <input name="ownerName" value={formData.ownerName} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${formErrors.ownerName ? "border-red-500" : "border-gray-700"} focus:outline-none`} placeholder="Owner or main contact" />
                  {formErrors.ownerName && <p className="text-red-400 text-sm mt-1">{formErrors.ownerName}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Email *</label>
                  <input name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${formErrors.email ? "border-red-500" : "border-gray-700"} focus:outline-none`} placeholder="contact@example.com" />
                  {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Phone *</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${formErrors.phone ? "border-red-500" : "border-gray-700"} focus:outline-none`} placeholder="10-digit mobile number" maxLength={10} />
                  {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${formErrors.category ? "border-red-500" : "border-gray-700"} focus:outline-none`}>
                    <option value="">Select a category</option>
                    {categories.map((c) => <option key={c.key} value={c.key}>{c.key}</option>)}
                  </select>
                  {formErrors.category && <p className="text-red-400 text-sm mt-1">{formErrors.category}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Number of staff / helpers</label>
                  <input type="number" name="staffCount" min={1} value={formData.staffCount} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none" />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Electricity required?</label>
                  <div className="flex gap-3">
                    <label className={`px-3 py-2 rounded-lg cursor-pointer ${formData.electricity === "yes" ? "bg-pink-600 text-black" : "bg-gray-900"}`}>
                      <input type="radio" name="electricity" value="yes" checked={formData.electricity === "yes"} onChange={handleChange} className="hidden" /> Yes
                    </label>
                    <label className={`px-3 py-2 rounded-lg cursor-pointer ${formData.electricity === "no" ? "bg-pink-600 text-black" : "bg-gray-900"}`}>
                      <input type="radio" name="electricity" value="no" checked={formData.electricity === "no"} onChange={handleChange} className="hidden" /> No
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm text-gray-300 mb-1">Short description (what you will sell / exhibit)</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none" rows={3} placeholder="Short description for organizers and participants" />
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
               

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Other supporting document (optional)</label>
                  <div className="border-2 border-dashed rounded-lg p-3 bg-gray-900">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-300">{formData.otherFileName || "No file chosen"}</div>
                      <div>
                        <button type="button" onClick={() => otherFileRef.current?.click()} className="px-3 py-2 bg-pink-600 rounded-lg text-black font-semibold">
                          <FaUpload /> Upload
                        </button>
                        <input ref={otherFileRef} name="otherFile" type="file" accept=".pdf,image/*" onChange={handleChange} className="hidden" />
                      </div>
                    </div>
                    {formErrors.otherFile && <p className="text-red-400 text-sm mt-2">{formErrors.otherFile}</p>}
                  </div>
                </div>
              </div>

              

              {/* Price & QR */}
              {price && (
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-semibold mb-2">Registration Fee: <span className="inline-flex items-center"><FaRupeeSign className="mr-1" />{price}</span></h3>
                  <p className="text-gray-400 mb-2">Scan the QR code to make the payment:</p>
                  <div className="flex justify-center mb-2">
                    <img src="/qr.png" alt="Payment QR" className="w-44 h-44 border border-gray-600 rounded-lg object-contain" />
                  </div>
                  <p className="text-xs text-gray-500 italic">UPI ID: mab.037325000800070@axisbank</p>
                </div>
              )}

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                <button type="submit" disabled={isSubmitting} className={`flex-1 px-6 py-3 rounded-lg font-bold ${isSubmitting ? "bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90"}`}>
                  {isSubmitting ? "Submitting..." : "Register Stall"}
                </button>

               
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
