import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomAlert } from "../../../utils/CustomAlert";
import { FormInputDropdown } from "../../../utils/Form/FormInputDropdown/FormInputDropdown";
import { FormSubmitButton } from "../../../utils/Form/FormSubmitButton/FormSubmitButton";
import FormLayout from "../../../utils/FormLayout";
import { CardContent, MenuItem } from "@material-ui/core";
import { allEmployee, newEmployee } from "../../../services/Employees";
import { Employee } from "../../../services/Employees/types";

export default function NewEmployee() {
  const [alertData, setAlertData] = useState<{
    data: string;
    severity: "success" | "info" | "warning" | "error";
  }>();
  const [salons, setSalons] = useState<Employee[]>();

  const {
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm<Employee>();
  //   { defaultValues: { name: "", salonId: 0 } }

  useEffect(() => {
    allEmployee()
      .then(({ data }) => {
        setSalons(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = async (data: Employee) => {
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
          {/* <FormInputText
            name="name"
            control={control}
            labelId="name"
            label="Name"
            isFullWidth={true}
            isRequired={true}
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
          )} */}
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
