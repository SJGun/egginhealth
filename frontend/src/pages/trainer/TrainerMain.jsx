import React, { useEffect, useState } from "react";
import { useStore, useUserInfoStore } from "../../store/store.js";
import RenderDaysForTrainer from "../../components/trainer/Calender/RenderDaysForTrainer.jsx";
import SheduleLogo from "../../assets/static/Property_Schedule.png";
import BtnRegister from "../../components/trainer/BtnRegister.jsx";
import BtnAddSchedule from "../../components/trainer/BtnAddSchedule.jsx";
import RenderDaysForTrainerExpand from "../../components/trainer/Calender/RenderDaysForTrainerExpand.jsx";
import BoxSchedule from "../../components/trainer/BoxSchedule.jsx";
import { ModalEditSchedule } from "../../components/trainer/ModalEditSchedule.jsx";
import plusbutton from "../../assets/plusbutton.png";
import { ModalAddSchedule } from "../../components/trainer/ModalAddSchedule.jsx";
import { checkMemberList } from "../../api/trainer.js";
import { requestPermission } from "../../firebase.jsx";




const TrainerMain = () => {
    const { userUpdate } = useStore();
    const [isExpanded, setIsExpanded] = useState(false);
    const [mouseStartY, setMouseStartY] = useState(null);
    const [selectedMemDate, setSelectedMemDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isAddOpen, setisAddOpen] = useState(false);
    const [isMemListEmpty, setIsMemListEmpty] = useState(false);
    const { userData, fetchData } = useUserInfoStore();
    const trainer = userData?.trId;
    const userId = useStore((state) => state.userId);
   
    useEffect(() => {
        const today = new Date();
        const formatMonth = `${today.getMonth() + 1}`;
        const formatYear = `${today.getFullYear()}`;
        userUpdate();

        fetchData(userId, formatMonth, formatYear);

        const hasVisited = localStorage.getItem("hasVisited");
        if (!hasVisited) {
            requestPermission();
            localStorage.setItem("hasVisited", "true");
        }
    }, [fetchData, trainer, userUpdate, userId]);

    const today = new Date();
    const formatMonth = `${today.getMonth() + 1}`;
    const formatMonthforAPI = formatMonth < 10 ? `0${formatMonth}` : formatMonth;
    const formatYear = `${today.getFullYear()}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const memberList = await checkMemberList();
        // 멤버 리스트가 비어있는지 확인
        if (memberList && memberList.length > 0) {
          setIsMemListEmpty(false);
        } else {
          setIsMemListEmpty(true);
        }

        const hasVisited = localStorage.getItem('hasVisited');
          if (!hasVisited) {
            requestPermission();
            // 방문 기록 저장
            localStorage.setItem('hasVisited', 'true');
          }

      } catch (error) {
        console.error('Error fetching member list:', error);
        setIsMemListEmpty(true); // 에러가 발생한 경우에도 비어있다고 간주
      }
    };

        fetchData();
    }, []);

    const handleMouseDown = (e) => {
        setMouseStartY(e.clientY);
    };

    const handleTouchStart = (e) => {
        setMouseStartY(e.touches[0].clientY);
    };

    const handleMouseUp = (e) => {
        if (mouseStartY !== null) {
            const mouseEndY = e.clientY;
            if (mouseStartY - mouseEndY > 50) {
                // Upward drag
                setIsExpanded(false);
            }
            if (mouseStartY - mouseEndY < -50) {
                // Downward drag
                setIsExpanded(true);
            }
            setMouseStartY(null);
        }
    };

    const handleTouchEnd = (e) => {
        if (mouseStartY !== null) {
            const mouseEndY = e.changedTouches[0].clientY;
            if (mouseStartY - mouseEndY > 50) {
                // Upward drag
                setIsExpanded(false);
            }
            if (mouseStartY - mouseEndY < -50) {
                // Downward drag
                setIsExpanded(true);
            }
            setMouseStartY(null);
        }
    };

    const handleDateChange = (memDateForTheDay) => {
        setSelectedMemDate(memDateForTheDay);
    };
    
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    const openAddModal = () => {
        setisAddOpen(true);
    };

    const closeAddModal = () => {
        setisAddOpen(false);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className={`transition-all duration-500 ease-in-out ${isExpanded ? "h-[650px]" : "h-[300px]"}`}>
                <div className='w-[313px] h-full bg-white rounded-[20px] mt-[26px] m-auto overflow-hidden'>
                    <p className='w-full m-auto text-left py-[6px] pl-[16px]'>
                        <span className='text-[32px]'>{formatMonth}월 </span>
                    </p>
                    <div className='inline-flex flex-col items-center justify-start h-full w-full'>
                        <div className='flex flex-row items-center justify-start w-full text-center'>
                            <p className='h-full text-[10px] font-medium text-gray-400 w-full'>일</p>
                            <p className='h-full text-[10px] font-medium text-gray-400 w-full'>월</p>
                            <p className='h-full text-[10px] font-medium text-gray-400 w-full'>화</p>
                            <p className='h-full text-[10px] font-medium text-gray-400 w-full'>수</p>
                            <p className='h-full text-[10px] font-medium text-gray-400 w-full'>목</p>
                            <p className='h-full text-[10px] font-medium text-gray-400 w-full'>금</p>
                            <p className='h-full text-[10px] font-medium text-gray-400 w-full'>토</p>
                        </div>
                        <div className='flex flex-col items-start justify-start w-full'>
                            {isExpanded ? (
                                <RenderDaysForTrainerExpand year={formatYear} month={formatMonthforAPI} userId={userId} />
                            ) : (
                                <RenderDaysForTrainer
                                    year={formatYear}
                                    month={formatMonthforAPI}
                                    onDateChange={handleDateChange}
                                    userId={userId}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {!isExpanded && (
                <>
                    <div className='flex items-center justify-center mt-5'>
                        <div className=''>
                            <img src={SheduleLogo} alt='Schedule Logo' />
                        </div>
                        <div className='absolute ml-[250px]'>
                            <img src={plusbutton} alt='Add Button' onClick={openAddModal} className='cursor-pointer' />
                        </div>
                        <ModalAddSchedule isOpen={isAddOpen} onRequestClose={closeAddModal} setSelectedMemDate={setSelectedMemDate} />
                    </div>
                    <div className='flex flex-col items-center justify-center mt-[20px]'>
    {isMemListEmpty ? (
        <BtnRegister />
    ) : selectedMemDate !== null &&
      selectedMemDate.length !== 0 &&
      Array.isArray(selectedMemDate) ? (
        selectedMemDate.map((schedule, index) => (
            <div key={index} className="w-full mb-[10px]">
                <BoxSchedule onClick={openModal} userSchedule={schedule} />
                <ModalEditSchedule isOpen={isOpen} onRequestClose={closeModal} user={schedule} setSelectedMemDate={setSelectedMemDate} />
            </div>
        ))
    ) : (
        <BtnAddSchedule />
    )}
</div>
                </>
            )}
        </div>
    );
};

export default TrainerMain;
