import { http } from "@/utils/http";
import { ApiResponse } from "@/utils/http/iamTypes";

type IamLoginClientParamsVO = {
  /* 客户端类型 */
  clientType: string;

  /* 客户端系统类型 */
  clientSystemOs: string;

  /* 客户端系统版本 */
  clientSystemVersion: string;

  /* 客户端代理模式 */
  clientAgent: string;

  /* 客户端屏幕宽度 */
  clientScreenWidth: string;

  /* 客户端屏幕高度 */
  clientScreenHeight: string;
};

type IamLoginAccountPasswordVO = {
  /* 账号/手机号 */
  account: string;

  /* 密码 */
  password: string;

  /* 登录所属的应用id */
  applicationId: string;

  /* 登录使用客户端参数 */
  clientParams?: IamLoginClientParamsVO;
};

export type IamLoginResponseVO = {
  /* 登录信息，成功为success。失败会返回原因。 */
  message: string;

  /* 是否登录成功，作为判别 */
  success: boolean;

  /* 认证header的key名称 */
  header?: string;

  /* 登录认证token */
  token?: string;

  /* token过期时间 */
  expireDatetime?: string;

  /* token过期时间戳 */
  expireTimestamp?: number;
};

/* 账号密码登录 */
export const postUnauthorizedLoginAccountPassword = (
  data: IamLoginAccountPasswordVO
) => {
  return http.request<ApiResponse<IamLoginResponseVO>>(
    "post",
    "/auth/api/unauthorized/login/account/password",
    { data }
  );
};
