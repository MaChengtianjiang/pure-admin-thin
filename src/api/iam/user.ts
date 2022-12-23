import { http } from "@/utils/http";
import { ApiPageResponse, PageRequest } from "@/utils/http/iamTypes";

export type IamUserModelVO = {
  /* id */
  id: string;
  /* 用户名称 */
  iamUserName: string;
  /* 用户账户 */
  iamUserAccount: string;
};

/* 获取用户分页数据 */
export const getIamUserPageList = (page: PageRequest, searchParams?: any) => {
  const params = {
    ...page
  };
  if (searchParams.iamUserName) {
    params.str = searchParams.iamUserName;
  }

  return http.request<ApiPageResponse<IamUserModelVO>>(
    "get",
    "/api/iam/user/page",
    { params }
  );
};
