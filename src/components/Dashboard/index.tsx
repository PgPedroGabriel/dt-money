import { Container } from "./styles";
import { Summary } from "../Summary";
import { Transactions } from '../Transactions'

export const Dashboard = () => {
  

  return (
    <Container>
      <Summary />
      <Transactions />
    </Container>
  )
}
