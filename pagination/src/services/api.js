import axios from 'axios';

const getData = async () => {
    const BASE_URL = "https://api.github.com/users/john-smilga/followers?per_page=100"
    const response = await axios.get(BASE_URL)
    return response.data
};

export { getData };