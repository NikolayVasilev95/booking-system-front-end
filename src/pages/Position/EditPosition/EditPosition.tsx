import React, { useEffect, useState } from "react";
import { allSalon } from "../../../services/salon";
import { Salon } from "../../../services/salon/types";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CustomAlert } from "../../../utils/CustomAlert";
import { getPosition, updatePosition } from "../../../services/position";
import { Position } from "../../../services/position/types";
import { FormInputDropdown } from "../../../utils/Form/FormInputDropdown/FormInputDropdown";
import { FormInputText } from "../../../utils/Form/FormInputText/FormInputText";
import FormLayout from "../../../utils/FormLayout";
import { FormSubmitButton } from "../../../utils/Form/FormSubmitButton/FormSubmitButton";
import { CardContent, MenuItem } from "@material-ui/core";

export default function EditSalon() {
  const { id }: { id: string } = useParams();
  const [alertData, setAlertData] = useState<{
    data: string;
    severity: "success" | "info" | "warning" | "error";
  }>();
  const [salons, setSalons] = useState<Salon[]>();

  const {
    handleSubmit,
    // formState: { errors },
    reset,
    control,
    getValues,
  } = useForm<Position>();

  useEffect(() => {
    allSalon()
      .then(({ data }) => {
        setSalons(data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getPosition(id)
      .then(({ data }) => {
        console.log(data.result);
        if (data.result.salonId !== null) {
          reset({
            id: data.result.id,
            name: data.result.name,
            salonId: data.result.salonId,
          });
        } else {
          // For Fix
          reset({
            id: data.result.id,
            name: data.result.name,
            salonId: 1,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, salons, reset]);

  const onSubmit = async (data: Position) => {
    updatePosition(data)
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
          {console.log(getValues("salonId"))}
          {salons && getValues("salonId") && (
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
