import React from 'react';
import delete_img from "../../../../assets/images/Deleteimg.png";
export default function ModeDelete() {
  return (
    <div className="model_delete text-center">
        <div className="img">
            <img src={delete_img} alt="" width={"150px"}/>
        </div>
        <div className="text">
            <h2>Delete this project</h2>
            <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>
    </div>
  )
}
