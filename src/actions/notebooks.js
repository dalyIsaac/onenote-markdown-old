import { GET_ALL_NOTEBOOKS } from '../types';
import { app } from './index';

export const getAllNotebooks = () => ({
    type: GET_ALL_NOTEBOOKS,
    app
});
