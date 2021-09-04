import React, { useEffect,useState } from 'react'
import { Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Container, Table } from 'reactstrap'
import { listProducts } from '../actions/productAction'
import jwt_decode from "jwt-decode";

const ProductList = ({history}) => {
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin
    const [jwt, setjwt] = useState()
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList
    useEffect( ()=>{
        if(userInfo){
            const jwtDate = jwt_decode(userInfo.data.token)
            console.log(jwtDate)
            setjwt(jwtDate)
        }
        dispatch(listProducts())
    },[dispatch])


    const test =(id)=>{
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
                 <tr onClick={()=>test(product._id)} key={product._id} >
                     <td >  <Image src={product.image} alt={product.name} fluid rounded id='product-list-image'/></td>
                 
                     <td>{product.name}</td> 
                    
                     <td>
                         {`₹${product.avgPrice}`
                         }
                     </td>

                 </tr>
             ))

             }


         </tbody>
     </Table>
     </Container>
     
     
     
     </>:
     <h3>Not Authorized</h3> }
           
        </>
    )
}

export default ProductList
