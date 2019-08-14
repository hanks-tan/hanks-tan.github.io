import {baseLayer, view} from '../../src/zmap/config/mapconfig.js';
import Zmap from '../../src/zmap/zmap.js';
// import WindyLayer from './windyLayer.js';

const app = {
  windydata: './data/wind_data.json',
  init: function(){
    this.initMap();
    this.loadWindyLayer();
  },

  initMap: function(){
    var layerURL = baseLayer.geo;
    var viewOpts = view.china;
    
    var zmap = new Zmap({
      container: 'map',
      url: layerURL,
      view: viewOpts
    });

    zmap.init();
  },

  /**
   * 载入风场图
   */
  loadWindyLayer: function() {
    var windyLayer = new WindyLayer(undefined,{
      layerName:'windAnimation',
      minResolution: undefined,
      maxResolution: undefined,
      projection: 'EPSG:4326',
    });
    windyLayer.appendTo(zmap.mapObj);

    var url = this.windydata;
    fetch(url).then(function(response){
      return response.json();
    }).then(function(json){
      windyLayer.setDate(json)
    })
  }
}

app.init();