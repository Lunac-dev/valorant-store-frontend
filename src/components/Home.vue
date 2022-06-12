<template>
    <v-container>
        <v-row>
            <v-col :sm="this.cols">
                <v-card
                elevation="2"
                outlined
                >
                    <v-img
                        :src="bundleimg"
                        height="500"
                        class="align-end"
                    >
                        <v-card-title v-text="bundlename" class="text-h1 vtitle">?</v-card-title>
                        <v-card-subtitle class="vtitle2">COLLECTION | <span v-text="bundleleft" class="left">?</span></v-card-subtitle>
                    </v-img>
                </v-card>
            </v-col>

            <v-col cols="12" v-if="this.bundle2name != undefined" sm="6">
                <v-card
                elevation="2"
                outlined
                >
                    <v-img
                        :src="bundle2img"
                        height="500"
                        class="align-end"
                    >
                        <v-card-title v-text="bundle2name" class="text-h1 vtitle">?</v-card-title>
                        <v-card-subtitle class="vtitle2">COLLECTION | <span v-text="bundle2left" class="left">?</span></v-card-subtitle>
                    </v-img>
                </v-card>
            </v-col>

        </v-row>

        <div class="bundlesitems">
            <v-divider></v-divider>
            <v-row>
                <v-col :sm="this.cols">
                    <h1 class="vtitle">// BUNDLE ITEMS //</h1>
                    <h1 class="vtitle" v-if="this.weapons.length == 0">No Weapons...</h1>
                    <v-row>
                        <v-col v-for="weapon in weapons" v-bind:key="weapon.name" :cols="6">

                            <v-card 
                                class="mx-auto"
                                max-width="100%"
                                @click="viewvideo(weapon.vkey)"
                                outlined 
                                hover
                            >
                                <v-img
                                    :src="weapon.imgsrc"
                                    height="250px"
                                    class="align-end"
                                    aspect-ratio="1.4"
                                    contain
                                >
                                    <v-card-title class="vtitle2">{{weapon.name}}</v-card-title>
                                    <v-card-subtitle class="text-h6"> {{weapon.vp}} VP</v-card-subtitle>
                                </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols="12" sm="6" v-if="this.bundle2name != undefined">
                    <h1 class="vtitle">// BUNDLE ITEMS //</h1>
                    <h1 class="vtitle" v-if="this.weapons2.length == 0">No Weapons...</h1>
                    <v-row no-gutters>
                        <v-col v-for="weapon in weapons2" v-bind:key="weapon.name" cols="12" sm="6">

                            <v-card 
                                class="mx-auto"
                                max-width="100%"
                                @click="viewvideo2(weapon.vkey)"
                                outlined 
                                hover
                            >
                                <v-img
                                    :src="weapon.imgsrc"
                                    height="250px"
                                    class="align-end"
                                    aspect-ratio="1.4"
                                    contain
                                >
                                    <v-card-title class="vtitle2">{{weapon.name}}</v-card-title>
                                    <v-card-subtitle class="text-h6"> {{weapon.vp}} VP</v-card-subtitle>
                                </v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'Home',

    data: () => ({
        cols: 12,

        bundleimg: "",
        bundlename: "",
        bundleid: "",
        bundleleft: "",
        bundleleft2: "",

        bundle2img: "",
        bundle2name: undefined,
        bundle2id: "",
        bundle2left: "",
        bundle2left2: "",

        intervalId: undefined,
        bundleitems: "",
        skinlevelsdata: "",
        weapons: [],
        videos: [],

        weapons2: [],
        videos2: [],
    }),

    methods:{
        async load() {

            //Store Current Featured Bundle
            await this.axios.get("https://api.henrikdev.xyz/valorant/v1/store-featured")
            .then((response) => {
                if (response.data["data"]["FeaturedBundle"]["Bundles"].length == 2) {

                    this.cols = 6;

                    this.bundleid = response.data["data"]["FeaturedBundle"]["Bundles"][0]["DataAssetID"];
                    this.bundleleft = this.getLeftTime(response.data["data"]["FeaturedBundle"]["Bundles"][0]["DurationRemainingInSeconds"]);
                    this.bundleleft2 = response.data["data"]["FeaturedBundle"]["Bundles"][0]["DurationRemainingInSeconds"];
                    this.bundleitems = response.data["data"]["FeaturedBundle"]["Bundles"][0]["Items"];

                    this.bundle2id = response.data["data"]["FeaturedBundle"]["Bundles"][1]["DataAssetID"];
                    this.bundle2left = this.getLeftTime(response.data["data"]["FeaturedBundle"]["Bundles"][1]["DurationRemainingInSeconds"]);
                    this.bundle2left2 = response.data["data"]["FeaturedBundle"]["Bundles"][1]["DurationRemainingInSeconds"];
                    this.bundle2items = response.data["data"]["FeaturedBundle"]["Bundles"][1]["Items"];

                    this.axios.get("https://valorant-api.com/v1/bundles/" + this.bundleid)
                    .then((response) => {
                        this.bundlename = response.data["data"]["displayName"];
                        this.bundleimg = response.data["data"]["displayIcon"];
                    })

                    this.axios.get("https://valorant-api.com/v1/bundles/" + this.bundle2id)
                    .then((response) => {
                        this.bundle2name = response.data["data"]["displayName"];
                        this.bundle2img = response.data["data"]["displayIcon"];
                    })
                } else {
                    this.bundleid = response.data["data"]["FeaturedBundle"]["Bundle"]["DataAssetID"];
                    this.bundleleft = this.getLeftTime(response.data["data"]["FeaturedBundle"]["Bundle"]["DurationRemainingInSeconds"]);
                    this.bundleleft2 = response.data["data"]["FeaturedBundle"]["Bundle"]["DurationRemainingInSeconds"];
                    this.bundleitems = response.data["data"]["FeaturedBundle"]["Bundle"]["Items"];

                    this.axios.get("https://valorant-api.com/v1/bundles/" + this.bundleid)
                    .then((response) => {
                        this.bundlename = response.data["data"]["displayName"];
                        this.bundleimg = response.data["data"]["displayIcon"];
                    })
                }
            })
            .catch((err) => {
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message
                })
                return;
            })

            //Get Skin Levels Data
            await this.axios.get("https://valorant-api.com/v1/weapons/skinlevels")
            .then((response) => {
                const data = response.data;
                this.skinlevelsdata = data;
            })
            .catch((err) => {
                this.$swal({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message
                })
                return;
            })

            //left
            this.intervalId = setInterval(function () {
                this.bundleleft2 = this.bundleleft2-1;
                this.bundleleft = this.getLeftTime(this.bundleleft2);

                if (this.bundle2name != undefined) {
                    this.bundle2left2 = this.bundle2left2-1;
                    this.bundle2left = this.getLeftTime(this.bundle2left2);
                }
            }.bind(this), 1000)

            //Bundle Weapons
            if (this.bundle2id != undefined) {
                for (var i = 0;  i < this.bundleitems.length;  i++) {
                    var weapon1 = this.skinlevelsdata.data.find((v) => v.uuid == this.bundleitems[i]["Item"]["ItemID"]);
                    if (weapon1 == undefined) {
                        continue;
                    }
                    
                    //VIDEO
                    this.videos.push(weapon1.streamedVideo);

                    //Push
                    this.weapons.push({ name: weapon1.displayName, imgsrc: weapon1.displayIcon, vkey: this.videos.length-1, vp: this.bundleitems[i]["BasePrice"]})
                }
                for (var ii = 0;  ii < this.bundle2items.length;  ii++) {
                    var weapon2 = this.skinlevelsdata.data.find((v) => v.uuid == this.bundle2items[ii]["Item"]["ItemID"]);
                    if (weapon2 == undefined) {
                        continue;
                    }
                    
                    //VIDEO
                    this.videos2.push(weapon2.streamedVideo);

                    //Push
                    this.weapons2.push({ name: weapon2.displayName, imgsrc: weapon2.displayIcon, vkey: this.videos2.length-1, vp: this.bundle2items[ii]["BasePrice"]})
                }
            } else {
                this.addweapons();
            }
        },

        addweapons() {
            for (var i = 0;  i < this.bundleitems.length;  i++) {
                var weapon1 = this.skinlevelsdata.data.find((v) => v.uuid == this.bundleitems[i]["Item"]["ItemID"]);
                if (weapon1 == undefined) {
                    continue;
                }
                    
                //streamedVideo
                this.videos.push(weapon1.streamedVideo);

                //Push
                this.weapons.push({ name: weapon1.displayName, imgsrc: weapon1.displayIcon, vkey: this.videos.length-1, vp: this.bundleitems[i]["BasePrice"]})
            }
        },

        getLeftTime(time) {
            var num = time;
            var timeD = Math.floor(num / (24 * 60 * 60));
            var timeH = Math.floor(num % (24 * 60 * 60) / (60 * 60));
            var timeM = Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60);
            var timeS = num % (24 * 60 * 60) % (60 * 60) % 60;
            var timeDMS = timeD + ':' + timeH + ':' + timeM + ':' + timeS;
            return timeDMS;
        },

        //Responsive is dead. Needs improvement.
        viewvideo(key) {
            if (this.videos[key] != undefined) {
                var video = document.createElement("video");
                video.setAttribute("controls","");
                video.src=this.videos[key];
                video.preload = "metadata";
                video.style.width= "100%";
                video.autoplay = true;
                video.loop = true;

                this.$swal({
                html: video,
                width: "80%",
                })
            }
        },

        //Responsive is dead. Needs improvement.
        viewvideo2(key) {
            if (this.videos2[key] != undefined) {
                var video = document.createElement("video");
                video.setAttribute("controls","");
                video.src=this.videos2[key];
                video.preload = "metadata";
                video.style.width= "100%";
                video.autoplay = true;
                video.loop = true;

                this.$swal({
                html: video,
                })
            }
        },
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.load();
        next();
        });
    },
};
</script>

<style scoped lang="css">
.left {
    color: #FCD34D;
}
.vtitle {
    font-family: 'VALORANT', sans-serif;
    text-align: center;
    color: #fa4454;
    text-transform: uppercase;
    font-weight: bolder;
}

.vtitle2 {
    font-family: 'VALORANT', sans-serif;
    color: #fa4454;
    text-transform: uppercase;
    font-size: 3vh;
}
</style>
