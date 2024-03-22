import React, { useState } from 'react'
import { ExpensesProps } from '../../models/interfaces/ExpensesProps/ExpensesProps'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercent } from '@fortawesome/free-solid-svg-icons'
import { FormatMoney } from '../../utils/util'

import Button from '../Button/Button'
import { 
    ActionsContainer, 
    Card, 
    CardHeader, 
    Container, 
    FormContainer, 
    FormInput 
} from '../Balance/Balance'

const Expenses = ({
    emitMovement,
    currentExpenses,
    currentBalance
}: ExpensesProps) => {
    const [renderInputForm, setRenderInputForm] = useState(false)
    const [isFormValid, setIsFormValid] = useState(true)
    const [inputName, setInputName] = useState("")
    const [inputValue, setInputValue] = useState("")

    const handleRenderInputForm = () => setRenderInputForm(!false)

    const hideInputForm = () => {
        setRenderInputForm(false)
        setIsFormValid(true)
        setInputName("")
        setInputValue("")
    }

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(inputName.trim().length === 0 || inputValue.trim().length === 0){
            setIsFormValid(false)

            return
        }

        if(currentBalance >= Number(inputValue)){
            hideInputForm()

            emitMovement({
                name: inputName,
                value: inputValue,
                type: 'Output'
            })
        } else {
            setIsFormValid(false)
        }
    }

    const handleInputNameForm = (event: React.FormEvent<HTMLInputElement>) => {
        const eventTarget = event.currentTarget as HTMLInputElement
        const eventValue = eventTarget.value

        // verificando, primeiro, se teve entrada
        inputName.trim().length > 0 ? setIsFormValid(true) : setIsFormValid(false)

        // se teve entrada, adicione ao set
        setInputName(eventValue)
    }

    const handleInputValueForm = (event: React.FormEvent<HTMLInputElement>) => {
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
                        <FontAwesomeIcon
                            icon={faPercent}
                            color='#E43F4D'
                            size='2x'
                        />
                        <h2>Despesas</h2>
                    </CardHeader>

                    <h3>{currentExpenses > 0 ? FormatMoney(String(currentExpenses)) : 'R$ 0'}</h3>

                    {/* Se for false */}
                    {!renderInputForm && (
                        <Button
                            action={handleRenderInputForm}
                            title='Saída'
                            priority='Output'
                            disable={currentBalance === 0}
                        />
                    )}

                    {/* Se for true */}
                    {renderInputForm && (
                        <form onSubmit={formSubmitHandler}>
                            <FormContainer invalid={!isFormValid}>
                                <FormInput
                                    type='text'
                                    placeholder='Nome'
                                    value={inputName}
                                    onChange={handleInputNameForm}
                                />

                                <FormInput
                                    type='text'
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
                                    type='submit'
                                    title='Adicionar'
                                    priority='Input'
                                />                                
                            </ActionsContainer>
                        </form>
                    )}
                </Card>
            </Container>
        </React.Fragment>
    )
}

export default Expenses