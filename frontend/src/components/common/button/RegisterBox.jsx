// RegisterBox.js
import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 8px;
  width: 320px; 
  height: 320px; 
  text-align: center;
  flex-direction: column;
`;

const PlusIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; 
  height: 40px; 
  border: 4px solid #DFDFDF; 
  border-radius: 8px; 
  margin-bottom: 10px; 
`;

const PlusIcon = styled.span`
  font-size: 30px;
  color: #DFDFDF;
  border: #DFDFDF;
`;

const ButtonText = styled.span`
  font-size: 16px;
  color: #DFDFDF;
`;

const RegisterBox = ({ onClick }) => (
  <ButtonContainer onClick={onClick}>
    <PlusIconContainer>
      <PlusIcon>+</PlusIcon>
    </PlusIconContainer>
    <ButtonText>사진을 등록해주세요</ButtonText>
  </ButtonContainer>
);

export default RegisterBox;
