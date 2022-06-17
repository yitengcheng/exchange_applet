import React, { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";
import { post } from "../../HiNet";
import apis from "../../apis";
import Taro from "@tarojs/taro";
import dayjs from "dayjs";
import { AtDivider } from "taro-ui";
import { QRCode } from "taro-code";

export default (props: any) => {
  const [couponId, setCouponId] = useState(
    Taro.getCurrentInstance().router.params.couponid
  );
  const [coupon, setCoupon] = useState({});

  useEffect(() => {
    initCoupon();
  }, []);

  const initCoupon = () => {
    post(apis.couponDetail, { couponId })
      .then((res) => {
        setCoupon(res);
      })
      .catch();
  };
  const getPx = () => {
    const sys = Taro.getSystemInfoSync();
    const scale = sys.screenWidth / 750;
    return Number(700 * scale).toFixed(0);
  };

  return (
    <View className={styles.container}>
      <View className={styles.couponContainer}>
        <View className={styles.couponRow}>
          <Text className={styles.couponText}>
            优惠券码：{coupon?.couponCode ?? "暂无"}
          </Text>
          <Text className={styles.couponText}>
            有效期：
            {coupon?.validityTime
              ? dayjs(coupon?.validityTime).format("YYYY-MM-DD")
              : "暂无"}
          </Text>
        </View>
        <View className={styles.couponRow}>
          <Text className={styles.couponText}>
            使用条件：满{coupon?.serviceConditions ?? "暂无"}元
          </Text>
          <Text className={styles.couponText}>
            减免金额：立减{coupon?.creditAmount ?? "暂无"}元
          </Text>
        </View>
        <View className={styles.couponRow}>
          <Text className={styles.couponText}>
            兑换时间：
            {coupon?.changeTime
              ? dayjs(coupon?.changeTime).format("YYYY-MM-DD")
              : "暂无"}
          </Text>
          <Text className={styles.couponText}>
            状态：{coupon?.status === 2 ? "未使用" : "已使用"}
          </Text>
        </View>
      </View>
      {coupon.status === 2 ? (
        <View className={styles.couponQr}>
          <QRCode
            size={getPx()}
            text={coupon?.couponCode}
            errorCorrectLevel="M"
            typeNumber={2}
          />
        </View>
      ) : null}
    </View>
  );
};
