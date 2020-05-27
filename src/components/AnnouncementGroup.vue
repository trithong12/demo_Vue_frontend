<template>
  <div>
    <b-card title="公佈欄">
      <div v-for="i in [0, 1, 2]" :key="i">
        <b-list-group-item href="#" class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1" style="font-weight:600">公告標題 {{i}}</h6>
            <small class="text-muted">時間</small>
          </div>
          <p class="mb-1">公告內容</p>
          <small class="text-muted">發佈人</small>
        </b-list-group-item>
      </div>
      <div class="more-button-container">
        <b-button href="#" variant="primary">查看更多</b-button>
      </div>
    </b-card>
  </div>
</template>
