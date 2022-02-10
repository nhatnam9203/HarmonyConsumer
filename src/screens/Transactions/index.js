import React, { useState } from 'react';
import ScrollTabview from 'components/react-native-scrollable-tab-view';
import { Transaction } from './widget';
import SelectPeriod from './widget/SelectPeriod';
import { View } from 'react-native';
import { FocusAwareStatusBar } from 'components';
import moment from 'moment';

export default function index(props) {
  const transactionRef = React.useRef(null);
  const refScrollTabView = React.useRef(<ScrollTabview />);
  const [start, setStart] = useState(moment().subtract('days', 30));
  const [end, setEnd] = useState(moment());

  const goToPage = page => {
    refScrollTabView.current?.goToPage(page);
  };

  const onChangeStartTime = date => {
    setStart(moment(date));
  };

  const onChangeEndTime = date => {
    setEnd(moment(date));
  };

  const onCleanTransaction = () => {
    transactionRef.current?.reset();
  };

  return (
    <React.Fragment>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <ScrollTabview
        locked={true}
        initialPage={0}
        ref={refScrollTabView}
        prerenderingSiblingsNumber={1}
        renderTabBar={() => <View />}>
        <Transaction
          ref={transactionRef}
          start={start}
          end={end}
          {...props}
          goToPage={goToPage}
        />
        <SelectPeriod
          onChangeStartTime={onChangeStartTime}
          onChangeEndTime={onChangeEndTime}
          start={start}
          end={end}
          {...props}
          goToPage={goToPage}
          cleanTransaction={onCleanTransaction}
        />
      </ScrollTabview>
    </React.Fragment>
  );
}
