import React from 'react';
import styled from 'styled-components';
import profileImg from '../../assets/profile.png'; 
import arrowImg from '../../assets/arrow.png'; 

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  width: 90%;
  padding: 10px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px 0 10px 20px;
  cursor: pointer;
`;


const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
  flex-grow: 1;
`;

const TimeSlot = styled.span`
  font-size: 14px;
  color: #666;
  margin-right: 15px;
`;

const ArrowImage = styled.img`
  width: 24px;
  height: 24px;
`;

const BoxSchedule = ({ onClick,userSchedule }) => {
  return (
    <Container onClick={()=>onClick(userSchedule)}>
      <UserImage src={userSchedule.imgUrl||profileImg} alt="Profile" />
      <UserName>{userSchedule.name}</UserName>
      <TimeSlot>{userSchedule.startTime.substring(11, 16)} - {userSchedule.endTime.substring(11, 16)}</TimeSlot>
      <ArrowImage src={arrowImg} alt="Arrow" />
    </Container>
  );
};

export default BoxSchedule;
