import { ElMessage } from "element-plus";
const { status, token } = useAuth();

// type UrlType = string | Request | Ref<string | Request> | (() => string | Request);

export interface RequestOptions {
  method?: any;
  params?: any;
}

const request = async (url: string, params: any, options: RequestOptions) => {
  // const headers = useRequestHeaders(['cookie']);
  const { apiBase: baseURL } = useRuntimeConfig().public;
  const { method = ((options?.method || "GET") as string).toUpperCase() } =
    options;
  return await useFetch(url, {
    default: () => [],
    baseURL,
    method,
    params: { ...params },
    headers:
      status.value === "authenticated"
        ? { Authorization: token.value || "" }
        : {},
    // lazy: true,
    // credentials: 'include',
    body: method === "POST" ? JSON.stringify(params) : undefined,
    onRequest({ request, options }) {
      // Set the request headers
    },
    onRequestError({ request, options, error }) {
      // ElMessage.closeAll();
      ElMessage.error("网络连接失败");
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
      // return response._data;
    },
    onResponseError({ request, response, options }) {
      // ElMessage.closeAll();
      switch (response.status) {
        case 401:
          ElMessage.error("登录到期,请重新登录");
          // @ts-ignore
          // location.href = process.env.DRG_LOGIN_URL;
          break;
        case 400:
          ElMessage.error("参数不正确");
          break;
        case 403:
          ElMessage.error("禁止访问");
          break;
        case 422:
          // @ts-ignore
          ElMessage.error(response.data.message);
          break;
        default:
          ElMessage.error("内部服务器错误");
      }
    },
  });
};

export const useQsRequest = {
  get: (url: string, params?: any, option?: RequestOptions) => {
    return request(url, params, { method: "GET", ...option });
  },
  post: (url: string, params?: any, option?: RequestOptions) => {
    return request(url, params, { method: "POST", ...option });
  },
};
