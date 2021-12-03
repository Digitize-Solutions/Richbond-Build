import React from 'react';
import { Card, Row, Col } from 'antd';
//  Threekit Components
import { TwoCol, Player, Buttons, Swatch, ColorSwatch } from 'threekit/components';
import { Form } from '../threekit/components';
//  Parcel Pending Components
import { ConsoleSelector, ToggleSwitch } from './component';
import SelectOrdinalItem from './Tools/SelectOrdinalItem';
import { AwaitPlayerLoad } from '../threekit/components';
import { Label } from '../threekit/react/components/InputComponents/RadioButtons/radioButtons.styles';
import PopUpForm from './component/PopUpForm';
import { bomClick } from './ParcelPendingUtils';


const setFillerValues = (e) => {
  const configuration = window.threekit.configurator.getConfiguration();
  console.log('Selected Assets ID>>>>>>', e)
  Object.keys(configuration).forEach(element => {
    if (element.includes('Dummy')) {
      let dummyConfiguration = {}
      dummyConfiguration[element] = { assetId: '319d5209-fa64-4e51-b448-8b4ea91f6dd9' }
      window.threekit.configurator.setConfiguration(dummyConfiguration);
    }
  });
}
const App = () => {
  return (
    <div  >

      <Player>
        <Player.BottomLeftWidgets>

          <ColorSwatch attribute="Primary Pyxel" title="Primary" sort='ascending' />

        </Player.BottomLeftWidgets>
        <Player.BottomCenterWidgets>
          <SelectOrdinalItem />
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
