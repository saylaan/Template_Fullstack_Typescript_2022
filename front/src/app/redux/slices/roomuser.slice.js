/* ------------- || Third Party Imports || ------------- */
import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
/* ------------- || API Client Imports || ------------- */
// import { apiClient } from '../adapters/api-client';
import RoomUserService from '../../adapters/api-client/room/roomuser.service';

export const roomusersAdapter = createEntityAdapter();
const initialState = roomusersAdapter.getInitialState();

export const roomuserSlice = createSlice({
    name: 'roomusers',
    initialState,
    reducers: {
        clearRoomUser: () => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoomUser.fulfilled, (state, action) => {
            console.log('Action roomuser/fetchAll : ', action.payload);
            roomusersAdapter.upsertMany(state, action.payload); // setAll / addMany / setMany / upsertMany
        });
        builder.addCase(updateRoomUser.fulfilled, (state, { payload }) => {
            console.log('Action roomuser/update : ', payload);
            const { id, ...changes } = payload;
            roomusersAdapter.updateOne(state, { id, changes });
        });
        builder.addCase(postRoomUser.fulfilled, (state, action) => {
            console.log('Action roomuser/post : ', action.payload);
            roomusersAdapter.addOne(state, action.payload);
        });
        builder.addCase(deleteRoomUser.fulfilled, (state, action) => {
            console.log('Action roomuser/delete : ', action.payload);
            roomusersAdapter.removeOne(state, action.payload);
        });
    }
});

export const { clearRoomUser } = roomuserSlice.actions;
export const roomUserReducer = roomuserSlice.reducer;
export const {
    selectById: selectRoomUserById,
    selectIds: selectRoomUserIds,
    selectEntities: selectRoomUserEntities,
    selectAll: selectAllRoomUsers,
    selectTotal: selectTotalRoomUsers
} = roomusersAdapter.getSelectors((state) => state.roouser);

export const fetchRoomUser = createAsyncThunk('roomuser/fetchAll', async () => {
    try {
        let response = await RoomUserService.index();
        return response.data;
    } catch (error) {
        console.log(error);
    }
});
export const updateRoomUser = createAsyncThunk('roomuser/update', async (roomuser) => {
    try {
        await RoomUserService.put(roomuser); // RoomId + UserId
        return roomuser;
    } catch (error) {
        console.log(error);
    }
});
export const postRoomUser = createAsyncThunk('roomuser/post', async (roomuser) => {
    try {
        let response = await RoomUserService.post(roomuser);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});
export const deleteRoomUser = createAsyncThunk('roomuser/delete', async (roomuserId) => {
    try {
        await RoomUserService.deleteItem(roomuserId);
        return roomuserId;
    } catch (error) {
        console.log(error);
    }
});
