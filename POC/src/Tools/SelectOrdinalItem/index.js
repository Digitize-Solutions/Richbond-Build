import React, { useEffect, useState, useRef } from 'react';
import { useThreekitInitStatus, useAttributes } from 'threekit/hooks';
import { Wrapper } from './selectOrdinalItem.styles';
import { ButtonWrapper } from '../../../threekit/react/components/Widgets/widgets.styles';
import { DeleteIcon, LeftIcon, RightIcon } from './../../component/Icons';

const findHitItem = (hitNodes) => {
  if (!hitNodes.length) return undefined;
  const hierarchy = [...hitNodes[0].hierarchy];
  hierarchy.reverse();

  return (
    hierarchy.find((el) => el.type === 'Item') ||
    //typeof name === 'string' ? name === el.name : name.test(el.name)
    undefined
  );
};


const findHitNode = (hitNodes, name) => {
  if (!hitNodes.length) return undefined;
  const hierarchy = [...hitNodes[0].hierarchy];
  hierarchy.reverse();

  return (
    hierarchy.find((el) => el.type === 'Model') ||
    //typeof name === 'string' ? name === el.name : name.test(el.name)
    undefined
  );
};

export const SelectOrdinalItem = (props) => {
  const loaded = useThreekitInitStatus();
  const [selectedItemName, setSelectedItemName] = useState();
  const [selectedTowerName, setselectedTowerName] = useState();
  const [attributes, setConfiguration] = useAttributes();
  const optionSet = useRef();

  const clickHandler = async (event) => {
    if (!optionSet.current) {
      optionSet.current = new Set([]);

      const attrs = window.threekit.configurator.getDisplayAttributes();
      attrs
        .find((el) => el.name === 'Component 1')
        .values.forEach((el) => optionSet.current.add(el.name));
      attrs
        .find((el) => el.name === 'Dummy 1')
        .values.forEach((el) => optionSet.current.add(el.name));
    }

    //   We start by clearing out the tower selection
    threekit.player.selectionSet.clear();


    //  We find the 'Item' that has been clicked by
    //  the user
    const clickedItem = findHitItem(event.hitNodes);
    //console.log(clickedItem);

    //    If no item is clicked we return out
    if (!optionSet.current.has(clickedItem.name))
      return setSelectedItemName(false);

    //  We add the itme to the selection state
    threekit.player.selectionSet.add(clickedItem.nodeId);
    console.log(clickedItem)
    //  Show UI
    setSelectedItemName(clickedItem.name);

    //  We find the 'Tower' that has been clicked by
    //  the user
    const clickedAttribute = findHitNode(event.hitNodes, "Tower");
    setselectedTowerName(clickedAttribute.name);

  };

  useEffect(() => {
    const tool = (player) => ({
      key: 'select-ordinal-item',
      label: 'select-ordinal-item',
      active: true,
      enabled: true,
      handlers: {
        click: clickHandler,
      },
    });

    (() => {

      if (!loaded) return;
      window.threekit.controller.addTool(tool);
    })();
    // return window.threekit.controller.removeTool(tooltip());
  }, [loaded]);

  const handleClickMove = (step) => {

    const [attrsKeys, attrsData] = Object.entries(attributes).reduce(
      (output, [attrName, attrData]) => {
        if (!attrName.includes('Tower')) return output;
        output[0].push(attrName);
        output[1].push(attrData);
        return output;
      },
      [[], []]
    );
    var indexSelectedTower = attrsKeys.findIndex(attrName => attrName === selectedTowerName);
    var assetIDToMove = attrsData[indexSelectedTower].value.assetId;
    var updatedConfiguration = {};
    if (step < 0)//Left Move
    {
      if (indexSelectedTower === 0)
        return;


      Object.assign(updatedConfiguration, {
        [attrsKeys[indexSelectedTower]]: { assetId: attrsData[indexSelectedTower - 1].value.assetId }, // Copy the right element to selected position
      });


      Object.assign(updatedConfiguration, {
        [attrsKeys[indexSelectedTower - 1]]: { assetId: assetIDToMove }, // Copy the selected asset to left position
      });


      setConfiguration(updatedConfiguration);
      //  setSelectedItemName(false);

    }
    if (0 < step) return console.log(attrsData);
  };

  const handleRightClickMove = (step) => {

    const [attrsKeys, attrsData] = Object.entries(attributes).reduce(
      (output, [attrName, attrData]) => {
        if (!attrName.includes('Tower')) return output;
        output[0].push(attrName);
        output[1].push(attrData);
        return output;
      },
      [[], []]
    );
    var indexSelectedTower = attrsKeys.findIndex(attrName => attrName === selectedTowerName);
    var assetIDToMove = attrsData[indexSelectedTower].value.assetId;
    var assetIDToCheck = attrsData[indexSelectedTower + 1].value.assetId;
    var updatedConfiguration = {};
    if (step > 0)//Right Move
    {
      if (indexSelectedTower === 9)
        return;
      if (assetIDToCheck === '')
        return null;

      Object.assign(updatedConfiguration, {
        [attrsKeys[indexSelectedTower]]: { assetId: attrsData[indexSelectedTower + 1].value.assetId }, // Copy the right element to selected position
      });


      Object.assign(updatedConfiguration, {
        [attrsKeys[indexSelectedTower + 1]]: { assetId: assetIDToMove }, // Copy the selected asset to left position
      });

      console.log(updatedConfiguration);
      setConfiguration(updatedConfiguration);
      //  setSelectedItemName(false);

    }
    if (0 < step) return console.log(attrsData);
  };

  const handleClickDelete = () => {
    const [attrsKeys, attrsData] = Object.entries(attributes).reduce(
      (output, [attrName, attrData]) => {
        if (!attrName.includes('Tower')) return output;
        output[0].push(attrName);
        output[1].push(attrData);
        return output;
      },
      [[], []]
    );

    var foundSelectedTower = false;
    const updatedConfiguration = attrsKeys.reduce((output, attrName, i) => {

      if (attrName === selectedTowerName) foundSelectedTower = true;
      if (i === attrsKeys.length - 1)
        return Object.assign(output, { [attrName]: { assetId: '' } });

      return Object.assign(output, {
        [attrName]: { assetId: attrsData[foundSelectedTower ? i + 1 : i].value.assetId }, // if True move up else assign same
      });

    }, {});

    setConfiguration(updatedConfiguration);
    setSelectedItemName(false);
  };

  if (!selectedItemName) return null;

  return (
    <Wrapper>
      {/* <button onClick={() => handleClickMove(-1)}>Left</button> */}


      <ButtonWrapper

        onClick={() => handleClickMove(-1)}
      >
        <div>
          <LeftIcon />
        </div>
      </ButtonWrapper>

      <ButtonWrapper

        onClick={handleClickDelete}
      >
        <div>
          <DeleteIcon />
        </div>
      </ButtonWrapper>

      <ButtonWrapper

        onClick={() => handleRightClickMove(1)}
      >
        <div>
          <RightIcon />
        </div>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SelectOrdinalItem;
