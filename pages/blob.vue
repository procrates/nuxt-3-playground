<script setup lang="ts">
const { data } = await useFetch('https://picsum.photos/200/300')


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
        console.log(result);



    }
    )
    .catch(err => console.error(err));


</script>