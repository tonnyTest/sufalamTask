import React, { useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const EditModel = (props) => {
    let data = props?.productData

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [modal, setModal] = React.useState(false);

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);

        // const productData = { name, image, price };
        const id = data?._id
        axios.put(`http://localhost:8000/updateProduct/${id}`, formData)
            .then((response) => {
                if (response) {
                    toast.success("Successfully Update")
                    setModal(false)
                    setTimeout(() => {
                        window.location.reload()
                    }, 100);
                } else {
                    toast.error("error")
                }
            })
            .catch(err => {
                toast.error(err)
            });
    }

    return (
        <div>
            {/* <ToastContainer /> */}
            <Row form>
                <Col className="col-12">
                    <div className="mb-3">
                        <label className="form-label">Product Name :</label>
                        <input
                            name="name"
                            type="text"
                            onChange={(e) => setName(e.currentTarget.value)}
                            value={data?.name || ""}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Price :</label>
                        <input
                            name="price"
                            type="text"
                            onChange={(e) => setPrice(e.currentTarget.value)}
                            value={data?.price || ""}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image :</label>
                        <input
                            type="file"
                            accept="image/*"
                            // onChange={handleImageUpload}
                            onChange={(e) => setImage(e.target.files[0])}
                            ref={imageUploader}
                        />
                        <div
                            style={{
                                marginTop: "20px",
                                height: "122px",
                                width: "200px",
                                border: "1px solid black",
                            }}
                            onClick={() => imageUploader.current.click()}
                        >
                            <img
                                src={data?.image || ""}
                                // ref={uploadedImage}
                                style={{
                                    height: "122px",
                                    width: "200px",
                                    position: "acsolute",
                                }}
                            />
                        </div>
                    </div>

                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-end">
                    <div className="text-end " style={{ marginLeft: "10px" }}>
                        <button
                            type="submit"
                            className="btn btn-success save-user"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
