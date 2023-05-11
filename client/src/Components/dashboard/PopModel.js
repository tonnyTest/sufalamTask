import React, {useState} from 'react'
import { Col,  Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const PopModel = () => {
    const navigate = useNavigate();
    // console.log("image",data)

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [modal, setModal] = React.useState(false);
  
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

  const formSubmit = async () => {

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);
    
        axios.post(`http://localhost:8000/addProduct`, formData )
        .then((response) => {
            if(response){
                toast.success("Successfully Added")
                setModal(false)
                setTimeout(() => {
                  window.location.reload()
                }, 100);
              }else{
                toast.error("error")
            }
        })
        .catch(err => {
          toast.error(err)
        });
    }

    return (
        <div>
            <Row form>
                  <Col className="col-12">
                    <div className="mb-3">
                      <label className="form-label " >Product Name :</label>
                      <input
                        name="name"
                        type="text"
                        onChange={(e) => setName(e.currentTarget.value)}
                        value={name}
                        style={{ marginLeft: "10px !important"}}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price :</label>
                      <input
                        name="price"
                        type="text"
                        onChange={(e) => setPrice(e.currentTarget.value)}
                        value={price}
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
                          height: "122px",
                          width: "122px",
                          borderRadius: "50%",
                          border: "1px solid black",
                        }}
                        onClick={() => imageUploader.current.click()}
                      >
                        <img
                          src={image}
                            // ref={uploadedImage}
                            style={{
                              height: "122px",
                              width: "122px",
                              borderRadius: "50%",
                              position: "acsolute",
                            }}
                          />
                      </div>
                      <p className="image_tite"> Upload Profile Picture</p>
                    </div>
                    
                  </Col>
                </Row>

                <Row>
                  <Col className="d-flex justify-content-end">
                    <div className="text-end">
                      <button
                        className="btn btn-secondary save-user"
                        onClick={() => setModal(!modal)}
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="text-end " style={{ marginLeft: "10px"}}>
                      <button
                        type="submit"
                        className="btn btn-success save-user"
                        onClick={formSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
        </div>
    )
}
