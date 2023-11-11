import React from 'react'
import { useRef, useState, useEffect } from 'react';
import './StuProfile.css'
import { Link } from 'react-router-dom';
import Navbar from '../Dashboard/Sidebar/Sidebar'

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

        <div className='spn-container1'>
        
            <Navbar /> 
        <div className='spn-profile'>
        
                <div className='spn-upper'>
        
                    <div className='spn-sub-upper'>
        
                        <div className='spn-image-container1'>
                            <div className='spn-img1'>
                                {image ? <img src={URL.createObjectURL(image)} alt=''/> 
                                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image'/>}
                                    {/* : <img src='https://img.freepik.com/premium-vector/man-character_665280-46970.jpg' alt='no image'/>} */}
                            </div>
                         </div> 
            
                         <div className='spn-user'>
                            <div className='spn-username1'>
                                
                                {about.map( Sahil => (
                                    <div>{Sahil.username}</div>
                                ))}
                            </div>
        
                         </div>
                                                
                     </div>
        
                </div>
        
                <div className='spn-lover'>
        
                    <div className='spn-basicinfo'>
        
                        <div className='spn-basic-heading'>Basic Info</div>
        
                        <div className='spn-Sub-basicinfo'>
        
                            <div className='spn-info-main'>
                                    <div className='spn-info-submain'>Name</div>
                                    <div className='spn-info-submain'>Gender</div>
                                    <div className='spn-info-submain'>Country</div>
                                    <div className='spn-info-submain'>Dob</div>
                                    <div className='spn-info-submain'>Education Level</div>
                                    <div className='spn-info-submain'>Email</div>                                
                                    <div className='spn-info-submain'>Phone</div>      
                            </div>
        
                            <div className='spn-personalinfo'>
        
                                <div className='spn-info-submain'>
                                    {about.map( Sahil => (
                                        <div>{Sahil.fname} {Sahil.sname}</div>
                                    ))}
                                </div>
        
                                <div className='spn-info-submain'>
                                    
                                    {about.map( Sahil => (
                                        <div >{Sahil.gender}</div>
                                        ))}
                                </div>
                                    
                                <div className='spn-info-submain'>
                                    
                                    {about.map( Sahil => (
                                        <div >{Sahil.Country}</div>
                                        ))}
                                </div>                            
        
                                <div className='spn-info-submain'>
                                    
                                    {about.map( Sahil => (
                                        <div >{Sahil.Age} year old</div>
                                        ))}
                                </div>
                                
                                <div className='spn-info-submain'>
                                    
                                    {about.map( Sahil => (
                                        <div className='spn-email1'>{Sahil.Degree}</div>
                                        ))}
                                </div>
                                       
                                <div className='spn-info-submain'>
            
                                    {about.map( Sahil => (
                                        <div className='spn-email1'>{Sahil.email}</div>
                                        ))}
                                </div>
                               
                                <div className='spn-info-submain'>

                                    {about.map( Sahil => (
                                        <div className='spn-mo-number1'>{Sahil.mobilenumber}</div>
                                        ))}
                                </div>
                                
                            </div>
        
                        </div>
        
                        <Link to={'/student/update'} className='spn-edit-button'>Edit Profile</Link> 
        
                    </div>  
        
                </div>
        
            </div>

        </div>
    )
}

export default EduProfile
