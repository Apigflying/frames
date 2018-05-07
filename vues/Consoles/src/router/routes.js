import Patha from "views/pathA"; //正常加载
const Pathb = () => import("views/pathB"); //懒加载（按需加载）
const testScroll = () => import("views/testScroll");
const bScroll = () => import("views/testScroll/better-scroll");
const Login = () => import("views/login");
const Authredirect = () => import("views/authredirect");
const Home = () => import("views/home");
const NotFoundComponent = () => import("views/nofound");
const routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "patha",
        name: "patha",
        component: Patha
      },
      {
        path: "pathb",
        name: "pathb",
        component: Pathb
      },
      {
        path: "testScroll",
        name: "testScroll",
        component: testScroll
      },
      {
        path: "bScroll",
        name: "bScroll",
        component: bScroll
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/authredirect",
    name: "authredirect",
    component: Authredirect
  },
  {
    path: "*", // 其他没有被匹配的路由，都会跳转到404页面
    component: NotFoundComponent
  }
];
export default routes;
