import React from 'react';
import { Buttons } from 'threekit/components';
import { useAttributes } from 'threekit/hooks';

/**
 * Console Interaction Conditions
 *
 * There can only be ONE console in the tower
 * stricture
 *
 * If no console exists in the towers,
 * add the console to the first available
 *
 * If a console already is in the towers,
 * and the user changes the console type,
 * it should REPLACE the existing console
 *
 */

const ConsoleSelector = () => {
  const [attributes, setConfiguration] = useAttributes();

  if (!attributes?.['Console']) return null;

  let hasConsole = false;
  let slotForConsole = undefined;
  let selectedAssetId;
  const options = attributes?.['Console']?.values;
  const consoleAssetIds = options.map((el) => el.assetId);
  const towerState = Object.entries(attributes).reduce(
    (output, [attributeName, attributeData]) => {
      if (!attributeName.includes('Tower')) return output;
      output[attributeName] = attributeData.value?.assetId?.length
        ? attributeData.value.assetId
        : undefined;
      return output;
    },
    {}
  );

  Object.entries(towerState).forEach(([attributeName, attributeValue]) => {
    if (!slotForConsole) {
      if (attributeValue && consoleAssetIds.includes(attributeValue)) {
        selectedAssetId = attributeValue;
        hasConsole = true;
        slotForConsole = attributeName;
      }
      if (!attributeValue?.length) slotForConsole = attributeName;
    }
  });

  const handleClick = (assetId) => {
    setConfiguration({ [slotForConsole]: { assetId } });
  };
  window.hasConsole = hasConsole;
  return (
    <Buttons
      title="Console"
      description="Please choose one(1)"
      selected={selectedAssetId}
      options={options.map((el) =>
        Object.assign({}, el, { value: el.assetId })
      )}
      handleClick={handleClick}
    />
  );
};

export default ConsoleSelector;
