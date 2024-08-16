import React, { useEffect, useState } from "react";
import styled from "styled-components";
import profile from "../../assets/profile.png";
import saladIcon from "../../assets/salad.png";
import exerciseIcon from "../../assets/exercise.png";
import videoIcon from "../../assets/feedback.png";
import arrow from "../../assets/arrow.png";
import { checkMemberList } from "../../api/trainer";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore, useStore } from "../../store/store";
import BtnRegister from "../../components/trainer/BtnRegister.jsx";
const Container = styled.div`
  padding: 20px;
`;

const UserList = styled.div`
  margin-top: 5px;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #f0f0f0;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserNameAndCount = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const RemainingCount = styled.span`
  font-size: 11px;
  color: gray;
`;

const UserStats = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 5px;
  filter: ${(props) => (props.active ? "none" : "grayscale(100%)")};
`;

const Arrow = styled.img`
  width: 30px;
  height: 30px;
`;

const TitleContainer = styled.div`
  margin-left: 140px;
`;

const TitleContent = styled.span`
  margin-left: 8px;
`;

const TrainerUserList = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const { fetchData } = useUserInfoStore();
  const today = new Date();
  const formatMonth = `${today.getMonth() + 1}`;
  const formatYear = `${today.getFullYear()}`;
  const userData = useUserInfoStore((state) => state.userData);
  const userId = useStore((state) => state.userId);

  const handleDetailMember = async (memberId) => {
    await fetchData(memberId, formatMonth, formatYear);
    await navigate(`/usercalender`);
  };

  useEffect(() => {
    const fetchMemberList = async () => {
      console.log("useEffect실행!");
      try {
        const response = await checkMemberList();
        console.log(response);
        setUserList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMemberList();
  }, [userData, userId]);

  return (
    <Container>
      {userList.length > 0 && (
        <TitleContainer>
          <TitleContent>식단</TitleContent>
          <TitleContent>운동</TitleContent>
          <TitleContent>피드백</TitleContent>
        </TitleContainer>
      )}

      <UserList>
        {userList.map((user) => (
          <UserItem
            key={user.memberId}
            onClick={() => handleDetailMember(user.memberId)}
          >
            <UserInfo>
              <UserImage src={user.imgUrl || profile} alt={user.name} />
              <UserNameAndCount>
                <UserName>{user.name}</UserName>
                <RemainingCount>남은 횟수: {user.ptCnt}</RemainingCount>
              </UserNameAndCount>
            </UserInfo>
            <UserStats>
              <Icon
                src={saladIcon}
                alt="식단 아이콘"
                active={user.isDiet ? 1 : 0}
              />
              <Icon
                src={exerciseIcon}
                alt="운동 아이콘"
                active={user.isExercise ? 1 : 0}
              />
              <Icon
                src={videoIcon}
                alt="영상 아이콘"
                active={user.isFeedback ? 1 : 0}
              />
            </UserStats>
            <Arrow src={arrow} />
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};

export default TrainerUserList;
