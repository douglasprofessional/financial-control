import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MovementsProps } from '../../models/interfaces/MovementsProps/MovementsProps'

import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'

import styled from 'styled-components';

export const MovementsHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    h2 {
        margin-left: 1rem;
        font-weight: 500;
        font-size: 2.2rem;
        color: #dddcda;
    }
`

export const MovimentationsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
`

export const Movimentation = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 8vh;
    background-color: #36383e;
    border-radius: 2.4rem;

    h2 {
        font-weight: 500;
        font-size: 2.2rem;
        color: #dddcda;
    }

    h3 {
        font-weight: 500;
        font-size: 2.2rem;
    }

    .balance_btn {
        color: #7af1a7;
    }
      
    .expense_btn {
        color: #e43f4d;
    }
`

const Movements = ({ movementsList }: MovementsProps) => {
    return (
        <React.Fragment>
            <MovementsHeader>
                <FontAwesomeIcon icon={faMoneyBillTransfer} color='#7AF1A7' size='2x' />

                <h2>
                    {`${movementsList.length > 0 ? 'Movimentações' : 'Sem movimentações a exibir!'}`}
                </h2>
            </MovementsHeader>

            {/* Se tiver alguma movimentação. true */}
            {movementsList.length > 0 && (
                // a cada iteração do map
                movementsList.map((movement) => (
                    // key é para criar um ID, para cada iteração
                    <MovimentationsContainer key={movement.id}>
                        <Movimentation>
                            <h2> {movement.name} </h2>

                            <h3 className={`${movement.type === 'Input' ? 'balance_btn' : 'expense_btn'}`}> 
                                {movement.type === 'Input' ? '+ ' : '- '}
                                {movement.value}
                            </h3>
                        </Movimentation>
                    </MovimentationsContainer>
                ))
            )}
        </React.Fragment>
    )
}

export default Movements