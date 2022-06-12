<template>
    <v-container>
        <h1 class="vtt">VCT Matches</h1>
        <v-divider></v-divider>
        <v-col cols="10" style="width: 100%">
            <v-data-table
            :headers="headers"
            :items="items"
            width="100%"
            >
            </v-data-table>
        </v-col>
    </v-container>
</template>

<script>
export default {
    name: 'VCT-Matches',
    
    data: () => ({
        headers: [
            { 
                text: 'Date', 
                value: 'date' 
            },
            {
                text: 'Vs',
                value: 'vs',
            },
            { text: 'Score', 
                value: 'score' 
            },
            { text: 'Info', 
                value: 'info' 
            },
        ],
        items: [],
    }),

    methods:{
        async load() {
            const response = await this.axios.get(`${process.env.VUE_APP_API_BASE}/vct/matches`)

            const matches = response.data.data.segments;
            for(let k in matches) {
                if (!matches[k]["tournament_name"].match("Champions Tour")) {
                    continue;
                }
                this.items.push({ date: matches[k]["time_completed"], 
                vs: matches[k]["team1"] + "\r\n" + matches[k]["team2"],
                score: matches[k]["score1"] + "\r\n" + matches[k]["score2"],
                info: matches[k]["round_info"] + "\r\n" + matches[k]["tournament_name"]})
            }
        },
    },

    beforeRouteEnter(_to, _from, next) {
        next(vm => {
            vm.load();
        next();
        });
    },
};
</script>

<style scoped lang="css">
@import url('https://fonts.cdnfonts.com/css/valorant');

.vtt {
    font-family: 'VALORANT', sans-serif;
    color: #fa4454;
    text-transform: uppercase;
    font-weight: bolder;
}

.v-data-table {
    white-space: pre-line;
}

</style>