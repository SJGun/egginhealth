import React, { useState, useEffect } from "react";
import { checkPtPlan } from "../../../api/trainer";

const RenderDaysForTrainer = ({ year, month, onDateChange,userId }) => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
    const today =new Date(now.getTime()+ kstOffset);
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [memDate, setMemDate] = useState([]);
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(today.getFullYear(), today.getMonth());

    const handleChangeDate = (dayCount) => {
        setSelectedDay(dayCount);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await checkPtPlan(year, month, selectedDay,userId);
                setMemDate(result.length > 0 ? result : []);
            } catch (error) {
                console.log("에러", year, month);
                setMemDate([]);
            }
        };
        fetchData();
    }, [year, month, selectedDay]);

    useEffect(() => {
        // memDate가 변경된 후에 onDateChange를 호출
        onDateChange(memDate);
    }, [memDate, onDateChange]);

    let dayCount = 1;
    const days = [];

    for (let week = 0; week < 6; week++) {
        const weekDays = [];
        for (let day = 0; day < 7; day++) {
            if ((week === 0 && day < firstDayOfMonth) || dayCount > daysInMonth) {
                weekDays.push(
                    <div
                        key={`${week}-${day}`}
                        className="flex-1 flex flex-col items-center justify-center h-[33px] mt-[4px]"
                    >
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
                            selectedDay === formatdayCount ? "bg-blue-200" : ""
                        }`}
                    >
                        <div className="font-bold">{formatdayCount}</div>
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
