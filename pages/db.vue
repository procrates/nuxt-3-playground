<template>
    <div>
        <h2>DB Items</h2>

        <!-- Mutation examples -->
        <button @click="db.items.add({ name: `Another item`, age: 12, image: 'agsefg23' })">Add item</button>
        <button @click="db.items.clear()">Clear items</button>

        <!-- Render the result of the query -->
        <ul>
            <li v-for="item in db.items" :key="item.id">{{ item.image }}</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { liveQuery } from "dexie";
import { db } from "../db";
import { useObservable } from "@vueuse/rxjs";


async function getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.addEventListener("load", function () {
            resolve(reader.result);
        }, false);

        reader.onerror = () => {
            return reject(this);
        };
        reader.readAsDataURL(blob);
    })
}


getBase64ImageFromUrl('https://picsum.photos/200/300')
    .then(result => {
        db.friends.add({ image: result })
        console.log(result);

    }
    )
    .catch(err => console.error(err));


</script>
<style scoped>
ul {
    list-style-type: none;
    padding: 0;
}
li {
    margin: 0 10px;
}
p.error {
    color: red;
    font-weight: bold;
}
</style>
