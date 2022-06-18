import React, { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";
import ShopLogin from "./ShopLogin";
import Taro from "@tarojs/taro";
import ShopHome from "./ShopHome";

export default (props: any) => {
  const [shopInfo, setShopInfo] = useState(undefined);

  useEffect(() => {
    initSetShop();
    Taro.eventCenter.on("refreshShop", () => {
      initSetShop();
    });
  }, []);

  const initSetShop = () => {
    setShopInfo(Taro.getStorageSync("shopInfo"));
  };

  return (
    <View className={styles.container}>
      {shopInfo ? <ShopHome /> : <ShopLogin />}
    </View>
  );
};
