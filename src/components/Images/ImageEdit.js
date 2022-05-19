import React , {useState,useEffect, useRef } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate  } from 'react-router-dom';

const ImageEdit = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [allCategory , setAllCategory] = useState(null);
    const [allAlbum , setAllAlbum] = useState(null);
    const [currentValue , setCurrentValue] = useState({});
    const initialValues = { caption: "", cat_id: "", album_id: ""  };
    const [formValues, setFormValues] = useState(initialValues);
    const [ image , setImage ] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [imageError, setImageError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateDataLoading, setUpdateDataLoading] = useState(false);
    const imgRef = useRef(null)

    useEffect( () => {
        setLoading(true);
        axios.get('http://localhost:5000/api/category/all')
        .then( res => {
            setAllCategory(res.data);
            setLoading(false);
        })
    } ,[])
    
    useEffect( () => {
        setLoading(true);
        axios.get('http://localhost:5000/api/album/all')
        .then( res => {
            setAllAlbum(res.data);
            setLoading(false);
        })
    } ,[])

    
    useEffect( () => {
        setLoading(true)
        axios.get(`http://localhost:5000/api/image/${id}`)
        .then( res => {
            setFormValues({ ...formValues, caption: res.data.data.caption, cat_id: res.data.data.cat_id._id, album_id: res.data.data.album_id._id });
            console.log(res.data.data.cat_id);
            setCurrentValue(res.data.data);
            setLoading(false)
        })
    } ,[])

    console.log(formValues);

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
            console.log(formValues,image);
            const formData = new FormData();
            formData.append('caption', formValues.caption);
            formData.append('cat_id', formValues.cat_id);
            formData.append('album_id', formValues.album_id);
            formData.append('image', image);

            const url = `http://localhost:5000/api/image/${id}`;

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
                    navigate(`/images/all`);
                }
            })
        }
    }, [formErrors,imageError]);

    const validate = (values) => {
        const errors = {};
        
        if (!values.caption) {
            errors.caption = "Caption is required!";
        }
        if (!values.cat_id) {
            errors.cat_id = "Category is required!";
        }
        if (!values.album_id) {
            errors.album_id = "Album is required!";
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
                                        <div className="col-md-12 mb-2">
                                            <div className="form-group">
                                                <label htmlFor="caption" className="form-label">Enter Image Caption *</label>
                                                <input type="text" value={formValues.caption} name="caption" onChange={handleChange} className="form-control" id="caption" placeholder="Enter Image Caption" />
                                                {
                                                    formErrors.caption && (
                                                        <small className="form-text text-danger">{formErrors.caption}</small>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label htmlFor="" className="form-label">Select Category *</label>
                                                <select name='cat_id' onChange={handleChange} value={formValues.cat_id} className="form-select"  aria-label="Default select example">
                                                    {
                                                        allCategory?.data.map( (category) => (
                                                            <option key={category._id} value={category._id}>{category.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                {
                                                    formErrors.cat_id && (
                                                        <small id="nameHelp" className="form-text text-danger">{formErrors.cat_id}</small>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-2">
                                            <div className="form-group">
                                                <label htmlFor="" className="form-label">Select Album *</label>
                                                <select name='album_id' onChange={handleChange} value={formValues.album_id} className="form-select" aria-label="Default select example">
                                                    {
                                                        allAlbum?.data.map( (album) => (
                                                            <option key={album._id} value={album._id}>{album.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                {
                                                    formErrors.album_id && (
                                                        <small id="nameHelp" className="form-text text-danger">{formErrors.album_id}</small>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {/* file upload  */}                            
                                    <div className="row my-3">
                                        <div className="col-md-4">
                                            <div><img src={`http://localhost:5000/uploads/singleimg/${currentValue?.image}`} alt="" className="img-fluid" /></div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="custom-file">
                                                <label className="form-label" htmlFor="customFile">Upload Image*</label>
                                                <input name="image" onChange={handleFormChange}  accept="image/*" ref={imgRef} aria-describedby="fileUploadHelp" type="file" className="custom-file-input form-control" id="customFile" />
                                                {
                                                    imageError.image && (
                                                        <small id="nameHelp" className="form-text text-danger">{imageError.image}</small>
                                                    )
                                                }
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

export default ImageEdit;