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

export type IamUserinfoVO = {
  /* 用户id */
  id: string;

  /* 用户名 */
  username: string;

  /* 用户账户 */
  account: string;

  /* 用户联系方式 */
  mobile: string;

  /* 用户备注 */
  remark: string;

  /* 用户访问地址 */
  avatar: string;

  /* 应用列表 */
  applicationList?: Array<IamUserinfoApplicationVO>;
};

/* 获取当前登录的用户信息 */
export const getIamUserinfoCurrent = () => {
  return http.request<ApiResponse<IamUserinfoVO>>(
    "get",
    "/api/iam/userinfo/current"
  );
};

/* 手动刷新当前登录用户信息 */
export const getIamUserinfoRefresh = () => {
  return http.request<ApiResponse<IamUserinfoApplicationVO>>(
    "get",
    "/api/iam/userinfo/refresh"
  );
};

/* 获取当前登录用户路由 */
export const getIamUserinfoRouterPlatform = () => {
  return http.request<ApiResponse<Array<RouteRecordRaw>>>(
    "get",
    "/api/iam/userinfo/router/platform"
  );
};

/* 获取当前登录用户路由 */
export const getIamUserinfoRouterApplication = (appId: string) => {
  return http.request<ApiResponse<Array<RouteRecordRaw>>>(
    "get",
    "/api/iam/userinfo/router/application",
    {
      params: { appId: appId }
    }
  );
};
