import {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';

function Product(props){

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(false);

    useEffect(()=>{
        fetch(`https://reqres.in/api/unknown/${props.id}`)
        .then(res=>res.json())
        .then(result => {
            if(result.data){ // a "data" property exists on the returned data
                setProduct(result.data);
                setFound(true); // we found some data
                setLoading(false); // no longer loading
            }else{
                setFound(false); // we did not find any data
                setLoading(false); // no longer loading
            }
        });
    }, [props.id]); // rerun this effect if props.id changes

    if(loading){
        return null; // could have a loading spinner, etc here
    }else{
        if(found){
            return (
                <div>
                    <h1>Product: {product.name}</h1>
                    <br />
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Name: </strong> {product.name}</li>
                        <li className="list-group-item"><strong>Year: </strong> {product.year}</li>
                        <li className="list-group-item"><strong>Color: </strong> {product.color}</li>
                        <li className="list-group-item"><strong>Pantone Value: </strong> {product.pantone_value}</li>
                    </ul>
                    <br />
                    <Link className="btn btn-primary" to="/Products">All Products</Link>
                </div>
            );
        }else{
            return <Redirect to={{ pathname: "/notFound"}} />
        }
    }
}

export default Product;