<template>
  <div>
    <b-card
      tag="article"
      class="mb-2"
      style="max-height:35rem"
      no-body
    >
      <b-card-img
       style="min-height:15rem"
       :src="exhibition.image_url"
       top
       class="rounded-0"></b-card-img>
      <b-card-body>
        <b-card-title style="height:5rem"><a href="#">{{ exhibition.title }}</a></b-card-title>
        <b-card-text>
          <div class="text-truncate">{{ exhibition.description }}</div>
        </b-card-text>
        <b-card-text class="small text-muted">開始時間：{{ startDatetime }}</b-card-text>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import datetimeFormatter from '../utils/datetimeFormatter';

export default {
  name: 'ExhibitionCard',
  props: {
    exhibition: {
      type: Object,
      required: true,
    },
  },
  computed: {
    startDatetime() {
      return datetimeFormatter(this.exhibition.start_datetime);
    },
  },
};
</script>

<style scoped>
</style>
