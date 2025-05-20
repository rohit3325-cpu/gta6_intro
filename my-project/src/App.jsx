import React,{ useState } from 'react'
import {useGSAP} from "@gsap/react"
import gsap from "gsap"
import 'remixicon/fonts/remixicon.css'

function App() {
  let[showContent,setshowContent]= useState(false);
   
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
                   VI
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
          <div className='navbar   absolute top-0 left-0 z-[10]  w-full py-10 px-10 bg-transparent'>
            <div className='logo flex gap-6'>
              <div className='lines flex flex-col gap-1'>
                <div className='line w-12 h-1.5 bg-white'></div>
                <div className='line w-7 h-1.5 bg-white'></div>
                <div className='line w-4 h-1.5 bg-white'></div>
              </div>

              <h3  className='text-4xl -mt-[11px]  leading-none text-white '>FalconCrew</h3>
            </div>
          </div>
             <div className='imagesdiv relative w-full h-screen overflow-hidden'>
              <img className=' absolute top-0 left-0 w-full h-full object-cover' src='./sky.png' />
              <img className=' absolute top-0 left-0 w-full h-full object-cover' src="./bg.png" alt="" />
              <img className=' absolute -bottom-[55%] left-1/2 -translate-x-1/2 scale-[0.7]' src="./girlbg.png" alt="" />
             </div>
             <div className='btmbar absolute bottom-0 left-0  w-full py-10 px-10 bg-gradient-to-t from-black to-transparent '></div>
             <div className=' absolute  bottom-0 left-0 flex gap-4'>
              <i className="ri-arrow-down-line"></i>
              <h3 className='font-[Helvetica_Now_Display]'>Scrol Down</h3>
             </div>
        </div>
      </div>
      }
      
    </>
  )
}

export default App
