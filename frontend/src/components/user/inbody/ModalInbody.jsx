import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import PlusBtn from "../../../assets/plusbutton.png";
import ModalAddInbody from "./ModalAddInbody";
import PhotoCaptureModal from "../../../components/common/modal/ModalPhotoCapture";
import { fetchBodyData } from "../../../api/inbody";
import { useStore } from "../../../store/store";

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
  z-index: 100;
`;

const ModalContent = styled.div`
  text-align: center;
  width: 100%;
`;

const ImageContainer = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const DropdownContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const DropdownButton = styled.button`
  background-color: #ffd66b;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 80%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DropdownMenu = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 20px;
  width: 80%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
`;

const DropdownItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const PlusButton = styled.img`
  margin-left: 300px;
  cursor: pointer;
`;

const ModalInbody = ({ isOpen, onRequestClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [photoModalIsOpen, setPhotoModalIsOpen] = useState(false);
  const [bodyData, setBodyData] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userInfo, userId, userType } = useStore();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openPhotoModal = () => {
    setPhotoModalIsOpen(true);
  };

  const closePhotoModal = () => {
    setPhotoModalIsOpen(false);
  };

  const fetchData = async () => {
    try {
      const year = 2024;
      const month = 8;
      const data = await fetchBodyData(userId, year, month);
      setBodyData(data);
      if (data.length > 0) {
        setSelectedPhoto(data[data.length - 1]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const handleDateClick = (item) => {
    setSelectedPhoto(item);
    setDropdownOpen(false);
  };

  return (
    <>
      <StyledModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        ariaHideApp={false}
      >
        <PlusButton src={PlusBtn} alt="PlusBtn" onClick={openModal} />
        <ModalContent>
          {selectedPhoto && (
            <ImageContainer>
              <img
                src={selectedPhoto.imageUrl}
                alt={`Inbody ${selectedPhoto.id}`}
              />
            </ImageContainer>
          )}

          <DropdownContainer>
            <DropdownButton onClick={() => setDropdownOpen(!dropdownOpen)}>
              {selectedPhoto
                ? new Date(selectedPhoto.createdAt).toLocaleDateString()
                : "Select Date"}
              <span>&#9662;</span>
            </DropdownButton>
            <DropdownMenu open={dropdownOpen}>
              {bodyData.map((item) => (
                <DropdownItem
                  key={item.id}
                  onClick={() => handleDateClick(item)}
                >
                  {new Date(item.createdAt).toLocaleDateString()}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </DropdownContainer>

          <ModalAddInbody
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            fetchData={fetchData}
          />
          <PhotoCaptureModal
            isOpen={photoModalIsOpen}
            onRequestClose={closePhotoModal}
          />
        </ModalContent>
      </StyledModal>
      <PhotoCaptureModal
        isOpen={photoModalIsOpen}
        onRequestClose={closePhotoModal}
      />
    </>
  );
};

export default ModalInbody;
