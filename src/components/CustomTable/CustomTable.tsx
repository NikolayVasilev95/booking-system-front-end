import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridApi,
  GridCellParams,
  GridCellValue,
  GridColDef,
} from "@material-ui/data-grid";
import { useHistory } from "react-router";
import { Card, CardContent, CardHeader, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { allSalon, deleteSalon } from "../../services/salon";
import { allCalendar } from "../../services/Calendar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CustomDialog from "../Dialog/CustomDialog";
import { allPosition, deletePosition } from "../../services/position";
import { allEmployee, deleteEmployee } from "../../services/Employees";

export type Action = "edit" | "delete";
type Entity = "Calendar" | "Salon" | "Position" | "Employee";
type Props = { columns: GridColDef[]; entity: Entity };

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
  const [openCustomDialog, setOpenCustomDialog] = React.useState(false);
  const [selectedRowData, setSelectedRowData] =
    useState<Record<string, GridCellValue>>();
  const [action, setAction] = useState<Action>();

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

  const handleCloseCustomDialog = () => {
    setOpenCustomDialog(false);
  };

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
      case "Position": {
        setPathForNewEntityRecord("/new-position");
        return allPosition();
      }
      case "Employee": {
        setPathForNewEntityRecord("/new-employee");
        return allEmployee();
      }
      default:
        break;
    }
  }

  function currentlySelected(params: GridCellParams) {
    const value = params.colDef.field;
    const api: GridApi = params.api;
    if (!(value === "edit" || value === "delete")) return;

    const fields = api
      .getAllColumns()
      .map((c) => c.field)
      .filter((c) => c !== "__check__" && !!c);

    const thisRow: Record<string, GridCellValue> = fields.reduce(
      (acc, curr) => {
        acc[curr] = params.getValue(params.id, curr);
        return acc;
      },
      {} as Record<string, GridCellValue>
    );

    console.log(value);

    console.log(thisRow);

    switch (value) {
      case "edit":
        history.push(`${value}-${entity.toLowerCase()}/${thisRow?.id}`);
        break;
      case "delete":
        setAction(value);
        setSelectedRowData(thisRow);
        setOpenCustomDialog(true);
        break;
      default:
        break;
    }
  }

  function deleteEntity() {
    switch (entity) {
      case "Calendar": {
        return allCalendar();
      }
      case "Salon": {
        return deleteSalon((selectedRowData?.id as string) ?? "");
      }
      case "Position": {
        return deletePosition((selectedRowData?.id as string) ?? "");
      }
      case "Employee": {
        return deleteEmployee((selectedRowData?.id as string) ?? "");
      }
      default:
        break;
    }
  }

  function handleDeleteEntytity() {
    deleteEntity()
      // @ts-ignore
      ?.then(({ data: response }) => {
        if (response.status === "success") {
          const newData = data.filter((el) => el.id !== selectedRowData?.id);
          setData(newData);
          setOpenCustomDialog(false);
        }
      })
      // @ts-ignore
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAllActions(action: Action) {
    if (action === "edit") {
      // handlEditEntytity();
    } else if (action === "delete") {
      handleDeleteEntytity();
    }
  }

  return (
    <>
      <CustomDialog
        open={openCustomDialog}
        handleClose={handleCloseCustomDialog}
        action={action}
        handleAllActions={handleAllActions}
      />
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
    </>
  );
}
