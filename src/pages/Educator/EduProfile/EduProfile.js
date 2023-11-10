import React from 'react'
import Sidebar from '../Dashboard/Sidebar/Sidebar'
import { useRef, useState, useEffect } from 'react';
import './EduProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGlobe, faEnvelope, faPhone, faBook } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import EdNavbar from '../Dashboard/Sidebar/Navbar';

const EduProfile = () => {

    const inputRef = useRef(null);
    const [image, setimage] = useState("");
    const [about, setabout] = useState([]);
    // const [records,setrecords] = useState([]);


    useEffect(() => {
        fetch('https://651af82d340309952f0e1cb7.mockapi.io/ProfileAPI')
            .then(response => response.json())
            .then(data => setabout(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (

        <div className='ep-container1'>
            <EdNavbar/>
        
            <div className='epn-profile maindash'>
        
                <div className='epn-upper'>
        
                    <div className='epn-sub-upper'>
        
                        <div className='epn-image-container1'>
                            <div className='epn-img1'>
                                {image ? <img src={URL.createObjectURL(image)} alt=''/> 
                                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image'/>}
                                    {/* : <img src='https://img.freepik.com/premium-vector/man-character_665280-46970.jpg' alt='no image'/>} */}
                            </div>
                         </div> 
            
                         <div className='epn-user'>
                            <div className='epn-username1'>
                                {/* <h2>{props.name}</h2> */}
                                {about.map( Sahil => (
                                    <div>{Sahil.username}</div>
                                ))}
                            </div>
        
                            <div className='epn-about'>
                                {about.map( Sahil => (
                                            <div className='epn-about'>I hold {Sahil.Degree} in {Sahil.Field}, and my educational background is complemented by {Sahil.Place}. This academic foundation forms the basis of my commitment to providing high-quality education in my course.</div>
                                        ))}
                            </div>
                         </div>
                                                
                     </div>
        
                </div>
        
                <div className='epn-lover'>
        
                    <div className='epn-basicinfo'>
        
                        <div className='epn-basic-heading'>Basic Info</div>
        
                        <div className='epn-Sub-basicinfo'>
        
                            <div className='epn-info-main'>
                                    <div className='epn-info-submain'>Name</div>
                                    <div className='epn-info-submain'>Gender</div>
                                    <div className='epn-info-submain'>Country</div>
                                    <div className='epn-info-submain'>Dob</div>
                                    <div className='epn-info-submain'>Education Level</div>
                                    <div className='epn-info-submain'>Email</div>                                
                                    <div className='epn-info-submain'>Phone</div>      
                            </div>
        
                            <div className='epn-personalinfo'>
        
                                <div className='epn-info-submain'>
                                    {about.map( Sahil => (
                                        <div>{Sahil.fname} {Sahil.sname}</div>
                                    ))}
                                </div>
        
                                <div className='epn-info-submain'>
                                    {/* <FontAwesomeIcon icon={faUser} /> */}
                                    {about.map( Sahil => (
                                        <div >{Sahil.gender}</div>
                                        ))}
                                </div>
                                    
                                <div className='epn-info-submain'>
                                    {/* <FontAwesomeIcon icon={faGlobe} /> */}
                                    {about.map( Sahil => (
                                        <div >{Sahil.Country}</div>
                                        ))}
                                </div>                            
        
                                <div className='epn-info-submain'>
                                    {/* <FontAwesomeIcon icon={faUser} /> */}
                                    {about.map( Sahil => (
                                        <div >{Sahil.Age} year old</div>
                                        ))}
                                </div>
                                
                                <div className='epn-info-submain'>
                                    {/* <FontAwesomeIcon icon={faBook} /> */}
                                    {about.map( Sahil => (
                                        <div className='epn-email1'>{Sahil.Degree}</div>
                                        ))}
                                </div>
                                       
                                <div className='epn-info-submain'>
                                    {/* <FontAwesomeIcon icon={faEnvelope} /> */}
                                    {about.map( Sahil => (
                                        <div className='epn-email1'>{Sahil.email}</div>
                                        ))}
                                </div>
                               
                                <div className='epn-info-submain'>
                                    {/* <FontAwesomeIcon icon={faPhone} /> */}
                                    {about.map( Sahil => (
                                        <div className='epn-mo-number1'>{Sahil.mobilenumber}</div>
                                        ))}
                                </div>
                                
                            </div>
        
                        </div>
        
                        <Link to={'/update'} className='epn-edit-button'>Edit Profile</Link> 
        
                    </div>  
        
                </div>
        
            </div>

        </div>
    )
}

export default EduProfile
