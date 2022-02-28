import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
} from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { storage } from "../../../services/auth/firebase/firebaseInitializer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: { margin: theme.spacing(1) },
    selectEmpty: { marginTop: theme.spacing(2) },
  })
);

type Props = {
  name: string;
  control: Control<any, object>;
  isFullWidth: boolean;
  isRequired: boolean;
  acceptedFiles: string[];
  filesLimit: number;
  maxFileSize: number;
};

export const FormFileUpload = ({
  name,
  control,
  isFullWidth,
  isRequired,
  acceptedFiles,
  filesLimit,
  maxFileSize,
}: Props) => {
  const fileUpload = (files: File[], onChange: (...event: any[]) => void) => {
    if (files.length > 0) {
      console.log(files);

      const uploadTask = storage
        .ref("/images/")
        .child(files[0].name)
        .put(files[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log("error:-", error);
        },
        () => {
          storage
            .ref("images")
            .child(files[0].name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              console.log(fireBaseUrl);
              onChange(fireBaseUrl);
            });
        }
      );
    }
  };

  const classes = useStyles();
  return (
    <FormControl
      fullWidth={isFullWidth}
      required={isRequired}
      className={classes.margin}
    >
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <DropzoneArea
            acceptedFiles={acceptedFiles}
            filesLimit={filesLimit}
            maxFileSize={maxFileSize}
            onChange={(files) => {
              fileUpload(files, onChange);
            }}
          />
        )}
      />
    </FormControl>
  );
};
