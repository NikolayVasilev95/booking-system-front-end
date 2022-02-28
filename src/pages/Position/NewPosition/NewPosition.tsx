import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomAlert } from "../../../utils/CustomAlert";
import { newPosition } from "../../../services/position";
import { Position } from "../../../services/position/types";
import { allSalon } from "../../../services/salon";
import { Salon } from "../../../services/salon/types";
import { FormInputDropdown } from "../../../utils/Form/FormInputDropdown/FormInputDropdown";
import { FormSubmitButton } from "../../../utils/Form/FormSubmitButton/FormSubmitButton";
import FormLayout from "../../../utils/FormLayout";
import { FormInputText } from "../../../utils/Form/FormInputText/FormInputText";
import { CardContent, MenuItem } from "@material-ui/core";

export default function NewSalon() {
  const [alertData, setAlertData] = useState<{
    data: string;
    severity: "success" | "info" | "warning" | "error";
  }>();

  const {
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm<Position>({ defaultValues: { name: "" } });

  const onSubmit = async (data: Position) => {
    newPosition(data)
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
    <FormLayout cardHeaderTitle="Position" backSpaceButton="/position">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <FormInputText
            name="name"
            control={control}
            labelId="name"
            label="Name"
            isFullWidth={true}
            isRequired={true}
          />
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
