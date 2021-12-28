<template>
    <section class="border-2 rounded-xl p-5">
        <header>
            <RAMAtomsBasicCardTitle :title="title" />
        </header>
        <footer>
            <RAMAtomsBasicFooter description-type="Air date" :value="value" />
        </footer>
    </section>
</template>
<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})
</script>