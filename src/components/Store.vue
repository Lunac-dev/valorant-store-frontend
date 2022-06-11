<template>
  <v-container>
    <v-row class="pb-5">
      <v-col cols="6">
        <v-card
          elevation="2"
          class="c3"
          dark
        >
          <v-card-title>
            <img
              src="@/assets/vp.png"
              class="pr-10"
              height="50px"
            />
            <span class="text-h3" v-text="vp"></span>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          elevation="2"
          class="c3"
          dark
        >
          <v-card-title>
            <img
              src="@/assets/rp.png"
              class="pr-10"
              height="50px"
            />
            <span class="text-h3" v-text="rp"></span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <div class="Offers">
      <h1 class="vtitle">// DAILY OFFERTS //</h1>
      <h4 v-text="offerleft" class="text-center vtitle2"></h4>
      <br>
      <v-row>
        <v-col v-for="weapon in offerweapons" v-bind:key="weapon.name" cols="6" sm="3">

          <v-card 
            class="mx-auto c1"
            max-width="100%"
            @click="viewvideo(weapon.vkey)"
            outlined 
            hover
          >
            <v-img :src="weapon.tierimgsrc"
                height="250px" aspect-ratio="1.4" contain>
              <v-img
                :src="weapon.imgsrc"
                height="250px"
                class="align-end"
                aspect-ratio="1.4"
                contain
              >
                <v-card-title class="vtitle2">{{weapon.name}}</v-card-title>
                <v-card-subtitle class="text-h6">{{ weapon.vp }} VP</v-card-subtitle>
              </v-img>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <br>
    <div class="night-marcket" v-show="nightmarcket">
      <h1 class="vtitle">// NIGHT MARCKET //</h1>
      <h4 v-text="bonusleft" class="text-center vtitle2"></h4>
      <br>
      <v-row>
        <v-col v-for="weapon in bonusweapons" v-bind:key="weapon.name" cols="6">

          <v-card 
            class="mx-auto c2"
            max-width="100%"
            @click="viewvideo(weapon.vkey)"
            outlined 
            hover
          >
            <v-img :src="weapon.tierimgsrc"
                height="250px" aspect-ratio="1.4" contain>
              <v-img
                :src="weapon.imgsrc"
                height="250px"
                class="align-end"
                aspect-ratio="1.4"
                contain
              >
                <v-card-title class="vtitle2">{{weapon.name}}</v-card-title>
                <v-card-subtitle class="text-h6"> {{weapon.vp}} VP </v-card-subtitle>
              </v-img>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped lang="css">
.c1 {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 3px;
    padding: 10px;
    border-bottom: solid #fa4454;
}

.c2 {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 3px;
    padding: 10px;
    border-bottom: solid #BB42F6;
}

.c3 {
  background-color: #fa4454;
  border-bottom: solid white;
}

.vtitle {
  font-family: 'VALORANT', sans-serif;
  text-align: center;
  color: #fa4454;
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 5vh;
}

.vtitle2 {
  font-family: 'VALORANT', sans-serif;
  color: #fa4454;
  text-transform: uppercase;
  font-size: 3vh;
}

.vtitle3 {
  font-family: 'VALORANT', sans-serif;
  color: #BB42F6;
  text-transform: uppercase;
  font-size: 3vh;
}
</style>

