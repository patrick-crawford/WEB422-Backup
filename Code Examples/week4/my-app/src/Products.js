import {useState, useEffect} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


export default function Products(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(()=>{
        setLoading(true);
        fetch("https://reqres.in/api/unknown").then(res=>res.json()).then(products=>{
            setLoading(false);
            setProducts(products.data);
        })
    }, []);

    if(!loading){
        return (
            <>
                <h3>Products</h3>
                <br />
                <ListGroup>
                    {
                        products.map(prod=>(
                            <ListGroup.Item onClick={(e)=>{history.push(`product/${prod.id}`)}} style={{backgroundColor: prod.color}} key={prod.id}>{prod.name} - {prod.year}</ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </>
        )
    }else{
        return null; // could have a loading spinner here, etc
    }
}