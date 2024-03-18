import React from "react";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import { useForm, Controller, type SubmitHandler, UseFormReturn } from "react-hook-form";
import { useCreateGroup } from "@/lib/group.queries";
import { fetchIsGroupDisplayNameAvailable } from "@/lib/group.fetchers";
import { supabase } from "@/lib/supabase/client";

interface FormValues {
  display_name: string;
}


function GroupsAdd() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { mutateAsync: createGroup } = useCreateGroup();

  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      display_name: "",
    }
  });

  const closeModal = React.useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const onSubmit: SubmitHandler<FormValues> = React.useCallback(
    async ({ display_name }) => {
      try {
        await createGroup({ display_name });
        closeModal();
      } catch (error) {
        console.warn("[GroupsAdd.onSubmit]", error);
      }
    },
    [closeModal, createGroup]
  );

  return (
    <div>
      <Button onPress={onOpen}>Add Group</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() =>
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Group
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Controller
                    name="display_name"
                    control={control}
                    rules={{
                      validate: {
                        displayNameAvailable: async (value) => {
                          const isAvailable = await fetchIsGroupDisplayNameAvailable(supabase, value);
                          return isAvailable|| `The name "${value}" has already been taken.`;
                        },
                      },
                      required: "Display Name is required",
                      minLength: {
                        value: 3,
                        message: "This should have 3 or more characters"
                      },
                    }}
                    render={({ field }) =>
                      <Input
                        errorMessage={errors.display_name?.message}
                        label="Group Name"
                        description="Give your group a name"
                        size="sm"
                        {...field}
                      />
                    }
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      radius="sm"
                      variant="light"
                      onPress={closeModal}
                    >
                      Cancel
                    </Button>
                    <Button radius="sm" color="primary" type="submit">Submit</Button>
                  </div>
                </form>
              </ModalBody>
            </>
          }
        </ModalContent>
      </Modal>
    </div>
  )
}

export { GroupsAdd };
