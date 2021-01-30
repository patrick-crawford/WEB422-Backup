import {useState, useEffect} from 'react';
import { ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
                <ListGroup>
                    {products.map((prod)=>{
                        return <LinkContainer to={`/Product/${prod.id}`} ><ListGroup.Item action >{prod.name}: {prod.year}</ListGroup.Item></LinkContainer>
                    })}
                </ListGroup>
            </div>
        );
    }
}

export default Products;