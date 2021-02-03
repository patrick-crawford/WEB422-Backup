import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Product(props) {

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://reqres.in/api/unknown/${props.id}`).then(res => res.json()).then(product => {
            setLoading(false);
            setProduct(product.data);
        });
    }, [props.id])

    if (!loading) {
        if (product) {
            return (
                <>
                    <h3>Product {props.id}</h3>
                    <br />
                    <Card>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                                <strong>Year:</strong> {product.year}<br />
                                <strong>Pantone:</strong> {product.pantone_value}
                            </Card.Text>
                            <LinkContainer to="/products">
                                <Button variant="primary">Back to Products</Button>
                            </LinkContainer>
                        </Card.Body>
                    </Card>
                </>
            );
        } else {
            return (
                <>
                    <h3>Product {props.id}</h3>
                    <p>Not Found...</p>
                </>
            );
        }

    } else {
        return null; // could have a loading spinner here, etc
    }


}