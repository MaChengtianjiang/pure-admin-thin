import { http } from "@/utils/http";
import {
  ApiPageResponse,
  ApiResponse,
  PageRequest
} from "@/utils/http/iamTypes";

export type IamRouterModelVO = {
  /* id */
  id: string;

  /* 用户名称 */
  iamUserName: string;

  /* 状态 */
  state: string;

  /* 应用id */
  iamApplicationId: string;

  /* 应用名称 */
  iamApplicationName: string;

  /* 路径路由 */
  iamRouterPath: string;

  /* 路径路由名称 */
  iamRouterName: string;

  /* 路由重定向地址 */
  iamRouterRedirect: string;

  /* 组件名称 */
  iamRouterComponent: string;

  /* 菜单名称 */
  iamRouterMetaTitle: string;

  /* 路径路由名称 */
  iamRouterMetaIcon: string;

  /* 路由组件缓存，是否开启 */
  iamRouterMetaKeepAlive: boolean;

  /* 路由组件缓存，是否开启 */
  iamRouterMetaPermission: string;

  /* 内嵌的iframe链接 */
  iamRouterMetaIframeSrc: string;

  /* iframe页是否开启首次加载动画 */
  iamRouterMetaIframeLoading: string;

  /* 是否不添加信息到标签页 */
  iamRouterMetaHiddenTag: string;

  /* 动态路由可打开的最大数量 */
  iamRouterMetaDynamicLevel: string;

  /* 上级路由 */
  iamRouterParent: string;

  /* 子路由 */
  children: Array<IamRouterModelVO>;
};

/**
 * 路由基础信息
 */
export type IamRouteVO = {
  /* 用户id */
  path: string;

  /* 用户名 */
  name: string;

  /* 用户账户 */
  redirect: string;

  /* 用户联系方式 */
  component: string;

  /* 用户备注 */
  meta: IamRouterMateVO;

  /* 应用列表 */
  children?: Array<IamRouteVO>;
};

/**
 * 路由扩展信息
 */
export type IamRouterMateVO = {
  /**
   * 菜单名称
   */
  title: string;
  /**
   * 菜单图标
   */
  icon: string;
  /**
   * 是否在菜单中显示
   */
  showLink: boolean;
  /**
   * 是否显示父级菜单
   */
  showParent: boolean;
  /**
   * 内嵌的`iframe`链接 `
   */
  frameSrc: string;

  /**
   * 路由权限设置
   */
  authority: Array<string>;

  /**
   * `iframe`页是否开启首次加载动画
   */
  frameLoading: boolean;

  /**
   * 是否不添加信息到标签页
   */
  hiddenTag: boolean;

  /**
   * 动态路由可打开的最大数量
   */
  dynamicLevel: number;
};

/* 获取用户分页数据 */
export const getIamAppPageList = (page: PageRequest, searchParams?: any) => {
  const params = {
    ...page
  };
  if (searchParams.iamApplicationName) {
    params.str = searchParams.iamApplicationName;
  }

  return http.request<ApiPageResponse<IamRouterModelVO>>(
    "get",
    "/api/iam/application/page",
    { params }
  );
};

/* 新增路由 */
export const addIamApp = (data?: any) => {
  return http.request<ApiResponse<any>>("post", "/api/iam/router/add", {
    data
  });
};

/* 修改路由 */
export const updateIamApp = (data?: any) => {
  return http.request<ApiResponse<any>>("put", "/api/iam/router/update", {
    data
  });
};

/* 修改路由状态 */
export const changeStateIamApp = (ids: Array<String>, state: string) => {
  return http.request<ApiResponse<any>>("put", "/api/iam/router/state", {
    data: ids,
    params: { state: state }
  });
};
