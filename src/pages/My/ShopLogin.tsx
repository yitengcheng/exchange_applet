import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";
import { AtButton, AtInput } from "taro-ui";
import Taro from "@tarojs/taro";
import { post } from "../../HiNet";
import apis from "../../apis";

export default (props: any) => {
  const [userName, setUserName] = useState(undefined);
  const [password, setPassword] = useState(undefined);

  const doLogin = () => {
    if (!userName) {
      Taro.showToast({ title: "请输入账号", icon: "error" });
      return;
    }
    if (!password) {
      Taro.showToast({ title: "请输入密码", icon: "error" });
      return;
    }
    post(apis.shopLogin, { userName, password })
      .then((res) => {
        Taro.setStorageSync("token", res?.token);
        Taro.setStorageSync("shopInfo", res?.shopInfo);
        Taro.eventCenter.trigger("refreshShop");
      })
      .catch();
  };

  return (
    <View className={styles.loginContainer}>
      <View className={styles.loginBox}>
        <AtInput
          title="账号"
          type="text"
          placeholder="请输入登录账号"
          value={userName}
          onChange={setUserName}
        />
        <AtInput
          title="密码"
          type="password"
          placeholder="请输入登录密码"
          value={password}
          onChange={setPassword}
        />
        <AtButton type="primary" className={styles.loginBtn} onClick={doLogin}>
          登录
        </AtButton>
      </View>
    </View>
  );
};
