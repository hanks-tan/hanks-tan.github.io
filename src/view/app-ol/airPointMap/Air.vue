<template>
  <div>
    <map-view ref="mapview"></map-view>
  </div>
</template>

<script>
import MapView from '@/components/_public/MapView.vue'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import {View, Overlay} from 'ol'
import {Style, Fill, Circle} from 'ol/style'

export default {
  data(){
    return{
      dataURL: this.BaseURL + '/china_city_aqi',
      view: undefined,
      map: undefined,
      colors: ['67, 206 ,23', '225, 215, 44', '247, 45, 14', '167, 19, 76'],
    }
  },
  components: {MapView},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.source = new VectorSource()
  
      let vectorLayer = new VectorLayer({
        source: this.source,
        style: this.createStyle.bind(this)
      })

      this.view = new View({
        projection: 'EPSG:4326',
        zoom: 7,
        center: [106.192619,34.528267]
      })

      this.map = this.$refs['mapview'].map
      this.map.addLayer(vectorLayer)
      this.map.setView(this.view)

      vectorLayer.on('precompose', evt => {
        let ctx = evt.context
        ctx.shadowColor  = '#fff'
        ctx.shadowBlur = 5;
      })

      this.axios.get(this.dataURL).then(response => {
        let fts = new GeoJSON().readFeatures(response.data.result)
        this.source.addFeatures(fts)
      })
    },

    createStyle (feature, resolution){
      let zoom = this.view.getZoomForResolution(resolution)
      if(zoom > 5) {
        let t = this.labelIsExist(feature)
        if(!t){
          this.showLabel(feature)
        }else{
          console.log('not...')
        }
        return null
      }else{
        this.clearLabel()
        return new Style({
          image: new Circle({
            radius: 5,
            fill: new Fill({
              color: 'rgb(' + this.getColor(feature.get('AQI')) + ')'
            })
          })
        })
      }
    },
  
    clearLabel(){
      let overlays = this.map.getOverlays()
      if(overlays.getLength() > 0){
        overlays.forEach(ele => {
          this.map.removeOverlay(ele)
        })
      }
    },
  
    getColor(vaule) {
      let index = Math.ceil(vaule * this.colors.length / 300)
      if(index < this.colors.length){
        return this.colors[index - 1]
      } else {
        return this.colors(this.colors.length - 1)
      }
    },
  
    showLabel(feature) {
      let root = document.createElement('div')
      let valueEle = document.createElement('div')
      // let ectEle = document.createElement('div')
      let nameEle = document.createElement('div')
      root.appendChild(valueEle)
      // root.appendChild(ectEle)
      root.appendChild(nameEle)
      root.className = 'ol-pop'
      root.id = feature.ol_uid.toString()
      valueEle.className = 'ol-popup-value'
      // ectEle.className = 'ol-popup-ect'
      nameEle.className = 'ol-popup-name'
      valueEle.innerText = feature.get('AQI')
      nameEle.innerText = feature.get('city')
      let color = this.getColor(feature.get('AQI'))
      valueEle.style.backgroundColor = 'rgba(' + color + ', 0.8)'
      // ectEle.style.borderTopColor = 'rgba(' + color + ', 0.8)'
      let overlay = new Overlay({
        element: root,
        position: feature.getGeometry().getCoordinates(),
        stopEvent: false,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      })
      this.map.addOverlay(overlay)
    },
  
    labelIsExist(feature) {
      let id = feature.ol_uid
      if(document.getElementById(id)){
        return true
      }else{
        return false
      }
    }
  },
}
</script>
<style>
  .ol-popup {
    position: absolute;
  }
  .ol-popup-name, .ol-popup-value{
    top: 0px;
    text-align: center;
    border: 3px;
    padding: 2px;
    font-size: 12px;
    font-family: 微软雅黑;
    width: max-content;

  }

  .ol-popup-value {
    float: right;
    width: 30px;
    border-radius: 0px 3px 3px 0px;
    color: #424242;
  }


  .ol-popup-name{
    margin-right: 30px;
    border-radius: 3px 0px 0px 3px;
    background-color: rgba(234, 225, 225);
  }
</style>