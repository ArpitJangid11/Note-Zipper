import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../component/Loading";
import ErrorMessage from "../../component/ErrorMessage";
import MainScreen from "../../component/MainScreen";
import "./RegisterScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch =useDispatch()
  const userRegister= useSelector((state) => state.userRegister)
  const {loading, error, userInfo} = userRegister
   
  useEffect(()=>{
    if(userInfo){
      navigate('/mynotes')
    }
  }) 

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password!== confirmpassword){
      setMessage("Password does not match")
    }else{
      dispatch(register(name, email, password,pic))
    }
  };

  const postDetails = (pic) => {
  setPicMessage(null);
  if (!pic) {
    return setPicMessage("Please select an image");
  }

  if (pic.type === "image/jpeg" || pic.type === "image/png") {
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "notezipper");
    data.append("cloud_name", "da3pacrvx");

    fetch("https://api.cloudinary.com/v1_1/da3pacrvx/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setPic(data.url.toString());
          console.log(data.url);
          console.log(pic);
          
        } else {
          setPicMessage("Image upload failed. Try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        setPicMessage("Image upload error. Please try again.");
      });
  } else {
    return setPicMessage("Please select a valid image file (jpeg or png)");
  }
};

  return (
    <MainScreen title="REGISTER">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmpassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          { picMessage &&(
            <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
          )}
          <Form.Group className="py-3 mb-3" controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/png, image/jpg*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen;
