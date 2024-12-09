import { useState, useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css'
import Navbar from './components/Navbar'
// import Sliding from './components/Sliding'
import Hero from './components/Hero'
import About from './components/About'
import Loader from './components/Loader';
import Stats from './components/Stats';
import Use from './components/Use';
import Whatwedo from './components/Whatwedo';
import Organizers from './components/Organizers';
import Footer from './components/Footer';
import Mainevent from './components/Mainevent';
import Photos from './components/Photos';
import Contact from './components/Contact';


const MainPage = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Navbar data-aos="fade-up" data-aos-duration="3000" />
      <div className="outerhero">
        <Hero />
      </div>
      <About />
      <Whatwedo />
      <Stats />
      <Use />
      <Mainevent />
      <Organizers />
      <Contact />
      <Photos />
      <Footer />
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  const handleFinishLoading = () => {
    setLoading(false);
  };

  return (
    <div className="App">
      {loading ? <Loader onFinish={handleFinishLoading} /> : <MainPage />}
    </div>
  );
};

const styles = {
  mainPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#fff',
  },
};

export default App;

