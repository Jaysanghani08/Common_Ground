import React from 'react';
import './EditEduProfile.css';

function EditEduProfile() {

  return (

      <div className="edp-main-container">
         <h1 className="edp-heading">Edit Profile</h1>
         <hr/>

            <form >
              <div className="edp-sub-main">

                  <div className='edp-first-form'>

                    <h3>Personal info : </h3>

                    <div className="edp-form-group">
                            <label htmlFor='username'>Username :</label>
                            <div className="">
                              <input className="edp-form-control" type="text" name='username' value="Edit_Profile" />
                            </div>
                          </div>

                    <div className="edp-personal-info">

                        <div className='edp-first-col'>

                          <div className="edp-form-group">
                            <label htmlFor='fname'>First Name :</label>
                            <div className="">
                              <input className="edp-form-control" type="text" name='fname' value="Sahil" />
                            </div>
                          </div>

                          <div className="edp-form-group">
                            <label htmlFor='gender'>Gender :</label>
                            <div className="">
                              <input className="edp-form-control" type="text" name='gender' value="Male" />
                            </div>
                          </div>

                          <div className="edp-form-group">
                            <label htmlFor='country'>Country :</label>
                            <div className="">
                              <input className="edp-form-control" type="text" name='country' value="India" />
                            </div>
                          </div>

                          <div className="edp-form-group">
                            <label htmlFor='educationLevel'>Education Level :</label>
                            <div className="">
                              <input className="edp-form-control" type="text" name='educationLevel' value="" />
                            </div>
                          </div>

                        </div>

                        <div className='edp-second-col'>

                          <div className="edp-form-group">
                            <label htmlFor='lname'>Last Name :</label>
                            <div className="">
                              <input className="edp-form-control" type="text" name='lname' value="Machhar" />
                            </div>
                          </div>

                          <div className="edp-form-group">
                            <label htmlFor='dob'>DOB :</label>
                            <div className="">
                              <input className="edp-form-control" type="date" name='dob' value="" />
                            </div>
                          </div>

                          <div className="edp-form-group">
                            <label htmlFor='email'>Email :</label>
                            <div className="">
                              <input className="edp-form-control" type="email" name='email' value="editform@gmail.com" />
                            </div>
                          </div>

                          <div className="edp-form-group">
                            <label htmlFor='phone'>Mobile number :</label>
                            <div className="">
                              <input className="edp-form-control" type="string" name='phone' value="1234567891" />
                            </div>
                          </div>

                        </div>

                      </div>

                  </div>

                  <div className='edp-sec-form'>

                    <div className="edp-photo-edit">
                    
                      <img
                        src="https://img.freepik.com/premium-vector/man-character_665280-46970.jpg"
                        className="edp-avatar"
                        alt="avatar"
                      />
                      <h6>Upload a different photo...</h6>
                      <input type="file" className="edp-form-control" />

                      <div className="edp-form-group">
                        <label htmlFor='bio'>About Yourself :</label>
                        <div className="edp-about">
                          <textarea className="edp-form-control" name="bio" placeholder="Write a brief bio about yourself..." rows="4" cols="50"></textarea>
                          <input className="edp-form-control" type="submit"value="Save" />
                        </div>
                      </div>

                    </div>

                  </div>
                  
              </div>

                  <button className='edp-submit-button'>Submit</button>

            </form>

      </div>

  );
}

export default EditEduProfile;
