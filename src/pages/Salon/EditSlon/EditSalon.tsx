import React, { useEffect, useState } from "react";
import { getSalon, updateSalon } from "../../../services/salon";
import { Salon } from "../../../services/salon/types";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CustomAlert } from "../../../utils/CustomAlert";
import FormLayout from "../../../utils/FormLayout";
import { FormInputText } from "../../../utils/Form/FormInputText/FormInputText";
import { FormSubmitButton } from "../../../utils/Form/FormSubmitButton/FormSubmitButton";
import { CardContent } from "@material-ui/core";

export default function EditSalon() {
  const { id }: { id: string } = useParams();
  const [alertData, setAlertData] = useState<{
    data: string;
    severity: "success" | "info" | "warning" | "error";
  }>();

  const {
    control,
    handleSubmit,
    // formState: { errors },
    reset,
    getValues,
  } = useForm<Salon>();

  useEffect(() => {
    getSalon(id)
      .then(({ data }) => {
        reset(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, reset]);

  const onSubmit = async (data: Salon) => {
    updateSalon(data)
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
      <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: "center" }}>
        <CardContent>
          {getValues("name") && (
            <FormInputText
              name="name"
              control={control}
              labelId="name"
              label="Name"
              isFullWidth={true}
              isRequired={true}
            />
          )}
          {getValues("address") && (
            <FormInputText
              name="address"
              control={control}
              labelId="address"
              label="Address"
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
