import React from 'react';
import { Switch, Grid } from '@material-ui/core';
import { useState, useEffect } from 'react';
import useAttribute from '../../threekit/react/hooks/useAttribute';
import { AwaitPlayerLoad } from '../../threekit/components';

const CustomSwitch = (props) => {
  //Deconstructing props
  const { attribute, labelRight, labelLeft } = props;

  const [locationswitch, setLocationSwitch] = useState(false);
  const [locationAttribute, setLocationAttribute] = useAttribute(attribute);

  //   try {
  //     if (assetId === '') {
  //       let assetId = locationAttribute['values'][0]['assetId']; //Indoor

  //       setLocationAttribute(assetId);
  //     }
  //     else {
  //         console.log('Asset Id not empty')
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  const handleLocationSwitch = () => {
    if (locationswitch) {
      setLocationSwitch(false);
    } else {
      setLocationSwitch(true);
    }

    if (locationswitch) {
      let assetId = locationAttribute['values'][1]['assetId']; //Outdoor
      setLocationAttribute(assetId);
    } else {
      let assetId = locationAttribute['values'][0]['assetId']; //Indoor
      setLocationAttribute(assetId);
    }
  };
  return (
    <Grid component="label" container alignItems="center" spacing={1}>

      <Grid item>{labelRight}</Grid>
      <Grid item>
        <Switch onChange={() => handleLocationSwitch()} />
      </Grid>
      <Grid item>{labelLeft}</Grid>
    </Grid>
  );
};
export default CustomSwitch;
