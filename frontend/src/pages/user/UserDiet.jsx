// UserDietPage.js
import React, { useState, useEffect } from "react";
import ModalDiet from "../../components/user/diet/ModalDiet";
import {
  PageContainer,
} from "../../components/common/StyledComponents";
import Tabs from "../../components/user/diet/Tabs";
import RegisterButtonContainer from "../../components/common/button/RegisterButtonContainer"; // 수정 버튼
import RegisterBox from "../../components/common/button/RegisterBox"; // 등록 버튼
import SelectedDate from "../../components/common/SelectedDate";
import Comments from "../../components/user/Comments";
import DietSection from "../../components/user/diet/DietSection";
import { useStore, useUserInfoStore, useTimeStore } from "../../store/store";
import { getDiet } from "../../api/diet";
import BoxUser from "../../components/trainer/BoxUser";
import ModalDeleteDiet from "../../components/user/diet/ModalDeleteDiet";
import NoImg from "../../components/user/Noimage";
import ButtonDelete from '../../components/common/button/ButtonDelete';
import styled from 'styled-components';

const UserDietPage = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dietData, setDietData] = useState(null);
  const [hasImages, setHasImages] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const userType = useStore((set) => set.userType);
  const userLoginId = useStore((set) => set.userId);
  const userLoginData = useStore((set) => set.userInfo);
  const { userData } = useUserInfoStore();
  const { selectedDate, setSelectedDate } = useTimeStore();

  const getKrDate = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstTime = new Date(now.getTime() + kstOffset);

    const year = kstTime.getUTCFullYear();
    const month = String(kstTime.getUTCMonth() + 1).padStart(2, "0");
    const day = String(kstTime.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchDietData = async () => {
    if (selectedDate && userData) {
      try {
        const [year, month, day] = selectedDate.split("-");
        const data = await getDiet(userData.id, year, month, day);
        setDietData(data);
      } catch (error) {
        console.error("식단 조회 실패:", error);
      }
    }
  };

  useEffect(() => {
    fetchDietData();
  }, [selectedDate, userData, selectedTab, isModalOpen, isDeleteModalOpen]);

  const openModal = () => {
    if (selectedDate) {
      setIsModalOpen(true);
    } else {
      alert("날짜를 먼저 선택해주세요.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const today = getKrDate();

  return (
    <PageContainer>
      {userType === "TRAINER" ? (
        <BoxUser
          userData={userData}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      ) : (
        <SelectedDate
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <DietSection
        dietData={dietData}
        selectedTab={selectedTab}
        selectedDate={selectedDate}
        setHasImages={setHasImages}
        setFilteredData={setFilteredData}
      />
      {userType === "MEMBER" ? (
        selectedDate <= today ? (
          <>
            {hasImages ? (
              <ButtonWrapper>
                <RegisterButtonContainer onClick={openModal} />
                <ButtonDelete onClick={openDeleteModal} />
              </ButtonWrapper>
            ) : (
              <RegisterBox onClick={openModal} />
            )}
          </>
        ) : (
          <NoImg />
        )
      ) : !hasImages ? (
        <NoImg />
      ) : null}

      {isModalOpen && (
        <ModalDiet
          date={selectedDate}
          type={selectedTab}
          onClose={closeModal}
          setHasImages={setHasImages}
          hasImages={hasImages}
          filteredData={filteredData}
        />
      )}
      {isDeleteModalOpen && (
        <ModalDeleteDiet
          filteredData={filteredData}
          onClose={closeDeleteModal}
        />
      )}
      <Comments
        date={selectedDate}
        type="D"
        dietData={dietData}
        dietType={selectedTab}
        fetchDiet={fetchDietData} 
        userId={userLoginId}
        userLoginData={userLoginData}
        userData={userData}
      />
    </PageContainer>
  );
};

export default UserDietPage;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼을 중앙에 배치 */
`;
