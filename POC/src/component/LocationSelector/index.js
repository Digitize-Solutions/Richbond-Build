import React from 'react';
import { Buttons } from 'threekit/components';
import { useAttributes } from 'threekit/hooks';

const LocationSelector = () => {
  const [attributes, setConfiguration] = useAttributes();

  if (!attributes?.['Location']) return null;
  const selected = attributes?.['Location'].value.assetId;
  const options = attributes['Location']?.values;

  const handleClick = (assetId) => {
    const updatedConfiguration = Object.keys(attributes).reduce(
      (output, attributeName) => {
        if (!attributeName.includes('Tower')) return output;
        return Object.assign(output, { [attributeName]: { assetId: '' } });
      },
      { Location: { assetId } }
    );
    setConfiguration(updatedConfiguration);
  };

  return (
    <Buttons
      title="Location"
      options={options.map((el) =>
        Object.assign({}, el, { value: el.assetId })
      )}
      selected={selected}
      handleClick={handleClick}
    />
  );
};

export default LocationSelector;
