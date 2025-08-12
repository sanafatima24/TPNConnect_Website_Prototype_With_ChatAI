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

// --- Imported from Figma app ---
const DashboardDetails = Loadable(lazy(() => import("app/views/figma/DashboardDetails")));
const ConsignmentEntry = Loadable(lazy(() => import("app/views/figma/ConsignmentEntry")));
const AdvancedSearch = Loadable(lazy(() => import("app/views/figma/AdvancedSearch")));
const ViewConsignment = Loadable(lazy(() => import("app/views/figma/ViewConsignment")));
const RoutingPage = Loadable(lazy(() => import("app/views/figma/Routing")));

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
      { path: "/AIAssistant/Chatbot", element: <Chatbot />, auth: authRoles.editor },

      // --- Figma app routes ---
      { path: "/dashboarddetails", element: <DashboardDetails />, auth: authRoles.admin },
      { path: "/new-entry", element: <ConsignmentEntry />, auth: authRoles.admin },
      { path: "/advanced-search", element: <AdvancedSearch />, auth: authRoles.admin },
      { path: "/view-consignment/:docket", element: <ViewConsignment />, auth: authRoles.admin }, // detail by docket
      { path: "/routing", element: <RoutingPage />, auth: authRoles.admin }
    ]
  },

  // session pages
  ...sessionRoutes
];

export default routes;
