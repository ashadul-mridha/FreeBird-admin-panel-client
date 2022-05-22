import React , { useState , useEffect } from 'react';
import styles from './default.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Pagination from '../Pagination/Pagination';

function ImagesAll() {

  const [data , setData] = useState([]);
  const [loading , setLoading] = useState(false);
  const [effectDependancy , setEffectDependancy] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [totalData, setTotalData] = useState(1);
  let navigate = useNavigate();
  
  useEffect( () => {
      setLoading(true)
      axios.get(`http://localhost:5000/api/image/all?page=${currentPage}&size=${dataPerPage}`)
      .then( res => {
        setData(res.data.data);
        setTotalData(res.data.totalData);
        setLoading(false);
      })
  } ,[effectDependancy,dataPerPage,currentPage])

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

          axios.delete(`http://localhost:5000/api/image/${id}`)
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

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          {
            loading ? (
              <div className="spinner-border text-warning" role="status">
                  <span>Loading...</span>
              </div>
            ) : (
              <div className="col">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Sl</th>
                      <th>Caption</th>
                      <th>Album Name</th>
                      <th>Category Name</th>
                      <th>Image</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map( (image , index) => (
                        <tr key={image._id}>
                          <td>{index+1}</td>
                          <td>{image.caption}</td>
                          <td>{image.album_id?.name}</td>
                          <td>{image.cat_id?.name}</td>
                          <td>
                            <img src={`http://localhost:5000/uploads/singleimg/${image.image}`} alt="" width="50px" height="auto" />
                          </td>
                          <td>{image.isActive}</td>
                          <td>

                              <i title='Details View' onClick={ () => navigate(`/images/details/${image._id}`)} className="fa-solid fa-eye text-success fa-lg"></i>
                            
                              <i title='updated' onClick={ () => navigate(`/images/edit/${image._id}`)} className="fa-solid fa-file-pen text-warning fa-lg mx-3"></i>
                            
                              <i title='delete' onClick={ () => isDelete(image._id)} className="fa-solid fa-trash-can text-danger fa-lg"></i>

                          </td>
                      </tr>
                      ) )
                    }
                    
                  </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <Pagination
                      dataPerPage={dataPerPage}
                      totalData={totalData}
                      paginate={paginate}
                      currentPage={currentPage}
                    />
                </div>
              </div>
            )
          }
          
        </div>
      </div>
    </>
  )
}

export default ImagesAll