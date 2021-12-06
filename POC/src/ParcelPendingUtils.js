export const onSetConfiguration = (config, attributes) => {
  console.log("setConfig");
  if (attributes.length == 1) {
    //to check only one attribute is changed.
    switch (attributes[0]) {
      case 'Theme':
        console.log("print", config);
        //var found = temp.filter(function(item) { return item.name === 'Console'; });
        //if Console is present then update the value otherwsie find which tower is empty and insert the value
        // config['Tower 1']= config['Console']
        break;


    }
  }


  return config;
};

export const THREEKIT_CONFIG = {
  hooks: { onSetConfiguration },
};


export const bomClick = () => {
  var threekitBOM = window.threekit.controller.getBom();
  var tempBOM = {};
  for (var key in threekitBOM) {

    if (key.includes("Tower")) {
      if (threekitBOM[key]) {
        var label = threekitBOM[key].label;
        if (label) {
          if (!tempBOM[label]) {
            tempBOM[label] = 0;

          }

          tempBOM[label]++;

        }
      }
    }
  }

  var towerAttribute = window.threekit.configurator.getAttributes()[4];
  var tower_value = towerAttribute['values']
  var indoorTower = []
  var outdoorTower = []

  tower_value.forEach(element => {
    if (element['tags'][0] == 'outdoor') {
      outdoorTower.push(element['label']);
    }
    else if (element['tags'][0] == 'indoor') {
      indoorTower.push(element['label']);
    }
  });


  let outdoorAssestId = '51a4dff0-3cea-4a0a-b5fc-d77978c0f931';
  let indoorAssetId = 'bdd36ca5-719e-4465-8de4-1b359a1c3a97';

  let conf = window.threekit.configurator.getConfiguration()

  if (conf['Location']['assetId'] == indoorAssetId) {
    indoorTower.forEach(ele => {
      Object.keys(tempBOM).forEach(element => {
        if (ele == element) {
          document.getElementById(element).innerHTML = tempBOM[element];
        }

      })

      if (!(ele in tempBOM)) {
        document.getElementById(ele).innerHTML = 0;

      }

    }

    )
  };

  if (conf['Location']['assetId'] == outdoorAssestId) {
    outdoorTower.forEach(ele => {
      Object.keys(tempBOM).forEach(element => {
        if (ele == element) {
          document.getElementById(element).innerHTML = tempBOM[element];
        }

      })
      if (!(ele in tempBOM)) {
        document.getElementById(ele).innerHTML = 0;
      }
    }
    )
  };


  document.getElementById('card').innerHTML = JSON.stringify(tempBOM);
};


