import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import { listComments } from '../actions/productAction'
import Loader from '../components/Loader'
import jwt_decode from "jwt-decode";
import Chart from "react-google-charts";
import CommentSection from '../components/CommentSection'
import SingleCommentSection from '../components/SingleCommentSection'

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
    const [report,setReport] = useState([])
    const [dateReport,setDateReport] = useState([])




    const getProductDetails = async () =>{
        setLoading(true)
        const response = await axios.get(`http://localhost:4001/api/products/${match.params.id}`)
        setDetails(response.data.data)
        setArrayDetails(response.data.data.details)
       setLoading(false)
    }
  
    const getReportOfProducts = async () =>{
        let testArr = []
        setLoading(true)
        console.log(userInfo.data.token)
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization : `${userInfo.data.token}`
            }
        }
        const response = await axios.get(`http://localhost:4001/api/products/report/${match.params.id}`,config)
        setReport(response.data.data)
        console.log(report)

        const resp = await axios.get(`http://localhost:4001/api/products/date/${match.params.id}`,config)
        console.log(resp.data)
      
        testArr = resp.data.data
        testArr.splice(0, 0, ['Date', 'No of Comments'])
        setDateReport(testArr)
       setLoading(false)
    }
  

    useEffect( ()=>{
        if(userInfo){
            const jwtDate = jwt_decode(userInfo.data.token)
            console.log(jwtDate)
            setjwt(jwtDate)
        }
        getProductDetails()
        getReportOfProducts()
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
              
             </Col>
         </Row>
         </Container>
         <Container id='post-review'>
                <h3> Report</h3>
                <Container>
                    <Row id='report-row'>
                        <Col md={6}  id='report-col'>
                            <h5>Total Comments</h5> 
                            <h3>{`${report.totalCount}`}</h3> 
                        </Col>
                        <Col md={6}  id='report-col'>
                        <h5>Sentiment</h5> 
                        <Chart
                            width={'500px'}
                            height={'300px'}
                           chartType="PieChart"
                           loader={<div>Loading Chart</div>}
                           data={[
                               ['Sentiment', 'No. of Comments'],
                               ['Positive', report.positiveCount],
                               ['Negative', report.negativeCount],
                              
                           ]}
                           options={{
                               is3D: true,
                             }}
                      
                           rootProps={{ 'data-testid': '1' }}
                       />
                        </Col>
                    </Row>
                    </Container>
                    <Container fluid>
                     {dateReport &&                     <Chart
                        width={'100%'}
                        height={'600px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={dateReport}
                        options={{
                            hAxis: {
                              title: 'Date',
                            },
                            vAxis: {
                              title: 'No. Of Comments',
                            },
                          }}
                        
                        rootProps={{ 'data-testid': '1' }}
                        />}  

                    </Container>
                    <Container>
                    <Row id='report-row'>
                        <Col md={6} >
                            <h5>Positive Comments&#40;{`${report.positiveCount}`}&#41;</h5> 
                            <SingleCommentSection comments={report.positiveComment} />
                        </Col>
                        <Col md={6}  id='report-col'>
                        <h5>Negative Comments&#40;{`${report.negativeCount}`}&#41;</h5> 
                        <SingleCommentSection comments={report.negativeComment} />

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
