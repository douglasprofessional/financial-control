import React, { useState } from "react"

import Header from "./components/Header/Header"
import { Movement } from "./models/interfaces/Movement/Movement"
import Movements from "./components/Movements/Movements"
import { FormatMoney } from "./utils/util"

function App() {
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
    }
  }

  return (
    <React.Fragment>
      <Header />

      <Movements movementsList={movementsItens} />
    </React.Fragment>
  )
}

export default App
