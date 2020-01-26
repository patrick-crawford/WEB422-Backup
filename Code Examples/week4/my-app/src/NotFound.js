import React from 'react'
import {Link} from 'react-router-dom';

class NotFound extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <h1>Page Not Found</h1>
                <Link to="/">Return Home</Link>
            </div>
        );
    }
};

export default NotFound;