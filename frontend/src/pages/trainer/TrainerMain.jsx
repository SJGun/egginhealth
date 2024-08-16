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
  const [selectedSchedule, setSelectedSchedule] = useState(null); // 선택된 스케줄 상태
  const [isAddOpen, setisAddOpen] = useState(false);
  const [isMemListEmpty, setIsMemListEmpty] = useState(false);
  const { userData, fetchData } = useUserInfoStore();
  const userId = useStore((state) => state.userId);
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  const today = new Date(now.getTime() + kstOffset);
  const formatMonth = `${today.getMonth() + 1}`;
  const formatMonthforAPI = formatMonth < 10 ? `0${formatMonth}` : formatMonth;
  const formatYear = `${today.getFullYear()}`;

  useEffect(() => {
    userUpdate();
    fetchData(userId, formatMonth, formatYear);
  }, [fetchData, userUpdate, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberList = await checkMemberList();
        if (memberList && memberList.length > 0) {
          setIsMemListEmpty(false);
        } else {
          setIsMemListEmpty(true);
        }
      } catch (error) {
        console.error("Error fetching member list:", error);
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
        setIsExpanded(false); // Upward drag
      }
      if (mouseStartY - mouseEndY < -50) {
        setIsExpanded(true); // Downward drag
      }
      setMouseStartY(null);
    }
  };

  const handleTouchEnd = (e) => {
    if (mouseStartY !== null) {
      const mouseEndY = e.changedTouches[0].clientY;
      if (mouseStartY - mouseEndY > 50) {
        setIsExpanded(false); // Upward drag
      }
      if (mouseStartY - mouseEndY < -50) {
        setIsExpanded(true); // Downward drag
      }
      setMouseStartY(null);
    }
  };

  const handleDateChange = (memDateForTheDay) => {
    setSelectedMemDate(memDateForTheDay);
  };

  const openModal = (schedule) => {
    setSelectedSchedule(schedule); // 클릭된 스케줄을 상태로 저장
    setIsOpen(true); // 모달 열기
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
      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "h-[650px]" : "h-[300px]"
        }`}
      >
        <div className="w-[313px] h-full bg-white rounded-[20px] mt-[26px] m-auto overflow-hidden">
          <p className="w-full m-auto text-left py-[6px] pl-[16px]">
            <span className="text-[32px]">{formatMonth}월 </span>
          </p>
          <div className="inline-flex flex-col items-center justify-start h-full w-full">
            <div className="flex flex-row items-center justify-start w-full text-center">
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">
                일
              </p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">
                월
              </p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">
                화
              </p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">
                수
              </p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">
                목
              </p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">
                금
              </p>
              <p className="h-full text-[10px] font-medium text-gray-400 w-full">
                토
              </p>
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              {isExpanded ? (
                <RenderDaysForTrainerExpand
                  year={formatYear}
                  month={formatMonthforAPI}
                  userId={userId}
                />
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
          <div className="flex items-center justify-center mt-5">
            <div className="">
              <img src={SheduleLogo} alt="Schedule Logo" />
            </div>
            <div className="absolute ml-[250px]">
              <img
                src={plusbutton}
                alt="Add Button"
                onClick={openAddModal}
                className="cursor-pointer"
              />
            </div>
            <ModalAddSchedule
              isOpen={isAddOpen}
              onRequestClose={closeAddModal}
              setSelectedMemDate={setSelectedMemDate}
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-[20px]">
            {isMemListEmpty ? (
              <BtnRegister />
            ) : selectedMemDate !== null &&
              selectedMemDate.length !== 0 &&
              Array.isArray(selectedMemDate) ? (
              selectedMemDate.map((schedule, index) => (
                <div key={index} className="w-full mb-[10px]">
                  <BoxSchedule
                    onClick={() => openModal(schedule)}
                    userSchedule={schedule}
                  />
                  <ModalEditSchedule
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    user={selectedSchedule} // 현재 선택된 스케줄 전달
                    setSelectedMemDate={setSelectedMemDate}
                  />
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
