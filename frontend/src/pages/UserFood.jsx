import React, { useState, useEffect } from 'react';
import useStore from '../store';
import ModalFood from '../components/ModalFood';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const DateInput = styled.input`
  display: block;
  margin: 0 auto 20px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background-color: ${(props) => (props.active ? '#007BFF' : '#ccc')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#999')};
  }
`;

const MealSection = styled.div`
  text-align: center;
`;

const MealImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const RegisterButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const CommentsSection = styled.div`
  text-align: left;
  margin-top: 20px;
`;

const CommentsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CommentInput = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const CommentButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007BFF;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserFoodPage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTab, setSelectedTab] = useState('아침');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const meals = useStore((state) => state.meals);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const openModal = () => {
    if (selectedDate) {
      setIsModalOpen(true);
    } else {
      alert('날짜를 먼저 선택해주세요.');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const mealData = meals[selectedDate] ? meals[selectedDate][selectedTab] : null;

  return (
    <PageContainer>
      <Title>식단</Title>
      <DateInput type="date" onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate} />

      <Tabs>
        <TabButton active={selectedTab === '아침'} onClick={() => setSelectedTab('아침')}>아침</TabButton>
        <TabButton active={selectedTab === '점심'} onClick={() => setSelectedTab('점심')}>점심</TabButton>
        <TabButton active={selectedTab === '저녁'} onClick={() => setSelectedTab('저녁')}>저녁</TabButton>
        <TabButton active={selectedTab === '간식'} onClick={() => setSelectedTab('간식')}>간식</TabButton>
      </Tabs>

      {mealData ? (
        <MealSection>
          <MealImage src={URL.createObjectURL(mealData.image)} alt={selectedTab} />
          <Comments date={selectedDate} mealType={selectedTab} />
        </MealSection>
      ) : (
        <RegisterButton onClick={openModal}>등록</RegisterButton>
      )}

      {isModalOpen && <ModalFood date={selectedDate} mealType={selectedTab} onClose={closeModal} />}
    </PageContainer>
  );
};

const Comments = ({ date, mealType }) => {
  const [comment, setComment] = useState('');
  const meals = useStore((state) => state.meals);
  const addComment = useStore((state) => state.addComment);

  const handleAddComment = () => {
    addComment(date, mealType, comment);
    setComment('');
  };

  return (
    <CommentsSection>
      <h3>댓글</h3>
      <CommentsList>
        {meals[date][mealType].comments.map((c, i) => (
          <CommentItem key={i}>{c}</CommentItem>
        ))}
      </CommentsList>
      <div>
        <CommentInput value={comment} onChange={(e) => setComment(e.target.value)} />
        <CommentButton onClick={handleAddComment}>댓글 남기기</CommentButton>
      </div>
    </CommentsSection>
  );
};

export default UserFoodPage;
