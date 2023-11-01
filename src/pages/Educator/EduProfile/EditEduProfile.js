import React from 'react';
import './EditEduProfile.css';

function EditEduProfile() {
  return (
    <div className="ep-main-container">
      <h1 className="ep-heading">Edit Profile</h1>
      
      <div className="ep-sub-main">
        <div className="ep-photo-edit">
          {/* <div className="text-center"> */}
            <img
              src="https://img.freepik.com/premium-vector/man-character_665280-46970.jpg"
              className="avatar img-circle img-thumbnail"
              alt="avatar"
            />
            <h6>Upload a different photo...</h6>
            <input type="file" className="ep-form-control" />
          {/* </div> */}
        </div>

        <div className="ep-personal-info">
          
          <h3>Personal info</h3>
          <form >
            <div className="ep-form-group">
              <label >Your Name :</label>
              <div className="">
                <input className="ep-form-control" type="text" value="Sahil" />
              </div>
            </div>
            <div className="ep-form-group">
              <label >Country :</label>
              <div className="">
                <input className="ep-form-control" type="text" value="India" />
              </div>
            </div>
            <div className="ep-form-group">
              <label >Age :</label>
              <div className="">
                <input className="ep-form-control" type="text" value="20" />
              </div>
            </div>
            <div className="ep-form-group">
              <label >Degree :</label>
              <div className="">
                <input className="ep-form-control" type="text" value="" />
              </div>
            </div>
            <div className="ep-form-group">
              <label >Field :</label>
              <div className="">
                <input className="ep-form-control" type="text" value="" />
              </div>
            </div>
            <div className="ep-form-group">
              <label >Email :</label>
              <div className="">
                <input className="ep-form-control" type="text" value="editform@gmail.com" />
              </div>
            </div>
            <div className="ep-form-group">
              <label >Mobile number :</label>
              <div className="">
                <input className="ep-form-control" type="text" value="1234567891" />
              </div>
            </div>
            <div className="ep-form-group">
              <label >About Yourself :</label>
              <div className="ep-about">
                <textarea className="ep-form-control" name="bio" placeholder="Write a brief bio about yourself..." rows="4" cols="50"></textarea>
                <input className="ep-form-control" type="submit"value="Save" />
              </div>
            </div>
          </form>
            <button className='ep-submit-button'>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default EditEduProfile;
