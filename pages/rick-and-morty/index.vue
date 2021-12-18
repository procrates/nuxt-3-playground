<template>
    <main>
        <!-- <RAMTemplatesBasicGrid>
            <RAMOrganismsBasicCard
                v-if="itemList"
                v-for="item in itemList"
                :title="item.name"
                :value="item.air_date"
                :key="item.id"
            />
            <div v-else>No data atm.</div>
        </RAMTemplatesBasicGrid>-->
        <button @click="nextPage">Next</button>
        <pre v-if="res.pending.value">
            Loading...
        </pre>
        <pre v-else>
            {{ res }}
        </pre>
    </main>
</template>

<script setup lang="ts">

const currentPage = useState('currentPage', () => 1)
const pages = useState('pages', () => null)
const res = await useLazyAsyncData('res', () => $fetch(`https://rickandmortyapi.com/api/episode?page=${currentPage.value}`), { server: false })
console.log(res)

/* let info, results
if (itemL) {

        const itemList = useState('itemList', () => [...results])
    const resInfo = useState('resInfo', () => { info })
    
    
    console.log('response', info.value)
    console.log('itemList', itemLi    alue)
} */


const nextPage = async (data) => {
    const nextPage = data.info.next
    if (nextPage !== null) {
        const { data: nextPageData } = await useFetch(data.info.next)
        return nextPageData
    }
}
</script>