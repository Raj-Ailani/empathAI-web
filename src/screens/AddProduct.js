import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, FormGroup,Row,Col,Input } from 'reactstrap'
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

            setjwt(jwtDate)
        }
    },[])

    const { register, handleSubmit, reset, watch } = useForm({});


    const detail_desp = watch('detail-desp');


    function ticketNumbers() {
        return [...Array(parseInt(detail_desp || 1)).keys()];
    }
    function onSubmit(data) {
        console.log(data)
        // display form data on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
    }

    return (
        <>
         {jwt && jwt.isAdmin ? 

            <Container id='add-product-cont' fluid >
                <h3>Add Product</h3>
               <Container fluid>
                <Form  id='form'  onSubmit={handleSubmit(onSubmit)} onReset={reset}> 
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
                    <Col>
                    <FormGroup controlId='no_desp' >
                 <FormLabel>Number of Detail Description want to enter: &nbsp;</FormLabel>
                 <select  type="select" name="detail-desp" {...register("detail-desp")} >
                 {[1,2,3,4,5].map(i => 
                                    <option key={i} value={i}>{i}</option>
                                )}
                    </ select >

                    </FormGroup>
                    </Col>
                    <Col>
                    </Col>
                    </Row>
                <h5>Product Description</h5>

                {
                    ticketNumbers().map(i => (                
                    <Row  key={i}>
                        <Col>
                        <FormGroup controlId='title' >
                     <FormLabel>Title </FormLabel>
                     <FormControl type='title' placeholder='Enter Title ' 
                    ></FormControl>
                 </FormGroup>
                        </Col>
                        <Col>
                    <FormGroup controlId='review' >
                    <FormLabel>Product Description: </FormLabel>
                    <textarea id='big-box' type='description' placeholder='Enter Description'></textarea>
                    </FormGroup>    
                    </Col>
                    </Row>))
                }

             
              


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
