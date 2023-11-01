import React from 'react'
import Sidebar from '../Dashboard/Sidebar/Sidebar'
import { useRef, useState, useEffect } from 'react';
import './EduProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faGlobe,faEnvelope,faPhone } from '@fortawesome/free-solid-svg-icons';
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

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setimage(file);
    };

    return (
        
        <div className='container1'>
            <Sidebar/>
        <div className='ep-profile maindash'>
            
        <div className='ep-upper-container'>

                <img className="ep-background-img"src='https://digitalpromise.org/wp-content/uploads/2023/08/23dDPN0004-What-Motivates-Schools-to-Adopt-New-Technology-Solutions_Blog-hdr_v1r3.png' alt='' />           

            <div className='ep-image-container' onclick={handleImageClick} >

                {image ? <img src={URL.createObjectURL(image)} alt=''/> 
                       : <img src='https://img.freepik.com/premium-vector/man-character_665280-46970.jpg' alt='no image'/>}

                <input type='file' ref={inputRef} onChange={handleImageChange} style={{ display : 'none'}}/>
                
            </div>
            
        </div>
        
        <div className='ep-lover-container'>

            <div className='ep-profileinfo'>
            {/* <h2>{props.name}</h2> */}
            {about.map( Sahil => (
                <div>{Sahil.Name}</div>
            ))}
            </div>

            <div className='ep-Icon'>
                <div className='ep-first-icon'>
                <FontAwesomeIcon icon={faUser} />

            {about.map( Sahil => (
                <div >{Sahil.Age} year old {Sahil.gender}</div>
                ))}
                </div>
                <div className='ep-sec-icon'>
                <FontAwesomeIcon icon={faGlobe} />
                {about.map( Sahil => (
                    <div >{Sahil.Country}</div>
                    ))}
                </div>
            </div>
            <div className='ep-about-head'>About</div>
            {about.map( Sahil => (
                <div className='ep-about'>I hold {Sahil.Degree} in {Sahil.Field}, and my educational background is complemented by {Sahil.Place}. This academic foundation forms the basis of my commitment to providing high-quality education in my course.</div>
            ))}
            

            <div className='ep-find-head'>Find Me here:</div>

            <div className='ep-find'>

            {about.map( Sahil => (
                <div className='ep-email'>
            <FontAwesomeIcon icon={faEnvelope} />
            {/* <p>kalyans@gmail.com</p> */}
            <div>{Sahil.Gmail}</div>
            </div>
                ))}

            {about.map( Sahil => (
                <div className='ep-mo-number'>
            <FontAwesomeIcon icon={faPhone} />
            <div>{Sahil.mobilenumber}</div>
            {/* <p>{9856231562}</p> */}
            </div>
                ))}
            </div>

            <Link to={'/educator/update'} className='ep-button'>Edit Profile</Link>    
            {/* <button to={'/update'} className='ep-button'>Edit Profile</button>     */}
            
        </div>
        </div>
      
    </div>
        
    )
}

export default EduProfile
