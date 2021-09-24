import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import React from 'react'
import { Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";

const ProductCarousel = () => {
    let history = useHistory();

    const test=()=>{
        history.push("/about");
    }
    return (
        <div>
            <Container id='caro' fluid>
                <Row>
                    <Col lg={5} md={12} sm={12} xs={12}>
                   
                   <h3 id='landing-title'><span id='red'>AI</span>-Driven Sentiment Analysis</h3>
                   <h5 id='landing-title2'>Internet monitoring tool combined with advanced sentiment analysis working together
                    to protect your brand, analyze your audience opinions, and connect you with potential customers</h5>
                    <Row>
                    <Link id='about-link' to='/about'> <h5 id='landing-title3'><span id='red_hover'>Know More About Us  <i class="fas fa-long-arrow-alt-right"></i>
                    </span>
                    </h5>
                    </Link>
                    </Row>
                    </Col>
                    <Col className='d-none d-sm-none d-md-none d-lg-block' md={7} sm={7} xs={7}>
                    <img id='test' src='/assets/bg-test.png' alt='bg'></img>
                    </Col>
                </Row>
  
            </Container>
         
        </div>
    )
}

export default ProductCarousel
