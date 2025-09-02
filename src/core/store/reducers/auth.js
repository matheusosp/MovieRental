export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const LOGOUT = 'auth/LOGOUT';

export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    payload: user,
});

export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const logout = () => {
    localStorage.removeItem('isAuthenticated');
    return { type: LOGOUT };
};

export const loginUser = ({ email, password }) => (dispatch) => {
    const ADMIN_EMAIL = 'userMaster@gmail.com';
    const ADMIN_PASSWORD = '123456';

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(email).toLowerCase())) {
        return dispatch(loginFailure('Por favor, insira um email válido.'));
    }
    if (password.length < 6) {
        return dispatch(loginFailure('A senha deve ter no mínimo 6 caracteres.'));
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAuthenticated', 'true');
        dispatch(loginSuccess({ email }));
    } else {
        dispatch(loginFailure('Email ou senha inválidos.'));
    }
};


const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: null,
    error: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                error: null,
            };
        default:
            return state;
    }
}
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectUser = (state) => state.auth.user;