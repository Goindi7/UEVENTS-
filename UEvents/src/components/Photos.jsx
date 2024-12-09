import React from 'react'
import imgp from "../assets/images/photosc.png"

function Photos() {
  return (
    <>
    <div className="outerphoto" id='mainphoto'>
        <div className="photosheading">
            <h1>Photos</h1>
        </div>
        <div className="photosimg">
            <img src={imgp} alt="" />
        </div>


    </div>
      
    </>
  )
}

export default Photos
