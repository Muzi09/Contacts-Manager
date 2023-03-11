import React from 'react'
import './navbar.css'
import sample from '../../assets/sample.png'
import Line from '../../assets/Line 1.png'

const Navbar = () => {
  return (
    <div>
        <div className="nav">
            <h1 className="totalcontact">Total Contacts</h1>
            <input type="text" className="search" placeholder={'Search by Email Id.....'}/>
            <img src={sample} alt="" className="userImage" />
            <div className="userinfo">
                <h4 className="name">Siya Ram</h4>
                <h6 className="userstatus">Super Admin</h6>
            </div>
        </div>
        <img src={Line} alt="" className='line'/>
    </div>
  )
}

export default Navbar