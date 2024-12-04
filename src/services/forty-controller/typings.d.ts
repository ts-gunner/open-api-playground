declare namespace API {
  type addRoleParams = {
    role: string;
  };

  type AddUserRoleRequest = {
    roleId?: number;
    userId?: number;
  };

  type BaseResponseBoolean = {
    code?: number;
    msg?: string;
    data?: boolean;
  };

  type BaseResponseInteger = {
    code?: number;
    msg?: string;
    data?: number;
  };

  type BaseResponseListInterfaceInfoVO = {
    code?: number;
    msg?: string;
    data?: InterfaceInfoVO[];
  };

  type BaseResponseListUserRoleVO = {
    code?: number;
    msg?: string;
    data?: UserRoleVO[];
  };

  type BaseResponseLoginUserVO = {
    code?: number;
    msg?: string;
    data?: LoginUserVO;
  };

  type BaseResponseLong = {
    code?: number;
    msg?: string;
    data?: number;
  };

  type BaseResponseObject = {
    code?: number;
    msg?: string;
    data?: Record<string, any>;
  };

  type BaseResponsePageInterfaceInfoVO = {
    code?: number;
    msg?: string;
    data?: PageInterfaceInfoVO;
  };

  type BaseResponsePageRoleAssignmentVO = {
    code?: number;
    msg?: string;
    data?: PageRoleAssignmentVO;
  };

  type BaseResponsePageUserInterfaceVO = {
    code?: number;
    msg?: string;
    data?: PageUserInterfaceVO;
  };

  type BaseResponsePageUserRoleVO = {
    code?: number;
    msg?: string;
    data?: PageUserRoleVO;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    msg?: string;
    data?: PageUserVO;
  };

  type BaseResponseString = {
    code?: number;
    msg?: string;
    data?: string;
  };

  type deleteInterfaceParams = {
    interfaceId: number;
  };

  type deleteRoleParams = {
    roleId: number;
  };

  type deleteUserInterfaceInfoParams = {
    userInterfaceId: number;
  };

  type deleteUserParams = {
    userId: number;
  };

  type demiseInterfaceParams = {
    interfaceId: number;
  };

  type InterfaceInfoAddRequest = {
    interfaceName?: string;
    description?: string;
    url?: string;
    method?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestBody?: string;
    responseBody?: string;
  };

  type InterfaceInfoInvokeRequest = {
    interfaceId?: string;
    bodyType?: string;
    userRequestHeader?: string;
    userRequestParams?: string;
  };

  type InterfaceInfoQueryRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    interfaceId?: number;
    interfaceName?: string;
    method?: string;
    userAccount?: string;
    status?: boolean;
  };

  type InterfaceInfoUpdateRequest = {
    interfaceId?: number;
    interfaceName?: string;
    interfaceDescription?: string;
    status?: boolean;
    method?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestBody?: string;
    responseBody?: string;
  };

  type InterfaceInfoVO = {
    id?: number;
    name?: string;
    description?: string;
    url?: string;
    method?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestBody?: string;
    responseBody?: string;
    status?: boolean;
    userAccount?: string;
    totalCalls?: number;
    createTime?: string;
    updateTime?: string;
  };

  type LoginUserVO = {
    id?: number;
    userAccount?: string;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    roles?: string[];
    createTime?: string;
    updateTime?: string;
    secretId?: string;
  };

  type OrderItem = {
    column?: string;
    asc?: boolean;
  };

  type PageInterfaceInfoVO = {
    records?: InterfaceInfoVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageInterfaceInfoVO;
    searchCount?: PageInterfaceInfoVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageRoleAssignmentVO = {
    records?: RoleAssignmentVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageRoleAssignmentVO;
    searchCount?: PageRoleAssignmentVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserInterfaceVO = {
    records?: UserInterfaceVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserInterfaceVO;
    searchCount?: PageUserInterfaceVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserRoleVO = {
    records?: UserRoleVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserRoleVO;
    searchCount?: PageUserRoleVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type PageUserVO = {
    records?: UserVO[];
    total?: number;
    size?: number;
    current?: number;
    orders?: OrderItem[];
    optimizeCountSql?: PageUserVO;
    searchCount?: PageUserVO;
    optimizeJoinOfCountSql?: boolean;
    maxLimit?: number;
    countId?: string;
    pages?: number;
  };

  type publishInterfaceParams = {
    interfaceId: number;
  };

  type RoleAssignmentQueryRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    roleName?: string;
    userAccount?: string;
  };

  type RoleAssignmentVO = {
    roleId?: number;
    roleName?: string;
    userId?: number;
    userAccount?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    password?: string;
    username?: string;
    userProfile?: string;
  };

  type UserInterfaceAddRequest = {
    userId?: number;
    interfaceId?: number;
    remainCount?: number;
    status?: number;
  };

  type UserInterfaceQueryRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
    interfaceId?: number;
    status?: number;
  };

  type UserInterfaceUpdateRequest = {
    userId?: number;
    interfaceId?: number;
    totalCount?: number;
    remainCount?: number;
    status?: number;
  };

  type UserInterfaceVO = {
    interfaceId?: number;
    userId?: number;
    name?: string;
    description?: string;
    url?: string;
    method?: string;
    totalCalls?: number;
    totalCount?: number;
    remainCount?: number;
  };

  type UserLoginRequest = {
    userAccount?: string;
    password?: string;
  };

  type UserQueryRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    id?: number;
    userAccount?: string;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userProfile?: string;
  };

  type UserRegisterRequest = {
    userAccount?: string;
    password?: string;
    checkPassword?: string;
  };

  type UserRoleQueryRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    roleName?: string;
  };

  type UserRoleVO = {
    roleId?: number;
    roleName?: string;
    createTime?: string;
    updateTime?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userName?: string;
    userProfile?: string;
  };

  type UserVO = {
    id?: number;
    userAccount?: string;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    secretId?: string;
    userAvatar?: string;
    userProfile?: string;
    roles?: string[];
    createTime?: string;
    updateTime?: string;
  };
}
