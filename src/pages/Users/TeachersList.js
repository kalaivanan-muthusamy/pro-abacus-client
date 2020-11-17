import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { getErrorMsg, getRequest } from "../../helpers/apiRequest";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

const columns = [
  {
    label: "S.No",
    field: "sno",
  },
  {
    label: "Name",
    field: "name",
  },
  {
    label: "Email",
    field: "email",
  },
  {
    label: "Center Name",
    field: "centerName",
  },
  {
    label: "Subscription End Date",
    field: "subscriptionEndDate",
  },
  {
    label: "Action",
    field: "action",
  },
];

function TeachersList() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getExamResults();
  }, []);

  async function getExamResults() {
    setLoading(true);
    try {
      const { error, res } = await getRequest("teachers/list");
      if (error) {
        setErrorMsg(getErrorMsg(error, "Couldn't get the student details"));
        setLoading(false);
        return;
      }
      const allStudents = res?.map?.((student, index) => ({
        ...student,
        sno: index + 1,
        level: student?.levelDetails?.name ?? "-",
        batch: student?.batchDetails?.name ?? "-",
        subscriptionEndDate: student?.subscriptionDetails?.expiryAt
          ? moment
              .tz(student?.subscriptionDetails?.expiryAt, "Asia/Calcutta")
              .format("DD MMM, YYYY HH:mm")
          : "-",
        action: (
          <div>
            <Link
              className="btn btn-sm btn-secondary"
              to={`/users/teachers/${student._id}`}
            >
              <i className="mdi mdi-eye" />
            </Link>
          </div>
        ),
      }));
      setStudents(allStudents);
    } catch (err) {
      setErrorMsg(getErrorMsg(err, "Couldn't get the student details"));
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner" />
        </div>
      )}
      <MDBDataTable
        hover
        barReverse
        responsive
        striped
        bordered
        noBottomColumns
        data={{
          columns,
          rows: students,
        }}
      />
    </React.Fragment>
  );
}

export default TeachersList;
