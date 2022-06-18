import React, { useEffect, useState } from "react";
import { View, Text, Image, Camera } from "@tarojs/components";
import styles from "./index.module.less";
import Taro from "@tarojs/taro";
import {
  AtButton,
  AtDivider,
  AtInput,
  AtList,
  AtListItem,
  AtSegmentedControl,
} from "taro-ui";
import { post } from "../../HiNet";
import apis from "../../apis";
import dayjs from "dayjs";

export default (props: any) => {
  const [shopInfo, setShopInfo] = useState(Taro.getStorageSync("shopInfo"));
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [couponCode, setCouponCode] = useState(undefined);
  const [cameraVisible, setCameraVisible] = useState(false);

  useEffect(() => {
    if (current === 0) {
      initCouponList(3);
    } else if (current === 1) {
      initCouponList(2);
    } else if (current === 2) {
      initCouponList(1);
    }
  }, [current]);

  const initCouponList = (type: number) => {
    post(apis.couponListByShop, { shopId: shopInfo._id, type })
      .then((res) => {
        const { total, list } = res;
        setTotal(total);
        setData(list);
      })
      .catch();
  };
  const onScanCode = (obj) => {
    setCameraVisible(false);
    const { result } = obj.detail;
    setCouponCode(result);
  };
  const expenseCoupon = () => {
    post(apis.couponExpense, { couponCode, shopId: shopInfo._id })
      .then((res) => {
        if (current === 0) {
          initCouponList(3);
        } else {
          setCurrent(0);
        }
      })
      .catch();
  };

  return (
    <View className={styles.shopContainer}>
      <View className={styles.shopInfoContainer}>
        <View className={styles.shopInfoRow}>
          <Text className={styles.shopInfoText}>
            店名：{shopInfo?.name ?? "暂无"}
          </Text>
        </View>
        <View className={styles.shopInfoRow}>
          <Text className={styles.shopInfoText}>
            负责人：{shopInfo?.head ?? "暂无"}
          </Text>
          <Text className={styles.shopInfoText}>
            联系方式：{shopInfo?.headPhone ?? "暂无"}
          </Text>
        </View>
        <View className={styles.shopInfoRow}>
          <Text className={styles.shopInfoText}>
            地址：{shopInfo?.address ?? "暂无"}
          </Text>
        </View>
      </View>
      <AtInput
        clear
        title="优惠券码"
        type="text"
        maxLength="10"
        placeholder="请输入优惠券码"
        value={couponCode}
        onChange={setCouponCode}
      >
        <Image
          src={require("/src/assets/images/scan.png")}
          mode="aspectFit"
          onClick={() => setCameraVisible(true)}
        />
      </AtInput>
      <View style={styles.expenseBtn}>
        <AtButton type="primary" onClick={expenseCoupon}>
          兑换
        </AtButton>
      </View>
      <View className={styles.couponListContainer}>
        <AtSegmentedControl
          current={current}
          values={["本月", "上月", "全部"]}
          onClick={setCurrent}
        />
        {data?.length === 0 ? (
          <AtDivider content="暂无数据" />
        ) : (
          <AtList>
            <Text className={styles.expenseTotal}>总计消费：{total}张</Text>
            {data?.map((item) => (
              <AtListItem
                title={`满${item.serviceConditions}元，减${item.creditAmount}`}
                note={`消费时间：${dayjs(item.useTime).format("YYYY-MM-DD")}`}
              />
            ))}
          </AtList>
        )}
      </View>

      {cameraVisible && (
        <View
          className={styles.cameraContainer}
          onClick={() => setCameraVisible(false)}
        >
          <Camera
            className={styles.camera}
            mode="scanCode"
            onScanCode={onScanCode}
          />
        </View>
      )}
    </View>
  );
};
