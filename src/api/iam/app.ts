import { http } from "@/utils/http";
import {
  ApiPageResponse,
  ApiResponse,
  PageRequest
} from "@/utils/http/iamTypes";

export type IamApplicationModelVO = {
  /* id */
  id: string;

  /* 用户名称 */
  iamUserName: string;

  /* 状态 */
  state: string;
  /* 应用名称 */
  iamApplicationName: string;

  /* 应用头像 */
  iamApplicationAvatar: string;

  /* 应用描述 */
  iamApplicationDescription: string;

  /* 是否开启多租户 */
  iamApplicationTenantSwitch: boolean;

  /** 创建时间 */
  createTime: string;
};

/* 获取用户分页数据 */
export const getIamAppPageList = (page: PageRequest, searchParams?: any) => {
  const params = {
    ...page
  };
  if (searchParams.iamApplicationName) {
    params.str = searchParams.iamApplicationName;
  }

  return http.request<ApiPageResponse<IamApplicationModelVO>>(
    "get",
    "/api/iam/application/page",
    { params }
  );
};

/* 新增应用 */
export const addIamApp = (data?: any) => {
  return http.request<ApiResponse<any>>("post", "/api/iam/application/add", {
    data
  });
};

/* 修改应用 */
export const updateIamApp = (data?: any) => {
  return http.request<ApiResponse<any>>("put", "/api/iam/application/update", {
    data
  });
};

/* 修改应用状态 */
export const changeStateIamApp = (ids: Array<String>, state: string) => {
  return http.request<ApiResponse<any>>("put", "/api/iam/application/state", {
    data: ids,
    params: { state: state }
  });
};
