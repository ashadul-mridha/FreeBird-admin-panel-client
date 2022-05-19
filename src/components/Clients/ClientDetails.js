import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ClientDetails = () => {

    const {id} = useParams();
    const [data , setData] = useState({});
    const [loading , setLoading] = useState(false);

    useEffect( () => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/client/${id}`)
        .then( res => {
            setData(res.data.data)
            setLoading(false)
        })
    } ,[])


    return (
        <>
            <div className="container my-3">
                <div style={ {minHeight : '100vh'} } className="row justify-content-center">
                    {
                        loading ? (
                            <div class="spinner-border text-warning" role="status">
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div className="col-12">
                                {/* tilte and subtitle feild  */}
                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="title" className="form-label"> Name *</label>
                                            <input type="text" disabled value={data?.name} className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="subtitle" className="form-label"> Live Link *</label>
                                            <input type="text" disabled value={data?.live_link} className="form-control" id="subtitle" aria-describedby="subtitleHelp" placeholder="Enter title" />
                                        </div>
                                    </div>
                                </div>
                                {/* description feild  */}
                                <div className="row justify-content-center mt-5">
                                    <div className="col-mb-12">
                                        <div className='d-flex align-items-center flex-column justify-content-center'>
                                            <h5 className='my-3'>Image</h5>
                                            <img src={`http://localhost:5000/uploads/clientimg/${data?.image}`} alt="" width="300px" height="auto"  />
                                        </div>
                                    </div>
                                </div>                       
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default ClientDetails;