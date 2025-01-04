import axios from "axios";


   // used to if server is in use
// const Ports = import.meta.env.PORT || 3004;

export const axiosInstance = axios.create({
  //local endpoint reference
  // baseURL: `http://localhost:${Ports}/api`,

  // deployed endpoint reference
  baseURL: "https://evangadi-forum-project-2oxk.onrender.com/api/",
});
