<template>
    <p>
        {{ descriptionType }}:
        <span>{{ value }}</span>
    </p>
</template>
<script setup lang="ts">
defineProps({
    descriptionType: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true

    }
})
</script>