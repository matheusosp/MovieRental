import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// NOVO: Importar hooks do React-Redux para interagir com a store
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../core/store/reducers/auth';

export default function Header() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const history = useHistory();

    const navLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginLeft: '20px',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const handleLogout = () => {
        dispatch(logout());
        history.push('/login');
    };

    return (
        <header style={{ background: '#333', color: 'white', padding: '10px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to='/' style={{...navLinkStyle, marginLeft: '0', fontSize: '1.5em', fontWeight: 'bold' }}>
                Sistema de Filmes
            </Link>
            <nav style={{display: 'flex', alignItems: 'center'}}>
                <Link to="/" style={navLinkStyle}>Home</Link>
                <Link to="/clientes" style={navLinkStyle}>Clientes</Link>
                <Link to="/alugueis" style={navLinkStyle}>Aluguéis</Link>

                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        style={{
                            ...navLinkStyle,
                            background: '#dc3545',
                            border: 'none',
                            fontFamily: 'inherit',
                            fontSize: 'inherit'
                        }}
                    >
                        Sair
                    </button>
                )}
            </nav>
        </header>
    );
}