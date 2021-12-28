<template>
    <h1>Reroute</h1>
</template>

<script setup lang="ts">
const router = useRouter()
onMounted(() => router.replace('/rick-and-morty/1'))
</script>