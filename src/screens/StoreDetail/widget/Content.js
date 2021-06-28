import React from "react";
import { Animated } from "react-native";
import Services from "./Services";
import Review from "./Review";
import GoogleReview from "./GoogleReview";
import { useSelector } from "react-redux";

function Content(props) {
  const {
    tabActive,
    translateY_listTime,
    updateMeasureServiceProduct,
    isLoadingCategory,
    isLoadingService,
    isLoadMoreReview,
    maxPage,
    pageReview,
  } = props;

  const appointmentReducer = useSelector((state) => state.appointmentReducer);
  const { services, products, category } = appointmentReducer;
  const category_services = category.filter((obj) => obj.categoryType === "Service");
  const category_products = category.filter((obj) => obj.categoryType === "Product");

  function renderContent() {
    switch (tabActive) {
      case "Services":
        return (
          <Services
            updateMeasureServiceProduct={updateMeasureServiceProduct}
            services={services}
            category={category_services}
            isLoadingCategory={isLoadingCategory}
            isLoadingService={isLoadingService}
            tabActive={tabActive}
          />
        );
      case "Products":
        return (
          <Services
            updateMeasureServiceProduct={updateMeasureServiceProduct}
            products={products}
            category={category_products}
            isLoadingCategory={isLoadingCategory}
            isLoadingService={isLoadingService}
            tabActive={tabActive}
          />
        );
      case "Reviews":
        return (
          <Review maxPage={maxPage} pageReview={pageReview} isLoadMoreReview={isLoadMoreReview} />
        );
      case "Google reviews":
        return <GoogleReview />;

      default:
        break;
    }

    return null;
  }

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: translateY_listTime,
          },
        ],
      }}>
      {renderContent()}
    </Animated.View>
  );
}

export default React.memo(Content);
