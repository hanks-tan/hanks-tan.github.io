export const baseLayer = {
		geo: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
		arcgis: ''
}

export const view = {
	china: {
		projection: 'EPSG:4326',
		center: [132, 32],
		zoom: 4
	},
	shenzhen: {
		projection: 'EPSG:4326',
		center: [114, 22]
	}
}

