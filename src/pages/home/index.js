import { useEffect, useState } from "react";
import "./movies.css";
import {Link} from "react-router-dom";

const Alugueis = () => {
    const OMDb_API_KEY = '4dd7929';

    const [rentals, setRentals] = useState([]);
    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedClientId, setSelectedClientId] = useState('');
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        const storedRentals = localStorage.getItem('rentals');
        if (storedRentals) {
            setRentals(JSON.parse(storedRentals));
        }

        const storedClients = localStorage.getItem('clients');
        if (storedClients) {
            setClients(JSON.parse(storedClients));
        }
    }, []);

    const updateRentalsStorage = (updatedRentals) => {
        setRentals(updatedRentals);
        localStorage.setItem('rentals', JSON.stringify(updatedRentals));
    };

    const handleMovieSearch = async (e) => {
        e.preventDefault();
        setApiError('');
        if (!searchQuery.trim() || OMDb_API_KEY === 'SUA_CHAVE_API') {
            setApiError(OMDb_API_KEY === 'SUA_CHAVE_API' ? 'Por favor, insira sua chave da API OMDb.' : 'Digite um título para buscar.');
            return;
        }
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDb_API_KEY}&s=${searchQuery}`);
            const data = await response.json();
            if (data.Response === "True") {
                setSearchResults(data.Search);
            } else {
                setSearchResults([]);
                setApiError(data.Error);
            }
        } catch (error) {
            setApiError('Falha ao buscar filmes. Verifique a conexão.');
            console.error("Erro na API OMDb:", error);
        }
    };

    const resetModal = () => {
        setIsModalOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        setSelectedMovie(null);
        setSelectedClientId('');
        setApiError('');
    };

    const handleCreateRental = () => {
        if (!selectedClientId || !selectedMovie) {
            alert('Por favor, selecione um cliente e um filme.');
            return;
        }
        const newRental = {
            id: Date.now(),
            clienteId: parseInt(selectedClientId),
            filme: selectedMovie,
            dataAluguel: new Date().toLocaleDateString('pt-BR'),
            status: 'ativo'
        };
        updateRentalsStorage([...rentals, newRental]);
        resetModal();
    };

    const handleToggleStatus = (id) => {
        const updatedRentals = rentals.map(r =>
            r.id === id ? { ...r, status: r.status === 'ativo' ? 'devolvido' : 'ativo' } : r
        );
        updateRentalsStorage(updatedRentals);
    };

    const handleDelete = (id) => {
        if (window.confirm('Deseja realmente excluir este aluguel?')) {
            updateRentalsStorage(rentals.filter(r => r.id !== id));
        }
    };

    const getClientName = (id) => {
        const client = clients.find(c => c.id === id);
        return client ? client.nome : 'Cliente não encontrado';
    };

    return (
        <>
            <div className="page-container">
                <h2>Gerenciamento de Aluguéis</h2>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Novo Aluguel</button>

                <table className="data-table">
                    <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Filme</th>
                        <th>Data do Aluguel</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rentals.map(rental => (
                        <tr key={rental.id}>
                            <td>{getClientName(rental.clienteId)}</td>
                            <td>{rental.filme.Title} ({rental.filme.Year})</td>
                            <td>{rental.dataAluguel}</td>
                            <td>
                                    <span className={rental.status === 'ativo' ? 'status-ativo' : 'status-devolvido'}>
                                        {rental.status.toUpperCase()}
                                    </span>
                            </td>
                            <td>
                                <Link to={`/alugueis/${rental.id}`}>
                                    <button className="btn btn-secondary">Editar</button>
                                </Link>
                                <button className="btn btn-secondary" onClick={() => handleToggleStatus(rental.id)}>Alterar Status</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(rental.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Registrar Novo Aluguel</h3>
                            <div className="modal-form-group">
                                <label>1. Selecione o Cliente</label>
                                <select value={selectedClientId} onChange={e => setSelectedClientId(e.target.value)} required>
                                    <option value="" disabled>Escolha um cliente...</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>{client.nome}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="modal-form-group">
                                <label>2. Buscar Filme por Título</label>
                                <form onSubmit={handleMovieSearch} style={{ display: 'flex' }}>
                                    <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ flex: 1, marginRight: '10px' }} placeholder="Ex: Batman, Matrix..." />
                                    <button type="submit" className="btn btn-secondary" style={{ flexShrink: 0 }}>Buscar</button>
                                </form>
                            </div>

                            {apiError && <p className="api-error">{apiError}</p>}

                            {searchResults.length > 0 && (
                                <>
                                    <label style={{display: 'block', marginBottom: '5px', color: '#b0b0b0' }}>3. Selecione um Filme</label>
                                    <div className="movie-search-results">
                                        {searchResults.map(movie => (
                                            <div
                                                key={movie.imdbID}
                                                className={`movie-result-item ${selectedMovie?.imdbID === movie.imdbID ? 'selected' : ''}`}
                                                onClick={() => setSelectedMovie(movie)}
                                            >
                                                {movie.Title} ({movie.Year})
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {selectedMovie && <p className="selected-movie-info">Filme Selecionado: {selectedMovie.Title}</p>}

                            <div className="modal-actions">
                                <button type="button" className="btn btn-secondary" onClick={resetModal}>Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={handleCreateRental}>Salvar Aluguel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Alugueis;
