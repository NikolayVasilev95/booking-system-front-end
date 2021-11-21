import React, { ReactElement } from "react";
import { Card, CardHeader, Grid, IconButton } from "@material-ui/core";
import { useHistory } from "react-router";
import BackspaceIcon from "@material-ui/icons/Backspace";

interface Props {
  cardHeaderTitle: string;
  backSpaceButton: string;
  children: ReactElement<any, any>;
}

export default function EditFormLayout({
  cardHeaderTitle,
  backSpaceButton,
  children,
}: Props) {
  const history = useHistory();

  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <Grid item sm={12} md={4} lg={4}></Grid>
      <Grid item sm={12} md={4} lg={4}>
        <Card elevation={3}>
          <CardHeader
            title={cardHeaderTitle}
            action={
              <IconButton
                aria-label="backspace"
                color="primary"
                onClick={() => history.push(backSpaceButton)}
              >
                <BackspaceIcon style={{ fontSize: 30 }} />
              </IconButton>
            }
          />
          {children}
        </Card>
      </Grid>
      <Grid item sm={12} md={4} lg={4}></Grid>
    </Grid>
  );
}
