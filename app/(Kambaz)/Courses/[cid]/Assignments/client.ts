/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api`;

export const findAssignmentsForCourse = async (courseId: string) => {
  const res = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/courses/${courseId}/assignments`);
  return res.data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const res = await axiosWithCredentials.post(`${ASSIGNMENTS_API}/courses/${courseId}/assignments`, assignment);
  return res.data;
};

export const updateAssignment = async (assignmentId: string, updates: any) => {
  const res = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/assignments/${assignmentId}`, updates);
  return res.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const res = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/assignments/${assignmentId}`);
  return res.data;
};