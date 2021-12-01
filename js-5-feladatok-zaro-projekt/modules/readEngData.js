const english = await fetch('http://localhost:4000/eng')
const dataEng = await english.json()

export default {dataEng};
