import React from 'react';
import './Form.css';

const Form = ({ handleSubmit, onChange }) => {
    return (
        <form className='mt-2' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="Nome" className="form-label">Qual o seu nome:</label>
                <input
                    placeholder='Seu nome'
                    type="text"
                    name='Nome'
                    className="form-control"
                    id="Nome"
                    onChange={onChange}
                    required
                />
                <label htmlFor="Telefone" className="form-label">Qual o seu contato:</label>
                <input
                    placeholder='Seu contato'
                    type="number"
                    name='Telefone'
                    className="form-control"
                    id="Telefone"
                    onChange={onChange}
                    required
                />
            </div>

            <button type="submit" className="btn_btn-primary">Iniciar</button>
        </form>
    );
};

export default Form;