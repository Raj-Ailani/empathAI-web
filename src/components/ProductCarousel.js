import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import React from 'react'
import { Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";

const ProductCarousel = () => {
    let history = useHistory();

    const test=()=>{
        history.push("/about");
    }
    return (
        <div>
            <Carousel showThumbs={false}
            showStatus={false}
            showArrows={false}
            showIndicators={false}
            onClickItem	={()=>{test()}}
            infiniteLoop>
                <div>   
                    
                <img id='test' src='/assets/1.jpg' alt='landing-img'></img>
                   
                </div>
      
        
            </Carousel>
        </div>
    )
}

export default ProductCarousel
