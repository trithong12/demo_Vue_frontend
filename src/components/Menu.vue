<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand id="title" :to="{name: 'Home'}">Demo</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">關於我們</b-nav-item>
          <b-nav-item href="#">合作方案</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="關鍵字搜尋"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">搜尋</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="語言" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>後台管理</em>
            </template>
            <b-dropdown-item :to="{name: 'Organization'}">單位管理</b-dropdown-item>
            <b-dropdown-item href="#">場地管理</b-dropdown-item>
            <b-dropdown-item href="#">展覽管理</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Menu',
};
</script>

<style lang='scss'>
.nav-item {
  font-weight: 600;
}
.navbar-dark .navbar-nav .nav-link {
  color: #ffffff !important;
}
</style>
