'use client'
import Head from "next/head";
import Instructors from "./components/Instructor";
import { BackgroundBeamsWithCollisionDemo } from "./components/Background";
import { CardHoverEffectDemo } from "./components/card";
import Navbar from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import InfinityLoader from "./components/infinite_loader";
import Speakers from "./components/speakers";
import { PrizePool } from "./components/prize_pool";
import Footer from "./components/Footer";
import ReactGA from 'react-ga'
import './globals.css';
import GuestSection from "./guests/page";
// import Login from "./api/auth/[...nextauth]/login";
// import Sponsors from "./sponsors/page";

export default function Home() {
  const [mounted, setMounted] = useState(false); // Track whether the component is mounted
  const eventsSectionRef = useRef(null); // Ref for the events section
  const [loading, setLoading] = useState(true);
  const [visitorCount, setVisitorCount] = useState();
  useEffect(() => {
    const trackingid="G-XGR3BKX6F5";
    ReactGA.initialize(trackingid);
    // Non -iteration event
    ReactGA.pageview(window.location.pathname);
    
    // Fetch visitor count from backend
    // fetch('https://localhost:3000/api/visitors/')
    //   .then((response) => response.json())
    //   .then((data) => setVisitorCount(data.count))
    //   .catch((error) => console.error('Error fetching visitor count:', error));
  }, []);
  // Ensure the component is mounted before accessing query params
  useEffect(() => {
    setMounted(true); // Indicate that the component is mounted
  }, []);

  // Scroll to specific section based on URLSearchParams
  useEffect(() => {
    if (mounted) {
      const searchParams = new URLSearchParams(window.location.search); // Use URLSearchParams to get the query string
      const scrollTo = searchParams.get('scrollTo'); // Get the 'scrollTo' query parameter
      if (scrollTo === "events") {
        eventsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // Simulate a loader for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Clean up the timeout
  }, []);

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {loading ? (
        <InfinityLoader /> // Show loader while loading
      ) : (
        <div>
          <Head>
            <title>ESummit -2024</title>
            <link rel="icon" href="/E-summit24 logo.png" />
          </Head>
          <div className="relative w-full bg-neutral-800 items-center justify-center">
            <Navbar handleScroll={handleScroll} />
          </div>
          <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-black/[0.02]">
            <BackgroundBeamsWithCollisionDemo />
            {mounted && ( // Only render the scroll effect when mounted
              <section id="events" ref={eventsSectionRef}>
                <CardHoverEffectDemo />
              </section>
            )}

            <Speakers/>
            <GuestSection/>
            <PrizePool />
            {/* <Sponsors/> */}
         
            <section id="aboutUs">
              <Instructors />
            </section>
            
            <Footer visitorscount={visitorCount}/>
            
          </main>
        </div>
      )}
    </div>
  );
}



// 'use client';
// import Head from "next/head";
// import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
// import Navbar from "./components/Navbar";
// import InfinityLoader from "./components/infinite_loader";
// import {BackgroundBeamsWithCollisionDemo} from "./components/Background";
// import {CardHoverEffectDemo} from "./components/card";
// import Speakers from "./components/speakers";
// import {PrizePool} from "./components/prize_pool";
// import Footer from "./components/Footer";
// import GuestSection from "./guests/page";
// import Instructors from "./components/Instructor";
// import './globals.css';

// export default function Home() {
//   const [loading, setLoading] = useState(true);
//   const [userRole, setUserRole] = useState(""); // To store the role of the user (admin/user)
//   const [mounted, setMounted] = useState(false); // Ensure page is mounted
//   const eventsSectionRef = useRef(null);
//   const router = useRouter();

//   useEffect(() => {
//     // Simulate loader for 2 seconds
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     setMounted(true); // Mark component as mounted

//     // Check user authentication
//     const role = sessionStorage.getItem("userRole"); // Assuming role is stored in sessionStorage after login
//     if (!role) {
//       router.push("/login"); // Redirect to login if no role found
//     } else {
//       setUserRole(role);
//     }
//   }, [router]);

//   const handleScroll = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <InfinityLoader /> // Show loader while loading
//       ) : (
//         <div>
//           <Head>
//             <title>ESummit - 2024</title>
//             <link rel="icon" href="/E-summit24 logo.png" />
//           </Head>
//           <div className="relative w-full bg-neutral-800 items-center justify-center">
//             <Navbar handleScroll={handleScroll} />
//           </div>
//           <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-black/[0.02]">
//             <BackgroundBeamsWithCollisionDemo />
//             {mounted && (
//               <section id="events" ref={eventsSectionRef}>
//                 <CardHoverEffectDemo />
//               </section>
//             )}

//             <Speakers />
//             <GuestSection />

//             {/* Conditionally Render Components Based on Role */}
//             {userRole === "admin" && (
//               <>
//                 <PrizePool /> {/* Only visible to Admins */}
//               </>
//             )}

//             <section id="aboutUs">
//               <Instructors />
//             </section>

//             <Footer />
//           </main>
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';
// import Head from "next/head";
// import { useEffect, useRef, useState } from "react";
// import Navbar from "./components/Navbar";
// import InfinityLoader from "./components/infinite_loader";
// import { BackgroundBeamsWithCollisionDemo } from "./components/Background";
// import { CardHoverEffectDemo } from "./components/card";
// import Speakers from "./components/speakers";
// import GuestSection from "./guests/page";
// import { PrizePool } from "./components/prize_pool";
// import Footer from "./components/Footer";
// import Instructors from "./components/Instructor";
// import './globals.css';

// export default function Home() {
//   const [loading, setLoading] = useState(true);
//   const [userRole, setUserRole] = useState(""); // Store the user's role
//   const [mounted, setMounted] = useState(false); // Ensure page is mounted
//   const eventsSectionRef = useRef(null);

//   useEffect(() => {
//     setMounted(true); // Mark component as mounted

//     // Simulate fetching user role (e.g., from localStorage or API)
//     const role = sessionStorage.getItem("userRole"); // Assume role is stored after login
//     setUserRole(role || "user"); // Default role is 'user'

//     // Simulate a loader for 2 seconds
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleScroll = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <InfinityLoader /> // Show loader while loading
//       ) : (
//         <div>
//           <Head>
//             <title>ESummit - 2024</title>
//             <link rel="icon" href="/E-summit24 logo.png" />
//           </Head>
//           <div className="relative w-full bg-neutral-800 items-center justify-center">
//             <Navbar userRole={userRole} handleScroll={handleScroll} />
//           </div>
//           <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-black/[0.02]">
//             <BackgroundBeamsWithCollisionDemo />
//             {mounted && (
//               <section id="events" ref={eventsSectionRef}>
//                 <CardHoverEffectDemo />
//               </section>
//             )}

//             <Speakers />
//             <GuestSection />
            
//             {/* Conditionally Render Admin-Specific Components */}
//             {userRole === "admin" && <PrizePool />}

//             <section id="aboutUs">
//               <Instructors />
//             </section>

//             <Footer />
//           </main>
//         </div>
//       )}
//     </div>
//   );
// }


// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Head from "next/head";
// import Instructors from "./components/Instructor";
// import { BackgroundBeamsWithCollisionDemo } from "./components/Background";
// import { CardHoverEffectDemo } from "./components/card";
// import Navbar from "./components/Navbar";
// import InfinityLoader from "./components/infinite_loader";
// import Speakers from "./components/speakers";
// import { PrizePool } from "./components/prize_pool";
// import Footer from "./components/Footer";
// import GuestSection from "./guests/page";

// export default function Home() {
//   const [loading, setLoading] = useState(true);
//   const [userRole, setUserRole] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     return () => clearTimeout(timer); // Clean up the timeout
//   }, []);

//   // Check user role in sessionStorage
//   useEffect(() => {
//     const role = sessionStorage.getItem('userRole');
//     if (role) {
//       setUserRole(role);
//     } else {
//       router.push('/mode'); // Redirect to mode selection if no role is found
//     }
//   }, [router]);

//   return (
//     <div>
//       {loading ? (
//         <InfinityLoader />
//       ) : (
//         <div>
//           <Head>
//             <title>ESummit - 2024</title>
//             <link rel="icon" href="/E-summit24 logo.png" />
//           </Head>
//           <div className="relative w-full bg-neutral-800 items-center justify-center">
//             <Navbar />
//           </div>
//           <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-black/[0.02]">
//             <BackgroundBeamsWithCollisionDemo />
//             <section id="events">
//               <CardHoverEffectDemo />
//             </section>

//             {/* Render based on Role */}
//             {userRole === 'admin' && <PrizePool />} {/* Admin Section */}
//             <Speakers />
//             <GuestSection />
//             <section id="aboutUs">
//               <Instructors />
//             </section>
//             <Footer />
//           </main>
//         </div>
//       )}
//     </div>
//   );
// }
