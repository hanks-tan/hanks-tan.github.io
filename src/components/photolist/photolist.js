export const template = Vue.component('photolist', {
  template: '\
    <div class="responsive">\
      <div class="img">\
        <a target="_blank" :href="item.src">\
          <img :src="item.src" alt="" width="300" height="200">\
        </a>\
        <div class="desc">{{item.desc}}</div>\
      </div>\
    </div>\
  ',
  props: ['item']
})