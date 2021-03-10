import React, {useCallback} from 'react';
import {StyleSheet, ScrollView, View, TouchableOpacity} from 'react-native';
import PublicText from './PublicText';

import {useMemo} from 'react';
import moment from 'moment';

const OrderSearchTab = ({onSelect}) => {
  const list = useMemo(() => {
    const dateStart = moment().subtract(11, 'months');
    const dateEnd = moment();
    const timeValues = [];
    while (dateEnd.unix() > dateStart.unix()) {
      timeValues.push({
        text: dateEnd.format('YYYY년 MM월'),
        value: dateEnd.format('YYYY-MM'),
      });
      dateEnd.subtract(1, 'month');
    }
    return timeValues;
  }, []);

  const onPress = useCallback(
    (month) => () => {
      onSelect(month);
    },
    [],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {list.map((item) => {
          return (
            <TouchableOpacity
              style={styles.btn}
              key={item.value}
              onPress={onPress(item.value)}>
              <PublicText>{item.text}</PublicText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    padding: 10,
  },
  groupContainer: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default OrderSearchTab;
