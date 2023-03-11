import { AiOutlineDelete } from 'react-icons/ai';
import { CiExport } from 'react-icons/ci';
import { BsFilter } from 'react-icons/bs';
import { MdImportExport } from 'react-icons/md';
import Navbar from '../navbar/navbar';
import SideNavBar from '../SideNavBar/SideNavBar';
import './Contacts-Page.css';
import ImportChooseFile from '../Import-Choose-File/Import-Choose-File';
import DeletedScreen from "../Deleted-Screen/Deleted-Screen"
import { useEffect, useState } from "react"
import axios from 'axios'
import { TiPencil } from 'react-icons/ti'
import { RiDeleteBin6Line } from 'react-icons/ri'
import DeleteConfirmScreen from '../Delete-Confirm-Screen/Delete-Confirm-Screen';



const Contacts_page = () => {
  const [showImport, setShowImport] = useState(false);
  const [date, setDate] = useState('Select Date');
  const [contacts, setContacts] = useState({});
  const [checkedRows, setCheckedRows] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false)
  const [showDeleted, setShowDeleted] = useState(false)

  const token = localStorage.getItem('token');


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setContacts(response.data.data)
      console.log(response.data.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [contacts])


  const handleImport = () => {
    setShowImport(true);
  }

  const handleCancelImport = () => {
    setShowImport(false);
  }

  const handleOk = () => {
    setShowImport(false)
    setShowDeleted(false)
    setShowConfirm(false)
  }

  


  const handleCheckboxChange = (e, key) => {
    const checked = e.target.checked;
    if (checked) {
      setCheckedRows((prev) => [...prev, key]);
    } else {
      setCheckedRows((prev) => prev.filter((item) => item !== key));
    }
  }



  const handleDelete = async () => {

    
  if (checkedRows) {
    var fields = checkedRows.map((key) => {
      const contact = contacts[key];
      if (!contact) return null;
      return {
        name: contact.Name,
        designation: contact.Designation,
        company: contact.Company,
        industry: contact.Industry,
        email: contact.Email,
        phone: contact.Phone,
        country: contact.Country,
      }
    }).filter(Boolean)
  }

  let emails = [];

  if (fields) {
    fields.map((item) => {
      emails.push(item.email);
    })
  }



    try {
      const response = await axios.delete('http://localhost:3001/contacts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          emails: emails,
        },
      })
      console.log(response.data.data)
      fetchData()
      setShowDeleted(true)
      
    }
    catch (error) {
      console.error(error)
    }
  }



  return (
    <>
      <SideNavBar />
      <Navbar />
      <div className="contactTable">
        <div className="buttons">
          <div className="bttons-left">

            <button className="date"><label htmlFor="date">{date}</label><input type="date" onChange={(e) => {
              if (e.target.value) {
                setDate(e.target.value)
              } else {
                setDate("Select Date")
              }
            }} /></button>

            <button className="filter">
              <BsFilter /> Filter |
            </button>
          </div>
          <div className="bttons-right">
            <button className="delete" onClick={() => {setShowConfirm(true)}}>
              <AiOutlineDelete />Delete
            </button>
            <button className="import" onClick={handleImport}>
              <MdImportExport />Import
            </button>
            <button className="export">
              <CiExport />Export
            </button>
          </div>
        </div>

        <div className="table">
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <input type="checkbox" /> Name
                </th>
                <th scope="col">Designation</th>
                <th scope="col">Company</th>
                <th scope="col">Industry</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No.</th>
                <th scope="col">Country</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {Object.keys(contacts).length > 0 && (
              <tbody>
                {Object.keys(contacts).map((key) => (
                  <tr key={key}>
                    <td>
                      <input type="checkbox" onChange={(e) => handleCheckboxChange(e, key)} />{contacts[key].Name}
                    </td>
                    <td>{contacts[key].Designation}</td>
                    <td>{contacts[key].Company}</td>
                    <td>{contacts[key].Industry}</td>
                    <td>{contacts[key].Email}</td>
                    <td>{contacts[key].Phone}</td>
                    <td>{contacts[key].Country}</td>
                    <td>
                      <div className="actionbtn">
                        <div className="pen"><TiPencil></TiPencil></div>
                        <div className="del"><RiDeleteBin6Line></RiDeleteBin6Line></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}

          </table>
        </div>
        {showImport && (
          <ImportChooseFile className="import-ui" onCancel={handleCancelImport} onOk={handleOk} />
        )}
      </div>
      <div>
        {showConfirm && (
          <DeleteConfirmScreen
            onCancel={() => setShowConfirm(false)}
            onConfirm={() => {
              handleDelete()
            }}
          />
        )}
      </div>
      <div>
        {showDeleted && (
          <div>
            <DeletedScreen onOk={handleOk}/>
          </div>
        )}
      </div>
    </>
  )
}

export default Contacts_page;


