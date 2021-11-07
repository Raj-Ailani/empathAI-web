import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, FormGroup,Row,Col,Input } from 'reactstrap'
import { login } from '../actions/userActions'
import { Link} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from 'axios';

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
// }
const AddProduct = ({history}) => {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin
    const [jwt, setjwt] = useState()
    const dispatch = useDispatch()
    const [name,setName]=useState('')
    const [avgPrice,setAvgPrice]=useState(0)
    const [image,setImage]=useState('')
    const [desp,setDesp]=useState('')

    useEffect( ()=>{
        if(userInfo){
            const jwtDate = jwt_decode(userInfo.data.token)

            setjwt(jwtDate)
        }
    },[])






    const submitHandler = async (e)=>{
        e.preventDefault()
        // display form data on success
        const resp = {}
        resp.name = name
        resp.avgPrice = avgPrice
        resp.image = image
        resp.description = desp
        
        const config={
            headers:{
      
                Authorization :userInfo.data.token
            }
        }

        const {data} =  await axios.post(`http://localhost:4001/api/products`,resp ,config)
        if(data.success){
            history.push('/admin/productlist')
        }

    }

    return (
        <>
         {jwt && jwt.isAdmin ? 

            <Container id='add-product-cont' fluid >
                <h3>Add Product</h3>
               <Container fluid>
                <Form  id='form'  onSubmit={submitHandler} > 
                <Row>
                    <Col>
                    <FormGroup controlId='name' >
                 <FormLabel>Name: </FormLabel>
                 <FormControl type='name' placeholder='Enter Name' name="name" value={name}  onChange={(e)=>setName(e.target.value)}
                ></FormControl>
             </FormGroup>
                    </Col>
                    <Col>
                    <FormGroup controlId='avgPrice' >
                 <FormLabel>Average Price: </FormLabel>
                 <FormControl type='number' placeholder='Enter Price' name="avgPrice" value={avgPrice}  onChange={(e)=>setAvgPrice(e.target.value)}
                ></FormControl>
             </FormGroup>
                    </Col>
                </Row>
                <Row>
                   
                    <Col>
                    <FormGroup controlId='image' >
                 <FormLabel>Upload image: </FormLabel>
                 <FormControl type='file' value={image} name="image"  onChange={(e)=>setImage(e.target.value)}
                ></FormControl>
             </FormGroup>
                    </Col>
                    </Row>
                <h5>Product Description</h5>
                <FormGroup controlId='desp' >
                 <FormLabel>Description: </FormLabel>
                 <textarea  id='big-box' type='text' value={desp} name="desp"  onChange={(e)=>setDesp(e.target.value)}
                ></textarea>
             </FormGroup>

             
              


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
