import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/session-routes";

// IMPORT YOUR NEW HOME ANALYTICS PAGE
const HomeAnalytics = Loadable(lazy(() => import("app/views/home/Analytics")));

// Other existing pages
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
const Chatbot = Loadable(lazy(() => import("app/views/AIAssistant/Chatbot")));

const routes = [
  // ✅ DEFAULT: route '/' to the new home
  { path: "/", element: <Navigate to="/home" /> },

  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      // ✅ NEW HOME ROUTE
      { path: "/home", element: <HomeAnalytics />, auth: authRoles.admin },

      // other routes
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      { path: "/AIAssistant/Chatbot", element: <Chatbot />, auth: authRoles.editor }
    ]
  },

  // session pages
  ...sessionRoutes
];

export default routes;
