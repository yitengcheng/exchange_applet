import React, { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import styles from "./index.module.less";
import { AtList, AtSegmentedControl, AtListItem, AtDivider } from "taro-ui";
import { post } from "../../HiNet";
import apis from "../../apis";
import dayjs from "dayjs";
import Taro from "@tarojs/taro";

export default (props: any) => {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  Taro.eventCenter.on("refreshCouponList", () => {
    setCurrent(0);
  });

  useEffect(() => {
    if (current === 0) {
      initCouponList(2);
    } else if (current === 1) {
      initCouponList(3);
    } else if (current === 2) {
      initCouponList(1);
    }
  }, [current]);

  const initCouponList = (status: number) => {
    post(apis.couponListByStatus, { status })
      .then((res) => {
        const { total, list } = res;
        if (total === 0) {
          setData([]);
          return;
        }
        setData(list);
      })
      .catch();
  };
  const toDetail = (couponid: strig) => {
    Taro.navigateTo({ url: `/pages/CouponDetail/index?couponid=${couponid}` });
  };
  const couponList = (data: []) => {
    return (
      <AtList>
        {data.map((item) => (
          <AtListItem
            title={`满${item.serviceConditions}元，减${item.creditAmount}`}
            note={`有效期：${dayjs(item.validityTime).format("YYYY-MM-DD")}`}
            arrow="right"
            onClick={() => {
              toDetail(item._id);
            }}
          />
        ))}
      </AtList>
    );
  };
  return (
    <View className={styles.myCouponContainer}>
      <AtSegmentedControl
        values={["未使用", "已使用", "全部"]}
        onClick={setCurrent}
        current={current}
      />
      {current === 0 ? (
        <View className={styles.tabContainer}>
          {data?.length === 0 ? (
            <AtDivider
              content="暂无数据"
              fontColor="#2d8cf0"
              lineColor="#2d8cf0"
            />
          ) : (
            couponList(data)
          )}
        </View>
      ) : null}
      {current === 1 ? (
        <View className={styles.tabContainer}>
          {data?.length === 0 ? (
            <AtDivider
              content="暂无数据"
              fontColor="#2d8cf0"
              lineColor="#2d8cf0"
            />
          ) : (
            couponList(data)
          )}
        </View>
      ) : null}
      {current === 2 ? (
        <View className={styles.tabContainer}>
          {data?.length === 0 ? (
            <AtDivider
              content="暂无数据"
              fontColor="#2d8cf0"
              lineColor="#2d8cf0"
            />
          ) : (
            couponList(data)
          )}
        </View>
      ) : null}
    </View>
  );
};
