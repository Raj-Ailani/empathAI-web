import React from 'react'
import {Link} from 'react-router-dom'
import { Card,CardBody,CardImg, CardText, CardTitle } from 'reactstrap'
import Rating from './Rating'

const ProductCard = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded card-item" id='card-its'>
        <Link to={`/product/`+product._id}>
            <CardImg src={product.image} />
        </Link>
        <CardBody>
            <Link to={`/product/`+product._id}  style={{ textDecoration: 'none' }}>
                <CardTitle as="div" id='product-name'><strong>
                   <b> {product.name}</b></strong>
                </CardTitle>
            </Link>
            <CardText as='h4' id='product-description'>
           <strong><br/> {product.description}</strong>
            </CardText>
    


        </CardBody>
    </Card>
    )
}

export default ProductCard
