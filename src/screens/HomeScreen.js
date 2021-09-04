import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Row } from 'reactstrap'
import { listProducts } from '../actions/productAction'
import ProductCard from '../components/ProductCard'
import ProductCarousel from '../components/ProductCarousel'
import Loader from '../components/Loader'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList
    useEffect( ()=>{
        dispatch(listProducts())
    },[dispatch])
    return (
        < >
                <ProductCarousel/>
                <Container id='all-products' fluid>
                    <div>
                        <h3>All Products</h3>    
                    </div>    
                    <Row>{ loading  ? <Loader/> : 
                products.map((product) => (
                   <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                    <ProductCard product={product}/>
                   </Col> 
                ))  
                
            
            }</Row>
                </Container>        
          
        </>
    )
}

export default HomeScreen
