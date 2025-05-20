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
  
 useGSAP(() => {
  const main = document.querySelector(".main");

  function handleMouseMove(e) {
    const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
    gsap.to([".imagesdiv .text", ".sky", ".bg"], {
      x: `${xMove * 0.4}%`,
      ease: "power3.out",
      duration: 0.5,
    });
  }

  function handleDeviceOrientation(e) {
    // gamma is the left-right tilt in degrees (-90 to 90)
    // Normalize gamma from -30 to 30 degrees for smoother control
    let gamma = e.gamma;
    if (gamma > 30) gamma = 30;
    else if (gamma < -30) gamma = -30;

    // Map gamma (-30 to 30) to xMove (-20 to 20)
    const xMove = (gamma / 30) * 20;
    gsap.to([".imagesdiv .text", ".sky", ".bg"], {
      x: `${xMove * 0.4}%`,
      ease: "power3.out",
      duration: 0.5,
    });
  }

  function setup() {
    if (window.innerWidth > 768) {
      // Desktop: mouse move
      main?.addEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    } else {
      // Mobile: device orientation
      main?.removeEventListener("mousemove", handleMouseMove);
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }
  }

  setup();
  window.addEventListener("resize", setup);

  // Cleanup function (React effect style)
  return () => {
    main?.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("deviceorientation", handleDeviceOrientation);
    window.removeEventListener("resize", setup);
  };
}, [showContent]);

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
      {showContent && (
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
              <img className='sky scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' src='./sky.png' />
              <img className='bg scale-[1.2] absolute top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="" />
    <div className="text text-white flex flex-col gap-3 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[10rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[10rem] leading-none ml-20">theft</h1>
                <h1 className="text-[10rem] leading-none -ml-40">auto</h1>
              </div>              
           <img
  className="
    absolute
    left-1/2
    -translate-x-1/2
    bottom-2
    sm:top-1
    sm:bottom-auto
    w-[80%]       // Mobile: larger
    sm:w-[60%]     // Tablet
    md:w-[40%]     // Medium Desktop
    lg:w-[35%]     // Large Desktop: smallest
    max-w-[500px] 
     // Prevent it from getting too large
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
         <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%] ">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[1.3] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[30%] py-30 bg-black">
                <h1 className="text-8xl">Still Running,</h1>
                <h1 className="text-8xl">Not Hunting</h1>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Distinctio possimus, asperiores nam, omnis inventore nesciunt
                  a architecto eveniet saepe, ducimus necessitatibus at
                  voluptate.
                </p>
                <p className="mt-3 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <p className="mt-10 text-xl font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                  eius illum fugit eligendi nesciunt quia similique velit
                  excepturi soluta tenetur illo repellat consectetur laborum
                  eveniet eaque, dicta, hic quisquam? Ex cupiditate ipsa nostrum
                  autem sapiente.
                </p>
                <button className="bg-yellow-500 px-10 py-10 text-black mt-10 text-4xl">
                  Download Now
                </button>
              </div>
            </div>
          </div>
      </div>
     
   
     )}
      
    </>
  )
}

export default App
