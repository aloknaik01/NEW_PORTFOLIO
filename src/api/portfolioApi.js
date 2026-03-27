import axiosInstance from "./axiosConfig";

export const getPublicUser = async () => {
  const { data } = await axiosInstance.get("/user/me/portfolio");
  return data.user;
};

export const getAllProjects = async () => {
  const { data } = await axiosInstance.get("/project/getall");
  return data.allProjects ?? [];
};

export const getAllSkills = async () => {
  const { data } = await axiosInstance.get("/skill/getall");
  return data.allSkill ?? [];
};

export const getAllApplications = async () => {
  const { data } = await axiosInstance.get("/application/getall");
  return data.allApp ?? [];
};

export const getProjectById = async (id) => {
  const { data } = await axiosInstance.get(`/project/getone/${id}`);
  return data.project;
};

export const sendMessage = async (messageData) => {
  const { data } = await axiosInstance.post("/message/send", messageData);
  return data;
};
