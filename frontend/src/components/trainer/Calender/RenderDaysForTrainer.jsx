import React, { useState, useEffect } from "react";
import { GetMembers } from "../../../api/Calender";

const RenderDaysForTrainer = ({ year, month, onDateChange }) => {
    const today = new Date();
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [ memDate, setMemDate] = useState([])

    // 날짜관련 코드
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());
    //날짜받아서 하이라이트하는 버튼
    const handleChangeDate = (dayCount) => {
        setSelectedDay(dayCount);
        onDateChange(memDate)
        return dayCount;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const promise = [];
    
                // 데이터 가져오기
                promise.push(GetMembers(year, month));
                const results = await Promise.all(promise);
    
                // 결과가 비어있는지 확인하고, 빈 배열로 채우기
                if (results.length === 0 || results[0].length === 0) {
                    results[0] = []; // 비어있는 경우 빈 배열 추가
                }
    
                // 멤버 데이터를 맵으로 변환
                const memberMap = [];
                results[0].forEach((result) => {
                    const date = new Date(result.data);
                    if (!isNaN(date.getTime())) {  // 날짜 유효성 검사
                        const day = date.getDate();
                        memberMap[day] = result;
                    } else {
                        console.error('유효하지 않은 날짜:', result.data);
                    }
                });
                // 상태 업데이트
                setMemDate(memberMap);
            } catch (error) {
                console.log('에러', year, month);
            }
        };
        fetchData();
    }, [year, month]);
    

    const days = [];
    let dayCount = 1;

    for (let week = 0; week < 6; week++) {
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
            if ((week === 0 && day < firstDayOfMonth) || dayCount > daysInMonth) {
                weekDays.push(
                    <div key={`${week}-${day}`} className="flex-1 flex flex-col items-center justify-center h-[33px] mt-[4px]">
                        <p className="text-sm font-medium text-gray-800"></p>
                    </div>
                );
            } else {
                const formatdayCount = dayCount < 10 ? `0${dayCount}` : dayCount;
                weekDays.push(
                    <button
                        onClick={() => handleChangeDate(formatdayCount)}
                        key={`${week}-${day}`}
                        className={`flex-1 flex flex-col items-center justify-center h-[33px] mt-[4px] ${
                            selectedDay === formatdayCount ? 'bg-blue-200' : ''
                        }`}
                    >
                        <div className="font-bold">
                        {formatdayCount}
                        </div>
                    </button>
                );
                dayCount++;
            }
        }
        days.push(
            <div key={week} className="flex items-center justify-start w-full">
                {weekDays}
            </div>
        );
    }

    return days;
};

export default RenderDaysForTrainer;