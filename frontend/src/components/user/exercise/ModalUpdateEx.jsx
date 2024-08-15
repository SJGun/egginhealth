import React from "react";
import styled from "styled-components";
import { deleteEx } from "../../../api/exercise";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Button = styled.button`
  margin: 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    background-color: #FFD66B;
    color: white;
  }
  &:nth-child(2) {
    background-color: red;
    color: white;
  }
  &:last-child {
    background-color: #ccc;
    color: white;
  }
`;

const ActionModal = ({ isOpen, onClose, onEdit, onDelete, setId }) => {
  if (!isOpen) return null;
  const handleOverlayClick = (e) => {
    // Overlay를 클릭했을 때만 모달을 닫음
    
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleDelete = async () => {
    try {
      await deleteEx(setId); // deleteEx API 호출
      onDelete(); // 삭제 후 onDelete 함수 호출 (상태 업데이트 등)
      onClose(); // 모달 닫기

      
    } catch (error) {
      console.error("삭제 오류:", error);
      // 오류 처리 로직 추가 가능
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <Button onClick={onEdit}>수정</Button>
        <Button onClick={handleDelete}>삭제</Button>
        <Button onClick={onClose}>닫기</Button>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ActionModal;
