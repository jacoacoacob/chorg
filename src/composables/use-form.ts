import { reactive, ref, unref } from "vue";

type SubmitHandler<ResponseData, Fields> = (ev: Event, fields: Fields) => Promise<{
    success: boolean;
    message?: string;
    data?: ResponseData;
} | undefined>;

type SubmissionStatus = "idle" | "busy" | "done";

function useForm<
    ResponseData = any,
    Fields extends Record<string, any> = {}
>(fields: Fields = {} as Fields) {
    const error = ref("");
    const data = ref<ResponseData>();
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

    function reset() {
        status.value = "idle";
        success.value = false;
        error.value = "";
        data.value = undefined;
    }

    return {
        fields: reactiveFields,
        error,
        data,
        success,
        status,
        reset,
        createSubmitHandler(onSubmit: SubmitHandler<ResponseData, Fields>) {
            return async (ev: Event) => {
                ev.preventDefault();
                reset();
                status.value = "busy";
                const result = await onSubmit(ev, reactiveFields as any);
                status.value = "done";
                success.value = result?.success ?? true;
                data.value = result?.data;
                error.value = result?.success === false && result.message || "";
            };
        }
    };
}

export { useForm };
