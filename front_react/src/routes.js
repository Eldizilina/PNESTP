import Home from "./views/Home";
import PainelProfessor from './views/PainelProfessor';
import Index from "views/Index";
import Profile from "views/examples/Profile";
import Register from "views/examples/Register";
import Login from "views/examples/Login";
import PainelAluno from './views/PainelAluno';

const routes = [
  {
    path: "/home",
    exact: true,
    icon: "fa fa-home text-success",
    component: () => <Home />,
    layout: "/auth",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: () => <Index />,
    layout: "/admin",
  },
  {
    path: "/painel-professor",
    name: "Painel do Professor",
    icon: "ni ni-hat-3 text-indigo", // ícone opcional
    component: () => <PainelProfessor />,
    layout: "/admin",
  },

   {
    path: "/painel-aluno",
    name: "Painel do Aluno", // nome para o menu
    icon: "ni ni-single-copy-04 text-green", // 👈 ícone para o aluno
    component: () => <PainelAluno />,
    layout: "/admin", // ou outro layout se o painel do aluno tiver layout diferente
  },


  {
    path: "/perfil",
    name: "Perfil",
    icon: "ni ni-single-02 text-yellow",
    component: () => <Profile />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: () => <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Cadastrar",
    icon: "ni ni-circle-08 text-pink",
    component: () => <Register />,
    layout: "/auth",
  },

];

export default routes;
