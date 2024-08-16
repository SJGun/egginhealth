import React, { useEffect, useState } from "react";
import UserEgg from "../../components/user/main/UserEgg";
import { styled } from "styled-components";
import BoxMain from "./../../components/user/main/BoxMain";
import BoxSchedule from "./../../components/user/main/BoxSchedule";
import { useUserInfoStore, useStore } from "../../store/store";
import { userSchedule } from "../../api/main";
import { requestPermission } from "../../firebase.jsx";

const Container = styled.div`
  max-height: 800px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const PTBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #ffd66b;
  color: white;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  width: 100px;
  height: 30px;
`;

const Message = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
`;

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 50px;
`;

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutes} ${ampm}`;
};

const UserMain = () => {
  const { userData, fetchData } = useUserInfoStore();
  const { userUpdate, userId } = useStore();
  const [timebox, setTimebox] = useState([]);
  const trainer = userData?.trId;
  const eggday = userData?.totalEgg;

  useEffect(() => {
    const fetch = async () => {
      await userUpdate();
      const updatedUserId = useStore.getState().userId;

      if (updatedUserId) {
        const today = new Date();
        const formatMonth = `${today.getMonth() + 1}`;
        const formatYear = `${today.getFullYear()}`;
        try {
          await fetchData(updatedUserId, formatMonth, formatYear);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetch();

    if (trainer) {
      userSchedule(userId)
        .then((response) => {
          const convertedTimebox = response.map((schedule) => {
            const startDate = new Date(schedule.startTime);
            const endDate = new Date(schedule.endTime);
            const formattedDate = `${
              startDate.getMonth() + 1
            }.${startDate.getDate()}(${
              ["일", "월", "화", "수", "목", "금", "토"][startDate.getDay()]
            })`;
            const formattedStartTime = formatTime(startDate);
            const formattedEndTime = formatTime(endDate);

            const formattedTime = `${formattedStartTime} - ${formattedEndTime}`;

            return { day: formattedDate, time: formattedTime };
          });

          setTimebox(convertedTimebox);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [fetchData, trainer, userUpdate, userId]);

  return (
    <Container>
      <UserEgg trainer={trainer} eggday={eggday} />
      <PTBox>PT일정</PTBox>
      {trainer ? (
        timebox.length > 0 ? (
          <ScheduleContainer>
            <BoxSchedule timebox={timebox} />
          </ScheduleContainer>
        ) : (
          <Message>스케줄을 등록해주세요</Message>
        )
      ) : (
        <BoxMain />
      )}
    </Container>
  );
};

export default UserMain;
