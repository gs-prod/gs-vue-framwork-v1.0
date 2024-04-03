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
  const response = await useFetch(url, {
    default: () => [],
    baseURL,
    method,
    params: ["GET", "DELETE"].includes(method) ? { ...params } : undefined,
    headers:
      status.value === "authenticated"
        ? { Authorization: token.value || "" }
        : {},
    // lazy: true,
    // credentials: 'include',
    body: ["POST", "PUT"].includes(method) ? JSON.stringify(params) : undefined,
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
      switch (response.status) {
        case 401:
          ElMessage.error("Login expired, please login again");
          break;
        case 400:
          ElMessage.error("参数格式不正确:" + response._data);
          break;
        case 403:
          ElMessage.error("禁止访问" + response._data);
          break;
        case 422:
          ElMessage.error("参数校验失败:" + response._data);
          break;
        default:
          ElMessage.error("内部服务器错误:" + response._data);
      }
    },
  });

  if (response.status.value === "error") {
    throw "request error occur";
  }

  return response;
};

export const useQsRequest = {
  get: (url: string, params?: any, option?: RequestOptions) => {
    return request(url, params, { method: "GET", ...option });
  },
  post: (url: string, params?: any, option?: RequestOptions) => {
    return request(url, params, { method: "POST", ...option });
  },
  put: (url: string, params?: any, option?: RequestOptions) => {
    return request(url, params, { method: "PUT", ...option });
  },
  delete: (url: string, params?: any, option?: RequestOptions) => {
    return request(url, params, { method: "DELETE", ...option });
  },
};
