import React, { useState, useEffect } from "react";
import AddExerciseModal from "../../components/trainer/ModalAddUserExercise";
import Comments from "../../components/user/Comments";
import SelectedDate from "../../components/common/SelectedDate";
import ModalExercise from "../../components/user/exercise/ModalExercise";
import ExerciseList from "./../../components/user/exercise/ExerciseList";
import {
  ImagePreview,
  Mini,
  MiniContainer,
  MiniPointer,
  PageContainer,
  MiniPointerContainer,
  AddButton
} from "../../components/common/StyledComponents";
import { useNavigate } from "react-router-dom";
import RegisterButtonContainer from "../../components/common/button/RegisterButtonContainer"; // 수정 버튼
import RegisterBox from "../../components/common/button/RegisterBox"; // 등록 버튼
import { useStore, useTimeStore, useUserInfoStore } from "./../../store/store";
import { getExercise } from "./../../api/exercise";
import { ExerciseImg } from "./../../components/user/exercise/ExerciseImg";
import BoxUser from "../../components/trainer/BoxUser";
import NoImg from "../../components/user/Noimage";
import ModalDeleteExImg from "../../components/user/exercise/ModalDeleteExImg";
import styled from "styled-components";
import ButtonDelete from '../../components/common/button/ButtonDelete';


const FeedbackContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Block = styled.div`
  height: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Exercise = () => {
  const { selectedDate, setSelectedDate } = useTimeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [exData, setExData] = useState([]);
  const [hasImages, setHasImages] = useState(false); // 이미지 유무 상태 추가
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { userData } = useUserInfoStore();
  const userType = useStore((set) => set.userType);
  const userLoginId = useStore((set) => set.userId);
  const userLoginData = useStore((set) => set.userInfo);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null); 

  
  const openAddModal = () => setIsAddModalOpen(true);
  
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setSelectedExercise(null); // 초기화
  };
  const getKoreanISOString = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const kstDate = new Date(now.getTime() + kstOffset);

    return kstDate.toISOString();
  };

  const fetchExData = async () => {
    if (selectedDate && userData && userData.id) {
      try {
        const year = new Date(selectedDate).getFullYear();
        const month = String(new Date(selectedDate).getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
        const day = String(new Date(selectedDate).getDate()).padStart(2, '0')// 일자 포맷 맞추기
        const data = await getExercise(userData.id, year, month, day);
        setExData(data);        
      } catch (error) {
        console.error("운동 조회 실패", error);
      }
    }
  };
  
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (userData && userData.id) {
      fetchExData();
    }
  }, [
      selectedDate,
      userData,
      isModalOpen,
      isDeleteModalOpen,
      exData]);

  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate("/userfeedback");
  };
  const today = new Date().toISOString().split("T")[0];

  return (
    <PageContainer>
      <div>
        
        {userType === "TRAINER" ? (
          <div>
            <BoxUser
              userData={userData}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            /> 
            <MiniPointerContainer />
          </div>
        ) : (
          <FeedbackContainer>
            <SelectedDate
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </FeedbackContainer>
        )}
          <MiniPointerContainer>
            <MiniPointer onClick={handleFeedbackClick}>피드백 목록</MiniPointer>
            {selectedDate >= today && userLoginData.type === "TRAINER" ? (
            <AddButton onClick={openAddModal}>+</AddButton>
          ) : null}
          </MiniPointerContainer>
          <AddExerciseModal
            isOpen={isAddModalOpen}
            onClose={closeAddModal}
            selectedDate={selectedDate}
            userData={userData}
            setId={selectedExercise?.setId}
            fetchExData={fetchExData}
            setExData={setExData}
          />
        <ExerciseList
          selectedDate={selectedDate}
          exData={exData}
          userLoginData={userLoginData}
          userData={userData}
          fetchExData={fetchExData}
          setExData={setExData}
          openAddModal={openAddModal}
        />
        <div>
          <MiniContainer>
            <Mini>운동 사진</Mini>
          </MiniContainer>
          <ExerciseImg
            exData={exData}
            selectedDate={selectedDate}
            setHasImages={setHasImages}
          />
          {userType === "MEMBER" ? (
            selectedDate <= getKoreanISOString() ? (
              hasImages ? (
                <ButtonWrapper>
                <RegisterButtonContainer onClick={openModal} />
                <ButtonDelete onClick={openDeleteModal} />
                </ButtonWrapper>
              ) : (
                <RegisterBox onClick={openModal} />
              )
            ) : null
          ) : !hasImages ? (
            <NoImg />
          ) : null}

          {isModalOpen && (
            <ModalExercise
              date={selectedDate}
              onClose={closeModal}
              setHasImages={setHasImages}
              hasImages={hasImages}
            />
          )}
          {isDeleteModalOpen && (
            <ModalDeleteExImg
              exData={exData}
              onClose={closeDeleteModal}
              // 삭제 핸들러 추가
            />
          )}
        </div>
        <Comments
          date={selectedDate}
          type="E"
          exData={exData}
          fetchExData={fetchExData}
          userId={userLoginId}
          userData={userData}
        />
        <Block />
      </div>
    </PageContainer>
  );
};

export default Exercise;


