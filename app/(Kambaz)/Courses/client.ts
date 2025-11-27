/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

// ==================== COURSES ====================

// PUBLIC
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

// PROTECTED — MUST SEND COOKIE
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

// PROTECTED — MUST SEND COOKIE
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

// PUBLIC
export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

// PROTECTED (depends on backend) — SAFE TO USE axios
export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

// PUBLIC
export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

// ==================== MODULES ====================

// PUBLIC
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

// PROTECTED — MUST SEND COOKIE
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

// PROTECTED — MUST SEND COOKIE
export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

// PROTECTED — MUST SEND COOKIE
export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

// ==================== ASSIGNMENTS ====================

// PUBLIC
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

// PUBLIC
export const findAssignmentById = async (
  courseId: string,
  assignmentId: string
) => {
  const { data } = await axios.get(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return data;
};

// PROTECTED — MUST SEND COOKIE
export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data;
};

// PROTECTED — MUST SEND COOKIE
export const updateAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/assignments/${assignment._id}`,
    assignment
  );
  return data;
};

// PUBLIC
export const deleteAssignment = async (
  courseId: string,
  assignmentId: string
) => {
  const { data } = await axios.delete(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return data;
};

// ==================== ENROLLMENTS ====================

// PUBLIC
export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axios.get(`${ENROLLMENTS_API}/user/${userId}`);
  return data;
};

// PUBLIC
export const findEnrollmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${ENROLLMENTS_API}/course/${courseId}`);
  return data;
};

// PROTECTED — MUST SEND COOKIE
export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${ENROLLMENTS_API}`, {
    user: userId,
    course: courseId,
  });
  return data;
};

// PROTECTED — MUST SEND COOKIE
export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};

// PROTECTED — MUST SEND COOKIE
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/${userId}/courses/${courseId}`
  );
  return response.data;
};
