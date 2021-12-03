import { Switch, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useAttribute, useAttributes } from 'threekit/hooks';


const ToggleSwitch = () => {
  const [locationswitch, setLocationSwitch] = useState(false);
  const [locationAttribute, setLocationAttribute] = useAttribute('Location');
  const [attributes, setConfiguration] = useAttributes();

  const handleLocationSwitch = () => {
    if (locationswitch) {
      setLocationSwitch(false);
    } else {
      setLocationSwitch(true);
    }
    var assetId;
    if (locationswitch) {
      assetId = locationAttribute['values'][1]['assetId'];//outdoor

    } else {
      assetId = locationAttribute['values'][0]['assetId'];

    }

    //setLocationAttribute(assetId);
    const updatedConfiguration = Object.keys(attributes).reduce(
      (output, attributeName) => {
        if (!attributeName.includes('Tower')) return output;
        return Object.assign(output, { [attributeName]: { assetId: '' } });
      },
      { Location: { assetId } }
    );
    console.log(updatedConfiguration);
    setConfiguration(updatedConfiguration);
  };
  return (
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>Indoor</Grid>
      <Grid item>
        <Switch onChange={() => handleLocationSwitch()} />
      </Grid>
      <Grid item>Outdoor</Grid>
    </Grid>

  )
}
export default ToggleSwitch