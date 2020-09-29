import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ROLES } from "../../contants";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    const role = localStorage.getItem("role");
    localStorage.clear();
    if (role === ROLES.STUDENT) {
      history.push("/login/student");
    } else if (role === ROLES.TEACHER) {
      history.push("/login/teacher");
    } else if (role === ROLES.ADMIN) {
      history.push("/login/admin");
    } else {
      history.push("/login/student");
    }
  }, []);

  return <></>;
};

export default Logout;
