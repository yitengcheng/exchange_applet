import Taro from "@tarojs/taro";
import apis from "../apis";
import config from "./config";

export const post = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    const token = Taro.getStorageSync("token");
    Taro.showLoading({ title: "加载中" });
    Taro.request({
      url: `${config.API_URL}${url}`,
      data: params,
      method: "POST",
      header: {
        Authorization: "Bearer " + token,
      },
      success: (result) => {
        const { code, data, msg } = result?.data;
        if (code === 200) {
          if (msg) {
            Taro.showToast({ title: msg, icon: "success" });
          }
          resolve(result?.data?.data);
        } else if (code === 401) {
          Taro.showToast({ title: "网络错误", icon: "error" });
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
          Taro.showToast({ title: msg, icon: "error" });
        }
      },
      fail: (res) => {
        reject(res);
      },
      complete(res) {
        Taro.hideLoading();
      },
    });
  });
};
