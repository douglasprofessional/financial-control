import React, { useState } from "react"

import FinanceControl from './components/FinanceControl/FinanceControl'
import Header from "./components/Header/Header"
import { Movement } from "./models/interfaces/Movement/Movement"
import Movements from "./components/Movements/Movements"
import { FormatMoney } from "./utils/util"

function App() {
  const [currentBalance, setCurrentBalance] = useState(0)
  const [currentExpenses, setCurrentExpenses] = useState(0)
  const [movementsItens, setMovementsItens] = useState<Array<Movement>>([])

  const setNewMovement = (movement: Movement) => {
    if(movement){
      setMovementsItens((prevMovements) => {
        const movements = [...prevMovements]
        movements.unshift({
          name: movement.name,
          value: FormatMoney(movement.value),
          type: movement.type,
          id: Math.random().toString()
        })

        return movements
      })

      movement.type === 'Input' && 
      setCurrentBalance(
        (prevBalance) => prevBalance + Number(movement.value)
      )

      if(movement.type === 'Output'){
        setCurrentExpenses(
          (prevExpenses) => prevExpenses + Number(movement.value)
        )
  
        currentBalance > 0 && 
        setCurrentBalance(
          (prevBalance) => prevBalance - Number(movement.value)
        )
      }
    }
  }

  return (
    <React.Fragment>
      <Header />

      <FinanceControl 
        balance={currentBalance} 
        expenses={currentExpenses} 
        handleSetMoviment={setNewMovement} 
      />

      <Movements movementsList={movementsItens} />
    </React.Fragment>
  )
}

export default App
