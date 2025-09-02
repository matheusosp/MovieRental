import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ children, ...rest }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};
export default PrivateRoute;