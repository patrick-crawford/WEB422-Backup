import React from 'react'
import {Link} from 'react-router-dom';

class Home extends React.Component{

    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.props.onDidMount("Home");
    }
    render(){ 
        return (
            <div>
            <h1>Home</h1>
        </div>
        );
    }
}

export default Home;