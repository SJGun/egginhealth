import { useEffect, useState } from "react";
import { DietImage } from "../../common/StyledComponents";

export const ExerciseImg = ({ exData, selectedDate, setHasImages }) => {
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if (exData && exData.date) {
      const isDateMatch = exData.date.split("T")[0] === selectedDate;

      if (isDateMatch) {
        setFilteredData(exData);
        setHasImages(!!exData.report && !!exData.report.imgUrl); // report가 존재하는지 확인
      } else {
        setFilteredData(null);
        setHasImages(false);
      }
    } else {
      setFilteredData(null);
      setHasImages(false);
    }
  }, [exData, selectedDate, setHasImages]);

  return (
    <>
      {filteredData && filteredData.report && filteredData.report.imgUrl ? (
        <DietImage src={filteredData.report.imgUrl} alt="운동 이미지" />
      ) : null}
    </>
  );
};
