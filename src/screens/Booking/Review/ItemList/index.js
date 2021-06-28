import React, { useState } from "react";
import { Text, Loading } from "components";
import images from "assets";
import Image from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import * as RootNavigation from "navigations/RootNavigation";
import { findExtraEdit } from "../helper";
import Service from "./Service";
import Product from "./Product";
import styles from "./styles";

export default function index(props) {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const staff_by_merchant = useSelector((state) => state.staffReducer.staff_by_merchant);
  const token = useSelector((state) => state.datalocalReducer.token);
  const appointment_detail_customer = useSelector(
    (state) => state.appointmentReducer.appointment_detail_customer,
  );
  const { isDisabled } = appointment_detail_customer;
  const bookingReducer = useSelector((state) => state.bookingReducer);
  const { appointmentId } = appointment_detail_customer ? appointment_detail_customer : "";
  const { services = [], products = [], extras = [], isEditAppointment } = props;
  const services_store = useSelector((state) => state.appointmentReducer.services);

  const deleteItemFromServer = (body, item) => {
    setLoading(true);
    dispatch(
      actions.appointmentAction.removeItem(
        appointmentId,
        body,
        token,
        item,
        deleteItemSuccess(item),
      ),
    );
  };

  const deleteItemSuccess = (item) => {
    setLoading(false);
    if (item && item.serviceId) {
      dispatch(actions.bookingAction.deleteServiceSuccess(item));
    }
    if (item && item.productId) {
      dispatch(actions.bookingAction.deleteProductSuccess(item));
    }
  };

  const deleteItem = (item, type) => {
    switch (type) {
      case "service":
        if (!isEditAppointment) {
          dispatch(actions.bookingAction.deleteService(item));
        } else {
          const body = {
            services: [item],
            products: [],
            extras: [],
          };
          deleteItemFromServer(body, item);
        }
        break;

      case "product":
        if (!isEditAppointment) {
          dispatch(actions.bookingAction.deleteProduct(item));
        } else {
          const body = {
            services: [],
            products: [item],
            extras: [],
          };
          deleteItemFromServer(body, item);
        }
        break;

      default:
        break;
    }
  };

  /* navigate to Select Service, Extra  */
  const editExtra = (sv) => {
    const extrasOfService = isEditAppointment
      ? findExtraEdit(sv, bookingReducer.extras, services_store)
      : bookingReducer.extras.filter((ex) => ex.serviceId === sv.serviceId);

    let item = isEditAppointment
      ? services_store.find((obj) => obj.serviceId === sv.serviceId)
      : sv;

    dispatch(actions.bookingAction.setReview(true));
    RootNavigation.navigate("ItemAppointment", { item, extrasOfService });
  };

  function renderProducts() {
    let productsMap = !isEditAppointment ? [...products] : products;
    return productsMap.map((pro, index) => {
      const renderImg = pro.imageUrl ? { uri: pro.imageUrl } : images.service_holder;
      return (
        <Product
          key={"product" + pro.productId + Math.random()}
          sv={pro}
          renderImg={renderImg}
          index={index}
          deleteItem={deleteItem}
          isDisabled={isDisabled}
          isEditAppointment={isEditAppointment}
        />
      );
    });
  }

  function renderServices() {
    let servicesMap = !isEditAppointment ? [...services] : services;
    return servicesMap.map((pro, index) => {
      const renderImg = pro.imageUrl
        ? { uri: pro.imageUrl, priority: Image.priority.high }
        : images.service_holder;

      return (
        <Service
          key={"service" + pro.serviceId + Math.random()}
          sv={pro}
          renderImg={renderImg}
          index={index}
          extras={extras}
          editExtra={editExtra}
          staff_by_merchant={staff_by_merchant}
          isEditAppointment={isEditAppointment}
          deleteItem={deleteItem}
          isDisabled={isDisabled}
        />
      );
    });
  }

  return (
    <>
      <Text style={styles.title}>Services & Products</Text>
      {renderServices()}
      {renderProducts()}
      {isLoading && <Loading />}
    </>
  );
}
