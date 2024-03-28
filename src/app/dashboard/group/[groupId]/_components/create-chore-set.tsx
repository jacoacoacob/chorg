
import React from "react";
import { useForm, type SubmitHandler, Controller} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useCreateChoreSet } from "@/lib/chore-set.queries";
import { ErrorCodeMessage, isPostgrestError } from "@/lib/supabase/utils";


const schema = z.object({
  display_name: z.string().min(4, "Display name must contain at least 4 characters."),
});

type Schema = z.infer<typeof schema>;

function CreateChoreSet() {
  const { groupId } = useParams<{ groupId: string }>();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const { control, handleSubmit, reset, setError } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      display_name: "",
    },
  });

  const closeModal = React.useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  const createChoreSet = useCreateChoreSet(groupId);

  const onSubmit: SubmitHandler<Schema> = React.useCallback(
    async ({ display_name }) => {
      try {
        await createChoreSet.mutateAsync({ display_name });
        closeModal();
      } catch (error) {
        if (isPostgrestError(error) && ErrorCodeMessage[error.code]) {
          setError("display_name", {
            message: ErrorCodeMessage[error.code]("", display_name),
          });
        }
        setError("root", { message: "An unknown error occurred" });
      }
    },
    [closeModal, createChoreSet, setError]
  );

  return (
    <>
      <Button variant="shadow" className="bg-slate-100 border" onPress={onOpen}>
        + Chore Set
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>
            Add a Chore Set
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <Controller
                name="display_name"
                control={control}
                render={({ field, fieldState }) =>
                  <Input
                    errorMessage={fieldState.error?.message}
                    label="Display Name"
                    description="A descriptive name for this Chore Set"
                    size="sm"
                    {...field}
                  />
                }
              />
              <div className="flex justify-end gap-2">
                <Button color="primary" type="submit" className="order-1">Save</Button>
                <Button radius="sm" variant="light" onPress={closeModal}>
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export { CreateChoreSet };
