import { useTransactions } from '../../hooks/useTransactions';
import { Container } from "./styles";

export const Transactions = () => {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map( transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.value)}</td>
              <td>{transaction.category}</td>
              <td>{Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(transaction.createdAt))}</td>
            </tr>
          ))}           
        </tbody>
      </table>
    </Container>
  );
};