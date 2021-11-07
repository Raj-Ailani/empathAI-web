import React, { useEffect,useState } from 'react'
import { Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Container, Table } from 'reactstrap'
import { listProducts } from '../actions/productAction'
import jwt_decode from "jwt-decode";
import axios from 'axios';

const ProductList = ({history}) => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin
    const [jwt, setjwt] = useState()
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList


    const deleteProduct= async(id)=>{
        console.log('Inside Delete Function')
        const resp = {
            isDeleted :true
        }
        const config={
            headers:{
                Authorization :userInfo.data.token
            }
        }

        const {data} =  await axios.put(`http://localhost:4001/api/products/${id}`,resp ,config)
        window.location.reload()
    }

    useEffect( ()=>{
        if(userInfo){
            const jwtDate = jwt_decode(userInfo.data.token)
            console.log(jwtDate)
            setjwt(jwtDate)
        }
        dispatch(listProducts())
    },[dispatch])

    const addProduct =()=>{
        if(jwt.isAdmin){
       history.push(`/admin/add/product`)
        }
    }


    const redirect =(id)=>{
        if(jwt.isAdmin){
       history.push(`/admin/product/${id}`)
        }
    }


    return (
        <>
        {jwt && jwt.isAdmin ? 
        <>
         <Container id='product-list'>
         <h3>
             Product List
         </h3>
     </Container>
     <Container >
     <Table striped hover id='form' >
         <tr id='table-tr'>
             <th>Image </th>
             <th>Name</th>
             <th>Price</th>
            
             
             
         </tr>
         <tbody>
             {products && products.map((product)=>(
                 <tr  key={product._id} >
                     <td onClick={()=>redirect(product._id)}>  <Image src={product.image} alt={product.name} fluid rounded id='product-list-image'/></td>
                 
                     <td onClick={()=>redirect(product._id)}>{product.name}</td> 
                    
                     <td onClick={()=>redirect(product._id)}>
                         {`₹${product.avgPrice}`
                         }
                     </td>
                     <td>
                     <i class="fa fa-trash" aria-hidden="true" onClick={()=>deleteProduct(product._id)}></i>

                     </td>
                 </tr>
             ))

             }


         </tbody>
     </Table>
     </Container>
     <Container  id='add-product' >
     <Button  onClick={()=>addProduct()} ><i  className="fa fa-plus" aria-hidden="true"></i></Button>
     </Container>
     
     
     
     </>:
     <Container  >
     <h3 id='not-auth' >Not Authorized.....Please Login With Admin</h3></Container> }
           
        </>
    )
}

export default ProductList
