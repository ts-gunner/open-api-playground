// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /user_interface/add */
export async function addOrUpdateUserInterfaceInfo(
  body: API.UserInterfaceAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/user_interface/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /user_interface/delete */
export async function deleteUserInterfaceInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserInterfaceInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean>('/user_interface/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user_interface/search */
export async function searchUserInterfaceInfo(
  body: API.UserInterfaceQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceVO>('/user_interface/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user_interface/searchByUser */
export async function searchUserInterfaceInfoByUser(
  body: API.UserInterfaceQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserInterfaceVO>('/user_interface/searchByUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user_interface/update */
export async function updateUserInterfaceInfo(
  body: API.UserInterfaceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/user_interface/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
