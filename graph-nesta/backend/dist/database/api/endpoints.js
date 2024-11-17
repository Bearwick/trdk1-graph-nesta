import axios from 'axios';
export const get = async (query) => {
    return await axios.get(`http://localhost:7200/repositories/dataDrivenMunicipalities?query=${encodeURIComponent(query)}`);
};
export const update = async (query) => {
    return await axios.post(`http://localhost:7200/repositories/dataDrivenMunicipalities/statements?update=
  ${encodeURIComponent(query)}`);
};
