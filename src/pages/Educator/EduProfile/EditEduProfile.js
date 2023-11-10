import React from 'react'
import { useRef, useState, useEffect } from 'react';
import './EditEduProfile.css'
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

        <div className='epn-container1'>
        
                <EdNavbar/>
        <div className='epn-edit-profile'>
        
                <div className='epn-edit-upper'>
        
                    <div className='epn-edit-sub-upper'>
        
                        <div className='epn-edit-image-container1'>
                            <div className='epn-edit-img1'>
                                {image ? <img src={URL.createObjectURL(image)} alt=''/> 
                                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image'/>}
                                    {/* : <img src='https://img.freepik.com/premium-vector/man-character_665280-46970.jpg' alt='no image'/>} */}
                            </div>
                         </div> 
            
                         <div className='epn-edit-user'>
                            <div className='epn-edit-username1'>
                              <input className="edp-edit-form-control" type="text" name='username' value="Edit_Profile" />
                            </div>
        
                            <div className='epn-edit-about'>
                              <textarea className="edp-edit-form-control" name="bio" placeholder="Write a brief bio about yourself..." rows="4" cols="50"></textarea>
                              <input className="edp-edit-form-control" type="submit"value="Save" />
                            </div>
                         </div>
                                                
                     </div>
        
                </div>
        
                <div className='epn-edit-lover'>
        
                    <div className='epn-edit-basicinfo'>
        
                        <div className='epn-edit-basic-heading'>Basic Info</div>
        
                        <div className='epn-edit-Sub-basicinfo'>
        
                            <div className='epn-edit-info-main'>
                                    <div className='epn-edit-info-submain'>Name</div>
                                    <div className='epn-edit-info-submain'>Gender</div>
                                    <div className='epn-edit-info-submain'>Country</div>
                                    <div className='epn-edit-info-submain'>Dob</div>
                                    <div className='epn-edit-info-submain'>Education Level</div>
                                    <div className='epn-edit-info-submain'>Email</div>                                
                                    <div className='epn-edit-info-submain'>Phone</div>      
                            </div>
        
                            <div className='epn-edit-personalinfo'>
        
                                <div className='epn-edit-info-submain2'>
                                  <input className="edp-edit-form-control" type="text" name='fname' value="Sahil" />
                                </div>
        
                                <div className='epn-edit-info-submain2'>
                                  <input className="edp-edit-form-control" type="text" name='gender' value="Male" />
                                </div>
                                    
                                <div className='epn-edit-info-submain2'>
                                  <input className="edp-edit-form-control" type="text" name='country' value="India" />
                                </div>                            
        
                                <div className='epn-edit-info-submain2'>
                                  <input className="edp-edit-form-control" type="date" name='dob' value="" />
                                </div>
                                
                                <div className='epn-edit-info-submain2'>
                                  <input className="edp-edit-form-control" type="text" name='educationLevel' value="" />
                                </div>
                                       
                                <div className='epn-edit-info-submain2'>
                                  <input className="edp-edit-form-control" type="email" name='email' value="editform@gmail.com" />
                                </div>
                               
                                <div className='epn-edit-info-submain2'>
                                  <input className="edp-edit-form-control" type="string" name='phone' value="1234567890" />  
                                </div>
                                
                            </div>
        
                        </div>
        
                        <Link to={'/educator/profile'} className='epn-cancel-button'>Cancel</Link> 
                        <button className='epn-submit-button'>Submit</button>
        
                    </div>  
        
                </div>
        
            </div>

        </div>
    )
}

export default EduProfile
