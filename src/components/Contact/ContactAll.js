import React , { useState , useEffect } from 'react';
import styles from './style.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function ContactAll() {

  const [data , setData] = useState([]);
  const [loading , setLoading] = useState(false);
  const [effectDependancy , setEffectDependancy] = useState(false);
  let navigate = useNavigate();
  
  useEffect( () => {
      setLoading(true);
      axios.get('http://localhost:5000/api/contactus/all')
      .then( res => {
        setData(res.data.data)
        setLoading(false);
      })
  } ,[effectDependancy])

  const isDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        
        if (result.isConfirmed) {

          axios.delete(`http://localhost:5000/api/contactus/${id}`)
          .then( res => {
            if(res.data.status){
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
              setEffectDependancy(!effectDependancy)
            } else {
              Swal.fire(
                `${res.data.message}`,
                'Your file has been not deleted.',
                'error'
              )
            }
          })
          
        }
      })
  }
  
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {
            loading ? (
              <div class="spinner-border text-warning" role="status">
                  <span>Loading...</span>
              </div>
            ) : (
              <div className="col">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map( (contact , index) => (
                        <tr key={contact._id}>
                          <td>{index+1}</td>
                          <td>{contact.name}</td>
                          <td>{contact.email}</td>
                          <td>{contact.subject}</td>
                          <td>{contact.message.slice(0, 10)}</td>
                          <td>

                              <i title='Details View' onClick={ () => navigate(`/contact/details/${contact._id}`)} className="fa-solid fa-eye text-success fa-lg me-3"></i>
                                                        
                              <i title='delete' onClick={ () => isDelete(contact._id)} className="fa-solid fa-trash-can text-danger fa-lg"></i>

                          </td>
                      </tr>
                      ) )
                    }
                    
                  </tbody>
                </table>
              </div>
            )
          }
          
        </div>
      </div>
    </>
  )
}

export default ContactAll