import React from 'react'

import aboutimg from "../assets/images/aboutside.png"

function About() {
  return (
    <>
    <div className="outerabout" id='mainabout'>
        <div className="leftouterabout" >
            <div className="headingleftouterabout" data-aos="fade-right" data-aos-duration="2000">
                <h1>About Us</h1>
            </div>
            <div className="descriptionleftouterabout"data-aos="fade-right" data-aos-duration="2000" data-aos-delay="500">
                <p>UEvents is your central hub for discovering and engaging with a wide array of events and activities across our campus. Whether you’re an undergraduate, graduate, or part of any academic background, UEvents connects you with opportunities to build your network, access valuable resources, and collaborate on exciting projects. Join us to stay informed, participate in vibrant community events, and contribute to a dynamic peer-to-peer learning environment. 🚀</p>
            </div>

        </div>
        <div className="rightouterabout">
            <div className="imgrightouterabout" data-aos="fade-left" data-aos-duration="2000" data-aos-delay="700">
                <img src={aboutimg} alt="" />
            </div>

        </div>
    </div>
      
    </>
  )
}

export default About
