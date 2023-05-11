import axios from "axios";
import React, { useEffect, useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import moment from "moment";

import {
  Button,
  Col,
  Image,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Modal, ModalBody } from "reactstrap";
import { PopModel } from "./PopModel";
import { EditModel } from "./EditModel";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const ManagerDashboard = () => {

  const [editData, setEditData] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [productData, setProductData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const onClickEdit = (data) => {
    console.warn("edit",data)
    setModal(true)
    setEditData(data)
  };

  const columns = [
    { dataField: '_id', text: 'Id', sort: true },
    {
      dataField: "image",
      isDummyField: true,
      text: "Image",
      formatter: (cellContent, pData) => (
        <>
          <div className="d-flex gap-3">
             <Image src={pData?.image} alt="error"/>
          </div>
        </>
      ),
    },
    { dataField: 'name', text: 'Name', sort: true },
    { dataField: 'price', text: 'Price', sort: true },
    {
      dataField: "createdAt",
      isDummyField: true,
      text: "Created Date",
      formatter: (cellContent, pData) => (
        <>
          <div className="d-flex gap-3">
            <p>{moment(pData?.createdAt).format("YYYY MMM DD hh:mm:ss")}</p>
          </div>
        </>
      ),
    },
    {
      dataField: "updatedAt",
      isDummyField: true,
      text: "Last Update",
      formatter: (cellContent, pData) => (
        <>
          <div className="d-flex gap-3">
          <p>{moment(pData?.updatedAt).format("YYYY MMM DD hh:mm:ss")}</p>
          </div>
        </>
      ),
    },
    {
      dataField: "action",
      isDummyField: true,
      text: "Action",
      formatter: (cellContent, pData) => (
        <>
          <div className="d-flex gap-3">
            <Button variant="outline-primary" onClick={() => {
              onClickEdit(pData);
            }}
            >
              Edit
            </Button>
            <Button variant="outline-danger" onClick={() => {
              onClickDelete(pData._id);
            }}
            >
              Delete
            </Button>
          </div>
        </>
      ),
    },
  ];

  const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
  }];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  useEffect(()=>{
    axios.get('http://localhost:8000/allProducts')
    .then((response) => {
      if (response.data) {
        setProductData(response.data);
        setEditData([])
      } else {
        toast.error("err")
      }
    })
    .catch(err => {
      toast.error(err)
    });
  },[])


  const onClickDelete = async (id) => {
    console.warn("inside", id)
    axios.delete(`http://localhost:8000/deleteProduct/${id}`)
    .then((response) => {
        if(response.data.msg){
          toast.success("Successfully Deleted")
          setTimeout(() => {
            window.location.reload()
          }, 300);

        }else{
          toast.error("err")
        }
    })
    .catch(err => {
      toast.error(err)
    });
  }

  return (
    <>
      <ChakraProvider>
        <ToastContainer position="top-center" />
        <div className="container-fluid">
          <div className="container">
            <Row className="mt-5 justify-content-center">
              <Col md={4}>
                <h3>- Product's Dashboard - </h3>
              </Col>
            </Row>

            <Row className="mt-5 justify-content-between">
              <Col md={3}>
                <InputGroup>
                  <Form.Control
                    aria-label="Search…"
                    placeholder="Search…"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </InputGroup.Text>
                </InputGroup>
              </Col>

              <Col md={2} className="text-end">
                <Button onClick={() => setModal(true)}>Add Product</Button>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={12}>
                <BootstrapTable bootstrap4 keyField='_id' data={productData} columns={columns} defaultSorted={defaultSorted} pagination={pagination} />
              </Col>
            </Row>

            <Modal isOpen={modal} className="modal-dialog modal-md">
              <ModalBody>
                <Row>
                  <Col md={11}>
                    <h3 style={{ textAlign: "center" }}>Product's Data</h3>
                  </Col>
                  <Col md={1} className="justify-content-end">
                    <i onClick={() => setModal(!modal)} style={{ cursor: "pointer" }} className="fa fa-remove"></i>
                  </Col>
                </Row>
                {
                  editData?.length == 0 ?  <PopModel/> : <EditModel productData={editData} />  
                }
              </ModalBody>
            </Modal>
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}


export default ManagerDashboard;

