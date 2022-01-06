import {useState, useEffect} from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";


export default function Products(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        let page = urlParams.get("page"); // get the value of the "page" query parameter (NOTE: returns null if "page" was not found in the query string)
        setLoading(true);
        fetch( page ? `https://reqres.in/api/unknown?page=${page}` : "https://reqres.in/api/unknown").then(res=>res.json()).then(products=>{
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
                            <ListGroup.Item onClick={(e)=>{navigate(`/product/${prod.id}`)}} style={{backgroundColor: prod.color}} key={prod.id}>{prod.name} - {prod.year}</ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </>
        )
    }else{
        return null; // could have a loading spinner here, etc
    }
}