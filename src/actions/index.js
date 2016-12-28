import { createAction } from 'redux-actions';
import * as types from '../constants/ActionTypes';

const changeMenu = createAction(types.CHANGE_MENU);

export default changeMenu;
