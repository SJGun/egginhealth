import React from 'react';
import UserEgg from '../../components/user/main/UserEgg';
import styled from 'styled-components';
import BoxMain from './../../components/user/main/BoxMain';
import BoxSchedule from './../../components/user/main/BoxSchedule';


const PTBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: #FFD66B;
  color: white;
  border-radius: 20px;
  font-weight: bold;
  text-align: center;
  width: 100px; 
  height: 30px;
`;

const UserMain = () => {
  const trainer = null;
  const timebox = [
    { day: '07.18(목)', time: 'AM 11:00 - 12:00' },
    { day: '07.21(일)', time: 'AM 11:00 - 12:00' },
    { day: '07.22(월)', time: 'AM 11:00 - 12:00' },
  ];
  const eggday = 0;

  return (
    <div>
      <UserEgg trainer={trainer} eggday={eggday}/>
      <PTBox>PT일정</PTBox>
      {trainer ? (
        <BoxSchedule timebox={timebox} />
      ) : (
        <BoxMain />
      )}
    </div>
  );
};

export default UserMain;
