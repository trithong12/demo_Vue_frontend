<template>
  <div>
    <b-row>
      <b-col xl="8" lg="12" class="col-style">
        <Carousel></Carousel>
      </b-col>
      <b-col xl="4" lg="12" class="col-style">
        <div class="announcement-container">
          <AnnouncementGroup></AnnouncementGroup>
        </div>
      </b-col>
    </b-row>
    <div class="main-content-container">
      <b-overlay :show="wait" rounded="sm">
        <b-row>
          <b-col v-for="(exhibition, i) in exhibitionList" :key="i" xl="4" lg="6" md="6" sm="12">
            <ExhibitionCard :exhibition="exhibition"></ExhibitionCard>
          </b-col>
        </b-row>
        <div class="more-button-container">
          <b-button href="#" variant="primary">查看更多</b-button>
        </div>
      </b-overlay>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Carousel from '../components/Carousel.vue';
import AnnouncementGroup from '../components/AnnouncementGroup.vue';
import ExhibitionCard from '../components/ExhibitionCard.vue';

export default {
  name: 'Home',
  components: {
    Carousel,
    AnnouncementGroup,
    ExhibitionCard,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  mounted() {
    this.$store.dispatch('exhibition/fetchExhibitionList');
  },
  computed: {
    ...mapState({
      wait: (state) => state.exhibition.wait,
      exhibitionList: (state) => state.exhibition.exhibitionList,
    }),
  },
};
</script>

<style lang='scss' scoped>
.col-style {
  margin: 0.5rem 0rem;
}

.announcement-container {
  display: block;
}

.main-content-container {
  margin-top: 1rem;
}
</style>
