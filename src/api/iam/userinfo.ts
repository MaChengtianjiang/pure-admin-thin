import { http } from "@/utils/http";
import { ApiResponse } from "@/utils/http/iamTypes";
import { IamRouteVO } from "@/api/iam/router";
import { RouteRecordRaw } from "vue-router";

type IamUserinfoApplicationOrganizationVO = {
  /* 组织id */
  organizationId: string;

  /* 组织名称 */
  organizationName: string;

  /* 组织编码 */
  organizationCode: string;
};

type IamUserinfoApplicationRolePermissionVO = {
  /* 权限id */
  permissionId: string;

  /* 权限名称 */
  permissionCode: string;

  /* 权限编码 */
  permissionName: string;
};

type IamUserinfoApplicationRoleVO = {
  /* 角色id */
  roleId: string;

  /* 角色名称 */
  roleName: string;

  /* 权限列表 */
  permissionList?: Array<IamUserinfoApplicationRolePermissionVO>;
};

type IamUserinfoApplicationVO = {
  /* 应用id */
  applicationId: string;

  /* 应用名称 */
  applicationName: string;

  /* 组织列表 */
  organizationList?: Array<IamUserinfoApplicationOrganizationVO>;

  /* 角色列表 */
  roleList?: Array<IamUserinfoApplicationRoleVO>;
};

export type IamUserTenantInfo = {
  /**
   * 租户id
   */
  tenantId: string;

  /**
   * 租户名称
   */
  tenantName: string;

  /**
   * 租户编码
   */
  tenantCode: string;

  /**
   * 租户排序，从小到大
   */
  tenantSort: number;

  /**
   * 租户中用户的角色
   */
  tenantRole: Array<IamUserTenantRoleInfo>;
};

type IamUserTenantRoleInfo = {
  /**
   * 角色id
   */
  roleId: string;

  /**
   * 角色名称
   */
  roleName: string;

  /**
   * 角色编码
   */
  roleCode: string;

  /**
   * 角色具备的权限编码列表
   */
  permissionList: Array<string>;
};

export type IamUserinfoVO = {
  /* 用户id */
  id: string;

  /* 用户账户 */
  account: string;

  /* 用户联系方式 */
  mobile: string;

  /* 用户备注 */
  remark: string;

  /* 用户的头像 */
  avatar: string;

  /* 租户id */
  currentTenantId: string;

  /* 应用列表 */
  tenantList?: Array<IamUserTenantInfo>;
};

/* 获取当前登录的用户信息 */
export const getIamUserinfoCurrent = () => {
  return http.request<ApiResponse<IamUserinfoVO>>(
    "get",
    "/auth/api/iam/userinfo/current"
  );
};

/* 手动刷新当前登录用户信息 */
export const getIamUserinfoRefresh = () => {
  return http.request<ApiResponse<IamUserinfoApplicationVO>>(
    "get",
    "/auth/api/iam/userinfo/refresh"
  );
};

/* 获取当前登录用户路由 */
export const getIamUserinfoRouterPlatform = () => {
  return http.request<ApiResponse<Array<RouteRecordRaw>>>(
    "get",
    "/auth/api/iam/userinfo/router/platform"
  );
};
