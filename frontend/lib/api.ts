import axios from "axios"

export const getBackendBase = () =>
  process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:8000'

export const deleteMessage = (id: number) => 
  axios.delete(`${getBackendBase()}/api/messages/${id}`)