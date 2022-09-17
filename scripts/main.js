require([
  "esri/Map", 
  "esri/views/MapView", 
  "esri/layers/WMSLayer",
  "esri/layers/support/WMSSublayer",
  "esri/widgets/LayerList"
], (Map, MapView, WMSLayer, WMSSublayer, LayerList) => {
  const sublayer = new WMSSublayer({
    url: "https://map.ntu.edu.tw:8080/geoNtuPublic/wms?service=wms&version=1.3.0&request=GetCapabilities"
  });
  // Print the names of all sublayers used for rendering.
  const layer = new WMSLayer({
    url: "https://map.ntu.edu.tw:8080/geoNtuPublic/wms?service=wms&version=1.3.0&request=GetCapabilities"
  });
  layer.load().then(() => {
    const names = layer.allSublayers
                      .filter((sublayer) => !sublayer.sublayers) // Non-grouping layers will not have any "sublayers".
                      .map((sublayer) => sublayer.name);
    console.log("Names of all child sublayers", names.join());
  });

  const map = new Map({
    basemap: "arcgis-topographic"
  });
  map.add(layer);

  const view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 14,
    center: [121.53, 25.03]
  });

  view.when(() => {
    const layerList = new LayerList({
      view: view
    })
    view.ui.add(layerList, "top-right");
  })
});