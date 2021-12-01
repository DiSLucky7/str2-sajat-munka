const hungarian = await fetch('http://localhost:5000/hun')
const dataHun = await hungarian.json()

export default {dataHun};
