import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import CommentSection from '../components/CommentSection'
import Loader from '../components/Loader'
import ProductMoreDetails from '../components/ProductMoreDetails'
import {Form,Button, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { listComments } from '../actions/productAction'


const ProductDetails = ({history,match}) => {
    const dispatch = useDispatch()
    const productId = match.params.id

    const commentList = useSelector(state => state.commentList)
    const {loadingComment,errorComment,comments} = commentList

    const [details, setDetails] = useState({})
    const [loading,setLoading] = useState(false)
    const [arrayDetails,setArrayDetails] = useState([])

    const [review,setReview]=useState('')
    const [name,setName]=useState('')

    const submitHandler = async (e)=>{
        e.preventDefault()


        let resp = {}
        resp.product =  productId
        resp.comment = review
        resp.name = name
      
        console.log(resp)
        const {data} =  await axios.post(`http://localhost:4001/api/products/comment`,resp )
        if(data){
            window.location.reload()
            console.log('Success')
        }
        else{
            console.log('Failed')
        }
        
        
        
    }   


    const getProductDetails = async () =>{
        setLoading(true)
        const response = await axios.get(`http://localhost:4001/api/products/${match.params.id}`)
        console.log(response.data)
        setDetails(response.data.data)
        setArrayDetails(response.data.data.details)
       setLoading(false)
    }
  
    // const getProductComments = async () =>{
    //     setLoading(true)
    //     const response = await axios.get(`https://empathbackend.rajailani.tech/api/products/comment/${match.params.id}`)
    //     console.log(response.data.data)
    //     setComments(response.data.data)
    //    setLoading(false)
    // }

    useEffect( ()=>{
        getProductDetails()
        dispatch(listComments(match.params.id))
    },[])


    return (
        <div>

            <Container id='details-cont'>
                {loading && <Loader/>}
                <h3>{details.name}</h3>
                <Row >
                    <Col sm={12} md={6} lg={6}>
                        <img src={details.image} alt={details.name} id='detail-img'></img>
                    </Col>
                    <Col>
                        <p id='detail-img'>{details.description}</p>
                        <p id='price'><b>Price :- {details.avgPrice}₹</b></p>
                        <h5>Details</h5>
                        <ProductMoreDetails detail = {arrayDetails}></ProductMoreDetails>
                    </Col>
                </Row>
                <Container>
                    <CommentSection comments={comments} />
                </Container>
            
            <Container id='post-review'>
                <h4>Post Your Reviews</h4>
                <FormContainer>
                <Form onSubmit={submitHandler}  id='form'>
               
                <FormGroup controlId='name' >
                <FormLabel>Name: </FormLabel>
                <FormControl type='name' placeholder='Enter Name' value={name}
                onChange={(e)=>setName(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId='review' >
                <FormLabel>Review Of Product: </FormLabel>
                <textarea id='big-box' type='review' placeholder='Enter Description' value={review}
                onChange={(e)=>setReview(e.target.value)}></textarea>
            </FormGroup>

            <Button type='submit' varient='primary'>
             Post   
            </Button>

                </Form>
                </FormContainer>
            </Container>

            </Container>
        </div>
    )
}

export default ProductDetails
