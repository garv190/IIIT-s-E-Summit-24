'use client'

import React, { useEffect, useState } from "react";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "../utils/cn";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { Sidebar } from "./menu_bar";
import logo from "../../../public/courses/E-Cell logo Yellow-white.png";

function Navbar({ handleScroll }) {
  const [active, setActive] = useState(null);
  const { data: session } = useSession();
  
  // Get the user's role from localStorage (this can be set when the user selects admin or user on mode.tsx page)
  const userRole = typeof window !== 'undefined' ? localStorage.getItem("userRole") : null;

  // Check if userRole is available and if it's 'admin'
  const isAdmin = userRole === "admin";

  return (
    <div className="flex">
      <div className={cn("fixed sm:top-10 inset-x-0 max-sm:w-full max-w-full mx-auto z-20 top-3 flex justify-between ")}>
        
        {/* Sidebar Component */}
        <Sidebar />

        {/* Logo */}
        <Image 
          src={logo} 
          priority 
          className="w-[80px] h-[80px] ml-[40%] md:w-[80px] md:h-[70px] z-3 md:ml-24 md:m-0" 
          width={100} 
          height={100} 
          alt="logo" 
        />

        <div className="hidden md:block ml-[15%] max-h-16">
          <Menu setActive={setActive}>
            {/* Navigation Links */}
            <Link key={1} href="/">
              <MenuItem setActive={setActive} active={active} item="Home" />
            </Link>
            <Link key={2} href='/?scrollTo=events'>
              <MenuItem setActive={setActive} active={active} item="Events" />
            </Link>
            <Link key={3} href="/payment">
              <MenuItem setActive={setActive} active={active} item="Tickets" />
            </Link>
            <Link key={4} href="/mode">
              <MenuItem setActive={setActive} active={active} item="Mode" />
            </Link>

            {/* Conditionally Render Admin Links */}
            {isAdmin && (
              <>
                <Link key={5} href='/leaderboard'>
                  <MenuItem setActive={setActive} active={active} item="Leaderboard" />
                </Link>
                <Link key={6} href="/tickets">
                  <MenuItem setActive={setActive} active={active} item="Verification" />
                </Link>
              </>
            )}
          </Menu>
        </div>

        <div key={5} className="md:flex sm:min-w-[330px] sm:mr-8">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <div className="flex">
                <img 
                  src={session?.user.image} 
                  className="hidden md:block md:w-[40px] sm:h-[40px] md:rounded-full md:ml-16" 
                  alt="logo" 
                />
                <div className="hidden sm:block sm:text-sm text-white">
                  <p>Your referral ID:</p>
                  <div className='flex gap-x-2'>
                    <p className="text-blue-400">{session?.user.scoutId}</p>
                    <div className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgba(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer'>
                      <Image src='/assets/copy.svg' width={12} height={12} alt='copy' />
                    </div>
                  </div>
                </div>
              </div>
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                onClick={() => signOut()}
                className="hidden md:bg-slate-900 md:text-white md:hover:text-slate-400 md:flex md:items-center md:space-x-2"
              >
                <span>Sign Out</span>
              </HoverBorderGradient>
            </div>
          ) : (
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              onClick={() => signIn()}
              className="bg-slate-900 text-white hover:text-slate-400 flex items-center space-x-2"
            >
              <span>Sign In</span>
            </HoverBorderGradient>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;





// 'use client'
// import React, { useEffect, useState } from "react";
// import { Menu, MenuItem } from "./ui/navbar-menu";
// import { cn } from "../utils/cn";
// import Link from "next/link";
// import Image from "next/image";
// import { useSession } from "next-auth/react";
// import { HoverBorderGradient } from "./ui/hover-border-gradient";
// import { Sidebar } from "./menu_bar";
// import logo from "../../../public/courses/E-Cell logo Yellow-white.png";

// function Navbar({ handleScroll }) {
//   const [active, setActive] = useState(null);
//   const { data: session } = useSession();
  
//   // Get the user's role from localStorage (this can be set when the user selects admin or user on mode.tsx page)
//   const userRole = typeof window !== 'undefined' ? localStorage.getItem("userRole") : null;

//   return (
//     <div className="flex">
//       <div className={cn("fixed sm:top-10 inset-x-0 max-sm:w-full max-w-full mx-auto z-20 top-3 flex justify-between ")}>

//         <Sidebar />

//         <Image src={logo} priority className="w-[80px] h-[80px] ml-[40%] md:w-[80px] md:h-[70px] z-3 md:ml-24 md:m-0" width={100} height={100} alt="logo" />

//         <div className="hidden md:block ml-[15%] max-h-16 ">
//           <Menu setActive={setActive} >
//             <Link key={1} href="/">
//               <MenuItem setActive={setActive} active={active} item="Home" />
//             </Link>
//             <Link key={2} href='/?scrollTo=events'>
//               <MenuItem setActive={setActive} active={active} item="Events" />
//             </Link>
//             <Link key={3} href="/payment">
//                   <MenuItem setActive={setActive} active={active} item="Tickets" />
//                 </Link>
//                 <Link key={4} href="/mode">
//                   <MenuItem setActive={setActive} active={active} item="Mode" />
//                 </Link>

//             {/* Conditional rendering of Leaderboard and Tickets based on userRole */}
//             {userRole === "admin" && (
//               <>
//                 <Link key={5} href='/leaderboard'>
//                   <MenuItem setActive={setActive} active={active} item="Leaderboard" />
//                 </Link>
//                 <Link key={6} href="/tickets">
//                   <MenuItem setActive={setActive} active={active} item="Verification" />
//                 </Link>
//               </>
//             )}

//           </Menu>
//         </div>

//         <div key={5} className="md:flex sm:min-w-[330px] sm:mr-8">
//           {session?.user ? (
//             <div className="flex gap-3 md:gap-5">
//               <div className="flex ">
//                 <img src={session?.user.image} className="hidden md:block md:w-[40px] sm:h-[40px] md:rounded-full md:ml-16" alt="logo" />
//                 <div className="hidden sm:block sm:text-sm text-white">
//                   <p>Your referral ID:</p>
//                   <div className='flex gap-x-2'>
//                     <p className="text-blue-400">{session?.user.scoutId}</p>
//                     <div className='w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgba(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer'>
//                       <Image src='/assets/copy.svg' width={12} height={12} alt='copy' />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <HoverBorderGradient
//                 containerClassName="rounded-full"
//                 as="button"
//                 onClick={() => signOut()}
//                 className=" hidden md:bg-slate-900 md:text-white md:hover:text-slate-400 md:flex md:items-center md:space-x-2">
//                 <span>Sign Out</span>
//               </HoverBorderGradient>
//             </div>
//           ) : (
//             <>
//               <HoverBorderGradient
//                 containerClassName="rounded-full"
//                 as="button"
//                 onClick={() => signIn()}
//                 className="bg-slate-900 text-white hover:text-slate-400 flex items-center space-x-2">
//                 <span>Sign In</span>
//               </HoverBorderGradient>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
