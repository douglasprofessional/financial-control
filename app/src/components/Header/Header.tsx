import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSackDollar } from "@fortawesome/free-solid-svg-icons"

import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    
    h2{
        margin-left: 1rem;
        font-weight: 500;
        font-size: 2.2rem;
        color: #dddcda;
    }
`


const Header = () => {
    return (
        <React.Fragment>
            <HeaderContainer>
                <FontAwesomeIcon icon={ faSackDollar } color="#7AF1A7" size="2x" />
                <h2> Controle Financeiro </h2>
            </HeaderContainer>
        </React.Fragment>
    )
}

export default Header