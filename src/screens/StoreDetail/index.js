import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, Animated, Dimensions } from "react-native";
import styles from "./styles";
import { scaleHeight, scaleWidth, scaleSize } from "utils";
import { Banner, StoreInfo, Search, PopupCall } from "./widget";
import { useDispatch, useSelector } from "react-redux";
import actions from "@redux/actions";
import Content from "./widget/Content";
import TopComponent from "./widget/TopComponent";
import { StoreProvider } from "./widget/context";
import { Modalize } from "react-native-modalize";
import { FocusAwareStatusBar } from "components";
import { isEmpty } from "lodash";

const { height } = Dimensions.get("window");

export default function index(props) {
  const dispatch = useDispatch();

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollListView = useRef(null);
  const refCategory = useRef(null);
  const refModalCall = useRef(null);
  const translateY_listTime = useRef(new Animated.Value(scaleHeight(0))).current;
  const translateY_ItemList = useRef(new Animated.Value(scaleHeight(0))).current;

  const token = useSelector((state) => state.datalocalReducer.token);
  const merchant = useSelector((state) => state.storeReducer.merchant_detail);
  const maxPage = useSelector((state) => state.storeReducer.maxPage);
  const bookingReducer = useSelector((state) => state.bookingReducer);
  const { isEditAppointment, isAddmore } = bookingReducer;
  const appointmentReducer = useSelector((state) => state.appointmentReducer);
  const { category } = appointmentReducer;
  const category_products = category.filter((obj) => obj.categoryType === "Product");

  const [tabActive, setTabActive] = useState("Services");
  const [isOpenListTime, setOpenListTime] = useState(false);
  const [isScrollY, setScrollY] = useState(false);
  const [measureServiceList, setMeasureServiceList] = useState([]);
  const [measureCategoryList, setMeasureCategoryList] = useState([]);
  const [refreshService, setRefreshService] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoadingCategory, setLoadingCategory] = useState(false);
  const [isLoadingService, setLoadingService] = useState(false);
  const [isDisableScroll, setScrollList] = useState(false);
  const [isActiveCategory, setActiveCategory] = useState(0);

  const [direction, setDirection] = useState("down");
  const [offsetDirection, setOffsetDirection] = useState(0);
  const [isScrollHorizontal, setScrollHorizontal] = useState(false);
  const [isScollBottom, setBottomListView] = useState(true);
  const [isBottom, setBottom] = useState(true);

  const [pageReview, setPageReview] = React.useState(1);
  const [isLoadMoreReview, setLoadMoreReview] = React.useState(false);

  const { merchantId } = props.route.params;

  const actionSetBottom = React.useCallback(
    (status) => {
      if (status !== isBottom) {
        setBottom(status);
      }
    },
    [isBottom],
  );

  const setIsBottom = React.useCallback(
    (status) => {
      if (status !== isScollBottom) {
        setBottomListView(status);
      }
    },
    [isScollBottom],
  );

  const activeIndexCategory = React.useCallback(
    (i) => {
      setActiveCategory(i);
    },
    [isActiveCategory],
  );

  const onSelectDirection = React.useCallback(
    (direct) => {
      setDirection(direct);
    },
    [direction],
  );

  const onChangeScrollHorizontal = React.useCallback(
    (status) => {
      setScrollHorizontal(status);
    },
    [isScrollHorizontal],
  );

  const openModalCall = (tel) => {
    refModalCall.current.open();
    setPhoneNumber(tel);
  };

  const closeModalCall = () => {
    refModalCall.current?.close();
  };

  const allowScroll = (e) => {
    updateLoadmoreReview(e);
    if (isDisableScroll === false) {
      setScrollList(true);
    }
  };

  const denyScroll = () => {
    if (isDisableScroll === true) {
      setScrollList(false);
    }
  };

  const setActiveTab = (tabName) => {
    if (isScollBottom) {
      setTabActive(tabName);
      return;
    }
    refCategory.current?.scrollTo({ x: 0, animated: true });
    const item = measureCategoryList[0];
    if (item) pickFirstCategory(item);

    setTimeout(() => {
      setTabActive(tabName);
      if (item) pickFirstCategory(item);
      scrollTabActive();
    }, 200);
  };

  const pickFirstCategory = (item) => {
    if (height < 750) {
      scrollListView.current.scrollTo({
        y:
          item.y +
          scaleWidth(32) +
          scaleHeight(7.5) +
          (isOpenListTime ? scaleHeight(5.5) + scaleWidth(10) : 0),
        animated: true,
      });
    } else if (height < 820) {
      scrollListView.current.scrollTo({
        y:
          height < 800
            ? item.y +
              scaleWidth(30) +
              scaleHeight(9.5) +
              (isOpenListTime ? scaleHeight(8) + scaleWidth(20) : 0)
            : item.y +
              scaleWidth(25) +
              scaleHeight(9.5) +
              (isOpenListTime ? scaleHeight(8) + scaleWidth(20) : 0),
        animated: true,
      });
    } else {
      scrollListView.current.scrollTo({
        y:
          item.y +
          scaleWidth(32) +
          scaleHeight(11) +
          (isOpenListTime ? scaleHeight(5.5) + scaleWidth(20) : 0),
        animated: true,
      });
    }
  };

  const scrollTabActive = () => {
    const item = measureServiceList[0] ? measureServiceList[0] : null;
    if (item) {
      denyScroll();
      activeIndexCategory(0);
    }
  };

  const measureCategory = (e, cate, index) => {
    const { x, y, width } = e.nativeEvent.layout;
    let _list = measureCategoryList;
    const obj = {
      x,
      y,
      index,
      width,
      category: cate,
    };
    _list[index] = obj;
    setMeasureCategoryList(_list);
  };

  const updateMeasureServiceProduct = React.useCallback(
    (e, index, item, type) => {
      if (type === "service") {
        const { x, y } = e.nativeEvent.layout;
        const obj = {
          x,
          y,
          index,
          item,
        };
        measureServiceList[index] = obj;
        setMeasureServiceList(measureServiceList);
      }
    },
    [measureServiceList],
  );

  const onSelectFirstCategory = (item) => {
    if (height < 750) {
      scrollListView.current.scrollTo({
        y:
          item.y +
          scaleWidth(32) +
          scaleHeight(4.8) +
          (isOpenListTime ? scaleHeight(7) + scaleWidth(10) : 0),
        animated: true,
      });
    } else if (height < 820) {
      scrollListView.current.scrollTo({
        y:
          height < 800
            ? item.y +
              scaleWidth(30) +
              scaleHeight(6.8) +
              (isOpenListTime ? scaleHeight(9.5) + scaleWidth(20) : 0)
            : item.y +
              scaleWidth(25) +
              scaleHeight(6.8) +
              (isOpenListTime ? scaleHeight(9.5) + scaleWidth(20) : 0),
        animated: true,
      });
    } else {
      scrollListView.current.scrollTo({
        y:
          item.y +
          scaleWidth(32) +
          scaleHeight(8.5) +
          (isOpenListTime ? scaleHeight(7) + scaleWidth(20) : 0),
        animated: true,
      });
    }
  };

  const selectCategory = (item) => {
    if (height < 750) {
      scrollListView.current.scrollTo({
        y:
          item.y +
          scaleSize(55) +
          scaleHeight(6.8) +
          (isOpenListTime ? scaleHeight(8) + scaleWidth(30) : 0),
        animated: true,
      });
    } else if (height < 820) {
      scrollListView.current.scrollTo({
        y:
          item.y +
          scaleSize(55) +
          scaleHeight(6.8) +
          (isOpenListTime ? scaleHeight(10) + scaleWidth(35) : 0),
        animated: true,
      });
    } else {
      scrollListView.current.scrollTo({
        y:
          item.y +
          scaleSize(64) +
          scaleHeight(6.8) +
          (isOpenListTime ? scaleHeight(10) + scaleWidth(35) : 0),
        animated: true,
      });
    }
  };

  const onSelectCategory = (index, cate) => {
    const item = measureServiceList.find((obj) => obj.item.categoryId === cate.categoryId);
    const itemCategory = measureCategoryList.find(
      (obj) => obj.category.categoryId == cate.categoryId,
    );
    denyScroll();
    onChangeScrollHorizontal(true);
    if (item) {
      if (index === 0) {
        onSelectFirstCategory(item);
      } else {
        selectCategory(item);
      }
    }
    if (itemCategory) {
      refCategory.current?.scrollTo({ x: itemCategory.x - scaleWidth(4), animated: true });
    }
  };

  const slideDownListTime = (isOpen) => {
    Animated.parallel([
      Animated.timing(translateY_listTime, {
        toValue: isOpen ? scaleHeight(32) : scaleHeight(0),
        duration: 260,
      }),
      Animated.timing(translateY_ItemList, {
        toValue: isOpen ? scaleHeight(25) : 0,
        duration: 300,
      }),
    ]).start();
  };

  const scrollHorizontalMenu = (y_coordinate, prevY, nextY, index) => {
    let temp = measureServiceList;
    let y = y_coordinate - scaleHeight(10) - (isOpenListTime ? scaleHeight(20) : 0);
    if (y > prevY && y < nextY) {
      if (isDisableScroll) {
        const { categoryId } = temp[index - 1].item;
        const cate = measureCategoryList.find((obj) => obj.category.categoryId === categoryId);
        cate && refCategory.current?.scrollTo({ x: cate.x });
        if (index == 1) {
          checkActiveCategory(0);
        } else {
          checkActiveCategory(cate.index);
        }
      }
    }
  };

  const scrollToCategory = (y) => {
    if (!isScrollHorizontal) {
      let temp = measureServiceList;
      if (temp.length > 0) {
        const length = temp.length; // số phần tử services
        if (y > temp[length - 1].y && isDisableScroll) {
          //nếu y > toa dộ y phần tử cuối cùng thì active lên
          if (isActiveCategory !== temp[length - 1].index) {
            activeIndexCategory(temp.length - 1); // nếu chưa active thì active
          }
        } else if (y <= temp[length - 1].y && isDisableScroll) {
          //nếu y <= toa dộ y phần tử trước đó
          //thì duyệt cac phần tử services
          /* **************** */
          for (let i = 1; i < length; i++) {
            const prevY = temp[i - 1].y;
            const nextY = temp[i].y;
            scrollHorizontalMenu(y, prevY, nextY, i);
          }
        }
      }
    }
  };

  const checkActiveCategory = (index) => {
    if (index !== isActiveCategory) {
      if (tabActive === "Products" && index < category_products.length) {
        activeIndexCategory(index);
      } else if (tabActive === "Services") {
        activeIndexCategory(index);
      }
    }
  };

  const getReviews = () => {
    dispatch(actions.storeAction.getRatingMerchant(merchantId, 1, token, () => {}));
    dispatch(actions.storeAction.getSummaryMerchant(merchantId, token));
  };

  const getServicesProducts = () => {
    setLoadingCategory(true);
    setLoadingService(true);
    dispatch(actions.appointmentAction.getCategoryByStore(merchantId, token, setLoadingCategory));
    dispatch(actions.appointmentAction.getServiceByStore(merchantId, token, setLoadingService));
    dispatch(actions.appointmentAction.getProductByStore(merchantId, token));
  };

  useEffect(() => {
    if (merchantId && merchantId !== 0) {
      dispatch({ type: "START_FETCH_API" });
      getServicesProducts();
      getReviews();
      setTimeout(() => {
        dispatch(actions.staffAction.staffGetByMerchant(merchantId, token));
      }, 1000);
    }
  }, [merchantId]);

  const handleEndDragListTime = (offset) => {
    if (offset < scaleHeight(24.25) + scaleHeight(7) + scaleWidth(26)) {
      if (direction == "up") {
        scrollListView.current.scrollTo({ y: 0, animated: true });
      } else {
        if (height < 750) {
          scrollListView.current.scrollTo({
            y:
              scaleWidth(31) +
              scaleHeight(6.8) +
              (isOpenListTime ? scaleHeight(5) + scaleWidth(20) : 0),
            animated: true,
          });
        } else if (height < 780) {
          scrollListView.current.scrollTo({
            y:
              scaleWidth(31) +
              scaleHeight(6.8) +
              (isOpenListTime ? scaleHeight(7) + scaleWidth(26) : 0),
            animated: true,
          });
        } else {
          scrollListView.current.scrollTo({
            y:
              scaleWidth(38) +
              scaleHeight(6.8) +
              (isOpenListTime ? scaleHeight(7) + scaleWidth(26) : 0),
            animated: true,
          });
        }
      }
    }
  };

  const handleEndDrag = (offset) => {
    if (isOpenListTime) {
      handleEndDragListTime(offset);
      return;
    }
    if (offset < scaleHeight(24.25)) {
      if (direction == "up") {
        scrollListView.current.scrollTo({ y: 0, animated: true });
      } else {
        if (height < 750) {
          scrollListView.current.scrollTo({
            y: scaleWidth(30) + scaleHeight(6.8),
            animated: true,
          });
        }
        if (height < 780) {
          scrollListView.current.scrollTo({
            y: scaleWidth(33) + scaleHeight(7.8),
            animated: true,
          });
        } else {
          scrollListView.current.scrollTo({
            y: scaleWidth(38) + scaleHeight(6.8),
            animated: true,
          });
        }
      }
    }
  };

  const updateLoadmoreReview = async (e) => {
    const scrollPosition = e.nativeEvent.contentOffset.y;
    const scrollViewHeight = e.nativeEvent.layoutMeasurement.height;
    const contentHeight = e.nativeEvent.contentSize.height;
    const isScrolledToBottom = scrollViewHeight + scrollPosition;
    if (isScrolledToBottom >= contentHeight - 50) {
      if (tabActive == "Reviews") {
        if (pageReview < maxPage) callApiLoadMoreReviews();
      }
    }
  };

  const callApiLoadMoreReviews = () => {
    setLoadMoreReview(true);
    dispatch(
      actions.storeAction.getRatingMerchant(merchantId, pageReview + 1, token, stopLoadMoreReview),
    );
  };

  const stopLoadMoreReview = (status) => {
    setLoadMoreReview(false);
    if (status) {
      updatePageReview();
    }
  };

  const updatePageReview = () => {
    setPageReview(pageReview + 1);
  };

  return (
    <StoreProvider
      value={{
        onSelectCategory,
        refreshService,
        setRefreshService,
        isLoadingCategory,
        isLoadingService,
        refCategory,
        isActive: isActiveCategory,
        setActive: activeIndexCategory,
      }}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="transparent" />
      <View style={styles.container}>
        <Search
          idEditAppointment={isEditAppointment}
          merchant={merchant}
          tabActive={tabActive}
          setTabActive={setActiveTab}
          scrollY={scrollY}
          translateY_listTime={translateY_listTime}
          isOpenListTime={isOpenListTime}
          isScrollY={isScrollY}
          measureCategory={measureCategory}
          isAddmore={isAddmore}
        />
        <ScrollView
          scrollEventThrottle={16}
          // scrollEnabled={!isOpenListTime}
          onMomentumScrollEnd={allowScroll}
          ref={scrollListView}
          showsVerticalScrollIndicator={false}
          onScrollBeginDrag={() => {
            onChangeScrollHorizontal(false);
          }}
          onScrollEndDrag={(e) => {
            const offset = e.nativeEvent.contentOffset.y;
            handleEndDrag(offset);
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: scrollY,
                  },
                },
              },
            ],
            {
              // useNativeDriver: false,
              listener: (event) => {
                const currentOffset = event.nativeEvent.contentOffset.y;
                var direction = currentOffset > offsetDirection ? "down" : "up";
                setOffsetDirection(currentOffset);
                onSelectDirection(direction);

                const offsetY = event.nativeEvent.contentOffset.y;

                if (offsetY < scaleHeight(24.5) && offsetY > scaleHeight(23)) {
                  if (direction == "up") {
                    actionSetBottom(true);
                  } else {
                    actionSetBottom(false);
                  }
                }

                if (offsetY == 0) {
                  setIsBottom(true);
                } else {
                  setIsBottom(false);
                }
                scrollToCategory(offsetY);
              },
            },
          )}
          stickyHeaderIndices={[1]}
          bounces={false}>
          <Banner scrollY={scrollY} />
          <StoreInfo
            animatedTranslateY_ListTime={slideDownListTime}
            merchant={merchant}
            scrollY={scrollY}
            isOpenListTime={isOpenListTime}
            setOpenListTime={setOpenListTime}
            setScrollY={setScrollY}
            openModalCall={openModalCall}
            isScollBottom={isScollBottom}
            isBottom={isBottom}
          />
          <TopComponent
            scrollY={scrollY}
            tabActive={tabActive}
            setTabActive={setActiveTab}
            translateY_listTime={translateY_listTime}
            isOpenListTime={isOpenListTime}
            isScrollY={isScrollY}
            measureCategory={measureCategory}
            isBottom
            onSelectCategory={onSelectCategory}
          />
          <Content
            tabActive={tabActive}
            isLoadingCategory={isLoadingCategory}
            isLoadingService={isLoadingService}
            isLoadMoreReview={isLoadMoreReview}
            translateY_listTime={translateY_ItemList}
            maxPage={maxPage}
            pageReview={pageReview}
            updateMeasureServiceProduct={updateMeasureServiceProduct}
          />
          {/* <View style={{ height: scaleHeight(40) }} /> */}
        </ScrollView>
        <Modalize ref={refModalCall} adjustToContentHeight onBackButtonPress={closeModalCall}>
          <PopupCall closeModalCall={closeModalCall} phoneNumber={phoneNumber} />
        </Modalize>
      </View>
    </StoreProvider>
  );
}
