
import React from 'react'

import { ButtonProps } from '../../models/interfaces/ButtonProps/ButtonProps'

import styled from 'styled-components'

export const ButtonTag = styled.button`
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-weight: 600;
    border-radius: 3px;
    padding: 12px 24px;
    border: 0;
    color: #242529;
    line-height: 1.15;
    font-size: 17px;

    &:disabled {
        background-color: #e43f4d43;
    }

    &.greenBg {
        background-color: #7af1a7;

        &:hover {
            transition: all 0.1s ease;
            box-shadow: 0 0 0 0 #fff, 0 0 0 3px #7af1a7;
        }
    }

    &.redBg {
        background-color: #e43f4d;

        &:enabled{
            &:hover {
                transition: all 0.1s ease;
                box-shadow: 0 0 0 0 #fff, 0 0 0 3px #e43f4d;
            }
        }
    }
`

const Button = ({
    title,
    priority,
    action,
    type,
    disable
}: ButtonProps) => {
    return (
        <React.Fragment>
            <ButtonTag
                onClick={action}
                type={type ? type : 'button'}
                className={`btn ${priority === 'Input' ? 'greenBg': 'redBg'}`}
                disabled={disable ? disable : false}
            >
                {title}
            </ButtonTag>
        </React.Fragment>
    )
}

export default Button