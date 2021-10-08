import axios from "axios"

export const deleteMessage = (id: number) => 
  axios.delete(`http://localhost:8000/api/messages/${id}`)