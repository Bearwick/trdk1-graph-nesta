import { get, update } from './endpoints';
import { user } from '../queries/user';
export const addUser = async (phone, email, affiliation, password, setAdmin) => {
    return await update(user.addUser(phone, email, affiliation, password, setAdmin));
};
export const findUser = async (email, password) => {
    return await get(user.findUser(email, password));
};
export const setAdmin = async (email, setAdmin) => {
    return await update(user.setAdmin(email, setAdmin));
};
export const subscribe = async (email, ODAProblem) => {
    return await update(user.subscribe(email, ODAProblem));
};
export const unsubscribe = async (email, ODAProblem) => {
    return await update(user.unsubscribe(email, ODAProblem));
};
export const isSubbed = async (email, ODAProblem) => {
    return await get(user.isSubbed(email, ODAProblem));
};
export const getUser = async (email) => {
    return await get(user.getUser(email));
};
