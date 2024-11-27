// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 POST /user/add/user_info */
export async function addUser(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/user/add/user_info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 GET /user/delete/user_info */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString>('/user/delete/user_info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前登录用户的用户信息 GET /user/get/user_info */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.BaseResponseLoginUserVO>('/user/get/user_info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户列表， 仅限admin POST /user/get/user_list */
export async function getUserList(body: API.UserQueryRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponsePageUserVO>('/user/get/user_list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登录， 返回token POST /user/login */
export async function userLogin(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseString>('/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册， 返回用户注册成功后的用户ID POST /user/register */
export async function register(body: API.UserRegisterRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseLong>('/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /user/reset/password */
export async function resetPassword(options?: { [key: string]: any }) {
  return request<API.BaseResponseInteger>('/user/reset/password', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 更新用户信息 POST /user/update/user_info */
export async function updateUser(body: API.UserUpdateRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponseInteger>('/user/update/user_info', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
