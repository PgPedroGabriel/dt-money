import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

Modal.setAppElement('#root');

interface TransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const TransactionModal = ({isOpen, onRequestClose} : TransactionModalProps) => {
  const { createTransaction } = useTransactions();
  
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');
  const [type, setType ] = useState('deposit');

  const handleCreateNewTransaction = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      title,
      value,
      category,
      type,
    };
    await createTransaction(data);
    setTitle('');
    setValue(0);
    setCategory('');
    setType('deposit');
    onRequestClose();
  }
  
  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={onRequestClose} className="close-modal">
        <img src={closeImg} alt="fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>
        <input value={title} onChange={e => setTitle(e.target.value) }type="text" name="title" id="title" placeholder="Titulo"/>
        <input value={value} onChange={e => setValue(Number(e.target.value)) }type="number" name="value" id="value" placeholder="Valor"/>
        <TransactionTypeContainer>
          <RadioBox 
            type="button" 
            isActive={type === 'deposit'}
            onClick={() => setType('deposit')}
            activeColor='green'
          >
            <img src={incomeImg} alt="Entrada"  />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox 
            isActive={type === 'withdraw'}
            type="button" 
            onClick={() => setType('withdraw')}
            activeColor='red'
          >
            <img src={outcomeImg} alt="Saída"  />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input value={category} onChange={e => setCategory(e.target.value) } type="text" name="category" id="category" placeholder="Categoria"/>
        <button type="submit"> Cadastrar </button> 
      </Container>
    </Modal>
  )
};