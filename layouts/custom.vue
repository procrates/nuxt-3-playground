<template>
    <div>
        <strong>Custom layout</strong>
        <slot />
    </div>
</template>

<script>
export default {
    created() {
        console.log('layout created')
    }
}
</script>