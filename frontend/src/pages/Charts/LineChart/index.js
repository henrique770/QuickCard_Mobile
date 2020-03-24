import React from 'react';
import {LineChart, Grid} from 'react-native-svg-charts';
import {View} from 'react-native';

import * as S from '~/styles/global';

export default function LineChartScreen() {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  return (
    <>
      <S.Container white>
        <View style={{flex: 1, justifyContent: 'center', padding: 30}}>
          <LineChart
            style={{height: 400}}
            data={data}
            svg={{stroke: 'rgb(134, 65, 244)'}}
            contentInset={{top: 20, bottom: 20}}>
            <Grid />
          </LineChart>
        </View>
      </S.Container>
    </>
  );
}
