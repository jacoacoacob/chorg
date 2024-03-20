
import { Input, type InputProps } from "@nextui-org/react";
import { Controller, type ControllerProps } from "react-hook-form";

interface ChInputProps {
  controllerProps: ControllerProps;
  inputProps: InputProps;
}

function ChInput(props: ChInputProps) {
  const { controllerProps, inputProps } = props;
  return (
    <Controller
      {...controllerProps}
      render={({ field }) =>
        <Input {...{ ...inputProps, ...field }} />
      }
    />
  );
}

export { ChInput };
