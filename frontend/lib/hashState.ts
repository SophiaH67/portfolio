// I'm sorry...
export const getHash = () => 
  localStorage.getItem('hash') || ''

export const setHash = (hash: string) =>
  localStorage.setItem('hash', hash)