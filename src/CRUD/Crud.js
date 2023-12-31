import React, { useContext, useState, useEffect, Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Crud() {
  //   const brandData = [
  //     {
  //       id: 1,
  //       Name: "IPHONE 8",
  //       Description: "apple",
  //       Aurthor: "test",
  //     },
  //     {
  //       id: 2,
  //       Name: "IPHONE X",
  //       Description: "apple",
  //       Aurthor: "test",
  //     },
  //     {
  //       id: 3,
  //       Name: "IPHONE 11",
  //       Description: "apple",
  //       Aurthor: "test",
  //     },
  //     {
  //       id: 4,
  //       Name: "IPHONE 12",
  //       Description: "apple",
  //       Aurthor: "test",
  //     },
  //   ];
  const [islogged, setLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setdata] = useState([]);
  //value state add and edit

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [aurthor, setAurthor] = useState("");

  const [id, setId] = useState("");
  const [editname, seteditName] = useState("");
  const [editdescription, seteditDescription] = useState("");
  const [editaurthor, seteditAurthor] = useState("");




const navigate= useNavigate();
  const { authToken,setAuth } = useContext(authContext);
  // if(authToken==null){
  //   return <> 
  //   <div>Loading ...</div>
  //   </>
  // }
  
  const { token } = authToken;
  const headers = {
    Authorization: "Bearer " + token,
  };

  

  const handleEdit = (id) => {
    const url = `https://localhost:7250/api/Brands/${id}`;
    axios
      .get(url)
      .then((res) => {
        seteditName(res.data.name);
        seteditAurthor(res.data.author);
        seteditDescription(res.data.description);
        setId(id);
      })
      .catch((err) => toast.success(err));

    setShowModal(true);
  };

  const handleUpdate = (id) => {
    const url = `https://localhost:7250/api/Brands/${id}`;

    const data = {
      id: id,
      name: editname,
      description: editdescription,
      author: editaurthor,
    };

    axios.put(url, data).then((res) => {
      toast.success("item has been updated");
      clear();
      handleClose();
      getData();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("are you sure to delete this item") === true) {
      const url = `https://localhost:7250/api/Brands/${id}`;
      axios
        .delete(url)
        .then((res) => {
          if (res.status === 200) toast.success("item has been deleted");
          getData();
        })
        .catch((error) => toast.success(error));
    }
  };
  

  const getData = () => {
    if(!token){
      return (<>
        <div>Loading....</div>
      </>)
    }

    console.log(`token is ${JSON.stringify(headers)}`);
    axios
      .get("https://localhost:7250/api/Brands/get", { headers })
      .then(
        (result) => {
          setdata(result.data)
        setLogin(true);
        })

      .catch((error) =>{ console.log(error)
      setLogin(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogout =()=>{
    setAuth({token:null});
    clear();
    navigate('/Login');
  }


  const postData = () => {
    const url = "https://localhost:7250/api/Brands";
    const data = {
      name: name,
      description: description,
      author: aurthor,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("item has been added");
      })
      .catch((error) => toast.success(error));
  };

  const clear = () => {
    setName("");
    setDescription("");
    setAurthor("");
    seteditName("");
    seteditDescription("");
    seteditAurthor("");
  };

  

  const handleClose = () => {
    setShowModal(false);
  };



  return (
    <div>
      <Fragment>
        <ToastContainer />
        <Container>
        <Row>
          {islogged? <Button onClick={handleLogout}>Logout</Button> : ""}
        </Row>
        <br></br>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="textarea"
                className="form-control"
                placeholder="Enter Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Aurthor"
                value={aurthor}
                onChange={(e) => setAurthor(e.target.value)}
              />
            </Col>

            <Col>
              <button className="btn btn-primary" onClick={() => postData()}>
                insert
              </button>
            </Col>
          </Row>
        </Container>
        <table variant="dark">
          <thead>
            <tr>
              <th>SNO</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Aurthor</th>
              <th>Aurthor</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0
              ? data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.author}</td>
                      <td colSpan={2}>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>{" "}
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "Loading..."}
          </tbody>
        </table>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modify brand Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name"
                    value={editname}
                    onChange={(e) => seteditName(e.target.value)}
                  />
                </Col>
                <Col>
                  <input
                    type="textarea"
                    className="form-control"
                    placeholder="Enter Product Description"
                    value={editdescription}
                    onChange={(e) => seteditDescription(e.target.value)}
                  />
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Aurthor"
                    value={editaurthor}
                    onChange={(e) => seteditAurthor(e.target.value)}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => handleUpdate(id)}>
              update
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* You can add additional buttons here */}
          </Modal.Footer>
        </Modal>
      </Fragment>
    </div>
  );
}
