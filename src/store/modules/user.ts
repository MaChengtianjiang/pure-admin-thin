import { defineStore } from "pinia";
import { store } from "@/store";
import { userType } from "./types";
import { routerArrays } from "@/layout/types";
import { resetRouter, router } from "@/router";
import { useMultiTagsStoreHook } from "@/store/modules/multiTags";
import { removeToken, setToken } from "@/utils/auth";
import {
  IamLoginResponseVO,
  postUnauthorizedLoginAccountPassword
} from "@/api/unauthorized/login";
import {
  getIamUserinfoCurrent,
  IamUserinfoVO,
  IamUserTenantInfo
} from "@/api/iam/userinfo";
import { storageSession } from "@pureadmin/utils";
import { usePermissionStoreHook } from "@/store/modules/permission";

export const useUserStore = defineStore({
  id: "pure-user",
  state: (): userType => ({
    // 用户名
    username: "",
    // storageSession().getItem<DataInfo<number>>(sessionKey)?.username ?? "",
    // 页面级别权限
    roles: []
    // storageSession().getItem<DataInfo<number>>(sessionKey)?.roles ?? []
  }),
  actions: {
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },

    /** 登入 */
    async loginByUsername(data) {
      return new Promise<IamLoginResponseVO>((resolve, reject) => {
        postUnauthorizedLoginAccountPassword(data)
          .then(loginRsp => {
            if (loginRsp) {
              const loginVo = loginRsp.data;
              setToken(loginRsp.data);
              getIamUserinfoCurrent().then(userInfoRsp => {
                const userInfoVo = userInfoRsp.data;
                cacheUserInfo(loginVo, userInfoVo);
                resolve(loginRsp.data);
              });
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /** 前端登出（不调用接口） */
    logOut() {
      this.username = "";
      this.roles = [];
      removeToken();
      useMultiTagsStoreHook().handleTags("equal", [...routerArrays]);
      resetRouter();
      router.push("/login");
    }
    // /** 刷新`token` */
    // async handRefreshToken() {
    //   return new Promise<IamLoginResponseVO>((resolve, reject) => {
    //     refreshTokenApi()
    //       .then(data => {
    //         if (data) {
    //           setToken(data.data);
    //           resolve(data);
    //         }
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // }
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}

export const sessionKey = "user-info";

/**
 * 缓存用户登陆信息
 * @param loginVo
 * @param userInfo
 */
function cacheUserInfo(loginVo: IamLoginResponseVO, userInfo: IamUserinfoVO) {
  if (userInfo.account && userInfo.tenantList) {
    const { account, tenantList } = userInfo;
    setUserInfo(loginVo.token, loginVo.expireTimestamp, account, tenantList);
  } else {
    const username =
      storageSession().getItem<IamUserinfoVO>(sessionKey)?.account ?? "";
    const tenantList =
      storageSession().getItem<IamUserinfoVO>(sessionKey)?.tenantList ?? [];
    setUserInfo(loginVo.token, loginVo.expireTimestamp, username, tenantList);
  }
}

/**
 * 缓存用户信息
 * @param token
 * @param expires
 * @param username
 * @param tenantList
 */
export function setUserInfo(
  token,
  expires,
  username: string,
  tenantList: Array<IamUserTenantInfo>
) {
  useUserStoreHook().SET_USERNAME(username);
  usePermissionStoreHook().cacheTenantList(tenantList);

  // useUserStoreHook().SET_ROLES(tenantList);
  storageSession().setItem(sessionKey, {
    token,
    expires,
    username,
    tenantList
  });
}
