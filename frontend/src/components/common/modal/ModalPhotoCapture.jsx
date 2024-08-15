import React, { useRef, useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import ButtonCapture from '../button/ButtonCapture';
import { uploadOCR } from '../../../api/inbody';
import { useStore } from '../../../store/store';
import { getInbodyParsingResult } from '../../../hooks/inbodyParsing';

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
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
  width: 400px;
  outline: none;
  position: relative;
`;

const ModalContent = styled.div`
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.div`
  width: 100%;
  max-width: 360px;
  max-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  position: relative;
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ResultImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: ${props => (props.src ? 'block' : 'none')};
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;  /* 화면 하단에 버튼이 고정되도록 설정 */
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;
`;

const PhotoCaptureModal = ({ isOpen, closePhotoModal, setInbodyData }) => {
  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { userId } = useStore(state => ({ userId: state.userId }));

  useEffect(() => {
    if (isOpen) {
      setPhoto(null);
      startCamera();
    } else {
      stopCamera();
    }
    return stopCamera;
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ 
        video: {
          facingMode: { ideal: "environment" } // 후면 카메라 사용
        }
      });
      setStream(userStream);
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      const dataUrl = canvasRef.current.toDataURL('image/png');

      setPhoto(dataUrl);
      uploadPhoto(dataUrl);
    }
  };

  const uploadPhoto = async (dataUrl) => {
    try {
      const file = dataURLtoFile(dataUrl, 'captured-photo.png');
      const ocrResult = await uploadOCR(file);
      const formatData = getInbodyParsingResult(ocrResult);
      formatData.memberId = userId;
      formatData.imageFile = file;
      formatData.height = '0';
      console.log(formatData);

      setInbodyData(formatData);
      closePhotoModal();
    } catch (error) {
      console.error(error);
    }
  };

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(',');
    if (arr.length !== 2) {
      throw new Error('Invalid data URL format');
    }
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={closePhotoModal}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true} 
    >
      <ModalContent>
        <VideoContainer>
          {photo ? (
            <>
              <ResultImage src={photo} alt="Captured Photo" />
            </>
          ) : (
            <StyledVideo ref={videoRef} autoPlay />
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </VideoContainer>
        <ButtonContainer>
          <ButtonCapture onClick={capturePhoto} />
        </ButtonContainer>
      </ModalContent>
    </StyledModal>
  );
};

export default PhotoCaptureModal;
