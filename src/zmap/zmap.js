var Zmap = function(options){
	this.options = options ? options : {};
	this.baseLayerURL = options.url,
	this.viewOpts = options.view;
	this.container = options.container;

	this.baseLayer = undefined;
	this.view = undefined;
	this.mapObj = undefined;
	this.init();
}

Zmap.prototype.init = function(){
	this.baseLayer = new ol.layer.Tile({
		source: new ol.source.XYZ({
				url: this.baseLayerURL
		})
	});
	this.view = new ol.View(this.viewOpts);
	this.mapObj = new ol.Map({
		target: this.container,
		layers: [this.baseLayer],
		view: this.view
	})
}

Zmap.prototype.addLayer = function(layer) {
	if(this.mapObj){
		this.mapObj.addLayer(layer);
	}
}

export default Zmap;