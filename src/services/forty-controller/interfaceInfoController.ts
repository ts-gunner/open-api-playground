// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /openapi/add */
export async function addInterfaceInfo(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/openapi/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /openapi/delete */
export async function deleteInterface(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteInterfaceParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/openapi/delete', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /openapi/invoke */
export async function invokeInterface(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseObject>('/openapi/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /openapi/offline */
export async function demiseInterface(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.demiseInterfaceParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/openapi/offline', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /openapi/online */
export async function publishInterface(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.publishInterfaceParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/openapi/online', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /openapi/query */
export async function queryInterfaceInfo(
  body: API.InterfaceInfoQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfoVO>('/openapi/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /openapi/update */
export async function updateInterfaceInfo(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInteger>('/openapi/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
