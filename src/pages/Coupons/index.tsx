import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";
import { AtInput } from "taro-ui";
import { post } from "../../HiNet";
import apis from "../../apis";
import MyCoupons from "./MyCoupons";
import Taro from "@tarojs/taro";

export default (props: any) => {
  const [couponCode, setCouponCode] = useState(undefined);

  const exchangeCoupon = () => {
    post(apis.couponRedeem, { couponCode }).then(() => {
      setCouponCode(undefined);
      Taro.eventCenter.trigger("refreshCouponList");
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.exchangeContainer}>
        <AtInput
          clear
          title="劵码"
          type="text"
          placeholder="请输入劵码"
          value={couponCode}
          onChange={setCouponCode}
        >
          <Text onClick={exchangeCoupon}>兑换</Text>
        </AtInput>
      </View>
      <MyCoupons />
    </View>
  );
};
