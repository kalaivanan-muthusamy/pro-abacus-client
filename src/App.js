import React, { useEffect } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  useLocation,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";

// Import Routes all
import { userRoutes, authRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
// import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";

// Import css/scss
import "bootstrap/dist/css/bootstrap.min.css";
import "toastr/build/toastr.min.css";
import "./assets/scss/theme.scss";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

const App = (props) => {
  function getLayout() {
    let layoutCls = VerticalLayout;

    switch (props.layout.layoutType) {
      case "horizontal":
        layoutCls = <div />;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();

  const NonAuthMiddleware = ({
    path,
    component: Component,
    layout: Layout,
  }) => (
    <Route
      path={path}
      render={(props) => {
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );

  return (
    <React.Fragment>
      <Router>
        <ScrollToTop>
          <Switch>
            {authRoutes.map((route, idx) => (
              <NonAuthMiddleware
                exact={route.exact}
                path={route.path}
                layout={NonAuthLayout}
                component={route.component}
                key={idx}
              />
            ))}

            {userRoutes.map((route, idx) => (
              <Authmiddleware
                path={route.path}
                exact={route.exact}
                layout={Layout}
                component={route.component}
                key={idx}
              />
            ))}
          </Switch>
        </ScrollToTop>
      </Router>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
