import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import { listComments } from '../actions/productAction'
import Loader from '../components/Loader'
import ProductMoreDetails from '../components/ProductMoreDetails'
import jwt_decode from "jwt-decode";

const ProductAdminScreen = ({match}) => {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin
    const [jwt, setjwt] = useState()


    const dispatch = useDispatch()
    const productId = match.params.id

    const commentList = useSelector(state => state.commentList)
    const {loadingComment,errorComment,comments} = commentList

    const [details, setDetails] = useState({})
    const [loading,setLoading] = useState(false)
    const [arrayDetails,setArrayDetails] = useState([])

    const [review,setReview]=useState('')
    const [name,setName]=useState('')


    const getProductDetails = async () =>{
        setLoading(true)
        const response = await axios.get(`https://empathbackend.rajailani.tech/api/products/${match.params.id}`)
        console.log(response.data)
        setDetails(response.data.data)
        setArrayDetails(response.data.data.details)
       setLoading(false)
    }
  

    useEffect( ()=>{
        if(userInfo){
            const jwtDate = jwt_decode(userInfo.data.token)
            console.log(jwtDate)
            setjwt(jwtDate)
        }
        getProductDetails()
        dispatch(listComments(match.params.id))
    },[])

    return (
        <>
        {jwt && jwt.isAdmin ? 
         <>
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
         </Container>
         <Container id='post-review'>
                <h3> Report</h3>
                <Container>
                    <Row id='report-row'>
                        <Col id='report-col'>
                            <h5>Total Comments</h5> 
                        </Col>
                        <Col id='report-col'>
                        <h5>Sentiment</h5> 
                        </Col>
                    </Row>
                </Container>
            </Container>
         </>:
         <h3>Not Authorized</h3> }
       
            
        </>
    )
}

export default ProductAdminScreen
