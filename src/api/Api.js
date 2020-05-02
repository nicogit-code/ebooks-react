// import axios from 'axios';

// const url = 'http://localhost:3001/books';

// export const fetchData = async(books) => {
//     let apiUrl = url;

//     if(books) {
//         changeableUrl = apiUrl;
//     }

//     try {
//         const { data: { title, author } } = await axios.get(changeableUrl);

//         return { title, author };
//     } catch (error) {
//         console.log(error);
//     }
// }

const apiUrl = 'http://localhost:3000';
export { 
    apiUrl 
};