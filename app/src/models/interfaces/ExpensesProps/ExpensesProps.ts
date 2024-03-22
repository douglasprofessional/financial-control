import { Movement } from "../Movement/Movement";

export interface ExpensesProps {
    emitMovement: (movement: Movement) => void;
    currentExpenses: number
    currentBalance: number
}