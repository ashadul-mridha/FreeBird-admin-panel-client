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
                <div className="row">
                  {
                    data.map( (image , index) => (
                      <div className="col-md-4 col-sm-2">
                        <div className="card" style={{ width : '18rem' , height: '500px'}}>
                          <img src={`http://localhost:5000/uploads/singleimg/${image.image}`} className="card-img-top" alt="..." style={{height: '300px' , width: 'auto'}} />
                          <div className="card-body">
                            <h5 className="card-title text-center">Caption: {image.caption}</h5>
                            <p className="card-text text-center">Album Name: {image.album_id?.name}</p>
                            <p className="card-text text-center">Category Name: {image.cat_id?.name}</p>
                            <div className='d-flex justify-content-center'>

                              <button onClick={ () => navigate(`/images/details/${image._id}`)} className="btn btn-sm btn-warning" title='Details View'><i className="fa-solid fa-eye fa-lg"></i></button>

                              <button title='updated' onClick={ () => navigate(`/images/edit/${image._id}`)} className="btn btn-sm btn-primary mx-3"><i className="fa-solid fa-file-pen fa-lg"></i></button>

                              <button title='delete' onClick={ () => isDelete(image._id)} className="btn btn-sm btn-primary"> <i className="fa-solid fa-trash-can fa-lg"></i></button>

                          </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }

                </div>

                <div className="d-flex justify-content-center my-3">
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