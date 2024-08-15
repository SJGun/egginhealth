import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { connectCode } from '../../../api/main';
import { useUserInfoStore,useStore } from '../../../store/store';
import { useNavigate } from 'react-router-dom';


const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  outline: none;
`;

const ModalContent = styled.div`
  text-align: center;
`;

const InputField = styled.input`
  width: calc(100% - 40px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const ConnectButton = styled.button`
  padding: 10px 20px;
  background-color: #ffd66b;
  border-radius: 10px;
  color: white;
  width: 80%;
  border: none;
  cursor: pointer;
`;

const ModalConnect = ({ isOpen, onRequestClose }) => {
  const [authCode, setAuthCode] = useState('');
  const { fetchData } = useUserInfoStore();
  const userId = useStore((state)=>state.userId)
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setAuthCode(event.target.value); 
  };

  const handleConnect = async () => {
    try {
      const response = await connectCode(authCode);
      console.log(response);
      if (response && response.data) {
        const formatMonth = new Date().getMonth() + 1;
        const formatYear = new Date().getFullYear();

        await fetchData(userId, formatMonth, formatYear);
      }
      onRequestClose();
    } catch (error) {
      console.error("연결 중 오류 발생:", error);
    }

    await fetchData(userId);

    // 현재 경로가 /userchat이면 /usermain으로 이동
    if (window.location.pathname === '/userchatroom') {
      navigate('/usermain');
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
    >
      <ModalContent>
        <h2>인증번호를 입력해주세요</h2>
        <InputField 
          type="text" 
          placeholder="인증번호 입력" 
          value={authCode} 
          onChange={handleInputChange} 
        />
        <ConnectButton onClick={handleConnect}>연결하기</ConnectButton>
      </ModalContent>
    </StyledModal>
  );
};

export default ModalConnect;
