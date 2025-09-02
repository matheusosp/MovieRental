import React, { useState, useEffect } from 'react';
import "./clientes.css";

const Clientes = () => {
    const initialClients = [
        { id: 1, nome: 'Ana Maria', email: 'ana.maria@example.com', telefone: '(11) 98765-4321' },
        { id: 2, nome: 'Bruno Costa', email: 'bruno.costa@example.com', telefone: '(21) 91234-5678' },
        { id: 3, nome: 'Carlos Dias', email: 'carlos.dias@example.com', telefone: '(31) 95555-4444' },
    ];

    const [clients, setClients] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [formData, setFormData] = useState({ nome: '', email: '', telefone: '' });

    useEffect(() => {
        try {
            const storedClients = localStorage.getItem('clients');
            if (storedClients && JSON.parse(storedClients).length > 0) {
                setClients(JSON.parse(storedClients));
            } else {
                localStorage.setItem('clients', JSON.stringify(initialClients));
                setClients(initialClients);
            }
        } catch (error) {
            console.error("Failed to parse clients from localStorage", error);
            localStorage.setItem('clients', JSON.stringify(initialClients));
            setClients(initialClients);
        }
    }, []);

    const updateLocalStorage = (updatedClients) => {
        setClients(updatedClients);
        localStorage.setItem('clients', JSON.stringify(updatedClients));
    };

    const handleShowModal = (client = null) => {
        setEditingClient(client);
        setFormData(client || { nome: '', email: '', telefone: '' });
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingClient(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let updatedClients;
        if (editingClient) {
            // Atualizar
            updatedClients = clients.map(c => c.id === editingClient.id ? { ...c, ...formData } : c);
        } else {
            // Criar
            const newClient = { id: Date.now(), ...formData };
            updatedClients = [...clients, newClient];
        }
        updateLocalStorage(updatedClients);
        handleCancel();
    };

    const handleDelete = (id) => {
        if (window.confirm('Deseja realmente excluir este cliente?')) {
            const updatedClients = clients.filter(c => c.id !== id);
            updateLocalStorage(updatedClients);
        }
    };

    return (
        <>
            <div className="clientes-container">
                <h2>Gerenciamento de Clientes</h2>
                <button className="btn btn-primary" onClick={() => handleShowModal()}>
                    Cadastrar Novo Cliente
                </button>
                <table className="clientes-table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map(client => (
                        <tr key={client.id}>
                            <td>{client.nome}</td>
                            <td>{client.email}</td>
                            <td>{client.telefone}</td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => handleShowModal(client)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(client.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {isModalVisible && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>{editingClient ? 'Editar Cliente' : 'Cadastrar Cliente'}</h3>
                            <form onSubmit={handleFormSubmit}>
                                <div className="modal-form-group">
                                    <label>Nome</label>
                                    <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
                                </div>
                                <div className="modal-form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                                </div>
                                <div className="modal-form-group">
                                    <label>Telefone</label>
                                    <input type="text" name="telefone" value={formData.telefone} onChange={handleInputChange} required />
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Salvar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default Clientes;