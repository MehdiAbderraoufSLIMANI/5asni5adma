import React from 'react'
import "./CreateGig.css"
import { useNavigate } from 'react-router-dom'

const CreateGig = () => {


    const navigate = useNavigate()


    const handleCancelEvent = () => {
        navigate('/profil/worker')
    }



  return (
    <div className="col-md-6 col-sm-6 form-container">
            <h3>Créer Annonce</h3>
            <form method='PUT' >
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Catégorie' required/>
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Service' required/>
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Description' required/>
                </div>


                <div className="custom-file mb-3">
                    <label className="custom-file-label" htmlFor="profileImage"></label>
                    <input type="file" className="custom-file-input form-control" id="profileImage" accept="image/*" />
                </div>


                <div className='col-lg-8 col-md-10 col-sm-12  d-flex mx-auto'>
                    <button className='editBouton' type='submit'>Sauvegarder</button>
                    <button className='btn cancelBouton' onClick={handleCancelEvent}>Annuler</button>
                </div>

            </form> 

        </div>
  )
}

export default CreateGig