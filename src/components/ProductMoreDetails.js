import React from 'react'

const ProductMoreDetails = ({detail}) => {
    return (
        <div>
            {detail.map(item =>(
            <div>
                <p><b>{item.title}</b></p>
                <p>{item.desp}</p>
            </div>
    ))

            }  
        </div>
    )
}

export default ProductMoreDetails
