import React, { useState } from 'react'

import { BalanceProps } from '../../models/interfaces/BalanceProps/BalanceProps'
import { FormContainerProps } from '../../models/interfaces/FormContainerProps/FormContainerProps'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDollar } from '@fortawesome/free-solid-svg-icons'

import Button from '../Button/Button'
import { FormatMoney } from '../../utils/util'

import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Card = styled.div`
    background-color: #36383e;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 500px;
    height: 300px;
    border-radius: 1.2rem;

    h2{
        margin-left: 1rem;
        font-weight: 500;
        font-size: 2.2rem;
        color: #dddcda;
    }

    h3 {
        margin-left: 1rem;
        font-weight: 500;
        font-size: 2.2rem;
        color: #dddcda;
    }
`

export const CardHeader = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -2rem;
`
export const FormContainer = styled.div<FormContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;

    & input{
        background: ${(props: FormContainerProps) => props.invalid ? '#e43f4d7a' : 'transparent'};
        box-shadow: ${(props: FormContainerProps) => props.invalid ? 'inset #e43f4d 0 0 0 2px' : ''};
    }
`

export const FormInput = styled.input`
    box-shadow: inset #dddcda 0 0 0 2px;
    border: 0;
    background: rgba(0, 0, 0, 0);
    appearance: none;
    width: 50%;
    position: relative;
    border-radius: 10px;
    padding: 9px 12px;
    line-height: 1.4;
    color: #dddcda;
    font-size: 16px;
    font-weight: 400;
    height: 30px;
    transition: all 0.2s ease;  
    
    &:hover {
        box-shadow: 0 0 0 0 #fff inset, #7af1a7 0 0 0 2px;
    }

    &:focus {
        background: #ffffff00;
        outline: 0;
        box-shadow: 0 0 0 0 #fff inset, #7af1a7 0 0 0 3px;
    }
`

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
`

// tipando o objeto Balance com a interface Balance
const Balance = ({
    emitMovement,
    currentBalance
}: BalanceProps) => {
    const [renderInputForm, setRenderInputForm] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [inputName, setInputName] = useState('')
    const [inputValue, setInputValue] = useState('')

    // se for true, retorna false e se for false, retorna true
    const handleRenderInputForm = () => setRenderInputForm(!false)

    // limpaza do formulário
    const hideInputForm = () => {
        setRenderInputForm(false)
        setIsFormValid(false)
        setInputName('')
        setInputValue('')
    }

    const formSubmitHandler = (event: React.FocusEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(inputName.trim().length === 0 || inputValue.trim().length === 0){
            setIsFormValid(false)
            return
        }

        { /* Limpando o formulário */ }
        hideInputForm()

        { /* Emitindo nova movimentação */}
        emitMovement({
            name: inputName,
            value: inputValue,
            type: 'Input' // entrada de saldo
        })
    }

    const handleInputNameForm = (event: React.FocusEvent<HTMLInputElement>) => {
        {/* forçando o tipo com "as" */}
        const eventTarget = event.currentTarget as HTMLInputElement
        const eventValue = eventTarget.value

        {/* se foi escrito algo, a validação será true */}
        inputName.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false)

        {/* setando o valor digitado */}
        setInputName(eventValue)
    }

    const handleInputValueForm = (event: React.FocusEvent<HTMLInputElement>) => {
        const eventTarget = event.currentTarget as HTMLInputElement
        const eventValue = eventTarget.value

        inputValue.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false)

        setInputValue(eventValue)
    }

    return (
        <React.Fragment>
            <Container>
                <Card>
                    <CardHeader>
                        <FontAwesomeIcon icon={faDollar} color='#7AF1A7' size='2x' />
                        <h2>Saldo</h2>
                    </CardHeader>

                    <h3>
                        {/* como a função espera uma String, precisa transformar currentBalance em uma String */}
                        { currentBalance > 0 ? FormatMoney(String(currentBalance)) : 'R$ 0'}
                    </h3>

                    {/* Se for false */}
                    {!renderInputForm && (
                        <Button
                            action={handleRenderInputForm}
                            title='Entrada'
                            priority='Input'
                        />
                    )}

                    {/* Se for false */}
                    {renderInputForm && (
                        <form onSubmit={formSubmitHandler}>
                            <FormContainer invalid={!isFormValid}>
                                <FormInput
                                    type="text" 
                                    placeholder='Nome'
                                    value={inputName}
                                    onChange={handleInputNameForm}
                                 />

                                <FormInput
                                    type="text"
                                    placeholder='Valor'
                                    value={inputValue}
                                    onChange={handleInputValueForm}
                                 />
                            </FormContainer>

                            <ActionsContainer>
                                <Button
                                    title='Cancelar'
                                    priority='Output'
                                    action={hideInputForm}
                                />

                                <Button
                                    title='Adicionar'
                                    priority='Input'
                                    type='submit'
                                />
                            </ActionsContainer>
                        </form>
                    )}
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default Balance