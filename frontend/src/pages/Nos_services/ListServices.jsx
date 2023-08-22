import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import Filter from '../../components/FilterAnnonce/Filter';
import { filterCtx } from '../../Context/FilterContext';
import Annonce from '../../components/Annonce/Annonce';
import {motion, AnimatePresence} from "framer-motion";
import Pagination from '../../components/Pagination/Pagination';
import StickyFilter from '../../components/StickyFilterBtn/StickyFilter';
import './ListServices.css';
import Skeleton from '../../components/Skeleton/Skeleton';

 

import { client } from '../../App';
export default function ListServices() {

  const [scrollRate, setScrollRate] = useState(0);
  const [showStickyFilter, setShowStickyFilter] = useState(false);
  
  const [annonces, setAnnonces] = useState([]);
  const [allAnnonces, setAllannonces] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [keyWord, setKeyWord] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { categ } = useParams();
  

  useEffect(() => {
    setIsLoading(true);
    getTousAnnonce(); 
  }, []); 

  useEffect(() => {
    // This effect will run whenever 'allAnnonces' state is updated
    if (allAnnonces.length > 0) {
      setIsLoading(false); 
     if (categ) {
      setAnnonces(allAnnonces.filter(ann => ann.categorie === categ));
    }
    else {
      setAnnonces(allAnnonces);
    }
    setCurrentPage(1);
    setIsLoading(false);    
    }
  }, [allAnnonces,categ]);

  const getTousAnnonce = async () => {
    try {
      client.get('/api/Annonce/')
      .then((response ) => {
        setAllannonces(response.data);
        setIsLoading(false);  
      })
      .catch((error) => { 
        setIsLoading(false);
      });

    } catch (error) {
      // If there's an error, user is not logged in
      return null;
    }
  };

  const handleScroll = () => {
    const element = document.documentElement || document.body;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const rate = (scrollTop / scrollHeight) * 100;
    setScrollRate(rate);
  };

  useEffect(() => { 
    // Ajouter un écouteur d'événement de défilement lors du montage du composant
    window.addEventListener('scroll', handleScroll);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if(scrollRate > 50) {
      if(!showFilter) {
        setShowStickyFilter(true);
      }   
    } else {
      setShowStickyFilter(false);
    }
  
  }, [scrollRate])


  const { categorie, wilaya, commune,setCategorie, setWilaya, setCommune} = useContext(filterCtx);

  //Search bar logic
  const searchHandler = (e) => {
    setIsLoading(true);

    setKeyWord(e.target.value);
    setCurrentPage(1);
    if(keyWord.length > 1) {
      const word = keyWord.trim();
      setAnnonces(allAnnonces.filter(ann => ann.service.toLowerCase().includes(word.toLowerCase())));
    }else {
      if (categ) {
        setAnnonces(allAnnonces.filter(ann => ann.categorie === categ));
      }
      else {
        setAnnonces(allAnnonces)
      }
    }
    setIsLoading(false);
  }
  
  //Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;  
  const nbPages = Math.ceil(annonces.length / itemsPerPage);
  const firstInd = (currentPage-1) * itemsPerPage;
  const lastInd = currentPage * itemsPerPage;
  
  
  const currentAnnonces = annonces.slice(firstInd,lastInd);
 


  //Filter logic
  const clearFilter = () => {
    setAnnonces(allAnnonces);
    setCategorie('catégorie');
    setWilaya('wilaya');
    setCommune('commune');
  } 

  const submitFilter = () => {
    setIsLoading(true);
    setCurrentPage(1);    
  if(categorie!=='catégorie' && wilaya!== 'wilaya' && commune!=='commune' ) {
    setAnnonces(allAnnonces.filter(ann => ann.categorie===categorie && ann.wilaya===wilaya && ann.commune===commune));
  } 
  else if(wilaya!== 'wilaya' && commune!=='commune') {
    setAnnonces(allAnnonces.filter(ann => ann.wilaya===wilaya && ann.commune===commune));
  } 
  else if(categorie!=='catégorie' && wilaya!== 'wilaya') {
    setAnnonces(allAnnonces.filter(ann => ann.categorie===categorie && ann.wilaya===wilaya));
  } 
  else if(wilaya!== 'wilaya') {
    setAnnonces(allAnnonces.filter(ann => ann.wilaya===wilaya));
  }
  else if(categorie!=='catégorie') {
    setAnnonces(allAnnonces.filter(ann => ann.categorie===categorie));
  }
    setCategorie('catégorie');
    setWilaya('wilaya');
    setCommune('commune');

    setIsLoading(false);
  }

  useEffect(() => {
  if(commune !== 'commune') {
    setCommune('commune');
  }
  }, [wilaya])

  
 
  const categories = [...new Set(allAnnonces.map(ann => ann.categorie))];

  return (
    <div>
      <div className="services-header container-fluid">
        <h2>À la recherche d'un artisan talentueux et qualié pour vous aider ?</h2>
        <p> Ne cherchez plus ! Nous avons sélectionné pour vous les meilleurs artisans de votre région</p>
      </div>

      {showFilter && <div className='disabled'></div> }    
          {<Filter showFilter={showFilter} categories={categories} setShowFilter={setShowFilter} submitFilter={submitFilter} clearFilter={clearFilter}/> }

          { !isLoading && <StickyFilter showStickyFilter={showStickyFilter} setShowFilter={setShowFilter} setShowStickyFilter={setShowStickyFilter}/> }
   
   { (isLoading || allAnnonces.length===0) ? <Skeleton showFilter={showFilter} /> : 
     <div className="main-content">
      <div id='top' className="filter-search-container ">
        <form className="d-flex" role="search">
          <input className="form-control" type="search" placeholder="Chercher un service..." value={keyWord} onChange={(e)=>searchHandler(e)} />
          <i className="bi bi-search"></i>
          
          <button className='btn filterBTN' onClick={(e) => {
            e.preventDefault();
            setShowFilter(true);
          }}>Filtrer</button>
          <button className='btn showAll' onClick={(e) => {
            e.preventDefault();
            setShowFilter(false);
            setAnnonces(allAnnonces);
            setCurrentPage(1);
          }}>Afficher tout</button>  
        </form>
      </div>


      

        

      <div  className={`List-annonces container ${showFilter ? 'adjustSize': ''} `}>
      <p style={{marginLeft: '73%',marginBottom: '32px', fontSize: '20px', fontWeight: '600'}}> { annonces.length} résultats trouvés</p>
        <div className="row justify-content-center align-items-center">
            {currentAnnonces.length > 0 ?
            
              currentAnnonces.map(ann => <Annonce key={ann.num} ann={ann} />)
              
             :
              <AnimatePresence>
                  <motion.p key='message' className='alert'
                  initial={{opacity: 0, x: -1050   }}
                  animate={{opacity: 1, x: 0   }}
                  transition= {{duration: 1, type: 'spring'}}
                  >Aucun résultat trouvé ! 
                  </motion.p>
              </AnimatePresence>
              
            }
            
          
        </div>
      </div>
      {annonces.length > 0 && <Pagination categ={categ} nbPages={nbPages} currentPage={currentPage} setCurrentPage={setCurrentPage} showFilter={showFilter}/>}
  </div>
}
      


    </div>
  ) 
}