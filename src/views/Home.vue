<template>
  <div class="nsneo-page-body">
    <div class="nsneo-page-header" v-if="showheader">
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo">
          <Icon type="ios-albums" />
          <span style="font-size: 18px;margin-left: 5px;">{{sysTitle}}</span>
        </div>
        <ul class="layout-nav">
          <Submenu name="3">
            <template slot="title">
              <Icon type="md-person" />
              {{loginUser.userName}}
            </template>
            <MenuGroup title="登录">
              <MenuItem name="t-3-1" :style="{whiteSpace:'nowrap'}">
                <Icon type="md-checkmark" />
                {{loginUser.loginDateTime}}
              </MenuItem>
            </MenuGroup>
            <MenuGroup title="操作">
              <router-link to="/login" replace>
                <MenuItem name="t-3-4">
                  <Icon type="md-log-out" />退出
                </MenuItem>
              </router-link>
            </MenuGroup>
          </Submenu>
        </ul>
      </Menu>
    </div>
    <div class="nsneo-page-content">
      <div class="nsneo-page-leftmenu">
        <template v-if="showleftmenu">
          <Menu theme="light" width="auto" class="nsneo-left-menuitem" :active-name="defaultMenuId">
            <!--第一级菜单-->
            <template v-for="(item, index) in menus">
              <Submenu v-if="item.children&&item.children.length>0" :name="item.id" :key="index">
                <template slot="title">
                  <Icon
                    class="nsneo-left-menu-icon nsneo-left-menu-icon-haschild"
                    v-if="item.icon&&item.icon.trim()!=''"
                    :type="item.icon"
                  ></Icon>
                  {{item.name}}
                </template>

                <!--第二级菜单-->
                <template v-for="(citem,cindex) in item.children">

                  <Submenu v-if="citem.children&&citem.children.length>0" :name="citem.id" :key="cindex">
                    <template slot="title">
                      <Icon
                        class="nsneo-left-menu-icon nsneo-left-menu-icon-haschild"
                        v-if="citem.icon&&citem.icon.trim()!=''"
                        :type="citem.icon"
                      ></Icon>
                      <div v-else class="nsneo-left-menu-empty"></div>
                      {{citem.name}}
                    </template>

                    <!--第三级菜单-->
                    <template v-for="(ccitem,ccindex) in citem.children">

                        <Submenu v-if="ccitem.children&&ccitem.children.length>0" :name="ccitem.id" :key="ccindex">
                          <template slot="title">
                            
                            <Icon
                              class="nsneo-left-menu-icon nsneo-left-menu-icon-haschild"
                              v-if="ccitem.icon&&ccitem.icon.trim()!=''"
                              :type="ccitem.icon"
                            ></Icon>
                            <div v-else class="nsneo-left-menu-empty"></div>
                            {{ccitem.name}}
                          </template>

                          <!--第五级菜单-->
                          <template v-for="(cccitem,cccindex) in ccitem.children">
                            <Submenu v-if="cccitem.children&&cccitem.children.length>0" :name="cccitem.id" :key="cccindex">
                              <template slot="title">
                                <Icon
                                  class="nsneo-left-menu-icon nsneo-left-menu-icon-haschild"
                                  v-if="cccitem.icon&&cccitem.icon.trim()!=''"
                                  :type="cccitem.icon"
                                ></Icon>
                                <div v-else class="nsneo-left-menu-empty"></div>
                                {{cccitem.name}}
                              </template>

                              <router-link
                                v-for="(ccccitem,ccccindex) in cccitem.children"
                                :key="ccccindex"
                                :to="routerLinkTo(ccccitem)" replace
                              >
                                <MenuItem :name="ccccitem.id">
                                  <Icon
                                    class="nsneo-left-menu-icon"
                                    v-if="ccccitem.icon&&ccccitem.icon.trim()!=''"
                                    :type="ccccitem.icon"
                                  ></Icon>

                                  <div v-else class="nsneo-left-menu-empty"></div>
                                  {{ccccitem.name}}
                                </MenuItem>
                              </router-link>

                            </Submenu>

                            <router-link v-else :to="routerLinkTo(cccitem)" :key="cccindex" replace>
                              <MenuItem :name="cccitem.id">
                                <Icon
                                  class="nsneo-left-menu-icon"
                                  v-if="cccitem.icon&&cccitem.icon.trim()!=''"
                                  :type="cccitem.icon"
                                ></Icon>
                                <div v-else class="nsneo-left-menu-empty"></div>
                                {{cccitem.name}}
                              </MenuItem>
                            </router-link>
                          </template>

                        </Submenu>

                        <router-link v-else :to="routerLinkTo(ccitem)" :key="ccindex" replace>
                          <MenuItem :name="ccitem.id">
                            <Icon
                              class="nsneo-left-menu-icon"
                              v-if="ccitem.icon&&ccitem.icon.trim()!=''"
                              :type="ccitem.icon"
                            ></Icon>
                            <div v-else class="nsneo-left-menu-empty"></div>
                            {{ccitem.name}}
                          </MenuItem>
                        </router-link>

                    </template>


                  </Submenu>

                  <router-link v-else :to="routerLinkTo(citem)" :key="cindex" replace>
                    <MenuItem :name="citem.id">
                      <Icon
                        class="nsneo-left-menu-icon"
                        v-if="citem.icon&&citem.icon.trim()!=''"
                        :type="citem.icon"
                      ></Icon>
                      <div v-else class="nsneo-left-menu-empty"></div>
                      {{citem.name}}
                    </MenuItem>
                  </router-link>
                  
                </template>

                
              </Submenu>

              <router-link v-else :to="routerLinkTo(item)" :key="index" replace>
                <MenuItem :name="item.id">
                  <Icon
                    class="nsneo-left-menu-icon"
                    v-if="item.icon&&item.icon.trim()!=''"
                    :type="item.icon"
                  ></Icon>
                  <div v-else class="nsneo-left-menu-empty"></div>
                  {{item.name}}
                </MenuItem>
              </router-link>
            </template>
          </Menu>
        </template>
      </div>
      <div class="nsneo-page-rightcontent">
        <div id="nsneocontainerbody" class="nsneo-container-body">
          <transition name="move" mode="out-in">
            <!--
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
            -->
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "",
  components: {},
  data: function() {
    return {
      isCollapsed:true
    };
  },

  computed: {
    ...mapGetters(["showheader", "showleftmenu", "loginUser", "sysTitle"]),
    menus() {
      //console.log(this.$router.options.menus)
      //console.log(this.$router.options.findRouter());
      return this.$router.options.menus;
    },
    defaultMenuId(){
      return this.$router.options.findDefaultMenuId();
    },
    routerLinkTo(menuItem) {
      //return '/';
      return function(menuItem) {
        return this.$router.options.findRouter(menuItem);
      };
    }
  }
};
</script>

<style scoped>
.move-enter-active,
.move-leave-active {
  transition: opacity 0.5s;
}

.move-enter,
.move-leave {
  opacity: 0;
}

.layout-logo {
  float: left;
  position: relative;
  color: #ffffff;
  font-size: 30px;
  margin-left: 20px;
}

.layout-nav {
  float: right;
  margin: 0 auto;
  margin-right: 0px;
  list-style: none;
  margin: 0px;
  padding: 0px;
  font-size: 16px;
}

.nsneo-left-menu-icon {
  font-size: 20px !important;
  margin-top: -5px;
}
.nsneo-left-menu-icon-haschild {
  padding-right: 0px !important;
  margin-right: 6px !important;
}

.ivu-menu-vertical.ivu-menu-light::after {
  content: "" !important;
  width: 0px !important;
}
.nsneo-login-row .ivu-input-prefix i,
.ivu-input-suffix i {
  height: 40px;
  line-height: 40px;
}
.nsneo-login-row .ivu-input {
  height: 40px;
}
</style>