// components/common/ImageUpload.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { getInbodyParsingResult } from '../../../hooks/inbodyParsing';
import { MdOutlineInsertPhoto } from "react-icons/md";
import eggImg from '../../../assets/egg.gif'; 
import { useStore } from '../../../store/store';
import { uploadOCR } from '../../../api/inbody';

const UploadButton = styled.label`
  background-color: #FFD66B;
  border: none;
  border-radius: 50%;
  padding: 5px;
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const StyledIcon = styled(MdOutlineInsertPhoto)`
  font-size: 35px; 
  color: white;   
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.img`
  margin-bottom: 10px;
`;

const LoadingText = styled.p`
  color: white;
  font-size: 18px;
  margin: 0;
`;

const ImageUpload = ({ setInbodyData }) => {
  const [loading, setLoading] = useState(false); 
  const userId = useStore((state) => state.userId);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true); 
      try {
        let formatData;
        const ocrResult = await uploadOCR(file);
        console.log('인바디파싱 성공22',ocrResult);
        
        try {
          formatData = await getInbodyParsingResult(ocrResult);
        } catch (error) {
          console.error('getInbodyParsingResult에서 오류 발생:', error);
          formatData = {
            imageFile: file,
            height: '0',
            memberId: userId,
          };
        }
        formatData.imageFile = file;
        formatData.memberId = userId;
        
        await setInbodyData(formatData); 
      } catch (error) {
        console.error('Error uploading photo:', error);
      } finally {
        setLoading(false); 
      }
    }
  };

  return (
    <div>
      <UploadButton>
        <StyledIcon />
        <HiddenFileInput type="file" accept="image/*" onChange={handleFileChange} />
      </UploadButton>
      {loading && (
        <LoadingOverlay>
          <LoadingSpinner src={eggImg} alt="Loading..." />
          <LoadingText>인바디 파싱중...</LoadingText>
        </LoadingOverlay>
      )}
    </div>
  );
};

export default ImageUpload;
