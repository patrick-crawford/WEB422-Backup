import React from 'react';
import {Link} from 'react-router-dom';

class Products extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount(){

        fetch("https://reqres.in/api/unknown")
        .then(res=>res.json())
        .then(data => {
            this.setState({
                products: data.data
            })
        })
    }

    render(){
        return (
            <div>
                <h1>Products</h1>
                <div className="list-group">
                    {this.state.products.map((prod)=>{
                        return <Link key={prod.id} className="list-group-item" style={{backgroundColor: prod.color}} to={`/Product/${prod.id}`}>{prod.name}: {prod.year}</Link>
                    })}
                </div>
            </div>
        );
    }
};

export default Products;