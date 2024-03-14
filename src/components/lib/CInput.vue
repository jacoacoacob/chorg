<script setup lang="ts">
import { onMounted, ref, computed, useAttrs, watch, type Ref, nextTick } from "vue";
import { randId } from "@/utils/rand";

defineOptions({
    inheritAttrs: false,
});

const attrs = useAttrs();

const props = defineProps<{
    modelValue: string | number | undefined;
    fieldProps?: Record<string, any>;
    shouldFocus?: boolean;
    label?: string;
    helpText?: string;
    errorText?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement>();

watch(() => props.shouldFocus, async (shouldFocus) => {
    if (shouldFocus) {
        await nextTick();
        inputRef.value?.focus();
    }
}, { immediate: true });

onMounted(() => {
    emit("update:modelValue", inputRef.value?.value);
});

const inputId = attrs.id as string || randId();

const focused = ref(false);

const hasContent = computed(() => {
    if (typeof props.modelValue === "string") {
        return props.modelValue.length > 0;
    }
    return typeof props.modelValue === "number";
});

</script>

<template>
    <div class="w-60">
        <div
            class="border border-slate-500 rounded p-2 relative flex flex-col"
            :class="{
                'ring ring-blue-500 border-transparent': focused
            }"
        >
            <label
                class="absolute bg-white px-1 transition-all duration-100"
                :class="{
                    'top-2 text-slate-600': !(focused || hasContent),
                    '-top-[10px] text-xs font-bold': focused || hasContent
                }"
                :for="inputId"
            >
                {{ label }}
            </label>
            <input
                v-bind="{ ...$attrs, ...fieldProps ?? {}}"
                ref="inputRef"
                class="outline-none bg-transparent w-full"
                :id="inputId"
                :value="modelValue"
                @focus="focused = true"
                @blur="focused = false"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />
        </div>
        <p
            v-if="errorText || helpText"
            class=" text-xs px-0.5"
            :class="{
                'text-slate-600': !Boolean(errorText),
                'text-red-500': Boolean(errorText)
            }"
        >
            {{ errorText || helpText }}
        </p>
    </div>
</template>