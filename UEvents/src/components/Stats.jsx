import React from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const Stats = () => {
  return (
    <section className="sales-section text-light jarallax">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-6 wow fadeInRight">
            <h2>
            Explore Our Thriving {' '}
              <span className="id-color">Event Ecosystem</span> and {' '}
              <span className="id-color"> Uncover</span> a World of Exciting Opportunities and Engaging Activities!!
            </h2>
          </div>
          {/* <div className=" wow fadeInLeft">
          Explore the dynamic world of UEvents with our comprehensive real-time statistics! Delve into the number of active organizations that enrich our platform, view the total events hosted, and learn about the growing community of registered participants. Stay ahead by checking out the upcoming events that highlight our commitment to fostering engagement and supporting a thriving network of clubs and societies. See how our platform is evolving and driving impactful experiences for everyone involved.
          </div> */}
        </div>
        <div className="spacer-double"></div>
        <div className="row text-center">
          <div className="col-md-3 col-sm-6 mb-sm-30">
            <div className="de_count bg-dark text-light  ">
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <h3 className="timer">
                    <span>
                    <CountUp
                      start={0}
                      end={isVisible ? 20 : 0}
                      duration={3}
                      separator=","
                    />
                    </span><span>+</span>
                    
                  </h3>
                )}
              </VisibilitySensor>
              Organizations
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-sm-30">
            <div className="de_count bg-dark text-light  ">
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <h3 className="timer">
                    <span>
                    <CountUp
                      start={0}
                      end={isVisible ? 1500 : 0}
                      duration={3}
                      separator=","
                    />
                    </span><span>+</span>
                  </h3>
                )}
              </VisibilitySensor>
              Events Conducted
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-sm-30">
            <div className="de_count bg-dark text-light  ">
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <h3 className="timer">
                    <span>
                    <CountUp
                      start={0}
                      end={isVisible ? 7505  : 0}
                      duration={3}
                      separator=","
                    />
                    </span><span>+</span>
                  </h3>
                )}
              </VisibilitySensor>
              Participants
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-sm-30">
            <div className="de_count bg-dark text-light  ">
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <h3 className="timer">
                    <span>
                    <CountUp
                      start={0}
                      end={isVisible ? 5 : 0}
                      duration={3}
                      separator=","
                    /></span><span>+</span>
                  </h3>
                )}
              </VisibilitySensor>
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
