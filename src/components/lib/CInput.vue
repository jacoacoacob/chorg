<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
defineOptions({
    inheritAttrs: false,
});

const props = defineProps<{
    modelValue: string | number;
    label?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement>();

onMounted(() => {
    emit("update:modelValue", inputRef.value?.value);
});

const focused = ref(false);

const hasContent = computed(() => {
    if (typeof props.modelValue === "string") {
        return props.modelValue.length > 0;
    }
    return typeof props.modelValue === "number";
});

</script>

<template>
    <div
        class="w-60 border border-slate-500 rounded p-2 relative flex flex-col"
        :class="{
            'ring ring-blue-500 border-transparent': focused
        }"
    >
        <label
            class="absolute bg-white px-1 transition-all duration-100"
            :class="{
                'top-2': !(focused || hasContent),
                '-top-[10px] text-xs font-bold': focused || hasContent
            }"
            :for="($attrs.id as string)"
        >
            {{ label }}
        </label>
        <input
            v-bind="$attrs"
            ref="inputRef"
            class="outline-none bg-transparent w-full"
            :id="($attrs.id as string)"
            :value="modelValue"
            @focus="focused = true"
            @blur="focused = false"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>