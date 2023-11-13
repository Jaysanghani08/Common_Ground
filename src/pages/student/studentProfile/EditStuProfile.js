import React from 'react'
import { useRef, useState, useEffect } from 'react';
import './EditStuProfile.css'
import { Link } from 'react-router-dom';
import Navbar from '../Dashboard/Sidebar/Sidebar'

const EditStuProfile = () => {

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
        <div className='spn-edit-profile'>
        
                <div className='spn-edit-upper'>
        
                    <div className='spn-edit-sub-upper'>
        
                        <div className='spn-edit-image-container1'>
                            <div className='spn-edit-img1'>
                                {image ? <img src={URL.createObjectURL(image)} alt=''/> 
                                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image'/>}
                                    {/* : <img src='https://img.freepik.com/premium-vector/man-character_665280-46970.jpg' alt='no image'/>} */}
                            </div>
                         </div> 
            
                         <div className='spn-edit-user'>
                            <div className='spn-edit-username1'>
                              <input className="sdp-edit-user-control" type="text" name='username' value="Edit_Profile" />
                            </div>
        
                         </div>
                                                
                     </div>
        
                </div>
        
                <div className='spn-edit-lover'>
        
                    <div className='spn-edit-basicinfo'>
        
                        <div className='spn-edit-basic-heading'>Basic Info</div>
        
                        <div className='spn-edit-Sub-basicinfo'>
        
                            <div className='spn-edit-info-main'>
                                    <div className='spn-edit-info-submain'>Name</div>
                                    <div className='spn-edit-info-submain'>Gender</div>
                                    <div className='spn-edit-info-submain'>Country</div>
                                    <div className='spn-edit-info-submain'>Dob</div>
                                    {/* <div className='spn-edit-info-submain'>Education Level</div> */}
                                    <div className='spn-edit-info-submain'>Email</div>                                
                                    <div className='spn-edit-info-submain'>Phone</div>      
                            </div>
        
                            <div className='spn-edit-personalinfo'>
        
                                <div className='spn-edit-info-submain2'>
                                  <input className="sdp-edit-form-control" type="text" name='fname' value="Sahil" />
                                </div>
        
                                <div className='spn-edit-info-submain2'>
                                  <input className="sdp-edit-form-control" type="text" name='gender' value="Male" />
                                </div>
                                    
                                <div className='spn-edit-info-submain2'>
                                  <input className="sdp-edit-form-control" type="text" name='country' value="India" />
                                </div>                            
        
                                <div className='spn-edit-info-submain2'>
                                  <input className="sdp-edit-form-control" type="date" name='dob' value="" />
                                </div>
                                
                                {/* <div className='spn-edit-info-submain2'>
                                  <input className="sdp-edit-form-control" type="text" name='educationLevel' value="" />
                                </div> */}
                                       
                                <div className='spn-edit-info-submain2'>
                                  <input className="sdp-edit-form-control" type="email" name='email' value="editform@gmail.com" />
                                </div>
                               
                                <div className='spn-edit-info-submain2'>
                                  <input className="sdp-edit-form-control" type="string" name='phone' value="1234567890" />  
                                </div>
                                
                            </div>
        
                        </div>
        
                        <Link to={'/student/profile'} className='spn-cancel-button'>Cancel</Link> 
                        <button className='spn-submit-button'>Submit</button>
        
                    </div>  
        
                </div>
        
            </div>

        </div>
    )
}

export default EditStuProfile
