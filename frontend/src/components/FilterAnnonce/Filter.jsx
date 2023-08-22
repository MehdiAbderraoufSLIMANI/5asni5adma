import React, { useContext, useRef, useState } from 'react'
import algeriaData from '../../JSON/wilaya&commune.json'
import { filterCtx } from '../../Context/FilterContext';
import {motion, AnimatePresence} from "framer-motion";
import './Filter.css';

export default function Filter({ categories,showFilter, setShowFilter, submitFilter, clearFilter }) {


  const { setCategorie, setWilaya, setCommune, wilaya } = useContext(filterCtx);


  const listWilayas = [...new Set(algeriaData.map(data => data.wilaya_name_ascii))];

  const [msg, setMsg] = useState('');

  const updateMsgFilter = (filteredField) => {
    switch (filteredField) {
      case 'categorie':
        setMsg("Catégorie mise à jour !");
        setTimeout(() => setMsg(''), 1500);
        break;
      case 'wilaya':
        setMsg("Wilaya mise à jour !");
        setTimeout(() => setMsg(''), 1500);
        break;
      case 'commune':
        setMsg("Commune mise à jour !");
        setTimeout(() => setMsg(''), 1500);
        break;
      default:
        return;
    }
  }






  const categ = useRef();
  const wil = useRef();
  const com = useRef();

  const clearFilterHandler = (e) => {
    e.preventDefault();
    clearFilter();
    categ.current.selectedIndex = 0;
    wil.current.selectedIndex = 0;
    com.current.selectedIndex = 0;
  }




  const submitFilterHandler = (e) => {
    e.preventDefault();
    submitFilter();
    setShowFilter(false);
  }

  return (
    <>
    
    
    <AnimatePresence>
    { showFilter && (<motion.div key="filter"
    initial={{opacity: 0, x: -50   }}
    animate={{opacity: 1, x: 0   }}
    exit={{opacity: 0 , x: -200}}
    transition= {{duration: 1, type: 'spring'}}

    className="filter-container">

      <div className="filter-header">
        <h2>Filtrer</h2> <i class="bi bi-funnel-fill"></i>
        <i class="bi bi-x-lg" onClick={() => {
          setCategorie('catégorie');
          setWilaya('wilaya');
          setCommune('commune');
          setShowFilter(false);
        }}></i>
      </div>


      <form onSubmit={(e) => submitFilterHandler(e)}>
       
        <button className='btn clearFilterBtn' onClick={(e)=>clearFilterHandler(e)}>Effacer <i className="bi bi-trash3-fill"></i></button>
        
        <AnimatePresence>
          {msg.length > 0 && 
          <motion.p key='message'
          initial={{opacity: 0.5, x: 0, scale: 0.5   }}
          animate={{opacity: 1, x: 0, scale: 1 }}
          exit={{opacity: 0 , x: 50 }}
          transition= {{duration: 0.5, type: 'spring'}}
          className='alert alert-success'> {msg} </motion.p>}
        </AnimatePresence>
        
        <select defaultValue='catégorie' ref={categ} name="categories" onChange={(e) => {
          setCategorie(e.target.value);
          updateMsgFilter('categorie');
        }}>
          <option value='catégorie'>catégorie</option>
          {categories.map(categ => <option key={categ} value={categ}>{categ}</option>)

          }
        </select>

        <select defaultValue='wilaya' ref={wil} name="wilayas" onChange={(e) => {
          setWilaya(e.target.value);
          updateMsgFilter('wilaya');
        }}>
          <option value='wilaya'>wilaya</option>
          {
            listWilayas.map((wilaya, index) =>

              <option key={index} value={wilaya} >{`${index + 1} - ${wilaya}`}</option>
            )

          }
        </select>

        <select  defaultValue='commune' ref={com} name="communes" onChange={(e) => {
          setCommune(e.target.value);
          updateMsgFilter('commune');
        }}>
          <option value='commune' >commune</option>
          {
            algeriaData.map(data => {
              if (data.wilaya_name_ascii === wilaya) {
                return <option key={data.id} value={data.commune_name_ascii}>{data.commune_name_ascii}</option>
              }
            })
          }
        </select>

        
        <button className='valider' type='submit'>Valider</button>
  
      </form>
    </motion.div>)}
  </AnimatePresence>
    </>
  )
}
