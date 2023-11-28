// src/modules/user.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
	name: string;
	age: number;
}

const initialState: UserState = {
	name: "",
	age: 0,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserName: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setUserAge: (state, action: PayloadAction<number>) => {
			state.age = action.payload;
		},
	},
});

export const { setUserName, setUserAge } = userSlice.actions;
export const userReducer = userSlice.reducer;
