<template>
    <div class="relative">
        <button @click="menuState = !menuState">menu</button>
        <transition-group
            enter-active-class="transition-transform duration-500 ease-in"
            enter-from-class="translate-x-full -translate-y-full"
            enter-to-class="t"
            leave-active-class="transition-transform duration-1000"
            leave-from-class="t"
            leave-to-class="transform translate-x-full -translate-y-full"
        >
            <div key="1" v-show="menuState" class="absolute inset-0 h-screen">
                <nav class="absolute inset-0 text-indigo-600 bg-slate-200">
                    <button @click="menuState = !menuState">close</button>

                    <ul key="2" v-show="menuState" class="flex flex-col space-y-6">
                        <transition-group
                            enter-active-class="transition-transform duration-500"
                            enter-from-class="-translate-y-full"
                        >
                            <li>test 1</li>
                            <li>test 2</li>
                            <li>test 3</li>
                        </transition-group>
                    </ul>
                </nav>
            </div>
        </transition-group>
        <hr />
        <button @click="toggleList = !toggleList">toggle list</button>
        <transition-group
            v-show="toggleList"
            tag="ul"
            class="flex flex-col space-y-6"
            enter-active-class="transition-transform duration-1000"
            enter-from-class="transform -translate-y-full"
            enter-to-class="t"
            leave-active-class="t"
            leave-from-class="t"
            leave-to-class="t"
        >
            <li key="3" class>test 1</li>
            <li key="4" class="transition transform translate-y-full">test 2</li>
            <li key="5" class="transition translate-y-full">test 3</li>
        </transition-group>

        <hr />

        <h1 v-if="loading">Loading... {{ remaining / 1000 }}</h1>
        <ul class="grid grid-cols-3">
            <transition-group
                enter-active-class="transition-all duration-1000"
                enter-from-class="translate-y-10"
            >
                <li v-for="(item, i) in itemList" v-bind:key="item.name" class="m-10">
                    <img lazy :src="item.flags.svg" alt class="block object-contain w-full h-full" />
                    <span>{{ item.name.official }}</span>
                    <br />
                    <span class="description">{{ item.description }}</span>
                </li>
            </transition-group>
        </ul>

        <div class="relative">
            <slot />
        </div>
    </div>
</template>
<script setup lang="ts">
const menuState = ref(false)
const toggleList = ref(false)
const loading = ref(false)
const remaining = ref(3000)

const itemList = ref([])

const { data } = await useFetch('https://restcountries.com/v3.1/currency/euro')
const images = data.value.map(i => {
    return i.flags.svg
}
)
console.log(images);

onMounted(() => {
    loading.value = true


    const items = data.value

    loading.value = false

    const interval = setInterval(() => {
        if (!items.length) {
            clearInterval(interval)
        } else {
            itemList.value.push(items.shift())
        }
    }, 100)
})
</script>