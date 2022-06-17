import Taro from "@tarojs/taro";
import config from "./config";

export const post = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    const token = Taro.getStorageSync("token");
    Taro.showLoading();
    Taro.request({
      url: `${config.API_URL}${url}`,
      data: params,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      success: (result) => {
        const { code, data, msg } = result?.data;
        if (code === 200) {
          resolve(result?.data?.data);
        } else if (code === 401) {
          Taro.login({
            success: ({ code, errMsg }) => {
              post(apis.login, { code })
                .then((res) => {
                  Taro.setStorage({ key: "token", data: res?.token });
                })
                .catch();
            },
          });
        } else {
          reject(msg);
        }
      },
      fail: (res) => {
        reject(res);
      },
      complete: () => {
        Taro.hideLoading();
      },
    });
  });
};
