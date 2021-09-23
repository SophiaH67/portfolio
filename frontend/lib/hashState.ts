// I'm sorry...
export const getHash = () => 
  localStorage.getItem('hash') || ''

export const setHash = (hash: string) => {
  listeners.forEach(async (listener) => listener())
  return localStorage.setItem('hash', hash)
}

let listeners: (()=>void)[] = []
export const onHashChange = (callback: ()=>void) => {
  listeners.push(callback)
}