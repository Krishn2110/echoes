
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";
import axios from "axios";

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
    screenshotPreview: null,
    additionalInfo: "",
    price: "",
    entryType: "solo", // 'solo' or 'group'
    teamName: "",
    memberNames: ""
  });

  const { setIsLoading } = useLoading?.() ?? {}; // safe fallback if context not available

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [eventPrice, setEventPrice] = useState(null);

  const screenshotInputRef = useRef(null);

  const events = [
    { id: 1, title: "Scavenger Hunt", date: "Oct 10, 2025 | 11:00 AM - 3:30 PM", description: "Team up and race against time to solve clues and find hidden treasures across the campus.", category: "games", featured: true, price: 100, groupAllowed: false},
    { id: 2, title: "Fusion Dance", date: "Oct 10, 2025 | 10:00 AM - 6:00 PM", description: "A high-energy performance blending classical and contemporary dance styles from around the world.", category: "dance", featured: true, price: 100, groupAllowed: true, maxMembers: 6 },
    { id: 3, title: "Standup Comedy", date: "Oct 10, 2025 | 4:00 PM - 5:00 PM", description: "Laugh out loud as comedians bring the stage alive with relatable humor and witty punchlines.", category: "comedy", featured: true, price: 100, groupAllowed: false },
    { id: 4, title: "Monologue Acting", date: "Oct 10, 2025 | 6:30 PM - 7:30 PM", description: "Watch powerful solo performances as actors deliver dramatic, emotional, and humorous monologues.", category: "theatre", featured: false, price: 100, groupAllowed: false },
    { id: 5, title: "DJ Competition", date: "Oct 10, 2025 | 8:30 PM - 10:00 PM", description: "Top DJs battle it out on the decks with electrifying mixes and killer beats.", category: "music", featured: false, price: 100, groupAllowed: true, maxMembers: 3 },
    { id: 6, title: "Painting Competition", date: "Oct 11, 2025 | 10:00 AM - 11:30 AM", description: "Showcase your creativity with colors in this live painting contest themed around cultural fusion.", category: "art", featured: false, price: 100, groupAllowed: true, maxMembers: 2 },
    { id: 7, title: "Music", date: "Oct 11, 2025 | 4:00 PM - 5:30 PM", description: "Enjoy live performances across genres including classical, pop, rock, and folk music.", category: "music", featured: false, price: 100, groupAllowed: true, maxMembers: 3 },
    { id: 8, title: "Rap Battle", date: "Oct 11, 2025 | 5:30 PM - 6:30 PM", description: "Watch lyricists go head-to-head in a freestyle showdown full of rhythm and wordplay.", category: "music", featured: false, price: 100, groupAllowed: false },
    { id: 9, title: "Dance Competition", date: "Oct 11, 2025 | 6:30 PM - 8:00 PM", description: "Teams and solo dancers compete in various styles from hip-hop to classical.", category: "dance", featured: false, price: 100, groupAllowed: true, maxMembers: 6 },
    { id: 10, title: "Fashion Show", date: "Oct 11, 2025 | 8:00 PM - 9:30 PM", description: "A glamorous runway show featuring innovative designs and traditional attire from various cultures.", category: "fashion", featured: false, price: 100, groupAllowed: false },
    { id: 11, title: "Bliss Twilight", date: "Oct 11, 2025 | 9:00 PM - 10:00 PM", description: "An enchanting musical night under the stars with ambient lighting and soulful tunes.", category: "music", featured: false, price: 100, groupAllowed: false },
    { id: 12, title: "Cooking Competition", date: "Oct 12, 2025 | 10:00 AM - 1:00 PM", description: "Show off your culinary skills and impress the judges with delicious and creative dishes.", category: "food", featured: false, price: 150, groupAllowed: true, maxMembers: 3 },
    { id: 13, title: "Short-Film Competition", date: "Oct 12, 2025 | 2:00 PM - 3:30 PM", description: "A showcase of creativity through short films that tell impactful stories in limited time.", category: "film", featured: false, price: 150, groupAllowed: true, maxMembers: 5 }
  ];

  // mount loading pulse
  useEffect(() => {
    if (typeof setIsLoading === "function") {
      setIsLoading(true);
      const t = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoading]);

  // preselect event from query param if present
  useEffect(() => {
    if (selectedEvent) {
      setFormData(prev => ({ ...prev, event: selectedEvent }));
    }
  }, [selectedEvent]);

  // when event changes: set price and auto-set entryType to group when allowed, solo when not
  useEffect(() => {
    const ev = events.find(x => x.title === formData.event);
    if (ev) {
      setEventPrice(ev.price);
      setFormData(prev => {
        const newEntryType = ev.groupAllowed ? "group" : "solo";
        return { ...prev, price: String(ev.price), entryType: newEntryType, teamName: newEntryType === "solo" ? "" : prev.teamName, memberNames: newEntryType === "solo" ? "" : prev.memberNames };
      });
    } else {
      setEventPrice(null);
      setFormData(prev => ({ ...prev, price: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.event]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "screenshot") {
      const file = files && files[0];
      if (file) {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            setFormData(prev => ({ ...prev, screenshot: file, screenshotPreview: ev.target.result }));
          };
          reader.readAsDataURL(file);
        } else {
          setFormData(prev => ({ ...prev, screenshot: file, screenshotPreview: null }));
        }
        setFormErrors(prev => ({ ...prev, screenshot: "" }));
      } else {
        setFormData(prev => ({ ...prev, screenshot: null, screenshotPreview: null }));
      }
      return;
    }

    // handle entryType radio
    if (name === "entryType") {
      setFormData(prev => ({ ...prev, entryType: value }));
      if (value === "solo") {
        // clear team fields when switching to solo
        setFormData(prev => ({ ...prev, teamName: "", memberNames: "" }));
      }
      setFormErrors(prev => (prev && prev.entryType ? { ...prev, entryType: "" } : prev));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => (prev && prev[name] ? { ...prev, [name]: "" } : prev));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ""))) errors.phone = "Enter a valid 10-digit Indian phone number";
    if (!formData.enrollment.trim()) errors.enrollment = "Enrollment number is required";
    if (!formData.event) errors.event = "Select an event";
    if (!formData.screenshot) errors.screenshot = "Payment screenshot required";

    const ev = events.find(x => x.title === formData.event);
    if (ev && ev.groupAllowed && formData.entryType === "group") {
      if (!formData.teamName.trim()) errors.teamName = "Team name is required for group entries";
      if (!formData.memberNames.trim()) errors.memberNames = "Please list member names (comma separated)";
      else if (ev.maxMembers) {
        const members = formData.memberNames.split(",").map(m => m.trim()).filter(Boolean);
        if (members.length > ev.maxMembers) {
          errors.memberNames = `Maximum ${ev.maxMembers} members allowed for ${ev.title}`;
        } else if (members.length < 1) {
          errors.memberNames = "Please add at least one member name";
        }
      }
    }

    return errors;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errors = validate();
  //   if (Object.keys(errors).length) {
  //     setFormErrors(errors);
  //     const first = Object.keys(errors)[0];
  //     const el = document.querySelector(`[name="${first}"]`);
  //     if (el) {
  //       el.scrollIntoView({ behavior: "smooth", block: "center" });
  //       el.focus();
  //     }
  //     return;
  //   }

  //   setFormErrors({});
  //   setIsSubmitting(true);
  //   if (typeof setIsLoading === "function") setIsLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsSubmitting(false);
  //     if (typeof setIsLoading === "function") setIsLoading(false);
  //     setSubmissionSuccess(true);
  //   }, 1500);
  // };

  const handleSubmit = async (e) => {
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

  try {
    // Build multipart/form-data
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("enrollment", formData.enrollment);
    payload.append("event", formData.event);
    payload.append("price", formData.price || "");
    payload.append("entryType", formData.entryType || "");
    payload.append("teamName", formData.teamName || "");
    payload.append("memberNames", formData.memberNames || "");
    payload.append("additionalInfo", formData.additionalInfo || "");
    if (formData.screenshot) payload.append("screenshot", formData.screenshot);

    // POST to your API endpoint (change URL if needed)
    const resp = await axios.post("https://echoesfest.in/api/registration.php", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Submission response:", resp);

    // Successful response handling
    setIsSubmitting(false);
    if (typeof setIsLoading === "function") setIsLoading(false);

    // You can inspect resp.data to present messages from server
    setSubmissionSuccess(true);

    // Optionally clear form (comment out if you prefer to keep values)
    setFormData({
      name: "",
      email: "",
      phone: "",
      enrollment: "",
      event: "",
      screenshot: null,
      screenshotPreview: null,
      additionalInfo: "",
      price: "",
      entryType: "solo",
      teamName: "",
      memberNames: "",
    });
    if (screenshotInputRef?.current) screenshotInputRef.current.value = "";
  } catch (err) {
    setIsSubmitting(false);
    if (typeof setIsLoading === "function") setIsLoading(false);

    // If server returned validation errors in a known format
    if (err.response && err.response.data) {
      const data = err.response.data;
      // Example: { errors: { email: "Invalid", phone: "..." } }
      if (data.errors && typeof data.errors === "object") {
        setFormErrors(data.errors);
        // scroll to first error field
        const first = Object.keys(data.errors)[0];
        const el = document.querySelector(`[name="${first}"]`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
        }
        return;
      }
      // server sent message
      alert(data.message || "Failed to submit registration. Please try again.");
    } else {
      // network/timeout/unknown
      console.error(err);
      alert("Could not reach server. Check your internet or try again later.");
    }
  }
};

  const handleBackClick = () => window.location.href = "/";

  const currentEvent = events.find(ev => ev.title === formData.event);

  return (
    <div className="font-delius min-h-screen bg-gray-950 text-white overflow-hidden relative">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Delius&display=swap");
        .font-delius { font-family: "Delius", cursive; }
      `}</style>

      <div className="absolute inset-0 bg-grid-pink-500/[0.02] pointer-events-none z-0" />

      <div className="relative z-10 max-w-4xl mx-auto py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-neon-pink">CULTURAL FEST</span>
            <span className="text-neon-purple"> REGISTRATION</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Register for Echoes Cultural Fest events and performances</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              {submissionSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-green-500 mb-4">Registration Successful!</h2>
                  <p className="text-gray-300 mb-8">Thank you for registering for Echoes Cultural Fest. We've sent a confirmation to your email.</p>
                  <button onClick={() => setSubmissionSuccess(false)} className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition">Register Again</button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold mb-6 text-neon-pink">Cultural Fest Registration</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-400 mb-2 text-lg">Full Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className={`w-full bg-gray-900 border rounded-lg px-4 py-3 ${formErrors.name ? "border-red-500" : "border-gray-700"}`} placeholder="Enter your full name" required />
                        {formErrors.name && <p className="text-red-400 text-sm mt-1">{formErrors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2 text-lg">Email Address</label>
                        <input name="email" value={formData.email} onChange={handleChange} className={`w-full bg-gray-900 border rounded-lg px-4 py-3 ${formErrors.email ? "border-red-500" : "border-gray-700"}`} placeholder="Enter your email" required />
                        {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2 text-lg">Phone Number</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} className={`w-full bg-gray-900 border rounded-lg px-4 py-3 ${formErrors.phone ? "border-red-500" : "border-gray-700"}`} placeholder="Enter your phone number" required />
                        {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-2 text-lg">Enrollment Number</label>
                        <input name="enrollment" value={formData.enrollment} onChange={handleChange} className={`w-full bg-gray-900 border rounded-lg px-4 py-3 ${formErrors.enrollment ? "border-red-500" : "border-gray-700"}`} placeholder="Enter your enrollment number" required />
                        {formErrors.enrollment && <p className="text-red-400 text-sm mt-1">{formErrors.enrollment}</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2 text-lg">Select Event</label>
                      <select name="event" value={formData.event} onChange={handleChange} className={`w-full bg-gray-900 border rounded-lg px-4 py-3 ${formErrors.event ? "border-red-500" : "border-gray-700"}`} required>
                        <option value="">Choose a cultural event</option>
                        {events.map(ev => (
                          <option key={ev.id} value={ev.title}>{ev.title} - {ev.date}</option>
                        ))}
                      </select>
                      {formErrors.event && <p className="text-red-400 text-sm mt-1">{formErrors.event}</p>}
                    </div>

                    {/* Auto-show Solo (only) when event doesn't allow groups; else show radios, default chosen automatically */}
                    {currentEvent ? (
                      currentEvent.groupAllowed ? (
                        <div className="mb-6">
                          <label className="block text-gray-400 mb-2 text-lg">Entry Type</label>
                          <div className="flex gap-4">
                            <label className={`px-3 py-2 rounded-lg cursor-pointer ${formData.entryType === "solo" ? "bg-pink-600 text-black" : "bg-gray-900"}`}>
                              <input type="radio" name="entryType" value="solo" checked={formData.entryType === "solo"} onChange={handleChange} className="hidden" />
                              Solo
                            </label>
                            <label className={`px-3 py-2 rounded-lg cursor-pointer ${formData.entryType === "group" ? "bg-pink-600 text-black" : "bg-gray-900"}`}>
                              <input type="radio" name="entryType" value="group" checked={formData.entryType === "group"} onChange={handleChange} className="hidden" />
                              Group
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-6">
                          <label className="block text-gray-400 mb-2 text-lg">Entry Type</label>
                          <div className="px-3 py-2 rounded-lg bg-gray-900 text-gray-200">Solo (only)</div>
                        </div>
                      )
                    ) : null}

                    {/* Team fields shown only if group selected */}
                    {currentEvent && currentEvent.groupAllowed && formData.entryType === "group" && (
                      <div className="mb-6 bg-gray-900/20 p-4 rounded-lg border border-gray-700">
                        <div className="mb-3">
                          <label className="block text-gray-400 mb-2 text-sm">Team Name</label>
                          <input name="teamName" value={formData.teamName} onChange={handleChange} className={`w-full bg-gray-900 border rounded-lg px-4 py-3 ${formErrors.teamName ? "border-red-500" : "border-gray-700"}`} placeholder="Team name" />
                          {formErrors.teamName && <p className="text-red-400 text-sm mt-1">{formErrors.teamName}</p>}
                        </div>
                        <div>
                          <label className="block text-gray-400 mb-2 text-sm">Member Names (comma separated)</label>
                          <input name="memberNames" value={formData.memberNames} onChange={handleChange} className={`w-full bg-gray-900 border rounded-lg px-4 py-3 ${formErrors.memberNames ? "border-red-500" : "border-gray-700"}`} placeholder={`Alice, Bob, Charlie ${currentEvent && currentEvent.maxMembers ? `(max ${currentEvent.maxMembers})` : ""}`} />
                          {formErrors.memberNames && <p className="text-red-400 text-sm mt-1">{formErrors.memberNames}</p>}
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2 text-lg">Upload Payment Screenshot</label>
                      <input ref={screenshotInputRef} type="file" name="screenshot" accept="image/*,application/pdf" onChange={handleChange} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 cursor-pointer" required />
                      {formData.screenshotPreview && <img src={formData.screenshotPreview} alt="preview" className="mt-3 w-48 h-24 object-contain rounded-md border border-gray-700" />}
                      {formErrors.screenshot && <p className="text-red-400 text-sm mt-1">{formErrors.screenshot}</p>}
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2 text-lg">Special Requirements</label>
                      <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3" rows={3} placeholder="Costume requirements, instrument needs, dietary restrictions, etc." />
                    </div>

                    {eventPrice && (
                      <div className="mb-6 text-center">
                        <h3 className="text-lg font-semibold text-neon-purple mb-2">Registration Fee: ₹{eventPrice}</h3>
                        <p className="text-gray-400 mb-2">Scan the QR code to make the payment:</p>
                        <div className="flex justify-center">
                          <img src="/qr.png" alt="Payment QR" className="w-44 h-44 border border-gray-600 rounded-lg" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 italic">UPI ID: mab.037325000800070@axisbank</p>
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      <button type="submit" disabled={isSubmitting} className={`w-full py-4 rounded-lg text-lg font-bold ${isSubmitting ? "bg-gray-700 cursor-not-allowed" : "bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90"}`}>
                        {isSubmitting ? "Processing..." : "Complete Registration"}
                      </button>

                      <motion.button onClick={handleBackClick} className="z-50 bg-gray-900/70 backdrop-blur-md border border-neon-pink text-neon-pink px-4 py-3 rounded-lg justify-center cursor-pointer flex items-center gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ backgroundColor: "#ff00c830" }}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Echoes Cultural Fest</h3>
                  <p className="text-gray-300">Celebrating diversity through music, dance, art, and cuisine from around the world</p>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-center"><div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><p className="ml-3 text-gray-300">Experience diverse cultural performances</p></li>
                  <li className="flex items-center"><div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><p className="ml-3 text-gray-300">Participate in interactive workshops</p></li>
                  <li className="flex items-center"><div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><p className="ml-3 text-gray-300">Showcase your cultural heritage</p></li>
                  <li className="flex items-center"><div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div><p className="ml-3 text-gray-300">Taste authentic global cuisine</p></li>
                </ul>

                <div className="mt-auto pt-6 border-t border-gray-700">
                  <h4 className="text-lg font-bold text-white mb-3">Need Help?</h4>
                  <div className="flex items-center text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><span>Cultural Fest Coordinator: +1 (555) 123-CULT</span></div>
                  <div className="flex items-center text-gray-400 mt-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><span>culture@echoesfest.com</span></div>
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
