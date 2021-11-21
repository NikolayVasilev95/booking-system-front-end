import React, { useState } from "react";
import { newSalon } from "../../../services/salon";
import { Salon } from "../../../services/salon/types";
import { useForm } from "react-hook-form";
import { CustomAlert } from "../../../utils/CustomAlert";
import FormLayout from "../../../utils/FormLayout";
import { FormInputText } from "../../../utils/Form/FormInputText/FormInputText";
import { FormSubmitButton } from "../../../utils/Form/FormSubmitButton/FormSubmitButton";
import { CardContent } from "@material-ui/core";

export default function NewSalon() {
  const [alertData, setAlertData] = useState<{
    data: string;
    severity: "success" | "info" | "warning" | "error";
  }>();

  const {
    handleSubmit,
    // formState: { errors },
    control,
  } = useForm<Salon>();

  const onSubmit = async (data: Salon) => {
    newSalon(data)
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
    <FormLayout cardHeaderTitle="Salon" backSpaceButton="/salon">
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
          <FormInputText
            name="address"
            control={control}
            labelId="address"
            label="Address"
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
