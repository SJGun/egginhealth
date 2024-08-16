import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

export const checkCode = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/code`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("알 수 없는 오류 발생");
  }
};

export const checkMemberList = async () => {
  console.log("멤버리스트 가져오기");
  const formatMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const formatYear = String(new Date().getFullYear());
  const formatDay = String(new Date().getDate()).padStart(2, "0");
  try {
    const response = await axios.get(
      `${BASE_URL}/status/trainer/member?year=${formatYear}&month=${formatMonth}&day=${formatDay}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log("RESPONse", response);

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("알 수 없는 오류 발생");
  }
};

export const updatePtLog = async (memberId, change) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/pt/count`,
      { memberId, change },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("알 수 없는 오류 발생");
  }
};

export const updatePtPlan = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/pt/plan`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("알 수 없는 오류 발생");
  }
};

export const editPtPlan = async (data) => {
  try {
    const response = await axios.patch(`${BASE_URL}/pt/plan`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("알 수 없는 오류 발생");
  }
};

export const deletePtPlan = async (id) => {
  try {
    console.log(`${BASE_URL}/pt/plan/${id}`);
    const response = await axios.delete(`${BASE_URL}/pt/plan/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("알 수 없는 오류 발생");
  }
};

export const checkChat = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/chat/list`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("알 수 없는 오류 발생");
  }
};

export const checkPtPlan = async (year, month, day, trainer) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pt/plan/trainer/${trainer}?year=${year}&month=${month}&day=${day}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("알 수 없는 오류 발생");
  }
};
