const create = () => fetch('http://127.0.0.1:3009/api/projects')
const get = () => fetch('http://127.0.0.1:3009/api/projects/as').then(res=>res.json()).then(obj => console.log(obj.length))

get().then(create).then(get)