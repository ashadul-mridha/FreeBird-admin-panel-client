import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ImageDetails = () => {

    const {id} = useParams();
    const [data , setData] = useState({});
    const [loading , setLoading] = useState(false);

    useEffect( () => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/image/${id}`)
        .then( res => {
            setData(res.data.data)
            console.log(res.data.data)
            setLoading(false)
        })
    } ,[])


    return (
        <>
            <div className="container my-3">
                <div style={ {minHeight : '100vh'} } className="row justify-content-center">
                    {
                        loading ? (
                            <div className="spinner-border text-warning" role="status">
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div className="col-12">
                                {/* tilte and subtitle feild  */}
                                <div className="row gy-2 my-3">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="form-label"> Caption *</label>
                                            <input type="text" disabled value={data?.caption} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label"> Category Name *</label>
                                            <input type="text" disabled value={data.cat_id?.name} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label"> Album Name *</label>
                                            <input type="text" disabled value={data.album_id?.name} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                {/* description feild  */}
                                <div className="row justify-content-center my-3">
                                    <div className="col-mb-12">
                                        <div><img src={`http://localhost:5000/uploads/singleimg/${data?.image}`} alt="" width="400px" height="auto"  /></div>
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

export default ImageDetails;