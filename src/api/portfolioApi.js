import axiosInstance from "./axiosConfig";


// Fetch the single portfolio user 
export const getPublicUser = async () => {
  const { data } = await axiosInstance.get("/user/me/portfolio");
  return data.user;
};

// Fetch all projects.

export const getAllProjects = async () => {
  const { data } = await axiosInstance.get("/project/getall");
  return data.allProjects ?? [];
};

// Fetch all skills.

export const getAllSkills = async () => {
  const { data } = await axiosInstance.get("/skill/getall");
  return data.allSkill ?? [];
};

// Fetch all software applications / tools.

export const getAllApplications = async () => {
  const { data } = await axiosInstance.get("/application/getall");
  return data.allApp ?? [];
};

// Fetch a single project by ID.

export const getProjectById = async (id) => {
  const { data } = await axiosInstance.get(`/project/getone/${id}`);
  return data.project;
};

// Send a contact message.

export const sendMessage = async (messageData) => {
  const { data } = await axiosInstance.post("/message/send", messageData);
  return data;
};
