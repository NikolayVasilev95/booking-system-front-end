import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridApi,
  GridCellParams,
  GridCellValue,
  GridColDef,
} from "@material-ui/data-grid";
import { useHistory } from "react-router";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { allSalon } from "../services/salon";
import { allCalendar } from "../services/Calendar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

type Entity = "Calendar" | "Salon";
type Props = {
  columns: GridColDef[];
  entity: Entity;
};

export default function CustomAlertTable({ columns, entity }: Props) {
  columns.push({
    field: "edit",
    headerName: "Edit",
    sortable: false,
    width: 100,
    renderCell: () => {
      return (
        <IconButton aria-label="edit" color="primary">
          <EditIcon style={{ fontSize: 30 }} />
        </IconButton>
      );
    },
  });
  columns.push({
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 100,
    renderCell: () => {
      return (
        <IconButton aria-label="delete" color="primary">
          <DeleteOutlineIcon style={{ fontSize: 30 }} />
        </IconButton>
      );
    },
  });

  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState<any[]>([]);
  const [pathForNewEntityRecord, setPathForNewEntityRecord] =
    useState<string>("");

  function selectedEntity(entity: Entity) {
    switch (entity) {
      case "Calendar": {
        setPathForNewEntityRecord("/new-calendar");
        return allCalendar();
      }
      case "Salon": {
        setPathForNewEntityRecord("/new-salon");
        return allSalon();
      }
      default:
        break;
    }
  }

  function currentlySelected(params: GridCellParams) {
    const value = params.colDef.field;
    const api: GridApi = params.api;
    if (!(value === "edit" || value === "delete")) {
      return;
    }

    const fields = api
      .getAllColumns()
      .map((c) => c.field)
      .filter((c) => c !== "__check__" && !!c);
      
    const thisRow: Record<string, GridCellValue> = fields.reduce((acc, curr) => {
      acc[curr] = params.getValue(params.id, curr);
      return acc;
    }, {} as Record<string, GridCellValue>);

    console.log(thisRow);

    // const user = {} as User;
    // user["id"] = Number(thisRow["id"]);
    // user["name"] = thisRow["name"]!.toString();
    // user["surname"] = thisRow["surname"]!.toString();

    // setSelectedUser(user);
    // setOpenDialog(true);
  }

  useEffect(() => {
    selectedEntity(entity)
      // @ts-ignore
      ?.then(({ data }) => {
        console.log(data);
        setData(data.result);
        setLoading(false);
      })
      // @ts-ignore
      .catch((error) => {
        console.log(error);
      });
  }, [entity]);

  return (
    <Card elevation={3}>
      <CardHeader
        action={
          <IconButton
            aria-label="new-record"
            onClick={() => history.push(pathForNewEntityRecord)}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
        }
        title={entity}
      />
      <CardContent>
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[2, 5, 7]}
          pagination
          loading={loading}
          onCellClick={currentlySelected}
        />
      </CardContent>
    </Card>
  );
}
