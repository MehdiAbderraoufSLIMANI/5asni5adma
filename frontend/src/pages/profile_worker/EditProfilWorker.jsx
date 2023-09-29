import React, { useState , useRef, useEffect} from 'react'
import jsonData from "../../JSON/wilaya&commune.json"
import "./EditProfileWorker.css"
import { useNavigate } from 'react-router-dom'

const EditProfilWorker = () => {

    const [wilayas, setWilayas] = useState([])
    const [communes, setCommunes] = useState([])

    useEffect(()=>{
        const uniqueWilayaNames = Array.from(new Set(jsonData.map(item => item.wilaya_name_ascii)))
        setWilayas(uniqueWilayaNames)
    },)

    
    const navigate = useNavigate()

    const selectedWilaya = useRef(null)

    

    let handleChange = () => {
        setCommunes(jsonData.filter(commune => commune.wilaya_name_ascii === selectedWilaya.current.value))
    } 


  return (
    <div className="col-md-6 col-sm-6 form-container">
            <h3>Editer profil</h3>
            <form method='PUT' >
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Nom'/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Prenom' />
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Nom utilisateur'/>
                </div>

                <div className="mb-3">
                    <input type="email" className="form-control" placeholder='Email'/>
                </div>
                <div className="mb-3">
                    <input type="tel" className="form-control" placeholder='Tél' />
                </div>

                <div className="mb-3">
                    <select onClick={handleChange} name="wilaya" className='form-select' ref={selectedWilaya} required>
                        {wilayas.map(wilaya => <option value={wilaya}>{wilaya}</option>)}
                    </select>
                </div>

                <div className="mb-3">
                    <select name="commune" className='form-select ' required>
                        {communes.map(commune => <option value={commune.commune_name_ascii}>{commune.commune_name_ascii}</option>)}
                    </select>
                </div>

                <div className="mb-4">
                    <input type="text" className="form-control" placeholder='Adresse' required/>
                </div>

                <div className="custom-file mb-3">
                    <label className="custom-file-label" htmlFor="profileImage">Modifier l'image de profil</label>
                    <input type="file" className="custom-file-input form-control" id="profileImage" accept="image/*"/>
                </div>


                <div className='col-lg-8 col-md-10 col-sm-12  d-flex mx-auto'>
                    <button className='editBouton' type='submit'>Sauvegarder</button>
                    <button className='btn cancelBouton' onClick={()=>navigate("/profil/worker")}>Annuler</button>
                </div>

            </form> 

        </div>
  )
}

export default EditProfilWorker