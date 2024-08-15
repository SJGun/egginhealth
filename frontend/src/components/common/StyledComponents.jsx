  /* Modal의 스타일을 오버라이딩할 CSS 파일 */
  import styled from 'styled-components';
  import Modal from 'react-modal';
  import { HiChevronRight } from "react-icons/hi";
  import DatePicker from 'react-datepicker';
  Modal.setAppElement('#root'); // 모달이 열릴 때 접근성을 위해 애플리케이션 루트를 설정합니다.

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '10px',
      width: '300px',
      backgroundColor: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
  };

  const PageContainer = styled.div`
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #F8F7F4;
  `;

  const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
  `;


  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: gray;
  `;
  const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  `;

  const TabButton = styled.button`
    background-color: ${(props) => (props.active ? '#FFD66B' : '#FFFFFF')};
    color: ${(props) => (props.active ? '#FFFFFF' : '#DFDFDF')};
    padding: 0px 20px;
    border: none;
    border-radius: 20px;
    margin: 0 5px;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => (props.active ? '#FFEEB0' : '#999')};
    }
  `;

  const DietSectionContainer = styled.div`
    text-align: center;
  `;

  const DietImage = styled.img`
    max-width: 100%;
    height: auto;
    background-color: white;
  `;

  const RegisterButtonContainer = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background-color: #FFD66B;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #FFEEB0;
    }
  `;

  const CommentsSection = styled.div`
    text-align: left;
    margin-top: 20px;
    margin-bottom: 80px;
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
    width: 100%;
    padding: 10px;
    padding-right: 40px; /* 아이콘 공간 확보 */
    /* border-radius: 5px; */
    /* border: 1px solid #ccc; */
    box-sizing: border-box; 
    position: relative;
  `;


  const CommentButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #FFD66B;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #FFEEB0;
    }
  `;

  const ImagePreview = styled.img`
    width: 100%;
    height: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  `;

  const Textarea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  `;

  const Button = styled.button`
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 5px;
    border: none;
    background-color: ${props => props.close ? '#6c757d' : '#FFD66B'};
    color: #fff;
    cursor: pointer;
  `;
  const StyledModal = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `;

  const CommentInputWrapper = styled.div`
    position: fixed;
    bottom: 76px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    width: 360px;
  `;



  const CommentIcon = styled(HiChevronRight )`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 30px;
    height: 30px;

  `;

  const AddButton = styled.div`
      margin-left: 8px;
      width: 35px; /* 버튼의 너비 */
      height: 35px; /* 버튼의 높이 */
      background-color: #ffeb3b; /* 버튼 배경 색상 (노란색) */
      color: white; /* 글자 색상 */
      border-radius: 50%; /* 원형으로 만들기 */
      display: flex; /* Flexbox로 중앙 정렬 */
      align-items: center; /* 수직 중앙 정렬 */
      justify-content: center; /* 수평 중앙 정렬 */
      font-size: 30px; /* 글자 크기 */
      font-weight: bold; /* 글자 두께 */
      cursor: pointer; /* 마우스 커서를 포인터로 변경 */
      transition: background-color 0.3s; /* 호버 시 부드러운 색상 변화 */
      margin-bottom: 10px;
      padding-bottom: 3px;
      &:hover {
          background-color: #fdd835; /* 호버 시 색상 변화 */
      }
  `;
  const ButtonContainer = styled.div`
    
  `

  const Mini = styled.div`
    width: 100px;
    height: 25px;
    background-color: #FFD66B;
    color:white;
    display: flex;
    border-radius: 60px;
    align-items: center;
    justify-content: center;
    font-size : 12px;

  ` 
  const MiniContainer = styled.div`
    display: flex;
    justify-content: center; 
    padding : 10px 30px;
  `
  const MiniPointer = styled.div`
    width: 100px;
    height: 50px;
    background-color: #FFD66B;
    color: white;
    display: flex;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
    margin-right:8px;
    &:hover {
      background-color: #FFEEB0;
    }
  `;

  const MiniPointerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
  const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px; 
    justify-content: center;
    margin-top: 20px; 
  `;
  export {
    PageContainer,
    Title,
    AddButton,
    TabsContainer,
    TabButton,
    DietSectionContainer,
    DietImage,
    RegisterButtonContainer,
    CommentsSection,
    CommentsList,
    CommentItem,
    CommentInput,
    CommentButton,
    customStyles as StyledModalStyles,
    ImagePreview,
    Textarea,
      Button,
      StyledModal,
    CommentInputWrapper,
    CommentIcon,
    Container,
    Mini,
    MiniContainer,
    MiniPointer,
    MiniPointerContainer,
    ButtonWrapper
  };
