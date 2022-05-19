import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AboutmeDetails = () => {

    const {id} = useParams();
    const [data , setData] = useState({});
    const [loading , setLoading] = useState(false);

    useEffect( () => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/aboutme/${id}`)
        .then( res => {
            setData(res.data.data)
            setLoading(false)
        })
    } ,[])


    return (
        <>
            <div className="container my-3">
                <div style={ {minHeight : '100vh'} } className="row align-items-center justify-content-center">
                    {
                        loading ? (
                            <div className="spinner-border text-warning" role="status">
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div className="col-12">
                                {/* tilte and subtitle feild  */}
                                <div className="row my-3">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="title" className="form-label"> Title *</label>
                                            <input type="text" disabled value={data.title} className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="subtitle" className="form-label">Fb link *</label>
                                            <input type="text" disabled value={data?.fb_link} className="form-control" id="subtitle" aria-describedby="subtitleHelp" placeholder="Enter title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="subtitle" className="form-label">Instagram link *</label>
                                            <input type="text" disabled value={data?.instagram_link} className="form-control" id="subtitle" aria-describedby="subtitleHelp" placeholder="Enter title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="subtitle" className="form-label">Twitter link *</label>
                                            <input type="text" disabled value={data?.twitter_link} className="form-control" id="subtitle" aria-describedby="subtitleHelp" placeholder="Enter title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="subtitle" className="form-label">Youtube link *</label>
                                            <input type="text" disabled value={data?.youtube_link} className="form-control" id="subtitle" aria-describedby="subtitleHelp" placeholder="Enter title" />
                                        </div>
                                    </div>
                                </div>
                                {/* description feild  */}
                                <div className="row justify-content-center my-3">
                                    <div className="col-mb-6">
                                        <div><img src={`http://localhost:5000/uploads/aboutmeimg/${data.image}`} alt="" width="400px" height="auto"  /></div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label htmlFor="description" className="form-label"> Description </label>
                                            <textarea disabled value={data?.desc} aria-describedby="descriptionHelp" className="form-control" id="description" rows="4"></textarea>
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

export default AboutmeDetails;