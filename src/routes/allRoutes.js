import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// Dashboard
import Dashboard from "../pages/Dashboard/index";
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
import WCL from "../pages/WCL";
import ACL from "../pages/ACL";
import Profile from "../pages/Profile";
import EmailVerification from "./../pages/Authentication/EmailVerification";
import ResetPassword from "../pages/Authentication/ResetPassword";
import ExamReport from "./../pages/Exam/ExamReport";
import Reports from "./../pages/Reports";
import Plans from "../pages/Plans";
import Users from "../pages/Users";
import Subscriptions from "./../pages/Subscriptions/index";
import BatchStudents from "./../pages/Batches/Students";
import UserDetails from "./../pages/Users/UserDetails";
import Home from "./../pages/Home/index";
import SendNotifications from "../pages/Notifications/SendNotifications";

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/reports", component: Reports },
  { path: "/exam/start/:examId", exact: true, component: Exam },
  { path: "/exam/report/:examId", exact: true, component: ExamReport },
  {
    path: "/exam/completed/:examId",
    exact: true,
    component: CompletedExamReport,
  },
  { path: "/practice", component: Practice },
  { path: "/self-test", component: SelfTest },
  { path: "/assessment", component: Assessment },
  { path: "/wcl", component: WCL },
  { path: "/acl", component: ACL },
  { path: "/batches/students/:batchId", component: BatchStudents },
  { path: "/batches", component: Batches },
  { path: "/acl-results", component: ACLResults },
  { path: "/wcl-results", component: WCLResults },
  { path: "/notifications", component: Notifications },
  { path: "/send-notifications", component: SendNotifications },
  { path: "/levels", component: Levels },
  { path: "/profile", component: Profile },
  { path: "/plans", component: Plans },
  { path: "/users/:role/:userId", component: UserDetails },
  { path: "/users", component: Users },
  { path: "/subscriptions", component: Subscriptions },
];

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login/:role", component: Login },
  { path: "/forgot-password/:role", component: ForgetPwd },
  { path: "/reset-password/:role/:email/:hash", component: ResetPassword },
  { path: "/email-verify/:role/:email/:hash", component: EmailVerification },
  { path: "/register", component: Register },
  { path: "/", exact: true, component: Home },
];

export { userRoutes, authRoutes };
