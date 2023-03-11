import React from 'react'
import {FaCheck} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import './Import-Complete.css'

const ImportComplete = ({ onOk }) => {
    return (
        <div className='import-panel'>
            <div className="import-blur-display">
                <div className="content">
                    <div className="icon"><FaCheck></FaCheck></div>
                    <h4 className='import-title'>Import Complete</h4>
                    <h3 className="import-para">CSV File is Uploaded</h3>
                    <button className='ok' onClick={() => {
                        onOk()
                    }}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default ImportComplete

