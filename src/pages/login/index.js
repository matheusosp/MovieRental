import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser, selectIsAuthenticated, selectAuthError } from '../../core/store/reducers/auth';
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState('userMaster@gmail.com');
    const [password, setPassword] = useState('123456');

    const dispatch = useDispatch();
    const history = useHistory();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const authError = useSelector(selectAuthError);

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/clientes');
        }
    }, [isAuthenticated, history]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    return (
        <div className="login-container">
            <div className="login-form-wrapper">
                <form onSubmit={handleLogin}>
                    <h2>Login de Administrador</h2>
                    {authError && <p className="error-message">{authError}</p>}
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-button">Entrar</button>
                </form>
            </div>
        </div>
    );
};
export default Login;