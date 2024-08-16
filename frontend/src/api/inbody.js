import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const OCR_URL = import.meta.env.VITE_OCR_URL;
const secret_key = import.meta.env.VITE_SECRET_KEY;

export const checkInbodyData = async (id, year, month) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/body?uid=${id}&year=${year}&month=${month}`,
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

export const uploadInbodyData = async (data) => {
  try {
    console.log("업로드 인바디 데이터", data);
    const formData = new FormData();
    formData.append("height", data.height);
    formData.append("weight", data.weight);
    formData.append("muscle", data.muscle);
    formData.append("fat", data.fat);
    formData.append("fatPercentage", data.fatPercentage);
    formData.append("bmi", data.bmi);
    formData.append("compositionScore", data.compositionScore);
    formData.append("memberId", data.memberId);
    formData.append("image", data.imageFile);

    const response = await axios.post(`${BASE_URL}/body`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export const fetchBodyData = async (uid, year, month) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/body?uid=${uid}&year=${year}&month=${month}`,
      {
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

export const uploadOCR = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await axios.post(`${BASE_URL}/exercise/ocr`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  const data = JSON.parse(JSON.stringify(response.data));
  return data;
};
