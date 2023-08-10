import React, { useEffect, useState } from 'react'
import './EditClientForm.css'
import algeriaData from '../../JSON/wilaya&commune.json'
import { useForm, useWatch } from 'react-hook-form'

export default function EditClientForm({ submitEditHandler, currentUser, cancelHandler }) {

    const { register, handleSubmit, setValue, formState: { errors }, control, trigger } = useForm();

    const wilayaValue = useWatch({
        control,
        name: 'wilaya', 
    });
    const NewpasswordValue = useWatch({
        control,
        name: 'Newpassword', 
    });

    // Set initial values for all fields
    useEffect(() => {
        setValue('nom', currentUser.nom);
        setValue('prenom', currentUser.prenom);
        setValue('username', currentUser.username);
        setValue('email', currentUser.email);
        setValue('tel', currentUser.tel);
        setValue('wilaya', currentUser.wilaya);
        setValue('adresse', currentUser.adresse);
    }, [setValue]);

    const listWilayas = [...new Set(algeriaData.map(data => data.wilaya_name_ascii))];

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const cancel = () => {
        cancelHandler();
    }

    const editHandler = (data) => {
        submitEditHandler(data);
    }
    return (
        <div className="col-md-6 col-sm-6 form-container">
            <h3>Editer profil</h3>
            <form onSubmit={handleSubmit(editHandler)}>

                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Nom'
                        {...register("nom", {
                            required: 'Le Nom est obligatoire'
                        })}
                        onKeyUp={() => trigger('nom')} />
                    {errors.nom && (<small className='error'>{errors.nom.message}</small>)}
                </div>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Prenom'
                        {...register("prenom", {
                            required: 'Le Prenom est obligatoire'
                        })}
                        onKeyUp={() => trigger('prenom')} />
                    {errors.prenom && (<small className='error'>{errors.prenom.message}</small>)}
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control" placeholder='Nom utilisateur'
                        {...register("username", {
                            required: "Le Nom d'utilisateur est obligatoire"
                        })}
                        onKeyUp={() => trigger('username')} />
                    {errors.username && (<small className='error'>{errors.username.message}</small>)}
                </div>
                <div className="mb-3" style={{position: 'relative'}}>
                    <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder='Ancien mot de passe'
                        {...register("Oldpassword", {
                            required: 'Le mot de passe est obligatoire',
                        })}
                        onKeyUp={() => trigger('Oldpassword')} />
                    {errors.Oldpassword && (<small className='error'>{errors.Oldpassword.message}</small>)}
                    {showPassword ? <i className="bi bi-eye-fill" onClick={() => setShowPassword(false)}></i> : <i className="bi bi-eye-slash-fill" onClick={() => setShowPassword(true)}></i>}
                </div>

                <div className="mb-3" style={{position: 'relative'}}>
                    <input type={showPassword2 ? 'text' : 'password'} className="form-control" placeholder='Nouveau mot de passe'
                        {...register("Newpassword", {
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/ ,
                                message: 'Mot de passe doit contenir 8-15 characters, au moins : 1 lettre majuscule, 1 nombre, 1 charactère spécial'
                            }
                        })}
                        onKeyUp={() => trigger('Newpassword')} />
                    {errors.Newpassword && (<small className='error'>{errors.Newpassword.message}</small>)}
                    {showPassword2 ? <i className="bi bi-eye-fill" onClick={() => setShowPassword2(false)}></i> : <i className="bi bi-eye-slash-fill" onClick={() => setShowPassword2(true)}></i>}
                </div>

                <div className="mb-3">
                    <input type="password" className="form-control" placeholder='Confirmer nouveau Mot de passe'
                        {...register("confirmMDP", {
                            validate: (value) => {if (NewpasswordValue != null) return value === NewpasswordValue || 'Le mot de passe confirmé doit correspondre au nouveau mot de passe';
                                                  else return true}
                        })}
                        onKeyUp={() => trigger('confirmMDP')} />
                    {errors.confirmMDP && (<small className='error'>{errors.confirmMDP.message}</small>)}
                </div>

                <div className="mb-3">
                    <input type="email" className="form-control" placeholder='Email'
                        {...register("email", {
                            required: "L'Email est obligatoire",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Email invalide'
                            }
                        })}
                        onKeyUp={() => trigger('email')} />
                    {errors.email && (<small className='error'>{errors.email.message}</small>)}
                </div>
                <div className="mb-3">
                    <input type="tel" className="form-control" placeholder='Tél'
                        {...register("tel", {
                            pattern: {
                                value: /^(?:(?:\+213)|(?:00213)|(?:0))(?:5|6|7)\d{8}$/,
                                message: 'Num Téléphone invalide'
                            }
                        })}
                        onKeyUp={() => trigger('tel')} />
                    {errors.tel && (<small className='error'>{errors.tel.message}</small>)}
                </div>

                <div className="mb-3">
                    <select defaultValue='wilaya' name="wilayas" className='form-select '
                        {...register("wilaya", {
                            validate: value => value !== 'wilaya' || 'Veuillez choisir une wilaya'
                        })}
                        onKeyUp={() => trigger('wilaya')}>
                        <option value='wilaya'>wilaya</option>
                        {
                            listWilayas.map((wilaya, index) =>
                                <option key={index} value={wilaya} >{`${index + 1} - ${wilaya}`}</option>
                            )
                        }

                    </select>
                    {errors.wilaya && (<small className='error'>{errors.wilaya.message}</small>)}
                </div>

                <div className="mb-3">
                    <select defaultValue='commune' name="communes" className='form-select'
                        {...register("commune", {
                            validate: value => value !== 'commune' || 'Veuillez choisir une commune'
                        })}
                        onKeyUp={() => trigger('commune')}>
                        <option value='commune' >commune</option>
                        {
                            algeriaData.map(data => {
                                if (data.wilaya_name_ascii === wilayaValue) {
                                    return <option key={data.id} value={data.commune_name_ascii}>{data.commune_name_ascii}</option>
                                }
                            })
                        }
                    </select>
                    {errors.commune && (<small className='error'>{errors.commune.message}</small>)}
                </div>

                <div className="mb-4">
                    <input type="text" className="form-control" placeholder='Adresse'
                        {...register("adresse", {
                            required: "L'Adresse est obligatoire",
                            minLength: {
                                value: 10,
                                message: 'Adresse doit contenir au moins 10 caractéres'
                            },
                            maxLength: {
                                value: 80,
                                message: 'Adresse doit contenir au max 100 caractéres'
                            }
                        })}
                        onKeyUp={() => trigger('adresse')} />
                    {errors.adresse && (<small className='error'>{errors.adresse.message}</small>)}
                </div>

                <div className="custom-file mb-3">
                    <label className="custom-file-label" htmlFor="profileImage">Modifier l'image de profil</label>
                    <input type="file" className="custom-file-input form-control" id="profileImage" accept="image/*" />
                </div>


                <div className='col-lg-8 col-md-10 col-sm-12  d-flex mx-auto'>
                    <button className='editBouton' type='submit'>Sauvegarder</button>
                    <button className='btn  cancelBouton' onClick={cancel}>Annuler</button>
                </div>

            </form>
        </div>
    )
}
