export default async function getApi() {
    try {
        const reponse = await fetch('https://server-tau-six.vercel.app/api/home?fbclid=IwAR3tz1EX2vAtZsvDbIP1BMmlUXk3SOHaBp_mKt8lRQH9IKwtEOXwN7O6Rss');
        const data = await reponse.json();

        return data;
    } catch(error) {
        console.log(error);
    }
}


window.addEventListener('load', () => {
    getApi();
})

