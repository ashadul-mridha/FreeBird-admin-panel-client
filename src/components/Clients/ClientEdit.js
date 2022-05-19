import React , {useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams , useNavigate  } from 'react-router-dom';

const ClientEdit = () => {

    const navigate = useNavigate();
    const [currentValue , setCurrentValue] = useState({});
    const initialValues = { name: "", live_link: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [ image , setImage ] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect( () => {
        axios.get(`http://localhost:5000/api/client/${id}`)
        .then( res => {
            setFormValues({ ...formValues, name: res.data.data.name, live_link: res.data.data.live_link });
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
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {

            const formData = new FormData();
            formData.append('name', formValues.name);
            formData.append('live_link', formValues.live_link);
            formData.append('image', image);

            const url = `http://localhost:5000/api/client/${id}`;

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
                    navigate(`/clients/all`);
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
        if (!values.live_link) {
            errors.live_link = "Live Link Url is required!";
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
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Enter Name *</label>
                                        <input type="text" value={formValues.name} name="name" onChange={handleChange} className="form-control" id="name" aria-describedby="clientName" placeholder="Enter Your Client Name" />
                                        {
                                            formErrors.name && (
                                                <small id="clientName" className="form-text text-danger">{formErrors.name}</small>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="live_link" className="form-label">Enter Live Link Url *</label>
                                        <input type="text" value={formValues.live_link} name="live_link" onChange={handleChange} className="form-control" id="live_link" placeholder="Enter Live Link URL" />
                                        {
                                            formErrors.live_link && (
                                                <small className="form-text text-danger">{formErrors.live_link}</small>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            {/* file upload  */}                            
                            <div className="row my-3">
                                <div className="col-md-4">
                                    <div>
                                        <h5>Existing Image</h5>
                                        <img src={`http://localhost:5000/uploads/clientimg/${currentValue.image}`} alt="" height="auto" width="250px" />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="custom-file">
                                        <label className="form-label" htmlFor="customFile">Upload Image*</label>
                                        <input name="image" onChange={handleFormChange}  accept="image/*" aria-describedby="fileUploadHelp" type="file" className="custom-file-input form-control" id="customFile" />
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

export default ClientEdit;