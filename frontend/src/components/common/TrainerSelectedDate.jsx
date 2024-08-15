import React, { useEffect } from 'react';
import styled from 'styled-components';

const Date = styled.input`
  background-color: white;
  cursor: pointer;
  border-radius: 10px;
  font-size: 18px;
  text-align: center;
  box-sizing: border-box;
`;

const TrainerSelectedDate = ({ selectedDate, setSelectedDate }) => {
  const handleChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <Date type="date" onChange={handleChange} value={selectedDate} />
  );
};

export default TrainerSelectedDate;
