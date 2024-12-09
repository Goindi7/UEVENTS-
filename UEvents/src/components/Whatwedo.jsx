import React, { useEffect, useState } from 'react';
import f1 from "../assets/images/question2.png"
import f2 from "../assets/images/w1.png"
import f3 from "../assets/images/w2.png"
import f4 from "../assets/images/w3.png"
import f5 from "../assets/images/w4.png"

function Whatwedo() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const sectionTop = document.querySelector('.feature-section').offsetTop;
      const sectionHeight = document.querySelector('.feature-section').offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="feature-section" aria-label="section">
      <div className="container">
        <div className="feature-header">
          {/* <span className="subtitle">Why Choose Us</span> */}
          <h2 data-aos="fade-up" data-aos-duration="2000">What We <span className='reddo'>Do?</span> </h2>
          <p data-aos="fade-up" data-aos-duration="1500" data-aos-delay="500">We offer hands-on learning, project building, global competitions, and expert talks to foster innovation!!</p>
        </div>
        <div className="feature-content">
          <div className="feature-left">
            <div className={`feature-box ${isVisible ? 'animate__animated animate__fadeInLeft' : ''}`} style={{ animationDelay: `${animationDelay}s` }}>
              <img src={f2} style={{width:'6vw'}} alt="" />
              <div className="feature-box-content">
                <h4>Hands-on Coding Workshops (Beginner and Experienced)
</h4>
                <p>Interactive workshops designed to improve coding skills for all experience levels.
</p>
              </div>
            </div>
            <div className={`feature-box ${isVisible ? 'animate__animated animate__fadeInLeft' : ''}`} style={{ animationDelay: `${animationDelay + 0.2}s` }}>
              <img src={f3} style={{width:'6vw'}} alt="" />
              <div className="feature-box-content">
                <h4>Build Side Projects

</h4>
                <p>Develop and explore new technologies through personal or collaborative side projects.
</p>
              </div>
            </div>
          </div>
          <div className="feature-image" data-aos="zoom-in" data-aos-duration="2000">
            <img src={f1} alt=""  className="img-fluid animate__animated animate__fadeInUp" style={{ animationDelay: `${animationDelay + 0.4}s` }} />
          </div>
          <div className="feature-right">
            <div className={`feature-box ${isVisible ? 'animate__animated animate__fadeInRight' : ''}`} style={{ animationDelay: `${animationDelay + 0.6}s` }}>
              <img src={f4} style={{width:'6vw'}} alt="" />
              <div className="feature-box-content">
                <h4>Compete in the Solution Challenge

</h4>
                <p>Collaborate to address real-world problems and earn recognition in a global competition.
</p>
              </div>
            </div>
            <div className={`feature-box ${isVisible ? 'animate__animated animate__fadeInRight' : ''}`} style={{ animationDelay: `${animationDelay + 0.8}s` }}>
              <img src={f5} style={{width:'6vw'}} alt="" />
              <div className="feature-box-content">
                <h4> GDG/GDE Expert Talks
</h4>
                <p>Gain valuable insights from industry leaders on the latest technology trends and innovations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Whatwedo;
