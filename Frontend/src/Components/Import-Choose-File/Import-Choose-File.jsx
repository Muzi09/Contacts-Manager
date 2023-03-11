import React, { useState } from 'react'
import '../Import-Choose-File/Import-Choose-File.css'
import ImportComplete from '../Import-Complete/Import-Complete'
import { AiOutlineFileAdd } from 'react-icons/ai'
import axios from 'axios'

const Import_Choose_File = ({ onCancel, onOk }) => {
    const [file, setFile] = useState(null)
    const [contactsInserted, setContactsInserted] = useState(false)
    const token = localStorage.getItem('token')

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0]
        setFile(selectedFile)

        const formData = new FormData()
        formData.append('csv', selectedFile)

        await axios.post('http://localhost:3001/contacts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}` 
            }
        })
            .then((res) => {
                console.log(res.data.message)
                setContactsInserted(true)
            })
            .catch((err) => { console.log(err.message) })
    }

    const handleOk = () => {
        setContactsInserted(false)
        setFile(null)
        onOk()
    }

    return (
        <div className="import-panel">
            <div className="import-blur-display">
                <div className="content">
                    <div className="icon"><AiOutlineFileAdd></AiOutlineFileAdd></div>
                    <h4 className="import-title">Import File</h4>
                    <div className="input">
                    <label htmlFor='choose-file' className="line">Drag & Drop a CSV File to Upload</label>
                        <button className="cancel" onClick={onCancel}>Cancel</button>
                        <input type="file" id='choose-file' onChange={handleFileChange} />
                    </div>
                    {(contactsInserted == true) ? <ImportComplete onOk={handleOk} /> : <div></div>}
                    
                </div>
            </div>
        </div>

    )
}

export default Import_Choose_File