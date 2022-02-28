import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomAlert } from "../../../utils/CustomAlert";
import { FormInputDropdown } from "../../../utils/Form/FormInputDropdown/FormInputDropdown";
import { FormSubmitButton } from "../../../utils/Form/FormSubmitButton/FormSubmitButton";
import FormLayout from "../../../utils/FormLayout";
import { CardContent, MenuItem } from "@material-ui/core";
import { allEmployee, newEmployee } from "../../../services/Employees";
import { Employee } from "../../../services/Employees/types";
import { FormInputText } from "../../../utils/Form/FormInputText/FormInputText";
import { FormTextArea } from "../../../utils/Form/FromTextArea/FromTextArea";
import { FormFileUpload } from "../../../utils/Form/FormFileUpload/FormFileUpload";
import { Position } from "../../../services/position/types";
import { Salon } from "../../../services/salon/types";
import { allSalon } from "../../../services/salon";
import { allPosition } from "../../../services/position";

export default function NewEmployee() {
  const [alertData, setAlertData] = useState<{
    data: string;
    severity: "success" | "info" | "warning" | "error";
  }>();
  const [salons, setSalons] = useState<Salon[]>();
  const [positions, setPositions] = useState<Position[]>();

  const {
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm<Employee>();

  useEffect(() => {
    allSalon()
      .then(({ data }) => {
        setSalons(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
    allPosition()
      .then(({ data }) => {
        setPositions(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = async (data: Employee) => {
    console.log(data);

    newEmployee(data)
      .then(({ data }) => {
        if (data.status === "success")
          setAlertData({ data: "Успешено запазвано", severity: "success" });
      })
      .catch((error) => {
        console.log(error);
        setAlertData({ data: error, severity: "error" });
      });
  };

  return (
    <FormLayout cardHeaderTitle="Employee" backSpaceButton="/employee">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <FormInputText
            name="firstName"
            control={control}
            labelId="firstName"
            label="First Name"
            isFullWidth={true}
            isRequired={true}
          />
          <FormInputText
            name="middleName"
            control={control}
            labelId="middleName"
            label="Middle Name"
            isFullWidth={true}
            isRequired={true}
          />
          <FormInputText
            name="lastName"
            control={control}
            labelId="lastName"
            label="Last Name"
            isFullWidth={true}
            isRequired={true}
          />
          <FormFileUpload
            name="img"
            control={control}
            isFullWidth={true}
            isRequired={true}
            acceptedFiles={["image/jpeg", "image/png"]}
            filesLimit={1}
            maxFileSize={3000000}
          />
          <FormTextArea
            name="description"
            control={control}
            labelId="description"
            label="Description"
            isFullWidth={true}
            isRequired={true}
            minRows={3}
          />
          {salons && (
            <FormInputDropdown
              name="salonId"
              control={control}
              labelId="salon"
              label="Salon"
              options={salons.map((salon) => (
                <MenuItem key={salon.id} value={salon.id}>
                  {salon.name}
                </MenuItem>
              ))}
              isFullWidth={true}
              isRequired={true}
            />
          )}
          {positions && (
            <FormInputDropdown
              name="positionId"
              control={control}
              labelId="position"
              label="Position"
              options={positions.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.name}
                </MenuItem>
              ))}
              isFullWidth={true}
              isRequired={true}
            />
          )}
          <FormSubmitButton size="small" title="Запазване" />
        </CardContent>
        {alertData && (
          <CardContent>
            <CustomAlert severity={alertData.severity} data={alertData.data} />
          </CardContent>
        )}
      </form>
    </FormLayout>
  );
}
