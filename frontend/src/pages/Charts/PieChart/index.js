import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import IconMi from 'react-native-vector-icons/MaterialIcons';
import {PieChart} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
import Spacing from '~/components/Spacing';

import * as S from '~/styles/global';

export default function Charts({navigation}) {
  const data = [50, 10, 20, 20];

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const pieData = data.map((value, index) => ({
    value,
    key: `${index}-${value}`,
    svg: {
      fill: randomColor(),
    },
  }));

  const Label = ({slices}) => {
    return slices.map((slice, index) => {
      const {pieCentroid, data} = slice;
      return (
        <Text
          key={`label-${index}`}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="#fff"
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={16}>
          {data.value}%
        </Text>
      );
    });
  };

  return (
    <>
      <S.InverseBackground>
        <Spacing position="absolute" top="18" right="30">
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconMi name="menu" size={25} color="#f93b10" />
          </TouchableOpacity>
        </Spacing>
        <S.Margin />
        <View style={{flex: 1, justifyContent: 'center', padding: 30}}>
          <PieChart style={{height: 400}} data={pieData}>
            <Label>{data.value}</Label>
          </PieChart>
        </View>
      </S.InverseBackground>
    </>
  );
}
