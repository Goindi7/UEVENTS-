import React, { useEffect, useRef, useState } from 'react';
import logot from "../assets/images/U.png";
import u1 from "../assets/images/u2.png";
import u2 from "../assets/images/u4.png";
import u4 from "../assets/images/u3.png";
import u5 from "../assets/images/u1.png";
import vid from "../assets/images/hack.mp4"
import placeholder from "../assets/images/cover.png";

const Use = () => {
  const containerRef = useRef(null);
  const [visibleElements, setVisibleElements] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleElements = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => Array.from(entry.target.parentElement.children).indexOf(entry.target) + 1);
        const updatedVisibleElements = [...new Set([...visibleElements, ...newVisibleElements])];
        setVisibleElements(updatedVisibleElements);
      },
      {
        rootMargin: '0px',
        threshold: 0.5, 
      }
    );

    if (containerRef.current) {
      const containers = containerRef.current.querySelectorAll('.containerti');
      containers.forEach((container) => {
        observer.observe(container);
      });
    }

    return () => {
      if (containerRef.current) {
        const containers = containerRef.current.querySelectorAll('.containerti');
        containers.forEach((container) => {
          observer.unobserve(container);
        });
      }
    };
  }, [visibleElements]);

  return (
    <>
      <div className="outerbgtime" id='mainjoinus'>
        <div className="heading-container">
          <h1>How to <span className='reddo'>JOIN?</span> </h1>
          <div className="video-container">
            <video src={vid} className='vidh' width="560" height="315"  
              poster={placeholder} controls autoPlay></video>
          </div>
        </div>
        <div className="timeline" ref={containerRef}>
          <div className={`containerti left-container ${visibleElements.includes(1) ? 'animate-1' : ''}`}>
            <img src={logot} alt="logo" />
            <div className="text-box">
              <h2> <span className='white'>1. Create a profile</span><img src={u5} alt="" className="uall" /></h2>
              <p>Set up your account by entering personal details and preferences for customization.</p>
              <span className="left-container-arrow"></span>
            </div>
          </div>
          <div className={`containerti right-container ${visibleElements.includes(2) ? 'animate-2' : ''}`}>
            <img src={logot} alt="logo" />
            <div className="text-box">
              <h2><span className='white'>2. Join the chapter</span> 
 <img src={u4} alt="" className="uall" /></h2>
              <p>Select and join a chapter to connect with like-minded individuals and groups</p>
              <span className="right-container-arrow"></span>
            </div>
          </div>
          <div className={`containerti left-container ${visibleElements.includes(3) ? 'animate-3' : ''}`}>
            <img src={logot} alt="logo" />
            <div className="text-box">
              <h2><span className='white'>3. Confirmation email</span>  <img src={u1} alt="" className="uall" /></h2>
              <p>Check your email to confirm your registration and activate your account.</p>
              <span className="left-container-arrow"></span>
            </div>
          </div>
          <div className={`containerti right-container ${visibleElements.includes(4) ? 'animate-4' : ''}`}>
            <img src={logot} alt="logo" />
            <div className="text-box">
              <h2><span className='white'>4. Attend Events </span> <img src={u2} alt="" className="uall" /></h2>
              <p>Join events to network, learn, and participate in chapter activities.</p>
              <span className="right-container-arrow"></span>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
export default Use;
