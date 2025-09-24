"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import localFont from "next/font/local";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaTimes, FaStar, FaTicketAlt, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';
import { useLoading } from '../context/LoadingContext'; 

const DeliusRegular = localFont({
  src: [
    {
      path: '../fonts/Delius-Regular.ttf',
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-delius-regular",
  display: "swap",
});

const CulturalFestPage = () => {
  const particlesRef = useRef(null);
  const { setIsLoading } = useLoading(); 
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    setIsLoading(true);

    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const startX = Math.random() * container.clientWidth;
      const startY = Math.random() * container.clientHeight;
      const colors = ['#ff00c8', '#ff66d9', '#ff99e6', '#f0f', '#d400ff'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        top: ${startY}px;
        left: ${startX}px;
        opacity: ${Math.random() * 0.7 + 0.3};
        filter: blur(${Math.random() * 2 + 1}px);
        box-shadow: 0 0 ${Math.random() * 5 + 5}px ${color};
      `;

      container.appendChild(particle);
      setTimeout(() => {
        particle.style.opacity = '0';
        setTimeout(() => particle.remove(), 1000);
      }, (Math.random() * 15 + 10) * 1000);
    };

    const init = setTimeout(() => {
    for (let i = 0; i < 50; i++) createParticle();
    const interval = setInterval(createParticle, 500);

    setIsLoading(false);

    return () => clearInterval(interval);
  }, 800);

  return () => {
    clearTimeout(init);
    setIsLoading(false);
  };
  }, []);

  const socialIcons = [
  { icon: <FaFacebookF size={28}/>, name: 'Facebook', link: 'https://www.instagram.com/saciitram' },
  { icon: <FaInstagram size={28}/>, name: 'Instagram',  link: 'https://www.instagram.com/saciitram'},
  { icon: <FaLinkedinIn size={28}/>, name: 'LinkedIn', link: 'https://www.instagram.com/saciitram '},
  { icon: <FaYoutube size={28}/>, name: 'YouTube' , link: 'https://www.instagram.com/saciitram'},
];

  // Event data for cultural fest
   const events = [
  {
    id: 1,
    title: 'Scavenger Hunt',
    date: 'Oct 10, 2025 | 11:00 AM - 3:30 PM',
    description: 'Team up and race against time to solve clues and find hidden treasures across the campus.',
    category: 'games',
    featured: true,
    price: 100,
  },
  {
    id: 2,
    title: 'Fusion Dance',
    date: 'Oct 10, 2025 | 10:00 AM - 6:00 PM',
    description: 'A high-energy performance blending classical and contemporary dance styles from around the world.',
    category: 'dance',
    featured: true,
    price: 100,
  },
  {
    id: 3,
    title: 'Standup Comedy',
    date: 'Oct 10, 2025 | 4:00 PM - 5:00 PM',
    description: 'Laugh out loud as comedians bring the stage alive with relatable humor and witty punchlines.',
    category: 'comedy',
    featured: true,
    price: 100,
  },
  {
    id: 4,
    title: 'Monologue Acting',
    date: 'Oct 10, 2025 | 6:30 PM - 7:30 PM',
    description: 'Watch powerful solo performances as actors deliver dramatic, emotional, and humorous monologues.',
    category: 'theatre',
    featured: false,
    price: 100,
  },
  {
    id: 5,
    title: 'DJ Competition',
    date: 'Oct 10, 2025 | 8:30 PM - 10:00 PM',
    description: 'Top DJs battle it out on the decks with electrifying mixes and killer beats.',
    category: 'music',
    featured: false,
    price: 100,
  },
  {
    id: 6,
    title: 'Painting Competition',
    date: 'Oct 11, 2025 | 10:00 AM - 11:30 AM',
    description: 'Showcase your creativity with colors in this live painting contest themed around cultural fusion.',
    category: 'art',
    featured: false,
    price: 100,
  },
  {
    id: 7,
    title: 'Music',
    date: 'Oct 11, 2025 | 4:00 PM - 5:30 PM',
    description: 'Enjoy live performances across genres including classical, pop, rock, and folk music.',
    category: 'music',
    featured: false,
    price: 100,
  },
  {
    id: 8,
    title: 'Rap Battle',
    date: 'Oct 11, 2025 | 5:30 PM - 6:30 PM',
    description: 'Watch lyricists go head-to-head in a freestyle showdown full of rhythm and wordplay.',
    category: 'music',
    featured: false,
    price: 100,
  },
  {
    id: 9,
    title: 'Dance Competition',
    date: 'Oct 11, 2025 | 6:30 PM - 8:00 PM',
    description: 'Teams and solo dancers compete in various styles from hip-hop to classical.',
    category: 'dance',
    featured: false,
    price: 100,
  },
  {
    id: 10,
    title: 'Fashion Show',
    date: 'Oct 11, 2025 | 8:00 PM - 9:30 PM',
    description: 'A glamorous runway show featuring innovative designs and traditional attire from various cultures.',
    category: 'fashion',
    featured: false,
    price: 100,
  },
  {
    id: 11,
    title: 'Bliss Twilight',
    date: 'Oct 11, 2025 | 9:00 PM - 10:00 PM',
    description: 'An enchanting musical night under the stars with ambient lighting and soulful tunes.',
    category: 'music',
    featured: false,
    price: 100,
  },
  {
    id: 12,
    title: 'Cooking Competition',
    date: 'Oct 12, 2025 | 10:00 AM - 1:00 PM',
    description: 'Show off your culinary skills and impress the judges with delicious and creative dishes.',
    category: 'food',
    featured: false,
    price: 150,
  },
  {
    id: 13,
    title: 'Short-Film Competition',
    date: 'Oct 12, 2025 | 2:00 PM - 3:30 PM',
    description: 'A showcase of creativity through short films that tell impactful stories in limited time.',
    category: 'film',
    featured: false,
    price: 150,
  }
];


  // Featured artist
  const featuredArtist = {
    id: 1,
    name: 'Bharat Chandak',
    genre: 'Music',
    image: '/artists/artist1.jpg',
    performance: 'Main Stage - Oct 12, 6:30 PM onwards',
    description: 'Known online as bharat__music, Bharat is a self-taught vocalist and guitarist who grew up in the hills of Guwahati, Assam, and carried pieces of every place he’s lived into the music he now makes in Bombay- a city that once felt too far, too big, too much. But he made it his own.',
    
    social: {
      instagram: 'bharat__music',
      youtube: '@bharatchandak11'
    }
  };

  // Combo package
  const comboPackage = {
    name: '3-Day Pass',
    price: '₹499',
    originalPrice: '₹624',
    savings: '20%',
    description: 'Experience the complete Echoes Cultural Fest with our exclusive 3-day pass',
    features: [
      'Access to all events across 3 days',
      'Priority seating for main stage performances',
      'Complimentary festival guidebook',
      'Special artist meet & greet opportunity',
      '10% discount on merchandise',
      'Free welcome drink voucher'
    ],
    // limitedOffer: 'Only 50 passes available at this price!'
  };

  // Gallery images
  const galleryImages = [
    { id: 1, height: 'h-64', src: '/echoes/1.JPG' },
    { id: 2, height: 'h-48', src: '/echoes/9.JPG' },
    { id: 3, height: 'h-72', src: '/echoes/3.JPG' },
    { id: 4, height: 'h-56', src: '/echoes/4.JPG' },
    { id: 5, height: 'h-64', src: '/echoes/5.JPG' },
    { id: 6, height: 'h-80', src: '/echoes/6.JPG' },
    { id: 7, height: 'h-72', src: '/echoes/7.JPG' },
    { id: 8, height: 'h-64', src: '/echoes/8.JPG' },
    { id: 9, height: 'h-56', src: '/echoes/2.JPG' },
  ];

  // Schedule data
  const scheduleData = [
  {
    day: 'Day 1 - October 10',
    events: [
        { time: '10:00 AM - 11:00 AM', title: 'Inaugral Ceremony', location: 'IITRAM Campus' },
        { time: '11:00 AM - 11:30 AM', title: 'Opening Ceremony', location: 'IITRAM Campus' },
      { time: '11:00 AM - 3:30 PM', title: 'Scavenger Hunt', location: 'IITRAM Campus' },
      { time: '10:00 AM - 6:00 PM', title: 'Fusion Dance', location: 'IITRAM Campus' },
      { time: '4:00 PM - 5:00 PM', title: 'Standup Comedy', location: 'IITRAM Campus' },
      { time: '6:30 PM - 7:30 PM', title: 'Monologue acting', location: 'IITRAM Campus' },
      { time: '8:30 PM - 10:00 PM', title: 'DJ Competition', location: 'IITRAM Campus' }
    ]
  },
  {
    day: 'Day 2 - October 11',
    events: [
      { time: '10:00 AM - 11:30 AM', title: 'Painting Competition', location: 'IITRAM Campus' },
      { time: '4:00 PM - 5:30 PM', title: 'Music', location: 'IITRAM Campus' },
      { time: '5:30 PM - 6:30 PM', title: 'Rap Battle', location: 'IITRAM Campus' },
      { time: '6:30 PM - 8:00 PM', title: 'Dance Competition', location: 'IITRAM Campus' },
      { time: '8:00 PM - 9:30 PM', title: 'Fashion Show', location: 'IITRAM Campus' },
      { time: '9:00 PM - 10:00 PM', title: 'Bliss Twilight', location: 'IITRAM Campus' }
    ]
  },
  {
    day: 'Day 3 - October 12',
    events: [
      { time: '10:00 AM - 1:00 PM', title: 'Cooking Competition', location: 'IITRAM Campus' },
      { time: '2:00 PM - 3:30 PM', title: 'Short-Film Competition', location: 'IITRAM Campus' },
      { time: '4:00 PM - 6:00 PM', title: 'Mr. and Mrs. Echoes', location: 'IITRAM Campus' },
      { time: '6:30 PM - 9:00 PM', title: 'Concert', location: 'IITRAM Campus' },
      { time: '9:00 PM - 10:00 PM', title: 'DJ Night', location: 'IITRAM Campus' }
    ]
  }
];


  const router = useRouter();

  return (
    <div className={`${DeliusRegular.className} min-h-screen bg-gray-950 text-white overflow-hidden relative`}>
      {/* Student Affairs Banner */}
      <div className="fixed bottom-0 flex justify-center right-0 p-2 z-50">
        <div className="bg-white/10 backdrop-blur-md border-l border-neon-pink px-4 py-2 text-xl md:text-base font-semibold text-neon-pink shadow-lg rounded-xl">
          Student Affairs IITRAM
        </div>
      </div>

      {/* Particle Background */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0" />
      <div className="absolute inset-0 bg-grid-pink-500/[0.02] pointer-events-none z-0" />

      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-16 px-4 text-center">
        <motion.h1 
          className="text-4xl md:text-9xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-neon-pink glow-text">ECHOES</span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Celebrating diversity through music, dance, art, and cuisine from around the world
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Schedule Button */}

          <motion.button
            onClick={() => setIsScheduleOpen(true)}
            className="px-8 py-3 text-lg cursor-pointer rounded-full font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Schedule
          </motion.button>

<Link href={'./stalls'}>
          <motion.button
            
            className="px-8 py-3 text-lg cursor-pointer rounded-full font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Stalls Registration
          </motion.button>
          </Link>
          
          
        </motion.div>
      </div>

      {/* Featured Artist & Combo Booking Section */}
      <section className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-neon-pink">Headline</span>
              <span className="text-neon-purple"> Artist</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              Don't miss our spectacular headline performance and exclusive festival pass
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Artist Card */}
            <motion.div
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden group"
>
  <div className="h-64 relative overflow-hidden">
    {/* Artist Image */}
    <img
      src={featuredArtist.image}
      alt={featuredArtist.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80"></div>

    {/* Text Overlay */}
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <h3 className="text-2xl font-bold text-white group-hover:text-neon-pink transition-colors">
        {featuredArtist.name}
      </h3>
      <p className="text-gray-300">{featuredArtist.genre}</p>
    </div>
  </div>

  <div className="p-6">
    <div className="flex items-center mb-4 text-sm text-gray-300">
      <FaCalendar className="mr-2 text-neon-pink" />
      <span>{featuredArtist.performance}</span>
    </div>

    <p className="text-gray-300 mb-6">{featuredArtist.description}</p>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="text-center p-3 bg-gray-700/50 rounded-lg">
        <div className="text-neon-pink font-bold">Instagram</div>
        <div className="text-sm text-gray-300">{featuredArtist.social.instagram}</div>
      </div>
      <div className="text-center p-3 bg-gray-700/50 rounded-lg">
        <div className="text-neon-pink font-bold">YouTube</div>
        <div className="text-sm text-gray-300">{featuredArtist.social.youtube}</div>
      </div>
    </div>

    <Link href="./ticket">
      <button className="w-full py-3 cursor-pointer rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:opacity-90 transition flex items-center justify-center">
        <FaTicketAlt className="mr-2" />
        Buy Tickets for This Performance
      </button>
    </Link>
  </div>
</motion.div>


            {/* Combo Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 backdrop-blur-sm border border-purple-500/30 rounded-2xl overflow-hidden group p-6 flex flex-col"
            >
              <div className="text-center mb-6">
                <div className="inline-block bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold mb-3">
                  🔥 LIMITED TIME OFFER
                </div>
                <h3 className="text-2xl font-bold text-white">{comboPackage.name}</h3>
                <p className="text-gray-200 mt-2">{comboPackage.description}</p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">{comboPackage.price}</span>
                  <span className="text-xl text-gray-300 line-through ml-2">{comboPackage.originalPrice}</span>
                  <span className="text-green-400 font-bold ml-2">Save {comboPackage.savings}</span>
                </div>
                <p className="text-neon-pink text-sm font-semibold mt-2">{comboPackage.limitedOffer}</p>
              </div>

              <div className="mb-6 flex-1">
                <h4 className="text-lg font-semibold text-white mb-3">What's Included:</h4>
                <ul className="space-y-2">
                  {comboPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-neon-pink flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                        <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-black/30 p-4 rounded-lg mb-6">
                <div className="flex items-center text-sm text-gray-300">
                  <FaMapMarkerAlt className="text-neon-pink mr-2" />
                  <span>IITRAM Campus, Ahmedabad</span>
                </div>
                <div className="flex items-center text-sm text-gray-300 mt-2">
                  <FaCalendar className="text-neon-pink mr-2" />
                  <span>October 10-12, 2025</span>
                </div>
              </div>
             <Link href={'./combo'}>
              <button className="w-full py-4 cursor-pointer rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:opacity-90 transition text-lg">
                Get 3-Day Fest Pass
              </button>
              </Link>
              
              <p className="text-center text-gray-300 text-sm mt-3">
                Secure your spot now! Limited passes available.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* All Events */}
      <section id="all-events" className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-neon-pink">All Cultural</span>
              <span className="text-neon-purple"> Events</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex flex-col md:flex-row gap-6"
              >
                <div className="md:w-1/4">
  <img 
    src={`/events/${event.id}.jpg`} 
    alt={event.title} 
    className="w-full h-32 object-cover rounded-xl border border-gray-700"
  />
</div>

                <div className="md:w-3/4">
                  <div className="flex flex-wrap justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-neon-pink">{event.title}</h3>
                    <div className="px-3 py-1 rounded-full text-sm bg-black/50">
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-2">{event.date}</p>
                  <p className="text-gray-400 mb-4">{event.description}</p>
                 <Link href={`/registration?event=${encodeURIComponent(event.title)}&price=${event.price}`}>
  <button className="px-6 py-2 cursor-pointer rounded-lg bg-gray-700 hover:bg-gray-600 transition text-sm">
    Register Now
  </button>
</Link>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-neon-pink">Cultural</span>
              <span className="text-neon-purple"> Gallery</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
              A visual journey through the vibrant moments of Echoes Cultural Fest
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl group ${image.height}`}
              >
                <img 
                  src={image.src} 
                  alt={`Cultural Moment ${image.id}`} 
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div>
                    <h3 className="text-white font-bold text-lg">Cultural Moment #{image.id}</h3>
                    <p className="text-gray-300 text-sm">Captured at Echoes Fest</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-sm text-neon-pink">
                  Culture
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer relative z-10 py-12 bg-black/50 backdrop-blur-lg mt-16">
  <div className="max-w-6xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side - Brand & Social */}
      <div className="text-center md:text-left">
        <div className="text-2xl font-bold mb-4 glow-text neon-text-primary">
          ECHOES <span className="text-neon-pink">CULTURAL FEST</span>
        </div>
        <p className="text-gray-500 mb-6 max-w-md">
          Celebrating cultural diversity through art, music, dance, and cuisine since 2010
        </p>
        <div className="flex justify-center md:justify-start space-x-6 mb-6">
          {socialIcons.map((social, index) => (
            <motion.div 
              key={index} 
              href={social.link}
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center cursor-pointer"
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 15px #ff00c8'
              }}
              style={{color: '#E55EA2'}}
              title={social.name}
              
            >
              {social.icon}
            </motion.div>
          ))}
        </div>
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Echoes Cultural Fest, IITRAM. All rights reserved.
        </p>
      </div>

      {/* Right Side - Contact Information */}
      <div className="text-center md:text-right">
        <h3 className="text-xl font-bold text-neon-pink mb-4">Contact Us</h3>
        
        {/* Email Contact */}
        <motion.a
          href="mailto:echoes@iitram.ac.in"
          className="inline-flex items-center justify-center md:justify-end gap-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 rounded-lg px-6 py-3 transition-all duration-300 group mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <div className="absolute -inset-1 bg-neon-pink/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div className="text-left">
            <p className="text-gray-400 text-sm">Email us at</p>
            <p className="text-white font-semibold">echoes@iitram.ac.in</p>
          </div>
        </motion.a>

        {/* Additional Contact Info */}
        <div className="space-y-2 text-gray-400">
       
          <p className="text-sm">
            <span className="text-neon-pink">Student Head:</span> Satyam Kumar  (+91 7091182409)
          </p>
          <p className="text-sm">
            IITRAM Campus, Near Khokhara Circle, Ahmedabad - 380026
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex justify-center md:justify-end gap-4 mt-4">
          <motion.a
            href="/faq"
            className="text-gray-400 hover:text-neon-pink text-sm transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            FAQ
          </motion.a>
          <motion.a
            href="/terms"
            className="text-gray-400 hover:text-neon-pink text-sm transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Terms
          </motion.a>
          <motion.a
            href="/privacy"
            className="text-gray-400 hover:text-neon-pink text-sm transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Privacy
          </motion.a>
        </div>
      </div>
    </div>

    {/* Bottom Border */}
    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
      <p className="text-gray-500 text-xs">
        Made with ❤️ by Student Activity Center, IITRAM
      </p>
    </div>
  </div>
</footer>

      {/* Schedule Modal */}
      <AnimatePresence>
        {isScheduleOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setIsScheduleOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-gray-900/95 backdrop-blur-xl border border-neon-pink/30 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-neon-pink">Event Schedule</h2>
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {scheduleData.map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-5"
                  >
                    <h3 className="text-xl font-bold text-neon-purple mb-4">{day.day}</h3>
                    <div className="space-y-4">
                      {day.events.map((event, eventIndex) => (
                        <div key={eventIndex} className="border-b border-gray-700 pb-3 last:border-b-0">
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-neon-pink font-semibold">{event.time}</span>
                            <span className="text-gray-400 text-sm bg-gray-700 px-2 py-1 rounded">
                              {event.location}
                            </span>
                          </div>
                          <p className="text-white">{event.title}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-6 py-2 bg-black text-white font-bold border rounded-lg hover:opacity-90 transition"
                >
                  Close Schedule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS */}
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        }
      `}</style>
    </div>
  );
};

export default CulturalFestPage;
