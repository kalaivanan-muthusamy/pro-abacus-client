import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
import MyPerformance from "./../pages/MyPerformance/index";
import Practice from "../pages/Practice";
import SelfTest from "../pages/SelfTest";
import ACLResults from "../pages/ACLResults";
import WCLResults from "../pages/WCLResults";
import Exam from "../pages/Exam";
import CompletedExamReport from "../pages/Exam/CompletedExamReport";
import Assessment from "../pages/Assessments";
import Batches from "../pages/Batches";
import Notifications from "../pages/Notifications";
import Levels from "../pages/Levels";

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/my-performance", component: MyPerformance },
  { path: "/exam/start/:examId", exact: true, component: Exam },
  {
    path: "/exam/completed/:examId",
    exact: true,
    component: CompletedExamReport,
  },
  { path: "/practice", component: Practice },
  { path: "/self-test", component: SelfTest },
  { path: "/assessment", component: Assessment },
  { path: "/batches", component: Batches },
  { path: "/acl-results", component: ACLResults },
  { path: "/wcl-results", component: WCLResults },
  { path: "/notifications", component: Notifications },
  { path: "/levels", component: Levels },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
];

export { userRoutes, authRoutes };
