
import axios from 'axios';


const bearerToken = process.env.THREEKIT_AUTH_TOKEN;
const threekitEnv = process.env.THREEKIT_ENV;
const deployedServer = process.env.DEPOLOYED_SERVER

var companyLogo = "https://ml.globenewswire.com/Resource/Download/0d95b461-e230-489e-9479-8c9ac70fcc3f";
var companyPhone = "(844) 657-4608"
var companyEmail = "sales@parcelpending.com"

var data = {
  "companyLogo": companyLogo,
  "companyPhone": companyPhone,
  "companyEmail": companyEmail,
  "projectName": "",
  "name": "",
  "date": "",
  "contact": "",
  "address": "",
  "phone": "",
  "email": "",
  "thumbnail": "",
  "table": [

  ]
};


async function getThumbnailUrl() {
  //Taking Snapshot and changing back to user's camera position
  var vCamPos;
  var vCamQuat;

  vCamPos = window.threekit.player.camera.getPosition();
  vCamQuat = window.threekit.player.camera.getQuaternion();

  window.threekit.configurator.setConfiguration({ _camera: 'SnapShot' });
  var base64Img = await window.threekit.player.snapshotAsync();

  await window.threekit.configurator.setConfiguration({ _camera: 'Default' });

  window.threekit.player.camera.setPosition(vCamPos);
  window.threekit.player.camera.setQuaternion(vCamQuat);


  // Getting Blob from base64 then converting it to file
  let imgBlob = await fetch(base64Img)
    .then(res => res.blob())
    .then((res) => {
      return res;
    })

  // Saving file to configuration
  const imgFile = new File([imgBlob], 'thumbnail.png');
  const saveData = {
    thumbnail: imgFile
  }

  const response = await window.threekit.controller.saveConfiguration(saveData);

  //Getting ShortId and creating URL
  let shortId = response['shortId'];
  let finalUrl = `https://${threekitEnv}/api/configurations/${shortId}/thumbnail?bearer_token=${bearerToken}`;

  data['thumbnail'] = finalUrl;

  // Sending PDF request and downloading the PDF.
  axios({
    method: "post",
    url: deployedServer,
    data: data,
    headers: { "Content-Type": "application/json" },
    responseType: 'blob',
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
    });
};



export const getPDF = (userInfo) => {
  //Populating Data
  
  data['phone'] = userInfo.phone;
  data['projectName'] = userInfo.projectName;
  data['contact'] = userInfo.contact;
  data['address'] = userInfo.propertyAddress;
  data['email'] = userInfo.email;
  data['name'] = userInfo.propertyName;
  data['table'] = [];
  
  //Date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  data['date'] = today;
  
  
  
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
  //Getting color label
  let color = threekitBOM['finalMaterial']['label'];
  
  //Populating Table 
  for (var key in tempBOM) {
    data['table'].push({ 'value': key, 'color': color, 'quantity': tempBOM[key] })
  }
  
  getThumbnailUrl();
}
