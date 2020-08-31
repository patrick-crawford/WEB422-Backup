import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Products(props){

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        fetch("https://reqres.in/api/unknown")
        .then(res=>res.json())
        .then(result => {
            setProducts(result.data);
            setLoading(false);
        })
    }, []);

    if(loading){
        return null; // could have a loading spinner, etc here
    }else{
        return (
            <div>
                <h1>Products</h1>
                <br />
                <div className="list-group">
                    {products.map((prod)=>{
                        return <Link key={prod.id} className="list-group-item" style={{backgroundColor: prod.color}} to={`/Product/${prod.id}`}>{prod.name}: {prod.year}</Link>
                    })}
                </div>
            </div>
        );
    }
}

export default Products;