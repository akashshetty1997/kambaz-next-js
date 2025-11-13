/* eslint @typescript-eslint/no-explicit-any: "off" */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [] as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollInCourse: (state, { payload }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: payload.userId,
        course: payload.courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any[];
    },
    unenrollFromCourse: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === payload.userId && e.course === payload.courseId)
      );
    },
  },
});

export const { setEnrollments, enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;