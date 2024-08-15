// DeleteButton.js
import styled from 'styled-components';

const DeleteButtonContainer = styled.button`
  background-color: red;
  padding: 10px 10px;
  border: none;
  width: 50px;
  border-radius: 10px;
  color: white;
  font-size: 12px; 
  cursor: pointer; 
  text-align: center; 

  &:hover {
    background-color: #ff6666;
  }
`;

const DeleteButton = ({ onClick }) => (
  <DeleteButtonContainer onClick={onClick}>삭제</DeleteButtonContainer>
);

export default DeleteButton;
