import React, { useState } from 'react'
import {RiDeleteBinLine} from 'react-icons/ri'
import DeleteConfirmScreen from '../Delete-Confirm-Screen/Delete-Confirm-Screen'
import './Deleted-Screen.css'

const DeleteScreen = ( {onOk} ) => {
  return (
    <>
    <div className="delete-panel">
        <div className="delete-blur-display">
            <div className="content">
                <div className="icon"><RiDeleteBinLine></RiDeleteBinLine> </div>
                <h4 className="Delete-title">Contacts Deleted Successfully</h4>
                <div className="buttons">
                    <button onClick={() => {
                      onOk()
                      }}>Ok</button>
                </div>
            </div>
        </div>
    </div>
  </>
  )
}

export default DeleteScreen