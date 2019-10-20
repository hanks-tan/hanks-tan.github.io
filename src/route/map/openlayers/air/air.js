import mapView from '/src/components/mapView.js'
import util from '/src/util/util.js'

export default {
  template: '<div><map-view ref="mapview"></map-view></div>',
  data(){
    return {
      dataURL: '/src/route/map/openlayers/air/data/china_city_aqi.geojson',
      cssfile: '/src/route/map/openlayers/air/css/pop.css',
      view: undefined,
      map: undefined,
      colors: ['67, 206 ,23', '225, 215, 44', '247, 45, 14', '167, 19, 76'],
    }
  },
  components: {
    'map-view': mapView
  },
  mounted() {
    util.loadStyle(this.cssfile)
    this.init()
  },
  beforeDestroy() {
    util.romoveStyle(this.cssfile)
  },
  methods: {
    init(){
      this.source = new ol.source.Vector({
        url: this.dataURL,
        format: new ol.format.GeoJSON()
      })
  
      let vectorLayer = new ol.layer.Vector({
        source: this.source,
        style: this.createStyle.bind(this)
      })

      this.view = new ol.View({
        projection: 'EPSG:4326',
        zoom: 5,
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
        return new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
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
      let ectEle = document.createElement('div')
      let nameEle = document.createElement('div')
      root.appendChild(valueEle)
      root.appendChild(ectEle)
      root.appendChild(nameEle)
      root.className = 'ol-pop'
      root.id = feature.ol_uid.toString()
      valueEle.className = 'ol-popup-value'
      ectEle.className = 'ol-popup-ect'
      nameEle.className = 'ol-popup-name'
      valueEle.innerText = feature.get('AQI')
      nameEle.innerText = feature.get('city')
      let color = this.getColor(feature.get('AQI'))
      valueEle.style.backgroundColor = 'rgba(' + color + ', 0.8)'
      ectEle.style.borderTopColor = 'rgba(' + color + ', 0.8)'
      let overlay = new ol.Overlay({
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

