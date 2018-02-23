import { NEW_USER_LIST } from './../types/';
import { UserData } from './../types/index';

export default function userReducer(state = [], action) {
    switch (action.type) {
        case NEW_USER_LIST:
            return action.users;
        default:
            return state;
    }
}