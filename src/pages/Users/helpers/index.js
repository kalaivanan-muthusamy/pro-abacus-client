import moment from "moment-timezone";

export const studentProperties = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Gender",
    key: "gender",
  },
  {
    label: "Age",
    key: "age",
  },
  {
    label: "Subscription end date",
    key: "subscriptionDetails.expiryAt",
    formatter: (value) =>
      value
        ? moment.tz(value, "Asia/Calcutta").format("DD MMM, YYYY HH:mm")
        : "-",
  },
  {
    label: "Level",
    key: "levelDetails.name",
  },
  {
    label: "Batch Name",
    key: "batchDetails.name",
  },
  {
    label: "Status",
    key: "enabled",
  },
];

export const teacherProperties = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Email",
    key: "email",
  },
  {
    label: "Gender",
    key: "gender",
  },
  {
    label: "Age",
    key: "age",
  },
  {
    label: "Subscription end date",
    key: "subscriptionDetails.expiryAt",
    formatter: (value) =>
      value
        ? moment.tz(value, "Asia/Calcutta").format("DD MMM, YYYY HH:mm")
        : "-",
  },
  {
    label: "Center Name",
    key: "centerName",
  },
  {
    label: "Status",
    key: "enabled",
  },
];
