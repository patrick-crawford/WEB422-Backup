function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}

function Hello() {

    const user = {
        firstName: 'Harper',
        lastName: 'Perez'
    };

    return (
        <p>Hello, {formatName(user)}!</p>
    );
}

export default Hello;
