export const about = Vue.component('about', {
  template: '\
    <div class="">\
      <h2>关于我</h2>\
      <p>关于我的介绍</p>\
    </div>\
  ',
  data: function() {
    return {
      me: 'GISER'
    }
  }
})