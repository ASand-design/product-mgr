import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

export default props => {
    const [product, setProduct] = useState({})
    const { removeFromDom } = props;
    const deleteProduct = (productId) => {
        axios.delete('http://localhost:8000/api/products/' + productId)
            .then(res => {
                console.log(productId+'deleted')
                window.location = "/products";
            })
    }
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/products/' + props.id)
            .then(res => setProduct({
                ...res.data
            }))
    }, [])
    
    return (
        <div>
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.desc}</p>
            <p><Link to = {'/products/' + product._id + '/edit'}>Edit</Link></p>
            <button onClick = {(e) => {deleteProduct(product._id)}}>
                Delete
            </button>
        </div>
    )
}