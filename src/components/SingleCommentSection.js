import { Button } from 'bootstrap'
import React, { useEffect } from 'react'
import { Container } from 'reactstrap'
import Rating from './Rating'
const SingleCommentSection = ({comments}) => {

    

   const formatDate =(createdAt) =>{
       let date = new Date(createdAt)
       let day = date.getDate()
       let month = date.getMonth()
       let year = date.getFullYear()
        let send = `${day}-${month}-${year}`
    return send
   }    

    return (
    <Container id= 'comment-cont'>
        <Container id= 'report-col-scroll'>
                {comments?   comments.map(comment =>(
                    <div id='comment'>
                <span id='price'><b>{comment.name}</b></span><br/>
                <span>{formatDate(comment.createdAt)}</span>
             
           
                {comment.sentiment ? 
                     <p id='positive'>{comment.comment}</p>
                :
                <p id='negative'>{comment.comment}</p>
                }
                </div>
                ))
                :
                <h5 id='no-review'>No Reviews to show</h5>
            }
            
        </Container>
    </Container>
    )
}

export default SingleCommentSection
