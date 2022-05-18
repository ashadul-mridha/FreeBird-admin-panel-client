import React , {useState,useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useParams , useNavigate  } from 'react-router-dom';

const CategoryEdit = () => {

    const navigate = useNavigate();
    const imgRef = useRef(null);
    const [currentValue , setCurrentValue] = useState({});
    const initialValues = { name: "", title: "", subTitle: " ", desc: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [ image , setImage ] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect( () => {
        axios.get(`http://localhost:5000/api/category/${id}`)
        .then( res => {
            setFormValues({ ...formValues, name: res.data.data.name, title: res.data.data.title, subTitle: res.data.data.subTitle, desc: res.data.data.desc});
            setCurrentValue(res.data.data);
        })
    } ,[])

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
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {

            console.log(formValues);
            
            const formData = new FormData();
            formData.append('name', formValues.name);
            formData.append('title', formValues.title);
            formData.append('subTitle', formValues.subTitle);
            formData.append('desc', formValues.desc);
            formData.append('image', image);

            const url = `http://localhost:5000/api/category/${id}`;

            setLoading(true);
            axios({
                method: "put",
                url,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then( res => {
                if(res.data.status){
                    setLoading(false);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data Update SuccessFully!',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    navigate(`/category/all`);
                    setImage(null)
                }
            })
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Name is required!";
        }
        if (!values.title) {
            errors.title = "Title is required!";
        }
        if (!values.subTitle) {
            errors.subTitle = "Sub Title is required!";
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
                                <div className="col-md-12 mb-2">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Enter Category Name *</label>
                                        <input type="text" value={formValues.name} name="name" onChange={handleChange} className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter Category name" />
                                        {
                                            formErrors.name && (
                                                <small id="nameHelp" className="form-text text-danger">{formErrors.name}</small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
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
                                        <label htmlFor="subtitle" className="form-label">Enter Subtitle *</label>
                                        <input type="text" value={formValues.subTitle} name="subTitle" onChange={handleChange} className="form-control" id="subtitle" aria-describedby="subtitleHelp" placeholder="Enter title" />
                                        {
                                            formErrors.subTitle && (
                                                <small id="subtitleHelp" className="form-text text-danger">{formErrors.subTitle}</small>
                                            )
                                        }
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
                                <div className="col-md-4">
                                    <div>
                                        <h5>Existing Image</h5>
                                        <img src={`http://localhost:5000/uploads/categoryimg/${currentValue.image}`} alt="" className="img-fluid" />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="custom-file">
                                        <label className="form-label" htmlFor="customFile">Upload Background Image*</label>
                                        <input name="image" onChange={handleFormChange}  accept="image/*" ref={imgRef} aria-describedby="fileUploadHelp" type="file" className="custom-file-input form-control" id="customFile" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-primary">{loading ? 'Loading...' : 'Update Data'}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryEdit;