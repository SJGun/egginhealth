import React from 'react';
import ButtonSurvey from '../common/ButtonSurvey';
import SurvayIcon0 from '../../assets/surveyicon0.png'
import SurvayIcon1 from '../../assets/surveyicon1.png'
import SurvayIcon2 from '../../assets/surveyicon2.png'
import SurvayIcon3 from '../../assets/surveyicon3.png'





const SurveyPage1 = () => {
  let survey = [
    {logo:SurvayIcon0,title:'다이어트',content:'체중 감량에 집중',id:1},
    {logo:SurvayIcon1,title:'근육량증가',content:'체중 감량에'},
    {logo:SurvayIcon2,title:'체력증진',content:'체중 감량에 집중'},
    {logo:SurvayIcon3,title:'몸매관리',content:'체중 감량에 집중'},]
  
    return (
      
    <div>
      <h1>운동 목표가 무엇인가요?</h1>
      {survey.map(function(i,idx){
        return(
          <ButtonSurvey lst={i}/>
        )
      }
      )}
    </div>
  );
};


export default SurveyPage1;
