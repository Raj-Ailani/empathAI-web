import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, FormGroup } from 'reactstrap'
import { login } from '../actions/userActions'
import { Link} from 'react-router-dom';

const LoginScreen = ({location,history}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch = useDispatch()
    const redirect =   location.search ? location.search.split('=')[1] :'/'
    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} =userLogin


        
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])



    const submitHandler =(e)=>{
    
        e.preventDefault()
        console.log('testing')
       dispatch(login(email,password))
    }   

    return (
        <div>
            <Container id='login-cont'>
                <h3>Sign In</h3>
                {/* {loading && <Loader />} */}
                <Form onSubmit={submitHandler} id='form'> 
             <FormGroup controlId='email' >
                 <FormLabel>Email: </FormLabel>
                 <FormControl type='email' placeholder='Enter Email' value={email}
                 onChange={(e)=>setEmail(e.target.value)}></FormControl>
             </FormGroup>

             <FormGroup controlId='password' >
                 <FormLabel>Password: </FormLabel>
                 <FormControl type='password' placeholder='Enter Password' value={password}
                 onChange={(e)=>setPassword(e.target.value)}></FormControl>
             </FormGroup>

             <Button type='submit' varient='primary'>
                 Sign In
             </Button>
           

         </Form>
            </Container>
        </div>
    )
}

export default LoginScreen