<script>
export default {
  name: 'Store',

  data: () => ({
    vp: "Loading...",
    rp: "Loading...",
    videos: [],
    offerleft: "",
    bonusleft: "",
    offerleft2: 0,
    bonusleft2: 0,
    bundleleft2: 0,
    storeoffers: "",
    skinlevelsdata: "",
    offerweapons: [],
    bonusweapons: [],
    nightmarcket : false,
    timetmp: "-1",
    intervalId: undefined,
    skindata: {},
    data: null,
  }),

  beforeDestroy () {
    clearInterval(this.intervalId)
  },

  methods:{
    async load() {
      if (!this.$session.has('userinfo')) {
        this.$router.push({ name: "home"})
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: "You must be logged in.",
        })
        return
      } else if (this.$session.get('userinfo').puuid == "none") {
        this.$router.push({ name: "home"})
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: this.$t("nolink"),
        })
        return
      }
      //get store
      const response = await this.axios.get(`${process.env.VUE_APP_API_BASE}/valorant/getStore` , { headers: { discordid: this.$session.get('userinfo').id } })
      if (response.data.Status != undefined) {
        if (response.data.Status == "Bad Request") {
          //Reauth
          this.$swal({
            title: "Re-auth is in progress...",
            icon: "info",
            text: "Please leave the screen as it is until the end of the process.",
            allowOutsideClick : false,
            showConfirmButton: false,
          });
          this.$swal.showLoading();
          this.axios.get(`${process.env.VUE_APP_API_BASE}/valorant/reauth` , { headers: { discordid: this.$session.get('userinfo').id } })
          .then((response) => {
              const data = response.data;
              if (data.Status == "OK") {
                //Success Reauth
                this.axios.get(`${process.env.VUE_APP_API_BASE}/valorant/getStore` , { headers: { discordid: this.$session.get('userinfo').id } })
                .then((response) => {
                    const data = response.data;
                    this.data = data;
                    this.$swal.hideLoading();
                    this.$swal.close();
                    this.fetched();
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: data.Status
                })
                return;
              }
          })
        } else {
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            text: response.data.Status
          })
          return;
        }
      } else {
        this.data = response.data;
        this.fetched();
      }

    },
    async fetched() {
      //Load
      await this.axios.get("https://api.henrikdev.xyz/valorant/v1/store-offers")
      .then((response) => {
        const data = response.data;
        this.storeoffers = data;
      })

      //Get Skin Levels Data
      await this.axios.get("https://valorant-api.com/v1/weapons/skinlevels")
      .then((response) => {
        const data = response.data;
        this.skinlevelsdata = data;
      })

      //Get Skin Data
      await this.axios.get("https://valorant-api.com/v1/weapons/skins")
      .then((response) => {
        const data = response.data;
        this.skindata = Object.assign({}, this.skindata, data);
      })
      //Setup VP and RP
      this.vp = this.data["wallet"]["Balances"]["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"];
      this.rp = this.data["wallet"]["Balances"]["e59aa87c-4cbf-517a-5983-6e81511be9b7"];

      const weapons = this.data["store"]["SkinsPanelLayout"]["SingleItemOffers"];

      //Load Offers
      this.setOffers(weapons);
      this.offerleft = this.getLeftTime(this.data["store"]["SkinsPanelLayout"]["SingleItemOffersRemainingDurationInSeconds"]);
      this.offerleft2 = this.data["store"]["SkinsPanelLayout"]["SingleItemOffersRemainingDurationInSeconds"];
      this.bundleleft = this.getLeftTime(this.data["store"]["FeaturedBundle"]["Bundle"]["DurationRemainingInSeconds"]);
      this.bundleleft2 = this.data["store"]["FeaturedBundle"]["Bundle"]["DurationRemainingInSeconds"];
      //Bonus Store
      if ('BonusStore' in this.data["store"]) {
        const bonus = this.data["store"]["BonusStore"]["BonusStoreOffers"];
        this.nightmarcket = true;
        this.bonusleft = this.getLeftTime(this.data["store"]["BonusStore"]["BonusStoreRemainingDurationInSeconds"]);
        this.bonusleft2 = this.data["store"]["BonusStore"]["BonusStoreRemainingDurationInSeconds"];
        this.setBonusOffers(bonus);

        this.intervalId = setInterval(function () {
          this.offerleft2 = this.offerleft2-1;
          this.offerleft = this.getLeftTime(this.offerleft2);

          this.bundleleft2 = this.bundleleft2-1;
          this.bundleleft = this.getLeftTime(this.bundleleft2);

          this.bonusleft2 = this.bonusleft2-1;
          this.bonusleft = this.getLeftTime(this.bonusleft2);
        }.bind(this), 1000)
      } else {
        this.intervalId = setInterval(function () {
          this.offerleft2 = this.offerleft2-1;
          this.offerleft = this.getLeftTime(this.offerleft2);

          this.bundleleft2 = this.bundleleft2-1;
          this.bundleleft = this.getLeftTime(this.bundleleft2);
        }.bind(this), 1000)
      }
    },

    viewvideo(key) {
      if (this.videos[key] != undefined) {
        var video = document.createElement("video");
        video.setAttribute("controls","");
        video.src=this.videos[key];

        this.$swal({
          html: video,
          width: "100%",
        })
      }
    },

    setOffers(weapons) {
      for (var i = 0;  i < 4;  i++) {
        var weapon1 = this.skinlevelsdata.data.find((v) => v.uuid == weapons[i]);
        //GET Offer
        var offer = this.store_get_offer(weapons[i]);
        var offerid = Object.keys(offer.Cost)[0];
        var vp = offer.Cost[offerid];

        //GET TiER Ver 2.0
        var tierid = this.skindata.data.filter((v) => v.levels[0]["uuid"] == weapon1.uuid)[0]["contentTierUuid"];

        //VIDEO
        this.videos.push(weapon1.streamedVideo);

        //Push
        this.offerweapons.push({ name: weapon1.displayName, imgsrc: weapon1.displayIcon, vkey: i, vp: vp, tierimgsrc: this.get_weapon_tierimg(tierid) })
      }
    },

    store_get_offer(uuid) {
      //Get Skin price by offer uuid
      var offer = this.storeoffers.data.Offers.find((v) => v.OfferID == uuid);
      return offer;
    },

    get_weapon_tierimg(id) {
      return "https://media.valorant-api.com/contenttiers/" + id + "/displayicon.png"
    },

    setBonusOffers(weapons) {
      for (var i = 0;  i < 6;  i++) {
        var weapon1 = this.skinlevelsdata.data.find((v) => v.uuid == weapons[i]["Offer"]["Rewards"][0]["ItemID"]);
        var discount = Object.keys(weapons[i]["DiscountCosts"])[0];

        //GET TiER Ver 2.0
        var tierid = this.skindata.data.filter((v) => v.levels[0]["uuid"] == weapon1.uuid)[0]["contentTierUuid"];

        //VIDEO
        this.videos.push(weapon1.streamedVideo);

        //Push
        this.bonusweapons.push({ name: weapon1.displayName, imgsrc: weapon1.displayIcon, vp: weapons[i]["DiscountCosts"][discount], vkey: i+4, tierimgsrc: this.get_weapon_tierimg(tierid)})
      }
    },

    getLeftTime(time) {
      var num = time;
      var timeD = Math.floor(num / (24 * 60 * 60));
      var timeH = Math.floor(num % (24 * 60 * 60) / (60 * 60));
      var timeM = Math.floor(num % (24 * 60 * 60) % (60 * 60) / 60);
      var timeS = num % (24 * 60 * 60) % (60 * 60) % 60;
      var timeDMS = timeD + ' d, ' + timeH + ' h, ' + timeM + ' m, ' + timeS + ' s';
      return timeDMS;
    },
  },

  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      vm.load();
      next();
    });
  },
};
</script>
