import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const updateUserRole = async (role) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/user/role`, 
      { role }, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};

export const updateUserGole = async (exerciseCommonId,dietCommonId,goalCommonId) => {
  try {
    console.log(exerciseCommonId,dietCommonId,goalCommonId);
    const response = await axios.post(
      `${API_BASE_URL}/goal`, 
      {exerciseCommonId,dietCommonId,goalCommonId}, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};

export const updateUserInfo = async (height,age) => {
  try {
    console.log(height,age);
    const response = await axios.patch(
      `${API_BASE_URL}/user`, 
      { height ,age}, 
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('알 수 없는 오류 발생');
  }
};