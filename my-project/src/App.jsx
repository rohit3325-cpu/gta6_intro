import React,{ useState } from 'react'
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'

function App() {
  let[showContent,setshowContent]= useState(false);
  const[menuOpen,setMenuOpen]= useState(false);
   
  useGSAP(()=> {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group",{
      rotate: 10,
      duration:2,
      ease: "power4.easeInOut",
      transformOrigin: "50% 50%",
    })
    .to(".vi-mask-group",{
      scale:10,
      duration:2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin:"50% 50%",
      onUpdate: function(){
        if(this.progress() >= .9){
          document.querySelector(".svg").remove();
          setshowContent(true);
          this.kill();
        }
      }
    })
  })

  return (
    <>
      <div className='svg flex items-center fixed top-0 left-0   z-[100] w-full h-screen overflow-hidden bg-[#000]'>
        <svg viewBox="0 0 800 600 " preserveAspectRatio='xMidYMid slice'>
          <defs>
            <mask id = "ViMask">
                <rect width="100%" height = "100%" fill="black" />
                <g className='vi-mask-group'>
                  <text
                  x="50%"
                  y="50%"
                  fontSize='250'
                  textAnchor='middle'
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                  >
                   RAW
                  </text>

                </g>
            </mask>
          </defs>
          <image 
          href="./bg.png"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          mask = "url(#ViMask)"
          />
        </svg>
      </div>
      {showContent && 
      <div className='main w-full '>
        <div className='landing w-full h-screen bg-black '>
                  <div className="navbar absolute top-0 left-0 z-10 w-full py-4 px-4 sm:py-6 sm:px-10 bg-transparent flex items-center justify-between">
                   
                   {/* Logo */}
                   <div className="flex items-center gap-4 sm:gap-6">
                     <div className="lines flex flex-col gap-1">
                       <div className="line w-6 h-1.5 bg-white sm:w-8" />
                       <div className="line w-4 h-1.5 bg-white sm:w-6" />
                       <div className="line w-2 h-1.5 bg-white sm:w-4" />
                     </div>
                     <h3 className="text-xl sm:text-2xl md:text-3xl leading-none text-white">FalconCrew</h3>
                   </div>
             
                   {/* Hamburger for mobile */}
                   <button
                     className="sm:hidden text-white text-2xl"
                     onClick={() => setMenuOpen(!menuOpen)}
                   >
                     <i className={menuOpen ? "ri-close-line" : "ri-menu-line"} />
                   </button>
             
                   {/* Links */}
                   <div className="hidden sm:flex gap-6 text-white">
                     <h3 className="text-base sm:text-lg cursor-pointer">Home</h3>
                     <h3 className="text-base sm:text-lg cursor-pointer">About</h3>
                     <h3 className="text-base sm:text-lg cursor-pointer">Contact</h3>
                   </div>
             
                   {/* Mobile menu */}
                   {menuOpen && (
                     <div className="absolute top-full left-0 w-full bg-transparent text-white flex flex-col items-start gap-4 px-6 py-4 sm:hidden">
                       <h3 className="text-base cursor-pointer">Home</h3>
                       <h3 className="text-base cursor-pointer">About</h3>
                       <h3 className="text-base cursor-pointer">Contact</h3>
                     </div>
                   )}
                 </div>

             <div className='imagesdiv relative w-full h-screen overflow-hidden'>
              <img className=' absolute top-0 left-0 w-full h-full object-cover' src='./sky.png' />
              <img className=' absolute top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="" />
               <div className='text  flex flex-col  gap-10 absolute top-0 left-1/2 -translate-x-1/2 '>
                  <h1 className='text-4xl sm:text-6xl md:text-6xl lg:text-[50px] -ml-20 text-white'>Grand</h1>
                  <h3 className='text-4xl sm:text-6xl md:text-6xl lg:text-[50px] -ml-15 text-white'>Theft</h3>
                  <h3 className='text-4xl sm:text-6xl md:text-6xl lg:text-[50px] -ml-20 text-white'>Auto</h3>
               </div>
             <img
                  className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    scale-[1]
                    bottom-[0%]   /* mobile: position near bottom */
                    sm:top-1     /* from small screens up: position near top */
                    sm:bottom-auto /* override bottom on sm+ */
                  "
                  src="/girlbg.png"
                  alt="girl"
                />

             </div>
             <div className='btmbar absolute bottom-0 left-0  w-full py-10 px-10 bg-gradient-to-t from-black to-transparent '></div>
             <div className=' absolute  bottom-0 left-0 items-center text-white flex gap-4'>
              <i className=" text-4xl ri-arrow-down-line"></i>
              <h3 className='font-[Helvetica_Now_Display] text-white'>Scrol Down</h3>
             </div>
             
        </div>
      </div>
      }
      
    </>
  )
}

export default App
