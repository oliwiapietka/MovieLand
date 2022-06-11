import axios from "axios";

const BASE_URL = "https://api.tvmaze.com/";

export const fetchData = async (url, errorMsg) => {
  errorMsg ||= "";
  const fullUrl = BASE_URL + url;
  try {
    const res = (await axios.get(fullUrl)).data;
    return res;
  } catch (err) {
    console.log(`${errorMsg} ${err}`);
  }
};
