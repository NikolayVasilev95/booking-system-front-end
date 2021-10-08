import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";

type Props = {
  severity: "success" | "info" | "warning" | "error";
  title?: string;
  data: string;
};
export function CustomAlert({ severity, title, data }: Props) {
  return (
    <Alert severity={severity}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {data}
    </Alert>
  );
}
