import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PrescriptionUpload.css';

const PrescriptionUpload = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        email: '',
    });
    const [prescriptionImage, setPrescriptionImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPrescriptionImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!prescriptionImage) {
            toast.error('Please select a prescription image');
            return;
        }

        const submitData = new FormData();
        submitData.append('prescription_image', prescriptionImage);
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/prescription/upload/',
                submitData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            toast.success('Prescription uploaded successfully!');
            setTimeout(() => {
                navigate('/service');
            }, 2000);
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.response?.data?.error || 'Failed to upload prescription');
        }
    };

    return (
        <div className="prescription-upload-container">
            <ToastContainer />
            <h2>Upload Prescription</h2>

            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Prescription Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>

                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Prescription preview" />
                    </div>
                )}

                <button type="submit" className="upload-btn">
                    Upload Prescription
                </button>
            </form>
        </div>
    );
};

export default PrescriptionUpload; 