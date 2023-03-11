import React from 'react'
import { FaCheck } from 'react-icons/fa'
import './Delete-Confirm-Screen.css'
import { useState } from 'react'
import DeleteScreen from '../Deleted-Screen/Deleted-Screen'


const DeleteConfirmScreen = ({ onCancel, onConfirm }) => {
    

    return (
        <>
            
                <div className="delete-panel">
                    <div className="delete-blur-display">
                        <div className="content">
                            <div className="icon"><FaCheck></FaCheck> </div>
                            <h4 className="Delete-title" >Delete Contacts ?</h4>
                            <button className="cancel" onClick={() => { onCancel() }}>Cancel</button>
                            <button className="ok" onClick={() => { onConfirm() }}>Ok</button>
                        </div>
                    </div>
                </div>
           
        </>
    )
}

export default DeleteConfirmScreen