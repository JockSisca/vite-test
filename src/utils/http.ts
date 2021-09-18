import Axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";
// type
interface PendingType {
  url?: string;
  method?: Method;
  data: Object;
  cancel: Function;
}
enum baseEnvType {
  TEST = "test",
  PRO = "production",
  DEV = "development",
}
enum responseCodeType {
  SUEECEE = 200,
  SERVERFILE = 500,
  NOFUND = 404,
}
interface responseMsg {
  result: {};
  status: {
    code: number;
    [key: string]: string | number;
  };
}
interface OriginInterFace {
  baseUrl: string;
}
// 环境
const baseEnv: string = import.meta.env.MODE;
let origin: OriginInterFace = {
  baseUrl: "",
};
switch (baseEnv) {
  case baseEnvType.TEST:
    origin.baseUrl = "";
    break;
  case baseEnvType.PRO:
    origin.baseUrl = "";
    break;
  case baseEnvType.DEV:
    origin.baseUrl = "";
    break;
  default:
    origin.baseUrl = "";
    break;
}

let paddingList: Array<PendingType>;
let CancelToken = Axios.CancelToken;
// 设置重复

const axios: AxiosInstance = Axios.create({
  baseURL: origin.baseUrl,
});

// 请求列表
function removePadding(config: AxiosRequestConfig) {
  for (const iterator of paddingList) {
    const item: number = +iterator;
    const list: PendingType = paddingList[item];
    if (
      list.url === config.url &&
      JSON.stringify(list.data) === JSON.stringify(config.data) &&
      list.method === config.method
    ) {
      list.cancel("操作太频繁，请稍后再试");
      paddingList.slice(item, 1);
    }
  }
}
// 相应拦截器
axios.interceptors.response.use(
  (response) => {
    removePadding(response.config);
    const result: responseMsg = response.data;
    switch (result.status.code) {
      case responseCodeType.SUEECEE as Number:
        Promise.resolve(result.result);
        break;
      case responseCodeType.NOFUND as Number:
        Promise.resolve("未找到");
        break;

      case responseCodeType.SERVERFILE as Number:
        Promise.resolve("未找到");
        break;
      default:
        Promise.reject(result);
        break;
    }
  },
  (err) => {
    Promise.reject(err);
  }
);
// 请求拦截器
axios.interceptors.request.use(
  (request) => {
    removePadding(request);
    request.cancelToken = new CancelToken((c) => {
      paddingList.push({
        url: request.url,
        data: request.data,
        method: request.method,
        cancel: c,
      });
    });
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export function get(url: string, param: object): object {
  return axios.get(url, param);
}
export function post(url: string, param: object): object {
  return axios.post(url, param);
}
