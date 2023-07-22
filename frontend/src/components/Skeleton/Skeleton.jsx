import React, {useEffect, useState} from 'react'
import './Skeleton.css'

export default function Skeleton({ showFilter }) {

  const [iterations, setIterations] = useState([]);
  const nbAppearences = 6;
  
    useEffect(()=> {
        const L = [];
        for(let i=0; i < nbAppearences; i++) {
         L.push(i);
        }
        setIterations(L);
    }, [])

    return (
        <div className='main-content-sk'>
            <div className="filter-search-container-sk">
                <form className="d-flex">
                    <input className="form-control" />
                    <span className="icon-search-sk"></span>
                    <button className='btn filterBTN'></button>
                    <button className='btn showAll'></button>
                </form>
            </div>
            <div className={`List-annonces-sk container ${showFilter ? 'adjustSize-sk' : ''} `}>
                <div style={{ marginLeft: '73%', marginBottom: '32px' }}> </div> {/* <p> résultats trouvés </p>*/}
                <div className="row justify-content-center align-items-center">
                    {iterations.map(iter => (
                        <div key={iter} className="col-md-5 col-lg-3 annonce-container-sk">
                        <div className='img-sk'></div>
                        <div className='h4-sk'></div>
                       
                    <div className='mt-2'>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                    </div>
                        <div className="categorie-sk"></div>
                        
                        <div className='loc'>
                            <div className="icon-adress-sk"></div> 
                            <div className="location-sk"></div>
                        </div>
                        
                        <a href="" className='btn'></a>
                    </div>)) }
                </div>
            </div>


        </div>
    )
}
