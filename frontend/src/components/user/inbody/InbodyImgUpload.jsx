// components/common/ImageUpload.js
import React from 'react';
import styled from 'styled-components';
import { uploadOCR } from '../../../api/inbody';
import { getInbodyParsingResult } from '../../../hooks/inbodyParsing';
import { MdOutlineInsertPhoto } from "react-icons/md";


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

const ImageUpload = ({ setInbodyData }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const ocrResult = await uploadOCR(file);

        const formatData = getInbodyParsingResult(ocrResult);
        formatData.imageFile = file;
        formatData.height = '0'; 

        setInbodyData(formatData);
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
  };

  return (
    <div>
      <UploadButton>
      <StyledIcon />
      <HiddenFileInput type="file" accept="image/*" onChange={handleFileChange} />
      </UploadButton>
    </div>
  );
};

export default ImageUpload;
