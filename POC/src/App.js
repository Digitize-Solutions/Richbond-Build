
import React, { useState } from 'react';

//  Threekit Components
import { Player, Buttons, ColorSwatch } from 'threekit/components';
//  Parcel Pending Components
import { setDummtToNUll } from './Tools/SelectOrdinalItem';
import SelectOrdinalItem from './Tools/SelectOrdinalItem';
const cornerAssetId = '9088caa1-0cd9-40d2-9c7f-4383b5848d57';
const centerAssetId = '5fdc3341-8897-439e-baef-85533a00d3f4';
const poufAssetId = 'abb85bcc-d449-476b-a273-f2aa4f51274d';
const dummyBoxAssetId = '319d5209-fa64-4e51-b448-8b4ea91f6dd9';



const App = () => {
  const setFillerValues = (userChosenAsset) => {
    setDummtToNUll();
    window.selectedAssetId = userChosenAsset
    //Initial Array/Config
    let configArray = ['none', 'none']

    //Addition Index Array
    let indexArray = [];

    //Checking What is chosen
    let config = window.threekit.configurator.getConfiguration()
    window.threekit.configurator.setConfiguration(config)
    let userInput = ''
    if (userChosenAsset == cornerAssetId)
      userInput = 'corner'
    else if (userChosenAsset == centerAssetId)
      userInput = 'center'
    else if (userChosenAsset == poufAssetId)
      userInput = 'pouf'

    let cornerCount = 0
    Object.keys(config).forEach(element => {
      if (element.includes('Component')) {
        if (config[element]['assetId'] == cornerAssetId) {

          configArray.splice(configArray.length - 1, 0, 'corner')
        }
        else if (config[element]['assetId'] == centerAssetId) {

          configArray.splice(configArray.length - 1, 0, 'center')

        }
        else if (config[element]['assetId'] == poufAssetId) {
          configArray.splice(configArray.length - 1, 0, 'pouf')

        }
      }
    });

    if (configArray.length > 17) {
      window.alert('Cannot add more');
      window.threekit.player.selectionSet.clear()
    }
    else {

      console.log('>>>>', configArray);
      if (cornerCount > 4 && userInput == 'corner') {
        console.log('Error >>>>', configArray);
        window.threekit.player.selectionSet.clear()
        window.alert('Cannot add more than 4 corners');
      }
      else {
        for (let i = 0; i < configArray.length; i++) {
          let leftFlag = false;
          let rightFlag = false;

          if (userInput == 'corner') {
            if (configArray[i] == 'center' || configArray[i] == 'pouf' || configArray[i] == 'none') {
              leftFlag = true;
            }
            if (configArray[i + 1] == 'center' || configArray[i + 1] == 'pouf' || configArray[i + 1] == 'none') {
              rightFlag = true;
            }
          }
          else if (userInput == 'center' || userInput == 'pouf') {
            if (configArray[i] == 'center' || configArray[i] == 'pouf' || configArray[i] == 'corner' || configArray[i] == 'none') {
              leftFlag = true;
            }
            if (configArray[i + 1] == 'center' || configArray[i + 1] == 'pouf' || configArray[i + 1] == 'corner' || configArray[i + 1] == 'none') {
              rightFlag = true;
            }
          }
          if (leftFlag && rightFlag) {
            indexArray.push(i);
          }
        }

        let dummyConfiguration = {};
        if (indexArray.length > 0) {
          indexArray.forEach(element => {
            let num = element;
            let dummyElem = 'Dummy ' + num;
            dummyConfiguration[dummyElem] = { assetId: dummyBoxAssetId };
          });
          window.threekit.configurator.setConfiguration(dummyConfiguration);
        }
        console.log(indexArray);
      }
    }
  }
  return (
    <div  >

      <Player>
        <Player.BottomLeftWidgets>



        </Player.BottomLeftWidgets>
        <Player.BottomCenterWidgets>
          {/* <SelectOrdinalItem
            getClickedItems={getClickedItems}
          /> */}
          <SelectOrdinalItem />
        </Player.BottomCenterWidgets>
        <Player.BottomRightWidgets>


        </Player.BottomRightWidgets>
      </Player>
      <Buttons
        attributesArrayLabel="Component"
        description="You can choose upto nine(15)"
        handleClick={(userChosenAsset) => setFillerValues(userChosenAsset)}

      ></Buttons>

    </div >
  );
};

export default App;
