import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class Product extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            product: {},
        }
    }

    componentDidMount(){

        fetch(`https://reqres.in/api/unknown/${this.props.id}`)
        .then(res=>res.json())
        .then(data => {
            this.setState({
                product: data.data,
                found: true // we found some data
            });
        })
    }

    render(){
        if(this.state.product){
            return (
                <div>
                    <h1>Product: {this.state.product.name}</h1>
    
                    <ul className="list-group">
                        <li className="list-group-item"><strong>Name: </strong> {this.state.product.name}</li>
                        <li className="list-group-item"><strong>Year: </strong> {this.state.product.year}</li>
                        <li className="list-group-item"><strong>Color: </strong> {this.state.product.color}</li>
                        <li className="list-group-item"><strong>Pantone Value: </strong> {this.state.product.pantone_value}</li>
                    </ul>
    
                    <Link className="btn btn-primary" to="/Products">All Products</Link>
                </div>
            );
        }else{
            return <Redirect to={{ pathname: "/notFound"}} />
        }
        
    }
    
}

export default Product;