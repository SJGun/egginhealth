import React from 'react';
import styled from 'styled-components';
import CameraBtn from '../../../assets/camerabutton.png';

const StyledButton = styled.img`
  cursor: pointer;
  width: 50px;
  height: 50px;
`;

const ButtonCamera = ({ onClick }) => {
  return <StyledButton src={CameraBtn} alt="CameraButton" onClick={onClick} />;
};

export default ButtonCamera;
