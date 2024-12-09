import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Organizers.css';
import { Button } from '@mui/material';
import ss from '../assets/images/1pic.jpg';
import sk from '../assets/images/2pic.jpg';

const organizers = [
  {
    id: 1,
    name: 'Manpreet Singh Goindi',
    designation: 'Technical Head',
    image: ss,
  },
  {
    id: 2,
    name: 'Manpreet Singh Goindi',
    designation: 'Content Head',
    image: sk,
  },
  {
    id: 3,
    name: 'Manpreet Singh Goindi',
    designation: 'President',
    image: ss,
  },
  {
    id: 4,
    name: 'Manpreet Singh Goindi',
    designation: 'Web Head',
    image: sk,
  },
  {
   id:5,
    name: 'Manpreet Singh Goindi',
    designation: 'Social Media Head',
    image: ss,
  },
];

const Organizers = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      // {
      //   breakpoint: 1441,
      //   settings: {
      //     slidesToShow: 4,
      //     slidesToScroll: 1,
      //     dots: true,
      //   },
      // },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 996,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow:3 ,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 728,
        settings: {
          slidesToShow:2 ,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 528,
        settings: {
          slidesToShow:1 ,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
    <div className="outerorgo" id='mainorganizers'>
      <div className="heading-container orgohead" style={{backgroundColor:"inherit"}}>
        <h1>Our <br /><span className='reddo'>Organizers</span> </h1>
      </div>
      <div className="main">
        <div className="slider-wrapper">
          <Slider {...settings} className="prodd">
            {organizers.map((organizer) => (
              <div className="organizer-slide" key={organizer.id}>
                <img className="organizer-image" src={organizer.image} alt={organizer.name} />
                <div className="organizer-info">
                  <h3 className="organizer-name">{organizer.name}</h3>
                  <p className="organizer-designation">{organizer.designation}</p>
                  <Button className="profile-btn">View Profile</Button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      </div>
    </>
  );
};

export default Organizers;
