<template>
    <main>
        <RAMTemplatesBasicGrid>
            <RAMOrganismsBasicCard
                v-if="data.results"
                v-for="item in data.results"
                :title="item.name"
                :value="item.air_date"
                :key="item.id"
            />
            <div v-else>No data atm.</div>
        </RAMTemplatesBasicGrid>

        <pre v-if="pending">
            Loading...
        </pre>
        <div
            class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
        >
            <div class="flex justify-between flex-1 sm:hidden">
                <button
                    @click="prevPage"
                    class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >Previous</button>
                <button
                    @click="nextPage"
                    class="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >Next</button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p class="text-sm text-gray-700">
                        Showing
                        {{ ' ' }}
                        <span class="font-medium">1</span>
                        {{ ' ' }}
                        to
                        {{ ' ' }}
                        <span
                            class="font-medium"
                        >10</span>
                        {{ ' ' }}
                        of
                        {{ ' ' }}
                        <span
                            class="font-medium"
                        >97</span>
                        {{ ' ' }}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        class="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <button
                            @click="prevPage"
                            :disabled="data.info.prev === null"
                            :class="data.info.prev ? 'hover:bg-gray-50' : ''"
                            class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md"
                        >
                            <span class="sr-only">Previous</span>
                            <ChevronLeftIcon class="w-5 h-5" aria-hidden="true" />
                        </button>
                        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                        <NuxtLink
                            v-for="(page,index) in parseInt(data.info.pages)"
                            :to="`${page}`"
                            aria-current="page"
                            :class="parseInt(route.params.page) === page ?
                            'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' :
                            'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                            class="relative inline-flex items-center px-4 py-2 text-sm font-medium border"
                        >{{ page }}</NuxtLink>
                        <button
                            @click="nextPage"
                            class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
                        >
                            <span class="sr-only">Next</span>
                            <ChevronRightIcon class="w-5 h-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
const route = useRoute()
const router = useRouter()
const { data, pending, error, refresh } = await useFetch(`https://rickandmortyapi.com/api/episode?page=${route.params.page}`)

const nextPage = () => {
    if (!data.value.info.next) return false
    let next = parseInt(route.params.page) + 1
    router.push(`${next++}`)
}
const prevPage = () => {
    if (!data.value.info.prev) return false
    let next = parseInt(route.params.page) - 1
    router.push(`${next++}`)
}
</script>