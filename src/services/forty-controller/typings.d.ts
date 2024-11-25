declare namespace API {
  type addRoleParams = {
    role: string;
  };

  type AddUserRoleRequest = {
    roleId?: number;
    userId?: number;
  };

  type BaseResponseInteger = {
    code?: number;
    msg?: string;
    data?: number;
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

  type deleteUserParams = {
    userId: number;
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

  type InterfaceInfoQueryRequest = {
    currentPage?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    interfaceName?: string;
    method?: string;
    userAccount?: string;
    apistatus?: boolean;
  };

  type InterfaceInfoUpdateRequest = {
    interfaceId?: number;
    interfaceName?: string;
    interfaceDescription?: string;
    method?: string;
    url?: string;
    requestHeader?: string;
    responseHeader?: string;
    requestBody?: string;
    responseBody?: string;
    apistatus?: boolean;
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

  type UserVO = {
    id?: number;
    userAccount?: string;
    password?: string;
    unionId?: string;
    mpOpenId?: string;
    userName?: string;
    userAvatar?: string;
    userProfile?: string;
    createTime?: string;
    updateTime?: string;
  };
}
