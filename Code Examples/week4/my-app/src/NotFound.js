import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div>
            <h1>Page Not Found</h1>
            <br />
            <Link to="/">Return Home</Link>
        </div>
    );
};

export default NotFound;