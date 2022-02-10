import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model
  },
  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id:1,
          title: 'Aluguel',
          value: 1000,
          category: 'Casa',
          type: 'withdraw',
          createdAt: new Date('2022-02-04 09:00:00'), 
        },
        {
          id:2,
          title: 'Feira',
          value: 800,
          category: 'Casa',
          type: 'withdraw',
          createdAt: new Date('2022-02-05 09:00:00'), 
        },      
        {
          id:3,
          title: 'Desenvolvimento de website',
          value: 4000,
          category: 'Freela',
          type: 'deposit',
          createdAt: new Date('2022-02-01 09:00:00'), 
        },
        {
          id:4,
          title: 'Salário',
          value: 8000,
          category: 'Recorrente',
          type: 'deposit',
          createdAt: new Date('2022-02-05 09:00:00'), 
        },           
      ]
    })
  },
  routes() {
    this.namespace = 'api';
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })
    
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);