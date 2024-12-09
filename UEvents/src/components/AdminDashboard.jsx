import { useState, useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../App.css'
import Navbar from './Navbar'
// import Sliding from './Sliding'
import Hero from './Hero'
import About from './About'
import Loader from './Loader';
import Stats from './Stats';
import Use from './Use';
import Whatwedo from './Whatwedo';
import Organizers from './Organizers';
import Footer from './Footer';
import Mainevent from './Mainevent';
import Photos from './Photos';
import Contact from './Contact';
import AdminNavbar from './AdminNavbar';

const MainPage = () => {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <AdminNavbar data-aos="fade-up" data-aos-duration="3000" />
      {/* <div className="outerhero"> */}
        {/* <Hero /> */}
      {/* </div> */}
      {/* <About />
      <Whatwedo />
      <Stats />
      <Use />
      <Mainevent />
      <Organizers />
      <Contact />
      <Photos />
      <Footer /> */}
    </>
  );
};

const AdminDashboard = () => {
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

export default AdminDashboard;

