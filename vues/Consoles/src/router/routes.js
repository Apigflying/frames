// import Patha from "views/pathA"; //正常加载
const Home = () => import("views/home");
const ElementUI = ()=> import("views/home/elementui");
const Test = () => import("views/home/test"); //懒加载（按需加载）
const Login = () => import("views/login");
const NotFoundComponent = () => import("views/nofound");
const Echarts = () => import("views/home/echarts");
const Canvas = () => import('views/home/canvas');
const routes = [
  {
    path: "",
    redirect: 'home',
    component: Home
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "",
        redirect: 'element-ui/1',
        component: ElementUI
      },
      {
        path: "element-ui/:page",
        name: "element-ui",
        component: ElementUI
      },
      {
        path:'echarts',
        name:'echarts',
        component:Echarts
      },
      {
        path: "test",
        name: "test",
        component: Test
      },
      {
        path:"canvas",
        name:'canvas',
        component:Canvas
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "*", // 其他没有被匹配的路由，都会跳转到404页面
    component: NotFoundComponent
  }
];
export default routes;
