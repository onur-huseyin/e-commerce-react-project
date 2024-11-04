import styled from 'styled-components';

export const AddToCartButton = styled.button`
    background-color: ${props => props.isInCart ? '#dc3545' : '#91e595'};
    color: ${props => props.isInCart ? 'white' : '#406c42'};
    padding: 10px 16px;
    border: none;
    font-weight:600;
    font-size:12px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: ${props => props.isInCart ? '#c82333' : '#218838'};
        color:#fff;
    }
`;