import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from 'react-router-dom';

import "./edit-movie.css";

export default function Aluguel() {
    const { id } = useParams();
    const history = useHistory();

    const [aluguel, setAluguel] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const allRentals = JSON.parse(localStorage.getItem('rentals') || '[]');
            const allClients = JSON.parse(localStorage.getItem('clients') || '[]');

            const rentalToEdit = allRentals.find(r => r.id.toString() === id);

            if (rentalToEdit) {
                setAluguel(rentalToEdit);
                const associatedClient = allClients.find(c => c.id === rentalToEdit.clienteId);
                setCliente(associatedClient);
            }
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage:", error);
        }
        setLoading(false);
    }, [id]);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setAluguel(prevAluguel => ({
            ...prevAluguel,
            status: newStatus
        }));
    };

    const salvarAluguel = () => {
        try {
            const allRentals = JSON.parse(localStorage.getItem('rentals') || '[]');

            const updatedRentals = allRentals.map(r =>
                r.id.toString() === id ? aluguel : r
            );

            localStorage.setItem('rentals', JSON.stringify(updatedRentals));

            history.push("/alugueis");

        } catch (error) {
            console.error("Erro ao salvar aluguel:", error);
            alert("Não foi possível salvar as alterações.");
        }
    };

    if (loading) {
        return <div className="page-container"><h1>Carregando...</h1></div>;
    }

    if (!aluguel) {
        return <div className="page-container"><h1>Aluguel não encontrado!</h1></div>;
    }

    return (
        <div className="page-container">
            <div className="form-container-dark">
                <h1>Editar Aluguel</h1>
                <div className="info-group">
                    <strong>Cliente:</strong>
                    <span>{cliente ? cliente.nome : 'Cliente não encontrado'}</span>
                </div>
                <div className="info-group">
                    <strong>ID do Cliente:</strong>
                    <span>{aluguel.clienteId}</span>
                </div>
                <div className="info-group">
                    <strong>ID do Filme (IMDb):</strong>
                    <span>{aluguel.filme.imdbID}</span>
                </div>
                <div className="info-group">
                    <strong>ID do aluguel:</strong>
                    <span>{aluguel.id}</span>
                </div>
                <div className="info-group">
                    <strong>Filme:</strong>
                    <span>{aluguel.filme.Title} ({aluguel.filme.Year})</span>
                </div>
                <div className="info-group">
                    <strong>Data do Aluguel:</strong>
                    <span>{aluguel.dataAluguel}</span>
                </div>
                <div className="form-group-dark">
                    <label htmlFor="status">Status do Aluguel:</label>
                    <select id="status" value={aluguel.status} onChange={handleStatusChange}>
                        <option value="ativo">Ativo</option>
                        <option value="devolvido">Devolvido</option>
                    </select>
                </div>
                <div className="actions-group">
                    <button type="button" className="btn btn-primary" onClick={salvarAluguel}>
                        Salvar
                    </button>
                    <Link to="/alugueis">
                        <button type="button" className="btn btn-secondary">Voltar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
