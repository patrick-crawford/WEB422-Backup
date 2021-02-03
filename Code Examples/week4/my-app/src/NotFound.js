import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div>
            <h3>Page Not Found</h3>
            <p><Link to="/">Return Home</Link></p>
        </div>
    );
};

export default NotFound;