import React , {useState,useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate  } from 'react-router-dom';

const AlbumEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [allCategory , setAllCategory] = useState(null);
    const [currentValue , setCurrentValue] = useState({});
    const initialValues = { name: "", title: "", subTitle: "", desc: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [ image , setImage ] = useState([]);
    const [ selectCat , setSelectCat ] = useState();
    const [formErrors, setFormErrors] = useState({});
    const [selectError, setSelectError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateDataLoading, setUpdateDataLoading] = useState(false);
    const imgRef = useRef(null)

    useEffect( () => {
        axios.get('http://localhost:5000/api/category/all')
        .then( res => {
            setAllCategory(res.data)
        })
    } ,[])

    
    useEffect( () => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/album/${id}`)
        .then( res => {
            setFormValues({ ...formValues, name: res.data.data.name, title: res.data.data.title, subTitle: res.data.data.subTitle, desc: res.data.data.desc});
            setSelectCat(res.data.data.cat_id)
            console.log(res.data.data.cat_id);
            setCurrentValue(res.data.data);
            setLoading(false)
        })
    } ,[])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormChange = (e) => {
        setImage(e.target.files[0]);
    }
    
    const handleSelectChange = (e) => {
        setSelectCat(e.target.value);
        console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setSelectError(validateSelect(selectCat))
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors,selectError);
        if (Object.keys(formErrors).length === 0 && Object.keys(selectError).length === 0 && isSubmit) {
            
            const formData = new FormData();
            formData.append('name', formValues.name);
            formData.append('cat_id', selectCat);
            formData.append('title', formValues.title);
            formData.append('subTitle', formValues.subTitle);
            formData.append('desc', formValues.desc);
            formData.append('image', image);

            const url = `http://localhost:5000/api/album/${id}`;

            setUpdateDataLoading(true)
            axios({
                method: "put",
                url,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then( res => {
                if(res.data.status){

                    setUpdateDataLoading(false)
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data Update SuccessFully!',
                        showConfirmButton: false,
                        timer: 2500
                    })
                    navigate(`/album/all`);
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

    const validateSelect = (values) => {
        const errors = {};
        
        if (!values) {
            errors.cat_id = "Category is required!";
        }
        
        return errors;
    };

    return (
        <>
            <div className="container my-3">
                <div className="row">
                    {
                        loading ? (
                            <div className="spinner-border text-warning" role="status">
                                <span>Loading...</span>
                            </div>
                        ) : (
                            <div className="col-12">
                                <form onSubmit={handleSubmit}  method="post" encType='multipart/form-data'>
                                    {/* tilte and subtitle feild  */}
                                    <div className="row my-3">
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label htmlFor="name" className="form-label">Enter Album Name *</label>
                                                <input type="text" value={formValues.name} name="name" onChange={handleChange} className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter Album name" />
                                                {
                                                    formErrors.name && (
                                                        <small id="nameHelp" className="form-text text-danger">{formErrors.name}</small>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label htmlFor="" className="form-label">Select Category *</label>
                                                <select onChange={handleSelectChange} value={selectCat} className="form-select" aria-label="Default select example">
                                                    {
                                                        allCategory?.data.map( (category) => (
                                                            <option key={category._id} value={category._id}>{category.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                {
                                                    selectError.cat_id && (
                                                        <small id="nameHelp" className="form-text text-danger">{selectError.cat_id}</small>
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
                                        <div className="col-md-6">
                                            <div><img src={`http://localhost:5000/uploads/albumimg/${currentValue?.image}`} alt="" className="img-fluid" /></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="custom-file">
                                                <label className="form-label" htmlFor="customFile">Upload Background Image*</label>
                                                <input name="image" onChange={handleFormChange}  accept="image/*" ref={imgRef} aria-describedby="fileUploadHelp" type="file" className="custom-file-input form-control" id="customFile" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button className="btn btn-primary">{updateDataLoading ? 'Loading...' : 'Update Data'}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </>
    );
};

export default AlbumEdit;