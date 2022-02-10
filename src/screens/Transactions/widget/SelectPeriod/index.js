import React from 'react';
import { View, ScrollView } from 'react-native';
import { scaleWidth, scaleHeight, isValidDate } from 'utils';
import { Header } from 'components';
import styles from '../../styles';
import images from 'assets';
import DateRange from './DateRange';
import CalendarView from './CalendarView';
import InputDate from './InputDate';
import moment from 'moment';
import { Modalize } from 'react-native-modalize';
import ModalSelectDay from './ModalSelectDay';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

export default function index(props) {
  const dispatch = useDispatch();

  const refModalFilter = React.useRef(null);
  const refPopupFilter = React.useRef(null);
  const refCalendar = React.useRef(null);

  const [days, setDays] = React.useState('Last 30 days');

  const [startTime, setStartTime] = React.useState(
    moment().clone().subtract('days', 30).format('MM/DD/YYYY'),
  );
  const [endTime, setEndTime] = React.useState(
    moment().clone().format('MM/DD/YYYY'),
  );
  const [markedDates, setMarkedDates] = React.useState([]);
  const [errorStartTime, setErrorStartTime] = React.useState('');
  const [errorEndTime, setErrorEndTime] = React.useState('');
  const [optionSelect, setOptionSelect] = React.useState('selectStartTime');

  const refreshError = () => {
    setErrorStartTime('');
    setErrorEndTime('');
  };

  const onChangeStartTime = value => {
    setStartTime(value);
    setErrorStartTime('');
  };

  const onChangeEndTime = value => {
    setEndTime(value);
    setErrorEndTime('');
  };

  const countDiffStartTime = day => {
    const diff = moment(endTime, ['MM/DD/YYYY']).diff(
      moment(day, ['MM/DD/YYYY']),
      'days',
    );
    return diff;
  };

  const countDiffEndTime = day => {
    const diff = moment(day, ['MM/DD/YYYY']).diff(
      moment(startTime, ['MM/DD/YYYY']),
      'days',
    );
    return diff;
  };

  const selectDayCalendar = dayPicker => {
    const day = moment(dayPicker, ['YYYY-MM-DD']).format('MM/DD/YYYY');
    if (optionSelect == 'selectStartTime') {
      const diff = countDiffStartTime(day);
      if (diff < 0) {
        setStartTime(endTime);
        setEndTime(day);
        setOptionSelect('selectStartTime');
        setErrorEndTime('');
        setDays('Custom');
      } else {
        setStartTime(day);
        setOptionSelect('selectEndTime');
        setErrorStartTime('');
        setDays('Custom');
      }
    } else {
      const diff = countDiffEndTime(day);
      if (diff < 0) {
        setEndTime(startTime);
        setStartTime(day);
        setOptionSelect('selectStartTime');
        setErrorEndTime('');
        setDays('Custom');
      } else {
        setEndTime(day);
        setOptionSelect('selectStartTime');
        setErrorEndTime('');
        setDays('Custom');
      }
    }
  };

  React.useEffect(() => {
    if (isValidDate(startTime) && isValidDate(endTime)) getMarkedDates();
  }, [startTime, endTime]);

  const getMarkedDates = async () => {
    const diff = await moment(endTime, ['MM/DD/YYYY']).diff(
      moment(startTime, ['MM/DD/YYYY']),
      'days',
    );
    let arr = {};
    let posStart = 1;
    if (diff > 0) {
      if (days == 'Select days') posStart = 0;
      for (let i = posStart; i <= diff; i++) {
        const day = moment(startTime)
          .add(i, 'days')
          .format('YYYY-MM-DD')
          .toString();
        const obj = {
          selected: true,
          customStyles: {
            container: {
              backgroundColor: '#EDFAFC',
              borderRadius: 0,
              width: '144%',
              zIndex: -1,
            },
            text: {
              color: '#404040',
            },
          },
        };
        arr[day] = obj;
      }
    }
    setMarkedDates(arr);
  };

  const openModalFilter = () => {
    refModalFilter.current?.open();
  };

  const closeModalFilter = () => {
    refModalFilter.current?.close();
  };

  const selectFilter = async data => {
    const { value } = data;
    let startTime, endTime;
    endTime = moment().clone().format('MM/DD/YYYY');

    switch (value) {
      case 'Last 7 days':
        startTime = moment().clone().subtract('days', 7).format('MM/DD/YYYY');
        break;
      case 'Last 30 days':
        startTime = moment().clone().subtract('days', 30).format('MM/DD/YYYY');
        break;
      case 'Last 90 days':
        startTime = moment().clone().subtract('days', 90).format('MM/DD/YYYY');
        break;

      default:
        break;
    }

    setEndTime(endTime);
    setStartTime(startTime);
    setDays(value);
    refreshError();
    setCurrentMonth(endTime);
    closeModalFilter();
  };

  const setCurrentMonth = endTime => {
    if (!refCalendar) return;
    let currentMonth = refCalendar?.current?.header?.props?.month;
    if (currentMonth?.length > 0) {
      currentMonth = moment(currentMonth[0]).format('MM/DD/YYYY');
      const diff = moment(endTime, ['MM/DD/YYYY']).diff(
        moment(currentMonth),
        'months',
      );
      if (diff !== 0) {
        refCalendar?.current?.addMonth(diff);
      }
    }
  };

  const checkValidDate = () => {
    const diff = moment(endTime, ['MM/DD/YYYY']).diff(
      moment(startTime, ['MM/DD/YYYY']),
      'days',
    );
    return diff > 0 ? true : false;
  };

  const acceptChange = () => {
    if (isEmpty(errorStartTime) && isEmpty(errorEndTime)) {
      dispatch({ type: 'START_FETCH_API' });

      props.onChangeStartTime(startTime);
      props.onChangeEndTime(endTime);
      props.cleanTransaction();
      props.goToPage(0);
    }
  };

  const back = () => {
    props.goToPage(0);
  };

  const checkStartTime = () => {
    if (isValidDate(startTime) == false)
      setErrorStartTime('Start time is invalid');
    else if (isValidDate(endTime) == true)
      if (checkValidDate() == false) {
        setErrorStartTime('Start time cannot be greater than End time');
      } else {
        setErrorStartTime('');
      }
  };

  const checkEndTime = () => {
    if (isValidDate(endTime) == false) {
      setErrorEndTime('End time is invalid');
    } else if (isValidDate(startTime) == true)
      if (checkValidDate() == false) {
        setErrorStartTime('Start time cannot be greater than End time');
      } else {
        setErrorStartTime('');
      }
  };

  return (
    <View style={styles.container}>
      <View>
        <View
          style={{ paddingTop: scaleHeight(4), backgroundColor: '#f8f8f8' }}>
          <Header
            onBack={back}
            headerLeft
            headerRight
            iconRight={images.checked}
            styleIconRight={{ width: scaleWidth(4.7), height: scaleWidth(4.7) }}
            onPressRight={acceptChange}
            title="Select Period"
          />
        </View>

        <View
          style={{
            backgroundColor: '#ffffff',
            marginTop: scaleWidth(3),
            padding: scaleWidth(3),
          }}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <DateRange days={days} onPress={openModalFilter} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: scaleHeight(1.5),
              }}>
              <InputDate
                title="Start Date"
                value={startTime}
                onBlur={checkStartTime}
                onChangeText={onChangeStartTime}
                errorText={errorStartTime}
              />
              <InputDate
                title="End Date"
                value={endTime}
                onBlur={checkEndTime}
                onChangeText={onChangeEndTime}
                errorText={errorEndTime}
              />
            </View>
            <CalendarView
              refCalendar={refCalendar}
              startTime={startTime}
              endTime={endTime}
              markedDates={markedDates}
              selectDayCalendar={selectDayCalendar}
            />
          </ScrollView>
        </View>
      </View>

      <Modalize
        ref={refModalFilter}
        adjustToContentHeight
        onBackButtonPress={closeModalFilter}>
        <ModalSelectDay
          selectFilter={selectFilter}
          ref={refPopupFilter}
          closeModal={closeModalFilter}
        />
      </Modalize>
    </View>
  );
}
