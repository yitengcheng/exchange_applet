export default defineAppConfig({
  pages: ["pages/Coupons/index", "pages/My/index", "pages/CouponDetail/index"],
  tabBar: {
    color: "#000000",
    selectedColor: "#DC143C",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/Coupons/index",
        iconPath: "./assets/images/home.png",
        selectedIconPath: "./assets/images/home_choose.png",
        text: "首页",
      },
      {
        pagePath: "pages/My/index",
        iconPath: "./assets/images/my.png",
        selectedIconPath: "./assets/images/my_choose.png",
        text: "商家",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
