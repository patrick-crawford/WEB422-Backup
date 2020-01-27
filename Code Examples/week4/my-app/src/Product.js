import React from 'react';
import {Link, Redirect} from 'react-router-dom';

class Product extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            product: {},
            loading: true,
            found: false
        }
    }

    componentDidMount(){

        fetch(`https://reqres.in/api/unknown/${this.props.id}`)
        .then(res=>res.json())
        .then(data => {
            if(data.data.id){ // an "id" property exists on the returned data
                this.setState({
                    product: data.data,
                    found: true, // we found some data
                    loading: false // no longer loading
                });
            }else{
                this.setState({
                    found: false, // we did not find data
                    loading: false // no longer loading
                });
            }
        })
    }

    render(){
        if(this.state.loading){
            return null; // could have a loading spinner, etc here
        }else{
            if(this.state.found){
                return (
                    <div>
                        <h1>Product: {this.state.product.name}</h1>
                        <br />
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
}

export default Product;