// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /role/add */
export async function addRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.addRoleParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/role/add', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /role/delete */
export async function deleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/role/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /role/getRole */
export async function getRole(body: API.UserRoleQueryRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePageUserRoleVO>('/role/getRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
