<template>
    <main>
        <input type="text" name="test" id="test" v-model="query" />
        <ul>
            <transition-group
                enter-active-class="transition-all"
                enter-from-class="translate-y-full opacity-0"
                enter-to-class="opacity-100"
                @before-enter="beforeEnter"
                @enter="enter"
                @leave="leave"
            >
                <li v-for="(item,index) in items" :key="index" :data-index="index">{{ item.msg }}</li>
            </transition-group>
        </ul>
    </main>
</template>
<script setup lang="ts">
import gsap from 'gsap'
const list = ref([
    { msg: 'Bruce Lee' },
    { msg: 'Jackie Chan' },
    { msg: 'Chuck Norris' },
    { msg: 'Jet Li' },
    { msg: 'Kung Fury' }
])
const query = ref('')

const items = computed(() => {
    return list.value.filter((item) => {
        return item.msg.toLowerCase().indexOf(query.value.toLowerCase()) !== -1
    })
})
const beforeEnter = (el) => {
    el.style.opacity = 0
    el.style.height = 0
}
const enter = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        height: '1.6em',
        delay: el.dataset.index * .15,
        onComplete: done
    })
}
const leave = (el, done) => {
    gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * .15,
        onComplete: done
    })
}
</script>