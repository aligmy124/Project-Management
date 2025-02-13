import React from 'react'
import logo from "../../../../assets/images/Deleteimg.png"
export default function NoData() {
  return (
    <div className='text-center mt-5'>
    <img src={logo} alt="Nodata" width={"150px"}/>
    <h5 className='pt-2'>No Data</h5>
    <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
</div>
  )
}
