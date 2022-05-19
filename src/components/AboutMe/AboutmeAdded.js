import React , {useState,useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AboutmeAdded = () => {

    const initialValues = { title: "", fb_link: "", instagram_link: "", youtube_link: "", twitter_link: "", desc: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [ image , setImage ] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [imgErrors, setImgErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const imgRef = useRef(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setImgErrors(validateImg(image))
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors,imgErrors);
        if (Object.keys(formErrors).length === 0 && Object.keys(imgErrors).length === 0 && isSubmit) {
            
            const formData = new FormData();
            formData.append('title', formValues.title);
            formData.append('desc', formValues.desc);
            formData.append('fb_link', formValues.fb_link);
            formData.append('instagram_link', formValues.instagram_link);
            formData.append('youtube_link', formValues.youtube_link);
            formData.append('twitter_link', formValues.twitter_link);
            formData.append('image', image);

            const url = 'http://localhost:5000/api/aboutme/add';

            setLoading(true)
            axios({
                method: "post",
                url,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then( res => {
                if(res.data.status){

                    setLoading(false)
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data Added SuccessFully!',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    setFormValues({ title: "", fb_link: "", instagram_link: "", youtube_link: "", twitter_link: "", desc: "" })
                    setImage(null)
                    imgRef.current.value = null;
                }
            })
        }
    }, [formErrors,imgErrors]);

    const validate = (values) => {
        const errors = {};

        if (!values.title) {
            errors.title = "Title is required!";
        }
        
        return errors;
    };

    const validateImg = (values) => {
        const errors = {};

        if (!values) {
            errors.img = "Image is required!";
        }
        
        return errors;
    };

    return (
        <>
            <div className="container my-3">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={handleSubmit}  method="post" encType='multipart/form-data'>
                            {/* tilte and subtitle feild  */}
                            <div className="row my-3">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="title" className="form-label">Enter Title *</label>
                                        <input type="text" value={formValues.title} name="title" onChange={handleChange} className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" />
                                        {
                                            formErrors.title && (
                                                <small id="titleHelp" className="form-text text-danger">{formErrors.title}</small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="fb_link" className="form-label">Enter Facebook Link *</label>
                                        <input type="text" value={formValues.fb_link} name="fb_link" onChange={handleChange} className="form-control" id="fb_link" aria-describedby="fb_linkHelp" placeholder="Enter Facebook link" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="instagram_link" className="form-label">Enter Instagram Link *</label>
                                        <input type="text" value={formValues.instagram_link} name="instagram_link" onChange={handleChange} className="form-control" id="instagram_link" aria-describedby="instagram_linkHelp" placeholder="Enter Instagram link" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="twitter_link" className="form-label">Enter Twitter Link *</label>
                                        <input type="text" value={formValues.twitter_link} name="twitter_link" onChange={handleChange} className="form-control" id="twitter_link" aria-describedby="twitter_linkHelp" placeholder="Enter Twitter link" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="youtube_link" className="form-label">Enter Youtube Link *</label>
                                        <input type="text" value={formValues.youtube_link} name="youtube_link" onChange={handleChange} className="form-control" id="youtube_link" aria-describedby="youtube_linkHelp" placeholder="Enter Youtube link" />
                                    </div>
                                </div>
                            </div>
                            {/* description feild  */}
                            <div className="row my-3">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label htmlFor="description" className="form-label"> Enter Description </label>
                                        <textarea value={formValues.desc} name="desc" onChange={handleChange} aria-describedby="descriptionHelp" className="form-control" id="description" rows="4"></textarea>
                                        
                                    </div>
                                </div>
                            </div>
                            {/* file upload  */}                            
                            <div className="row my-3">
                                <div className="col-md-12">
                                    <div className="custom-file">
                                        <label className="form-label" htmlFor="customFile">Upload Image*</label>
                                        <input name="image" onChange={handleFormChange}  accept="image/*" ref={imgRef} aria-describedby="fileUploadHelp" type="file" className="custom-file-input form-control" id="customFile" />
                                        {
                                            imgErrors.img && (
                                                <small id="fileUploadHelp" className="form-text text-danger">{imgErrors.img}</small>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-primary">{loading ? 'Loading...' : 'Add Data'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutmeAdded;