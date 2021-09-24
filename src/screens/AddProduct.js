import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, FormGroup,Row,Col } from 'reactstrap'
import { login } from '../actions/userActions'
import { Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";

// name:{
//     type:String,
//     required:true,
// },
// description:{
//     type:String,
//     required:true,
// },
// image:{
//   type:String,
//   required:true,
// },
// avgPrice:{
//   type:Number,
//   required:true,
// },
//    details:[{
//    title:String,
//    desp:String
//  }]
const AddProduct = () => {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin
    const [jwt, setjwt] = useState()
    const dispatch = useDispatch()
    

    useEffect( ()=>{
        if(userInfo){
            const jwtDate = jwt_decode(userInfo.data.token)
            console.log(jwtDate)
            setjwt(jwtDate)
        }
    },[])


    return (
        <>
         {jwt && jwt.isAdmin ? 

            <Container id='add-product-cont' fluid >
                <h3>Add Product</h3>
               <Container fluid>
                <Form  id='form'> 
                <Row>
                    <Col>
                    <FormGroup controlId='email' >
                 <FormLabel>Name: </FormLabel>
                 <FormControl type='name' placeholder='Enter Name' 
                ></FormControl>
             </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup controlId='email' >
                 <FormLabel>Average Price: </FormLabel>
                 <FormControl type='number' placeholder='Enter Price' 
                ></FormControl>
             </FormGroup>
                    </Col>
                </Row>

                <Row>
                <FormGroup controlId='review' >
                <FormLabel>Product Description: </FormLabel>
                <textarea id='big-box' type='description' placeholder='Enter Description'></textarea>
                </FormGroup>    
                </Row>
              


             <Button type='submit' varient='primary'>
                Add
             </Button>
           

         </Form>
         </Container>
            </Container>
            :
            <Container >
            <h3 id='not-auth' >Not Authorized.....Please Login With Admin</h3></Container> }
        </>
    )
}

export default AddProduct
