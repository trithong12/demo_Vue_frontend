<template>
  <div class="top-block-container">
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
      <b-row>
        <b-col v-for="i in Array.from(Array(10).keys())" :key="i" xl="4" lg="6" md="6" sm="12">
          <ExhibitionCard></ExhibitionCard>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style lang='scss' scoped>
.top-block-container {
  // padding: 1rem 5rem;
  max-height: 550px;
}

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
