// RegisterButtonContainer.js
import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  padding: 10px 10px;
  border: none;
  width: 50px;
  border-radius: 10px;
  background-color: #FFD66B;
  color: white;
  cursor: pointer;
  text-align: center; /* 텍스트 중앙 정렬 */

  &:hover {
    background-color: #FFEEB0;
  }
`;

const ButtonText = styled.span`
  font-size: 12px;
  color: white;
`;

const RegisterButtonContainer = ({ onClick }) => (
  <Button onClick={onClick}>
    <ButtonText>수정</ButtonText>
  </Button>
);

export default RegisterButtonContainer;
