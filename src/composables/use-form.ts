import { reactive, ref, unref } from "vue";

type SubmitHandler<Data, Fields> = (fields: Fields) => Promise<{
    success: boolean;
    message?: string;
    data?: Data;
}>;

type SubmissionStatus = "idle" | "busy" | "done";

function useForm<
    Data = any,
    Fields extends Record<string, any> = {}
>(fields: Fields) {
    const error = ref("");
    const data = ref<Data>();
    const success = ref(false);
    const status = ref<SubmissionStatus>("idle");

    const reactiveFields = reactive(
        Object.keys(fields).reduce(
            (accum: Fields, key) => ({
                ...accum,
                [key]: unref(fields[key])
            }),
            {} as Fields
        )
    );

    return {
        fields: reactiveFields,
        error,
        data,
        success,
        status,
        reset() {
            status.value = "idle";
            success.value = false;
            error.value = "";
            data.value = undefined;
        },
        createSubmitHandler(onSubmit: SubmitHandler<Data, Fields>) {
            return async () => {
                const result = await onSubmit(reactiveFields);
                success.value = result?.success ?? true;
                data.value = result?.data;
                error.value = result?.success === false && result.message || "";
            }
        }
    };
}

export { useForm };
