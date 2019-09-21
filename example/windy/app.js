import {baseLayer, view} from '../../src/zmap/config/mapconfig.js';
import Zmap from '../../src/zmap/zmap.js';

const app = {
  windydata: './data/wind_data.json',
  map: undefined,
  init: function(){
    this.initMap();
    this.loadWindyLayer();
  },

  initMap: function(){
    var layerURL = baseLayer.geo;
    var viewOpts = view.china;
    
    this.map = new Zmap({
      container: 'map',
      url: layerURL,
      view: viewOpts
    });
  },

  /**
   * 载入风场图
   */
  loadWindyLayer: function() {
    var windLayer = new WindLayer(undefined,{
      layerName:'windAnimation',
      minResolution: undefined,
      maxResolution: undefined,
      projection: 'EPSG:4326',
    });
    windLayer.appendTo(this.map.mapObj);

    var url = this.windydata;
    fetch(url).then(function(response){
      return response.json();
    }).then(function(json){
      windLayer.setData(json)
    })
  }
}

app.init();