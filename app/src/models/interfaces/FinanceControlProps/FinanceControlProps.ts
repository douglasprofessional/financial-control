import { Movement } from '../Movement/Movement'

export interface FinanceControlProps {
    handleSetMoviment: (movement: Movement) => void;
    balance: number;
    expenses: number;
}