import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

import '../assets/styles/Home.css';

function Home({ projects }) {
  useEffect(() => {
    gsap.config({
      autoSleep: 60,
      force3D: false,
      nullTargetWarn: false,
      trialWarn: false,
      units: { left: '%', top: '%', rotation: 'rad' },
    });
    gsap.from('.text-inner > *', {
      duration: 1,
      opacity: 0,
      delay: 2,
      stagger: 0.2,
    });
    gsap.from('.stripe1 img', {
      duration: 1,
      y: 400,
      opacity: 0,
      stagger: 0.4,
      delay: 5,
    });
    gsap.from('.stripe2 img', {
      duration: 1,
      opacity: 0,
      stagger: 0.4,
      delay: 5,
    });
  }, []);
  return (
    <>
      <div className='wrapper'>
        <div className='text'>
          <div className='text-inner'>
            <h1>Samer Taha</h1>
            <p>Appleseeds FullStack Bootcamp</p>
            <Link to='/contact' className='btn'>
              Contact Me
            </Link>

            {/* <div className='social'>
              <a href='# '>
                <i className='fa fa-facebook'></i>
              </a>
              <a href='# '>
                <i className='fa fa-twitter'></i>
              </a>
              <a href='# '>
                <i className='fa fa-instagram'></i>
              </a>
            </div> */}
          </div>
        </div>

        <div className='img'>
          <div className='img-stripe stripe1'>
            {projects.map((project, index) => {
              return (
                <img key={project._id} src={project.image} alt={project.name} />
              );
            })}
          </div>
          <div className='img-stripe stripe2'>
            {projects.map((project, index) => {
              return (
                <img key={project._id} src={project.image} alt={project.name} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
