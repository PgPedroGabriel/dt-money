import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface TransactionType {
  id: number,
  title: string,
  value: number,
  category: string,
  type: string,
  createdAt: string, 
}

type TransactionInput = Omit<TransactionType, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode,
}

interface TransactionsContextData {
  transactions: TransactionType[],
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}


const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({children}: TransactionsProviderProps) => {
  const [ transactions, setTransactions ] = useState<TransactionType[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  const createTransaction = async (transactionInput: TransactionInput) => {
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{
      transactions,
      createTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  return useContext(TransactionsContext);
}