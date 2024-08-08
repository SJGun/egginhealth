import React from 'react';
import styled from 'styled-components';
import profile from '../../assets/profile.png';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #f8f8f8;
  border-radius: 15px;
  padding: 20px;
  width: 350px;
  height: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const UserList = styled.div`
  margin: 20px 0;
  max-height: 600px;
  overflow-y: auto;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;


const AddButton = styled.button`
  background-color: #FFD66B;
  border: none;
  border-radius: 10px;
  padding: 15px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  width: 20%;
  margin-top: 20px;

  &:hover {
    background-color: #ffca28;
  }
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  padding: 10px;
  margin-left: 10px;
  width: 70px;
  text-align: center;
`;
const CloseButton = styled.button`
  background-color: #FF5757;
  border: none;
  border-radius: 10px;
  padding: 15px;
  color: white;
  font-size: 12px;
  cursor: pointer;
  width: 50%;
  margin-top: 20px;

  &:hover {
    background-color: #FF3F3F;
  }
`;
const users = [
  { id: 1, name: '강동형', remaining: 25, img: profile },
  { id: 2, name: '김민주', remaining: 24, img: profile },
  { id: 3, name: '김정민', remaining: 1, img: profile },
  { id: 4, name: '신재건', remaining: 28, img: profile },
];

export const ModalEditPT = ({ isOpen, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handlePTChange = (e) => {
    onClose();
  };
  
  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <h2>사용자 리스트</h2>
        <UserList>
          {users.map((user) => (
            <UserItem key={user.id}>
              <UserInfo>
                <UserImage src={user.img} alt={user.name} />
                <span>{user.name}</span>
              </UserInfo>
              <Input
              type="number"
              placeholder={user.remaining}
              />
              <AddButton onClick={handlePTChange}>수정</AddButton>
            </UserItem>
          ))}
        </UserList>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalContainer>
    </ModalOverlay>
  );
};
