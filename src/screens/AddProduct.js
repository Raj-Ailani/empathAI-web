import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, FormGroup,Row,Col } from 'reactstrap'
import { login } from '../actions/userActions'
import { Link} from 'react-router-dom';
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
    return (
        <>
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
        </>
    )
}

export default AddProduct
