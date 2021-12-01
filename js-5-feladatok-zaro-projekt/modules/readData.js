// USING AXIOS:
const res = await axios.get('http://localhost:3000/users');
const data = res.data;

// USING FETCH: 
// const response = await fetch('http://localhost:3000/users')
// const data = await response.json()

export default {data};
