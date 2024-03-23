import React from "react"
import { FinanceControlProps } from "../../models/interfaces/FinanceControlProps/FinanceControlProps"
import { Movement } from "../../models/interfaces/Movement/Movement"
import Balance from "../Balance/Balance"
import Expenses from "../Expenses/Expenses"
import styled from "styled-components"


export const ContainerFinance = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

const FinanceControl = ({
    handleSetMoviment,
    balance,
    expenses
}: FinanceControlProps) => {
    const receiveNewMovement = (movement: Movement) => {
        movement && handleSetMoviment(movement)
    }

    return (
        <React.Fragment>
            <ContainerFinance>
                <Balance currentBalance={balance} emitMovement={receiveNewMovement} />
                <Expenses currentBalance={balance} currentExpenses={expenses} emitMovement={receiveNewMovement} />
            </ContainerFinance>
        </React.Fragment>
    )
}

export default FinanceControl