import React from 'react'
import arrow2 from "../assets/images/arrow2.png"
function Hero() {
  return (
    <>
    <section className="hero">
      <div className="hero-content">
        <h1 data-aos="zoom-in" data-aos-duration="1300"  data-aos-delay="1000">Unite, Discover, Celebrate</h1>
        <p className='paraani' data-aos="fade-up" data-aos-duration="1300" data-aos-delay="200"  >Your gateway to the vibrant heart of campus life. Connect with diverse communities, explore new passions, and cherish the moments that make your college journey unforgettable.</p>
        <div className="view-more">
            <a href="#mainabout">

        <img src={arrow2} alt="" />
            </a>
          <span>View More</span>
        </div>
      </div>
    </section>
      
    </>
  )
}

export default Hero
