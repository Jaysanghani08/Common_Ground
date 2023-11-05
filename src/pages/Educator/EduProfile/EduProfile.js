import React from 'react'
import Sidebar from '../Dashboard/Sidebar/Sidebar'
import { useRef, useState, useEffect } from 'react';
import './EduProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faGlobe,faEnvelope,faPhone,faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const EduProfile = () => {

    const inputRef = useRef(null);
    const [image,setimage] = useState("");
    const [about,setabout] = useState([]);
    // const [records,setrecords] = useState([]);


    useEffect(() => {
        fetch('https://651af82d340309952f0e1cb7.mockapi.io/ProfileAPI')
        .then(response => response.json())
        .then(data => setabout(data)) 
        .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        
        <div className='container1'>
            <Sidebar/>
            {/* <div className='ep-profile maindash'> */}

            <div className='ep-profile maindash'>

<h2 className='ep-pro-heading'>Profile Page</h2>
<div className='ep-sub-profile'>

    <div className='ep-upper-container'>

        <div className='ep-image-container'>

            <div className='ep-img-user'>
                {image ? <img src={URL.createObjectURL(image)} alt=''/> 
                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image'/>}
                    {/* : <img src='https://img.freepik.com/premium-vector/man-character_665280-46970.jpg' alt='no image'/>} */}

                <div className='ep-username'>
                    {/* <h2>{props.name}</h2> */}
                    {about.map( Sahil => (
                        <div>{Sahil.username}</div>
                    ))}
                </div>
            </div>

        </div>

        <div className='ep-personalinfo'>

            <div className='ep-profilename'>
                {about.map( Sahil => (
                    <div>{Sahil.fname} {Sahil.sname}</div>
                ))}
            </div>

            <div className='ep-Icon'>
                <div className='ep-age-icon'>
                    <FontAwesomeIcon icon={faUser} />
                    {about.map( Sahil => (
                        <div >{Sahil.Age} year old {Sahil.gender}</div>
                        ))}
                </div>

                <div className='ep-country-icon'>
                    <FontAwesomeIcon icon={faGlobe} />
                    {about.map( Sahil => (
                        <div >{Sahil.Country}</div>
                        ))}
                </div>

            </div>
            
            <div className='ep-email'>
                <FontAwesomeIcon icon={faBook} />
                {about.map( Sahil => (
                    <div className='ep-email1'>{Sahil.Degree}</div>
                    ))}
            </div>

            <div className='ep-email'>
                <FontAwesomeIcon icon={faEnvelope} />
                {about.map( Sahil => (
                    <div className='ep-email1'>{Sahil.email}</div>
                    ))}
            </div>

            <div className='ep-mo-number'>
                <FontAwesomeIcon icon={faPhone} />
                {about.map( Sahil => (
                    <div className='ep-mo-number1'>{Sahil.mobilenumber}</div>
                    ))}
            </div>

        </div>

    </div>

    <div className='ep-lover-container'>
        
        <div className='ep-about-head'>About</div>
        
            {about.map( Sahil => (
                <div className='ep-about'>I hold {Sahil.Degree} in {Sahil.Field}, and my educational background is complemented by {Sahil.Place}. This academic foundation forms the basis of my commitment to providing high-quality education in my course.</div>
            ))}

        <div className='ep-edbutton'>

        <Link to={'/educator/update'} className='ep-edit-button'>Edit Profile</Link>    
        {/* <button to={'/update'} className='ep-button'>Edit Profile</button>     */}

        </div>

    </div>

</div>

</div>

            {/* </div> */}
            
        </div>    
    )
}

export default EduProfile
