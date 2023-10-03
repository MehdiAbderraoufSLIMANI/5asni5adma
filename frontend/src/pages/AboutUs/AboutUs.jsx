import React from 'react'
import './AboutUs.css';
import vision from '../../resources/images/vision.jpg';
import mission from '../../resources/images/mission.avif';
import pf1 from '../../resources/images/pf1.png';
import pf2 from '../../resources/images/pf2.jpg';
import pf3 from '../../resources/images/pf3.png';
import Badro from '../../resources/images/Badro.jpg';
import Mehdi from '../../resources/images/mahdi.jpg';
import Nadhir from '../../resources/images/nadhir.jpeg';
import Alim from '../../resources/images/alim.png';

export default function AboutUs() {
  return (
    <div className='about-us-container container-fluid'>

      <div className='about-us-header container-fluid'>
        <h1> <span style={{ color: 'white' }}>|</span> About us</h1>
      </div>

      <div className="vision  container">
        <div className="row justify-content-around align-items-center">
          <div className="col-md-6 vision-txt">
            <p>Notre vision est de créer une application web innovante qui transforme la façon dont les artisans et les
              clients interagissent. Nous aspirons à éliminer les barrières qui séparent ces deux parties, en facilitant
              des connexions rapides et transparentes. Nous imaginons un monde où chaque artisan a la possibilité de
              présenter son savoir-faire de manière numérique, tandis que chaque client peut trouver le professionnel
              qualifié dont il a besoin en un clin d'œil.</p>
          </div>
          <div className="col-md-5  vision-img">
            <img src={vision} alt="vision" height="300" width="100%" />
          </div>
        </div>
      </div>

      <div className="mission container">
        <div className="row">
          <div className="col-md-3 mission-img">
            <img src={mission} alt="mssion" height="300" width="210%" />
          </div>
          <div className="col-md-9 mission-txt">
            <div className="content">
              <h1>Notre mission</h1>
              <p>Elle est guidée par des principes de convivialité, de diversité, de confiance, d'engagement et d'adaptabilité,
                afin de répondre aux besoins de nos utilisateurs et de faire une différence positive dans
                le monde de l'artisanat.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="points-forts container-fluid">
        <h1 className='mb-5 text-center'>Nos points forts</h1>

        <div className="row justify-content-evenly ">
          <div className="col-md-3 pf1">
            <div className="main-content">
              <img src={pf1} alt="" />

              <div className="overlay">
                <p> Interface utilisateur intuitive, simple, accessible à tous, artisans et clients, sans distinction.</p>
              </div>
            </div>

            <h3 className='mt-3 text-center'>Interface conviviale</h3>
          </div>

          <div className="col-md-3 pf2">
            <div className="main-content">
              <img src={pf2} alt="" />

              <div className="overlay">
                <p>Nous offrons aux clients un large éventail de compétences artisanales, des plus traditionnels aux plus modernes. Notre mission est d'aider les artisans à présenter leurs compétences uniques et à atteindre de nouveaux publics.</p>
              </div>
            </div>

            <h3 className='mt-3 text-center'> Diversité artisanale</h3>
          </div>

          <div className="col-md-3 pf3">
            <div className="main-content">
              <img src={pf3} alt="" />

              <div className="overlay">
                <p>Les clients peuvent affiner leur recherche en fonction de critères spécifiques tels que la localisation et les compétences requises, ce qui leur permet de trouver l'artisan idéal pour leur projet.</p>
              </div>
            </div>

            <h3 className='mt-3 text-center'>Recherche personnalisée</h3>
          </div>
        </div>
      </div>

      <div className="equipe container-fluid">
        <h1 className='text-center'>Rencontrer notre équipe</h1>
        <div className="tiret text-center"></div>

        <div className="row equipe-header">
          <h2>Nous sômmes super professionnels dans nos compétences</h2>
        </div>

        <div className="row justify-content-evenly equipe-staff">
          <div className="col-sm-6 col-lg-3 align-self-start  text-center" >
            <div className="box text-center">
              <img src={Badro} alt="" height='100%' width="100%" />
            </div>

            <h3>Bengaid Hassine Bader-eddine</h3>
            <p>Software Engineer</p>
          </div>

          <div className="col-sm-6 col-lg-3 align-self-end  text-center">
            <div className="box">
              <img src={Mehdi} alt="" height='250px' width="200px" />
            </div>
            <h3>Slimani Mehdi Abderaouf</h3>
            <p>???????</p>
          </div>

          <div className="col-sm-6  col-lg-3 align-self-start  text-center">
            <div className="box">
              <img src={Nadhir} alt="" height='250px' width="200px" />
            </div>
            <h3>Nacef Nadhir</h3>
            <p>Software Engineer</p>
          </div>

          <div className="col-sm-6 col-lg-3 align-self-end  text-center">
            <div className="box">
              <img src={Alim} alt="" height='250px' width="200px" />
            </div>
            <h3>Gacem Abdelalim</h3>
            <p>???????</p>
          </div>
        </div>

        <div className="row equipe-footer"></div>

      </div>


    </div>
  )
}
