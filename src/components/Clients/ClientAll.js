import React , { useState , useEffect } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function ClientAll() {

  const [data , setData] = useState([]);
  const [loading , setLoading] = useState(false);
  const [effectDependancy , setEffectDependancy] = useState(false);
  let navigate = useNavigate();
  
  useEffect( () => {
      setLoading(true);
      axios.get('http://localhost:5000/api/client/all')
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

          axios.delete(`http://localhost:5000/api/client/${id}`)
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
                      <th>Live Link</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map( (client , index) => (
                        <tr key={client._id}>
                          <td>{index+1}</td>
                          <td>{client?.name}</td>
                          <td>{client?.live_link}</td>
                          <td>
                            <img src={`http://localhost:5000/uploads/clientimg/${client.image}`} alt="" width="50px" height="auto" />
                          </td>
                          <td>{client.isActive}</td>
                          <td>

                              <i title='Details View' onClick={ () => navigate(`/clients/details/${client._id}`)} className="fa-solid fa-eye text-success fa-lg"></i>
                            
                              <i title='updated' onClick={ () => navigate(`/clients/edit/${client._id}`)} className="fa-solid fa-file-pen text-warning fa-lg mx-3"></i>
                            
                              <i title='delete' onClick={ () => isDelete(client._id)} className="fa-solid fa-trash-can text-danger fa-lg"></i>

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

export default ClientAll