/* ------------- || Third Party Imports || ------------- */
import { combineReducers } from 'redux';
/* ------------- || Reducers Imports || ------------- */
import { customizationReducer } from './customization.slice';
import { roomReducer } from './room.slice';
import { roomUserReducer } from './roomuser.slice';
/* ------------- || Exports || ------------- */
export {
    login,
    logout,
    openMenu,
    setMenu,
    setFontFamily,
    setBorderRadius
} from './customization.slice';
export {
    fetchRoom,
    updateRoom,
    postRoom,
    deleteRoom,
    clearRoom,
    selectAllRooms
} from './room.slice';
export {
    fetchRoomUser,
    updateRoomUser,
    postRoomUser,
    deleteRoomUser,
    clearRoomUser,
    selectAllRoomUsers
} from './roomuser.slice';

export const rootReducer = combineReducers({
    customization: customizationReducer,
    room: roomReducer,
    roomuser: roomUserReducer
});
