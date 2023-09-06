import 'antd/es/tag/style/css';
import 'antd/es/button/style/css';
import 'antd/es/modal/style/css';
import 'antd/es/select/style/css';
import 'antd/es/popover/style/css';

import {
  useEffect,
  useRef,
} from 'react';

import Button from 'antd/es/button';
import Tag from 'antd/es/tag';
import {
  BrowserRouter as Router,
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';

import Communication from './Communication';
import Dialog from './Dialog';
import Location from './Location';
import logo from './logo.svg';
import State from './State';

const basename = process.env.NODE_ENV === "production" ? "/demo-react17/" : "";

const Home = () => (
  <div>
    <h2>react17示例</h2>
    <p>
      当前react版本{" "}
      <Tag style={{ verticalAlign: "text-top" }} color="blue">
        17.0.2
      </Tag>
    </p>
    <p>
      当前antd版本{" "}
      <Tag style={{ verticalAlign: "text-top" }} color="geekblue">
        4.18.3
      </Tag>
    </p>
    <p>
      <Button
        onClick={() =>
          window.open(
            "https://github.com/Tencent/wujie/tree/master/examples/react17"
          )
        }
      >
        仓库地址
      </Button>
    </p>
  </div>
);

function Nav() {
  const history = useHistory();
  // 主应用告诉子应用跳转路由
  useEffect(() => {
    const routerJump = (path) => history.push(path);

    window.$wujie?.bus.$on("react17-router-change", routerJump);
  }, [history]);

  // 在 react17-sub 路由下主动告知主应用路由跳转，主应用也跳到相应路由高亮菜单栏
  const location = useLocation();

  const firstUpdate = useRef(false);
  useEffect(() => {
    if (!firstUpdate.current) {
      firstUpdate.current = true;
      return;
    }
    if (!location.pathname.includes("react17")) return;
    window.$wujie?.bus.$emit("sub-route-change", "react17", location.pathname);
  }, [location]);

  return (
    <nav>
      <NavLink to="/home">首页</NavLink> | <NavLink to="/dialog">弹窗</NavLink>{" "}
      | <NavLink to="/location">路由</NavLink> |{" "}
      <NavLink to="/communication">通信</NavLink> |{" "}
      <NavLink to="/state">状态</NavLink>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router basename={basename}>
          <div>
            <Nav />
            <img src={logo} className="App-logo" alt="logo" />
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route path="/dialog">
                <Dialog />
              </Route>
              <Route path="/location">
                <Location />
              </Route>
              <Route path="/communication">
                <Communication />
              </Route>
              <Route path="/state">
                <State />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
