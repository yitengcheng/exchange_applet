import Taro from "@tarojs/taro";
import { Component } from "react";
import apis from "./apis";
import { post } from "./HiNet";
import "taro-ui/dist/style/index.scss";

class App extends Component {
  componentDidMount() {
    Taro.login({
      success: ({ code, errMsg }) => {
        post(apis.login, { code })
          .then((res) => {
            Taro.setStorage({ key: "token", data: res?.token });
          })
          .catch();
      },
    });
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
