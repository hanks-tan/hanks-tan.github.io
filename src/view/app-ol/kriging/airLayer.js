import kriging from './kriging.js'
import GradientColor from '/src//util/color.js'
import GeoJSON from 'ol/format/GeoJSON'
import Image from 'ol/layer/Image'
import ImageCanvas from 'ol/source/ImageCanvas'

class AirLayer {
  constructor (options) {
    this._airLayer = undefined
    this.map = options.map
    this.boundary = options.boundary
    this.sampledData = options.sampledData // Array(object)
    this.params = {
      krigingModel: 'exponential', // model还可选'gaussian','spherical'
      krigingSigma2: 0,
      krigingAlpha: 100,
      canvasAlpha: 1, // 半透明会出现网格边线
      colorsStart: ['#267300', '#C9FB02', '#FFB700', '#FF0000', '#AC0063', '#7E0023'],
      colorsEnd: ['#98E600', '#FFE500', '#FF4000', '#A80000', '#82004C', '#40001A'],
      min: 0,
      max: 300
    }

    var gradient = []
    for (var i = 0; i < 5; i++) {
      let thisPartColors = new GradientColor(this.params.colorsStart[i], this.params.colorsEnd[i], 20)
      gradient = gradient.concat(thisPartColors)
    }
    this.gradient = gradient
  }

  show () {
    if (!this._airLayer) {
      this.map.removeLayer(this._airLayer)
    }
    let values = []
    let lngs = []
    let lats = []
    this.sampledData.forEach(data => {
      lngs.push(data[0])
      lats.push(data[1])
      values.push(data[2])
    })

    let params = this.params
    if (values.length > 3) {
      let variogram = kriging.train(values, lngs, lats,
        params.krigingModel, params.krigingSigma2, params.krigingAlpha, params.max, params.min)
      var extent = this.boundary.getExtent()
      var cellWidth = (extent[2] - extent[0]) / 1000 // 计算网格大小
      var polygon = []
      if (this.boundary.getType() === 'Polygon') {
        polygon = this.boundary.getCoordinates()
      } else if (this.boundary.getType() === 'MultiPolygon') {
        // -------------------------------------注意----------------------------
        polygon = this.boundary.getCoordinates()[1] // 注意，如果是多面，此处不一定就及取0
      } else {
        console.log('网格范围未提供....')
      }
      let grid = kriging.grid(polygon, variogram, cellWidth)

      this._airLayer = new Image({
        source: new ImageCanvas({
          canvasFunction: (extent, resolution, pixelRatio, size, projection) => {
            let canvas = document.createElement('canvas')
            canvas.width = size[0]
            canvas.height = size[1]
            canvas.style.display = 'block'
            // 设置canvas透明度
            canvas.getContext('2d').globalAlpha = params.canvasAlpha
            kriging.plot(canvas, grid,
              [extent[0], extent[2]], [extent[1], extent[3]], this.gradient)

            return canvas
          }
        }),
        opacity: 0.5
      })
      this.map.addLayer(this._airLayer)
      // 这两句用于将this._airLayer图层放到最下方
      // var layers =  this.map.getLayers();
      // layers.insertAt(0,this._airLayer);
    } else {
      console.log('数据量不够....')
    }
  }
}

export default AirLayer
