import React from "react";
import styled from "styled-components";
import TrainerSelectedDate from './../common/TrainerSelectedDate';


const ChatListContainer = styled.div`
  margin-top: 20px;
`;

const ChatItem = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 15px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-weight: bold;
  margin-right : 20px;
`;

const BoxUser = ({ userData ,selectedDate,setSelectedDate }) => {
    
    const profileImg = userData.imgUrl;
   const profileName = userData.name;
   const props = { placeholder: 'Please Select...' };
  return (
    <ChatListContainer>
      <ChatItem>
        <UserInfo>
          <UserImage src={profileImg} alt={profileName} />
          <UserName>
            {userData.name}
          </UserName>
       
          <TrainerSelectedDate    selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}/>
        </UserInfo>
      </ChatItem>
    </ChatListContainer>
  );
};

export default BoxUser;
