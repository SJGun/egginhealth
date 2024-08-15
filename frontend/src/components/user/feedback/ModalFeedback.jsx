import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import {
  registerFeedback,
  registerFeedbackToAI,
  updateFeedback,
} from "./../../../api/exercise";

// Styled Components
const StyledModal = styled(Modal)`
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  width: 360px;
  margin: auto;
  margin-top: 40px;
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  height: 80px;
`;

const FileInput = styled.input`
  margin-bottom: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 15px;
  border: none;
  background-color: ${(props) => (props.close ? "#6c757d" : "#FFD66B")};
  color: #fff;
  cursor: pointer;
`;

const FeedbackModal = ({
  isOpen,
  onClose,
  getKoreanISOString,
  fetchFeedbackData,
  feedbackData,
  userData,
}) => {
  const [exerciseName, setExerciseName] = useState("");
  const [memo, setMemo] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      const record = file;
      const createdAt = getKoreanISOString() + "Z";
      try {
        if (feedbackData) {
          const aiVideo = await registerFeedbackToAI(record, exerciseName);
          await updateFeedback(
            memo,
            exerciseName,
            aiVideo,
            createdAt,
            feedbackData.id
          );
        } else {
          const aiVideo = await registerFeedbackToAI(record, exerciseName);
          await registerFeedback(memo, exerciseName, aiVideo, createdAt);
        }

        await fetchFeedbackData();
        onClose();
        setExerciseName("");
        setMemo("");
        setFile(null);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    } else {
      alert("파일을 선택해주세요.");
    }
  };

  return (
    <StyledModal isOpen={isOpen} onClose={onClose}>
      <Title>피드백 등록</Title>
      <Input
        type="text"
        placeholder="운동 이름"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <Textarea
        placeholder="메모"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <FileInput type="file" accept="video/*" onChange={handleFileChange} />
      <Button onClick={handleFileUpload}>
        {feedbackData ? "수정" : "등록"}
      </Button>
      <Button close onClick={onClose}>
        닫기
      </Button>
    </StyledModal>
  );
};

export default FeedbackModal;
