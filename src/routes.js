import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Header from "./shared/components/Header/header";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/login";
import Clientes from "./pages/clientes";
import Alugueis from "./pages/home";
import Aluguel from "./pages/movies/edit-movie";

const Routes = () =>{
    return(
        <BrowserRouter forceRefresh>
            <Header/>
            <Switch>
                <Route path="/login" exact>
                    <Login/>
                </Route>
                <PrivateRoute path="/" exact>
                    <Clientes/>
                </PrivateRoute>
                <PrivateRoute path="/clientes" exact>
                    <Clientes/>
                </PrivateRoute>
                <PrivateRoute path="/alugueis" exact>
                    <Alugueis/>
                </PrivateRoute>
                <PrivateRoute path="/alugueis/:id" exact>
                    <Aluguel/>
                </PrivateRoute>
                <Redirect to="/" />

            </Switch>
        </BrowserRouter>
    )
}

export default Routes;