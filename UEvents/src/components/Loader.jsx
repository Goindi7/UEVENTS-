import React, { useState, useEffect } from 'react';
import '../App.css';
import svg1 from '../assets/images/logo.png';
import svg2 from '../assets/images/u1.png';
import svg3 from '../assets/images/u2.png';
import svg4 from '../assets/images/u3.png';
import svg5 from '../assets/images/u4.png';
import svg6 from '../assets/images/u1.png';
import svg7 from '../assets/images/bgsl.png';

const svgs = [svg1, svg2, svg3, svg4, svg5, svg6];

const Loader = ({ onFinish }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % svgs.length);
    }, 500);

    const timeout = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onFinish]);

  return (
    <div style={styles.loaderContainer}>
      <div style={styles.content}>
        <img src={svgs[index]} alt="Loader" style={styles.image} />
        <div className="spinner"></div>
      </div>
    </div>
  );
};

const styles = {
  loaderContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(160, 150, 160, 1)', // Transparent black background
    backgroundImage: `url(${svg7})`,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '165px',
    // height: '155px',
  },
};

export default Loader;
