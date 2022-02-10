import { useState } from 'react';
import { GlobalStyle } from './styles/global'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { TransactionModal } from './components/TransactionModal'
import { TransactionsProvider } from './hooks/useTransactions'


export const App = () => {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  const handleClickOpenModal = () => setIsNewTransactionModalOpen(true);
  const handleClickCloseModal = () => setIsNewTransactionModalOpen(false);
  
  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleClickOpenModal}/>
      <Dashboard />
      <TransactionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleClickCloseModal}
      />
    </TransactionsProvider>
  );
};
