// components/common/modal/ModalAddInbody.js
import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import ButtonCamera from "../../../components/common/button/ButtonCamera";
import PhotoCaptureModal from "../../../components/common/modal/ModalPhotoCapture";
import ImageUpload from "./InbodyImgUpload";
import { uploadInbodyData } from "../../../api/inbody";
import { useStore } from "../../../store/store";

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f7f4;
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
  z-index: 100;
`;

const ModalContent = styled.div`
  text-align: center;
`;

const InbodyBox = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  margin: 10px 0;
`;

const InputLabel = styled.label`
  flex: 1;
  text-align: left;
  margin-right: 10px;
`;

const InputField = styled.input`
  flex: 2;
  padding: 10px 0;
  width: 50%;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  text-align: center;

  &:focus {
    border-bottom: 1px solid #ffd66b;
  }
`;

const UnitLabel = styled.span`
  flex: 1;
  text-align: right;
`;

const RegisterButton = styled.button`
  background-color: #ffd66b;
  border: none;
  border-radius: 5px;
  padding: 10px;
  color: white;
  cursor: pointer;
  width: 100%;
`;

const CameraButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 3px; /* 버튼 간격 조절 */
`;

const ModalAddInbody = ({ isOpen, onRequestClose, fetchData }) => {
  const [photoModalIsOpen, setPhotoModalIsOpen] = useState(false);
  const [inbodyData, setInbodyData] = useState({
    weight: "",
    muscle: "",
    fat: "",
    bmi: "",
    fatPercent: "",
    fatPercentage: "",
    compositionScore: "",
    height: "",
    imageFile: "",
    memberId: "",
  });
  const userId = useStore((state) => state.userId);
  const openPhotoModal = () => {
    setPhotoModalIsOpen(true);
  };

  const closePhotoModal = () => {
    setPhotoModalIsOpen(false);
  };

  const handleInputChange = (e, key) => {
    setInbodyData({
      ...inbodyData,
      [key]: e.target.value,
    });
  };

  const handleFileSelect = (file) => {
    setInbodyData({
      ...inbodyData,
      imageFile: file,
    });
  };

  const inbodyBoxContent = [
    { key: "weight", label: "체중", unit: "kg" },
    { key: "muscle", label: "골격근량", unit: "kg" },
    { key: "fat", label: "체지방량", unit: "kg" },
    { key: "bmi", label: "BMI", unit: "kg/㎡" },
    { key: "fatPercentage", label: "체지방률", unit: "%" },
    { key: "compositionScore", label: "종합점수", unit: "점" },
  ];

  const updateData = async () => {
    inbodyData.memberId = userId;
    inbodyData.height = 0;
    await uploadInbodyData(inbodyData);

    await onRequestClose();
    await fetchData();
  };

  return (
    <>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
      >
        <ModalContent>
          <CameraButtonWrapper>
            <ButtonCamera onClick={openPhotoModal} />
            <ImageUpload
              onFileSelect={handleFileSelect}
              setInbodyData={setInbodyData}
            />
          </CameraButtonWrapper>
          <h2>검사지 등록하기</h2>
          {inbodyBoxContent.map((item, index) => (
            <InbodyBox key={index}>
              <InputLabel>{item.label}</InputLabel>
              <InputField
                type="text"
                value={inbodyData[item.key] || ""}
                onChange={(e) => handleInputChange(e, item.key)}
                placeholder=" "
              />
              <UnitLabel>{item.unit}</UnitLabel>
            </InbodyBox>
          ))}
          <RegisterButton onClick={updateData}>등록</RegisterButton>
          <PhotoCaptureModal
            isOpen={photoModalIsOpen}
            closePhotoModal={closePhotoModal}
            setInbodyData={setInbodyData}
            inbodyData={inbodyData}
          />
        </ModalContent>
      </StyledModal>
    </>
  );
};

export default ModalAddInbody;
