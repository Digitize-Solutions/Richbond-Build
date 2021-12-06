import { Components } from 'antd/lib/date-picker/generatePicker';
import React, { useState } from 'react';
//  Threekit Components
import { TwoCol, Player, Buttons, Swatch, ColorSwatch } from 'threekit/components';
//  Parcel Pending Components

import SelectOrdinalItem from './Tools/SelectOrdinalItem';
import { getClickedItem } from './Tools/SelectOrdinalItem';
// import { findHitItem } from './'
// const setSofa = (componentName, assetId) => {
//   dummyConfiguration[componentName] = { assetId: assetId }
// }


// const configuration = window.threekit.configurator.getConfiguration();
// setselectedAssetId(e)
// console.log('Selected Assets ID>>>>>>', e)
// Object.keys(configuration).forEach(element => {
//   if (element.includes('Dummy')) {
//     let dummyConfiguration = {}
//     dummyConfiguration[element] = { assetId: '319d5209-fa64-4e51-b448-8b4ea91f6dd9' }
//     window.threekit.configurator.setConfiguration(dummyConfiguration);
//   }
// });

const App = () => {
  // const [selectedNode, setSelectedNode] = useState(null);
  const [selectedAssetId, setselectedAssetId] = useState('');

  // const getClickedItems = (data) => {
  //   setSelectedNode(data)
  // }
  // const [selectedAssetId, setselectedAssetId] = useState()

  const setFillerValues = (e) => {
    window.selectedAssetId = e
    // let ruleJson = {
    //   corner: {
    //     left: ['center', 'pouf'],
    //     right: ['center', 'pouf']
    //   },
    //   center: {
    //     left: ['corner', 'pouf', 'center'],
    //     right: ['corner', 'pouf', 'center']
    //   },
    //   pouf: {
    //     left: ['corner', 'center', 'pouf'],
    //     right: ['corner', 'center', 'pouf']
    //   }
    // }
    // console.log(ruleJson)
    let configArray = ['corner', 'center', 'corner'] //Initial Array/Config
    let indexArray = [];
    //Checking What is chosen
    let userInput = ''
    if (e == '9088caa1-0cd9-40d2-9c7f-4383b5848d57')
      userInput = 'corner'
    else if (e == '5fdc3341-8897-439e-baef-85533a00d3f4')
      userInput = 'center'
    else if (e == 'abb85bcc-d449-476b-a273-f2aa4f51274d')
      userInput = 'pouf'

    // window.configArray = configArray;
    // window.ruleJson = ruleJson;

    // let citem = getClickedItem();
    // console.log('In app:', citem)


    // if(ruleJson[userInput].left.includes(configArray[i])){
    //   leftFlag = true;
    // }
    // if(ruleJson[userInput].left.includes(configArray[i+1])){
    //   rightFlag = true;
    // }
    // Object.keys(ruleJson).forEach(element => {
    //   if (element == userInput) {
    //     for (let i = 0; i < configArray.length; i++) {
    //       Object.keys(ruleJson[element]).forEach(element => {
    //         if (element == 'left') {
    //           ruleJson[userInput]['left'].forEach(element => {
    //             if (configArray[i] == element) {
    //               leftFlag = true;
    //             }
    //           });
    //         }
    //         if (element == 'right') {
    //           ruleJson[userInput]['right'].forEach(element => {
    //             if (configArray[i + 1] == element) {
    //               rightFlag = true;
    //             }
    //           });
    //         }
    //       });
    //       if (leftFlag && rightFlag) {
    //         indexArray.push(i)
    //       }
    //     }
    //   }

    // });

    for (let i = 0; i < configArray.length; i++) {
      let leftFlag = false;
      let rightFlag = false;

      if (userInput == 'corner') {
        if (configArray[i] == 'center' || configArray[i] == 'pouf') {
          leftFlag = true
        }
        if (configArray[i + 1] == 'center' || configArray[i + 1] == 'pouf') {
          rightFlag = true
        }
      }
      else if (userInput == 'center' || userInput == 'pouf') {
        if (configArray[i] == 'center' || configArray[i] == 'pouf' || configArray[i] == 'corner') {
          leftFlag = true
        }
        if (configArray[i + 1] == 'center' || configArray[i + 1] == 'pouf' || configArray[i + 1] == 'corner') {
          rightFlag = true
        }
      }
      if (leftFlag && rightFlag) {
        indexArray.push(i);
      }
    }

    let dummyConfiguration = {}
    if (indexArray.length > 0) {
      indexArray.forEach(element => {
        let num = element + 1
        let dummyElem = 'Dummy ' + num;
        dummyConfiguration[dummyElem] = { assetId: '319d5209-fa64-4e51-b448-8b4ea91f6dd9' }
      });
      window.threekit.configurator.setConfiguration(dummyConfiguration);
    }
    console.log(indexArray)
    setselectedAssetId(e)
  }
  // const getFromChild = (childData)=>{
  //   let childData = childData;
  // }
  return (
    <div  >

      <Player>
        <Player.BottomLeftWidgets>

          <ColorSwatch attribute="Primary Pyxel" title="Primary" sort='ascending' />

        </Player.BottomLeftWidgets>
        <Player.BottomCenterWidgets>
          {/* <SelectOrdinalItem
            getClickedItems={getClickedItems}
          /> */}
          <SelectOrdinalItem  />
        </Player.BottomCenterWidgets>
        <Player.BottomRightWidgets>
          <ColorSwatch attribute="Secondary Pyxel" title="Secondary" sort='ascending' />

        </Player.BottomRightWidgets>
      </Player>
      <Buttons
        attributesArrayLabel="Component"
        description="You can choose upto nine(15)"
        handleClick={(e) => setFillerValues(e)}

      ></Buttons>

    </div >
  );
};

export default App;
