// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /role/assignment/addRoleToUser */
export async function addRoleToUser(
  body: API.AddUserRoleRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/role/assignment/addRoleToUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /role/assignment/delete */
export async function deleteAssignment(options?: { [key: string]: any }) {
  return request<API.BaseResponseObject>('/role/assignment/delete', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /role/assignment/get_assignment */
export async function getAssignment(
  body: API.RoleAssignmentQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageRoleAssignmentVO>('/role/assignment/get_assignment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
