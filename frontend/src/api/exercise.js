import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const AI_BASE_URL = import.meta.env.VITE_AI_API_URL;
axios.defaults.withCredentials = true; // 쿠키를 포함하도록 설정

export const getExercise = async (uid, year, month, day) => {
  const res = await axios.get(
    `${BASE_URL}/exercise/${uid}?year=${year}&month=${month}&day=${day}`
  );
  return res.data;
};

export const registerExh = async (
  set,
  weight,
  ref,
  name,
  time,
  date,
  memberId
) => {
  const response = axios.post(
    `${BASE_URL}/exercise`,
    {
      set,
      weight,
      ref,
      name,
      time,
      date,
      memberId,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const registerExComment = async (content, boardId, boardType) => {
  const response = await axios.post(
    `${BASE_URL}/exercise/comment`,
    {
      content,
      boardId,
      boardType,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const registerEximg = async (date, img) => {
  const formData = new FormData();
  formData.append("image", img);
  formData.append("date", date);
  const res = await axios.put(`${BASE_URL}/exercise/report`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return res.data;
};

export const deleteExImg = async (reportId) => {
  const res = await axios.delete(`${BASE_URL}/exercise/report?id=${reportId}`);
  return res.data;
};

export const updateEx = async (setId, set, ref, weight, name, time, date) => {
  const res = await axios.patch(`${BASE_URL}/exercise`, {
    setId,
    set,
    ref,
    weight,
    name,
    time,
    date,
  });
  return res.data;
};
export const deleteEx = async (setId) => {
  const res = await axios.delete(`${BASE_URL}/exercise?setId=${setId}`);
  return res.data;
};

export const registerFeedbackToAI = async (record, exerciseName) => {
  const formData = new FormData();
  const mode = exerciseName.includes("스쿼트")
    ? 0
    : exerciseName.includes("이두근")
    ? 1
    : -1;

  if (mode === -1) return record;

  // const res = await axios.post(`${AI_BASE_URL}/feedback`, formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });

  // const binaryString = escapeString
  //   .replace(/\\u([0-9A-Fa-f]{4})/g, (match, grp) =>
  //     String.fromCharCode(parseInt(grp, 16))
  //   )
  //   .replace(/\\/g, ""); // Remove any remaining backslashes

  // const len = binaryString.length;
  // const bytes = new Uint8Array(len);
  // for (let i = 0; i < len; i++) {
  //   bytes[i] = binaryString.charCodeAt(i);
  // }

  // const blob = new Blob([bytes], { type: "video/mp4" });
  // const file = new File([blob], "video.mp4", { type: "video/mp4" });
  // return file;
  formData.append(`mode`, mode);
  formData.append(`file`, record);
  const res = await axios.post(`${AI_BASE_URL}/video`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const registerFeedback = async (memo, exerciseId, record, createdAt) => {
  // const formData = new FormData();
  // formData.append(`memo`, memo);
  // formData.append(`exerciseName`, exerciseId);
  // formData.append(`record`, record);
  // formData.append(`createdAt`, createdAt);
  // const res = await axios.post(`${BASE_URL}/feedback`, formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });

  console.log(memo, exerciseId, record);
  const formData = new FormData();
  formData.append(`memo`, memo);
  formData.append(`exerciseName`, exerciseId);
  formData.append(`videoUrl`, record);
  const res = await axios.post(`${BASE_URL}/feedback/url`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const fetchFeedback = async (uid) => {
  const res = await axios.get(`${BASE_URL}/feedback/list/${uid}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateFeedback = async (
  memo,
  exerciseName,
  record,
  createdAt,
  id
) => {
  const formData = new FormData();
  formData.append(`memo`, memo);
  formData.append(`exerciseName`, exerciseName);
  formData.append(`record`, record);
  formData.append(`updatedAt`, createdAt);
  const res = await axios.patch(`${BASE_URL}/feedback/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteFeedback = async (id) => {
  const res = await axios.delete(`${BASE_URL}/feedback/${id}`);
  return res.data;
};

export const readFeedback = async (id) => {
  const res = await axios.get(`${BASE_URL}/feedback/read/${id}`);
};
