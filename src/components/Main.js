import React from 'react'
import Header from './Header'
import { Switch, Route } from 'react-router-dom';
import HomeScreen from '../screens/HomeScreen'
import ScrollToTop from './ScrollToTop'
import LoginScreen from '../screens/LoginScreen';
import AboutScreen from '../screens/AboutScreen';
import ProductDetails from '../screens/ProductDetails';
import ProductList from '../screens/ProductList';
import ProductAdminScreen from '../screens/ProductAdminScreen';
import AddProduct from '../screens/AddProduct';
import UnderConstruction from './UnderConstruction';

const Main = () => {
    return (
        <>
            <Header/>
            <ScrollToTop></ScrollToTop>
            <Switch>
            <Route path='/about' component={AboutScreen} />
            <Route path='/product/:id' component={ProductDetails} />
            <Route path='/admin/product/:id' component={ProductAdminScreen} />
            <Route path='/admin/add/product' component={UnderConstruction} />
            <Route path='/admin/productlist' component={ProductList} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/' component={HomeScreen} />
            </Switch>
        </>
    )
}

export default Main
