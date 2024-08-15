import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Arrow from "../../assets/static/Property_Arrow.png";
import { useStore, useUserInfoStore } from '../../store/store.js'
import { userInfo } from "../../api/main";
import BoxMain from '../user/main/BoxMain.jsx'
import profile from '../../assets/profile.png'
const BASE_URL = import.meta.env.VITE_API_URL;

const ChatComponent = ({ participantName, roomName, receiver }) => {
    console.log('참여자명 :', participantName, '방이름 :', roomName, '리시버 :', receiver);
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const receiverId = receiver; // 수신자 ID 상태 추가
    const stompClientRef = useRef(null);
    const messagesEndRef = useRef(null); // 스크롤 조정을 위한 ref 추가
    const userName = useStore(state => state.userInfo)
    const [userNameTr,setuserNameTr] = useState('')
    const userId = useStore((state)=>state.userId)


    useEffect(()=>{
        const fetchData = async ()=>{
            if (participantName ==roomName){
                const response = await userInfo(receiver)
                setuserNameTr(response)
            }
            else{
                const response = await userInfo(roomName)
                setuserNameTr(response)
            }
        }
        fetchData()
    },[])


    useEffect(() => {
        if (stompClientRef.current) {
            return; // 중복 연결 방지
        }
        const socket = new SockJS(`${BASE_URL}/chat`, null, {
            withCredentials: true // 쿠키를 포함하여 요청 전송
        });
        const client = Stomp.over(socket);

        client.connect({}, () => {
            console.log("Connected");
            client.subscribe("/user/queue/messages", (message) => {
                showMessage(JSON.parse(message.body));
            });

            client.subscribe("/user/queue/recordMessages", (message) => {
                console.log("return Message :" + message);
                showchatDtoListMessage(JSON.parse(message.body));
            });

            stompClientRef.current = client;
            // 컴포넌트가 렌더링된 직후 handleFetchInfo 실행
            handleFetchInfo();
        }, (error) => {
            console.error("Connection error:", error);
        });

        return () => {
            if (client && client.connected) {
                client.disconnect(() => {
                    console.log("Disconnected");
                });
            }
        };
    }, []); // 빈 배열을 사용하여 컴포넌트가 처음 렌더링될 때만 실행되도록 함

    useEffect(() => {
        // 채팅 메시지가 추가될 때마다 스크롤을 아래로 이동
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatMessages]);

    function showMessage(message) {
        setChatMessages((prevMessages) => [...prevMessages, message]);
    }

    function showchatDtoListMessage(message) {
        // 서버로부터 받은 이전 메시지 리스트를 chatMessages에 추가
        setChatMessages((prevMessages) => [...prevMessages, ...message.chatDtoList]);
    }

    function handleChatSubmit(e) {
        e.preventDefault();
        if (chatInput.trim() && stompClientRef.current) {
            // 한국 시간(UTC+9)으로 현재 시간 계산
            const now = new Date();
            const koreanOffset = 9 * 60; // 한국 시간대는 UTC+9, 분으로 계산
            const koreanTime = new Date(now.getTime() + (koreanOffset * 60 * 1000));
            const createdAt = koreanTime.toISOString(); // ISO 문자열로 변환

            // 메시지 데이터
            const message = {
                content: chatInput,
                senderId: participantName,
                receiverId: receiverId, // 수신자 ID 설정
                createdAt: createdAt,
                isRead: false
            };

            // 메시지를 서버로 전송
            stompClientRef.current.send("/app/sendMessage", {}, JSON.stringify(message));

            // 전송한 메시지를 화면에 추가
            // showMessage(message);

            // 입력 필드 초기화
            setChatInput("");
        }
    }

    function handleChatInputChange(e) {
        setChatInput(e.target.value);
    }

    function handleFetchInfo() {
        console.log("Call Chat Memory");
        if (stompClientRef.current) {
            // 메세지 받아오는 API 명세 부분
            const message = {
                senderId: participantName,
                roomName: roomName
            };
            console.log('메세지 :', message);
            stompClientRef.current.send("/app/recordMessage", {}, JSON.stringify(message));
        }
    }

    const formatTime = (isoString) => {
        const date = new Date(isoString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${ampm} ${formattedHours}:${formattedMinutes}`;
    };

    return (
        <div id="chat-container">
            {receiver == 0 ? <div><BoxMain /></div> : <div><div id="messages" className='max-h-[660px] overflow-auto top-0'>
                {chatMessages.map((message, index) => (
                    <div key={index} className={`flex p-[10px] ${message.senderId == participantName ? 'justify-end' : 'justify-start'}`}>
                        {message.senderId == participantName ? (
                            <div className="flex flex-row-reverse items-center">
                            <div className="bg-yellow-400 text-white rounded-t-[10px] rounded-l-[10px] p-[10px] max-w-full">
                                <div className="mr-[10px]">
                               {message.content}
                               </div>
                               <div className="text-[10px] text-gray-500 mt-[5px]">
                                    {formatTime(message.createdAt)}
                               </div>
                            </div>
                        </div>
                        ) : (
                            userName.type === 'MEMBER' ? (
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col items-center mr-[10px]">
                                            <img src={userNameTr.imgUrl|| profile} alt="트레이너사진" className="w-[30px] h-[30px] rounded-full mb-[5px]"/>
                                        <strong>{userName.trName}</strong>
                                    </div>
                                    <div className="bg-white text-black rounded-t-[10px] rounded-r-[10px] p-[10px] max-w-full">
                                        <div className="ml-[10px]">
                                       {message.content}
                                       </div>
                                       <div className="text-[10px] text-gray-500 mt-[5px]">
                                            {formatTime(message.createdAt)}
                                       </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col items-center mr-[10px]">
                                            <img src={userNameTr.imgUrl} alt="유저사진" className="w-[30px] h-[30px] rounded-full mb-[5px]"/>
                                        <strong>{userNameTr.name}</strong>
                                    </div>
                                    <div className="bg-white text-black rounded-t-[10px] rounded-r-[10px] p-[10px] max-w-full">
                                        <div className="ml-[10px]">
                                       {message.content}
                                       </div>
                                       <div className="text-[10px] text-gray-500 mt-[5px]">
                                             {formatTime(message.createdAt)}
                                       </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* 스크롤을 위한 빈 div 추가 */}
            </div>
                <form onSubmit={handleChatSubmit} className="w-[290px] m-auto flex fixed bottom-[76px] h-[50px] item-center justify-center ml-[70px]">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={handleChatInputChange}
                        placeholder="메세지를 입력해주세요"
                        className="w-full"
                    />
                    <button type="submit" className="absolute m-auto right-[20px] top-[5px] w-[30px] h-[30px]">
                        <img src={Arrow} />
                    </button>
                </form></div>}

        </div>
    );
};

export default ChatComponent;
