import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import images from 'assets';
import Image from 'react-native-fast-image';
import actions from '@redux/actions';
import * as RootNavigationn from 'navigations/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkExtraInCart,
  checkServiceInCart,
  checKProductInCart,
  extrasAdapter,
} from './helper';
import { isEmpty } from 'lodash';

export default function hook(props) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [tempExtras, setExtras] = useState([]);

  const scrollY = useRef(new Animated.Value(0)).current;
  const token = useSelector(state => state.datalocalReducer.token);
  const bookingReducer = useSelector(state => state.bookingReducer);
  const merchant = useSelector(state => state.storeReducer.merchant_detail);

  let {
    services,
    extras,
    products,
    isReview,
    staffId,
    isEditAppointment,
    fromTime,
  } = bookingReducer;

  let isHaveService =
    services.length + extras.length + products.length > 0 ? true : false;
  const { item, extrasOfService } = props.route.params;

  useEffect(() => {
    if (extrasOfService) {
      setExtras(extrasOfService);
    }
  }, [extrasOfService, item.quantity]);

  const plusQty = () => {
    setQty(qty + 1);
  };

  const minusQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const back = () => {
    if (staffId === '') {
      dispatch(actions.bookingAction.resetBooking());
    }
    if (isReview) {
      RootNavigationn.navigate('Review');
      dispatch(actions.bookingAction.setReview(false));
    } else {
      RootNavigationn.back();
    }
  };

  const selectExtra = ext => {
    const { extraId } = ext;
    if (tempExtras?.length < 0) return;
    const index = tempExtras?.findIndex(obj => obj.extraId === extraId);
    if (index === -1) {
      const extraUpdate = [...tempExtras, { ...ext, isCheck: true }];
      setExtras(extraUpdate);
    } else {
      let extraUpdate = [...tempExtras];
      const isExistExtra = extraUpdate[index];
      const newExtra = Object.assign({}, isExistExtra, {
        isCheck: !isExistExtra?.isCheck,
      });
      extraUpdate[index] = newExtra;
      setExtras(extraUpdate);
    }
  };

  const addProductInCart = () => {
    const product = {
      ...item,
      quantity: qty,
      status: 1,
    };
    if (isEditAppointment) {
      products.unshift(product);
    } else {
      products.push(product);
    }
    dispatch(actions.bookingAction.addProduct(products));
  };

  const updateQty = product_update => {
    dispatch(actions.bookingAction.updateQuantityInCart(product_update));
  };

  const addExtraInCart = () => {
    if (tempExtras.length > 0) {
      let tempArr = [];
      for (let i = 0; i < tempExtras.length; i++) {
        if (!checkExtraInCart(extras, tempExtras[i])) {
          let extra = {
            ...tempExtras[i],
            status: 1,
          };
          tempArr.push(extra);
        }
      }
      let _extras = [...extrasAdapter(extras, tempExtras), ...tempArr];
      dispatch(actions.bookingAction.addExtra(_extras));
    }
  };

  const addServiceInCart = item => {
    let service = {
      ...item,
      status: 1,
    };

    let tempServices = [...services];
    if (tempServices.length <= 0 && !service.fromTime) {
      service = Object.assign({}, service, { fromTime: fromTime });
    }
    tempServices.push(service);

    if (isEmpty(staffId) && staffId !== -1 && staffId !== 0) {
      RootNavigationn.navigate('StaffList', { item, tempServices });
      return;
    } else {
      dispatch(actions.bookingAction.addService(tempServices));
    }
  };

  const getStaffList = (serviceId, date = null) => {
    dispatch(
      actions.staffAction.getStaffService(
        token,
        serviceId,
        date,
        merchant.merchantId,
      ),
    );
  };

  const book = item => {
    if (isEditAppointment) {
      dispatch(actions.bookingAction.checkEdit(true));
    }

    /* ADD SERVICE , PRODUCT , EXTRA IN CART */
    if (item.serviceId) {
      addExtraInCart();
      if (!checkServiceInCart(services, item)) {
        addServiceInCart(item);
      }
    } else {
      if (!checKProductInCart(products, item)) {
        addProductInCart(item);
      } else {
        const product = {
          ...item,
          quantity: qty,
        };
        updateQty(product);
      }
    }

    if (item.productId && staffId === '') {
      // assig stasff for appointment only have product
      RootNavigationn.navigate('StaffList', { item, isProduct: true });
      return;
    }

    /* CALCULATE TO NAVIGATE TO ANOTHER SCREEN */
    if (staffId === -1 || staffId === 0 || item.productId) {
      RootNavigationn.navigate('Review'); // add item in waiting list or anystaff
      if (item.serviceId)
        dispatch(
          actions.bookingAction.updateService({
            serviceId: item.serviceId,
            staffId,
          }),
        );
    } else if (isReview) {
      // edit item from review screen
      RootNavigationn.navigate('Review');
      dispatch(actions.bookingAction.setReview(false));
    } else {
      if (item.serviceId) {
        getStaffList(item.serviceId);
      }
      RootNavigationn.navigate('StaffList', { item }); // add item with staff available
    }
  };

  const renderImgItem = item.imageUrl
    ? { uri: item.imageUrl, priority: Image.priority.normal }
    : images.service_holder;

  return [
    scrollY,
    renderImgItem,
    qty,
    plusQty,
    minusQty,
    item,
    selectExtra,
    tempExtras,
    back,
    isHaveService,
    book,
  ];
}
