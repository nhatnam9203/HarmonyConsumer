import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { scaleWidth } from "utils";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { DrawerContent } from "components";
import {
  BottomTabStack,
  FlowAddCard,
  StackReward,
  SettingStack,
  BookAppointmentStack,
} from "navigations";
import {
  AddMoneyExistCardScreen,
  ScanGiftCardScreen,
  AddNewCardScreen,
  Favourites,
  WishList,
  Transactions,
  About,
  DetailGiftCardScreen,
  DetailTemplateScreen,
  SearchListStoreScreen,
  SelectCreditCardScreen,
  SelectReceiverGiftCardScreen,
  FinalReviewScreen,
  TransactionProcessingScreen,
  TransactionSuccessfulScreen,
  ReceiveGiftCardScreen,
  ClaimGiftSuccessScreen,
  AddPaymentScreen,
  Inbox,
  PayNowScreen,
  InvoiceDetailScreen,
  InvoiceDetailByScan,
  PaymentInvoiceScreen,
  Rating,
  TransactionPayScanSuccess,
} from "screens";

import { Payments } from "screens/Setting/widget";
import PaymentDetail from "../screens/Setting/widget/Payments/PaymentDetail";

const Drawer = createDrawerNavigator();
const MainStack = createStackNavigator();

function DrawerStack() {
  const [isMount, setMount] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setMount(true);
    }, 1);
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="BottomTab"
      drawerStyle={{ width: isMount ? scaleWidth(70) : 0 }}
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="BottomTab" component={BottomTabStack} />
      <Drawer.Screen name="FlowAddCard" component={FlowAddCard} />
      <Drawer.Screen name="StackReward" component={StackReward} />
      <Drawer.Screen name="Favourites" component={Favourites} />
      <Drawer.Screen name="WishList" component={WishList} />
      <Drawer.Screen name="Transactions" component={Transactions} />
      <Drawer.Screen name="Setting" component={SettingStack} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}

export default function Main() {
  return (
    <MainStack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: false,
      }}>
      <MainStack.Screen name="Drawer" component={DrawerStack} />
      <MainStack.Screen name="AddMoneyExistCard" component={AddMoneyExistCardScreen} />
      <MainStack.Screen name="ScanGiftCard" component={ScanGiftCardScreen} />
      <MainStack.Screen name="AddNewCard" component={AddNewCardScreen} />
      <MainStack.Screen name="DetailTemplate" component={DetailTemplateScreen} />
      <MainStack.Screen name="SearchListStore" component={SearchListStoreScreen} />
      <MainStack.Screen name="SelectCreditCard" component={SelectCreditCardScreen} />
      <MainStack.Screen name="FinalReview" component={FinalReviewScreen} />
      <MainStack.Screen name="ReceiveGiftCard" component={ReceiveGiftCardScreen} />
      <MainStack.Screen name="ClaimGiftSuccess" component={ClaimGiftSuccessScreen} />
      <MainStack.Screen name="AddPayment" component={AddPaymentScreen} />
      <MainStack.Screen name="Inbox" component={Inbox} />
      <MainStack.Screen
        options={{ gestureEnabled: false }}
        name="TransactionProcessing"
        component={TransactionProcessingScreen}
      />
      <MainStack.Screen name="TransactionSuccessful" component={TransactionSuccessfulScreen} />
      <MainStack.Screen name="TransactionPayScanSuccess" component={TransactionPayScanSuccess} />

      <MainStack.Screen
        name="DetailGiftCard"
        component={DetailGiftCardScreen}
        initialParams={{
          title: "My Card",
          iconLeft: true,
          iconRight: false,
        }}
      />
      <MainStack.Screen
        options={{ gestureEnabled: false }}
        name="BookAppointmentStack"
        component={BookAppointmentStack}
      />
      <MainStack.Screen name="SelectReceiverGiftCard" component={SelectReceiverGiftCardScreen} />
      <MainStack.Screen name="PayNow" component={PayNowScreen} />
      <MainStack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} />
      <MainStack.Screen name="InvoiceDetailByScan" component={InvoiceDetailByScan} />
      <MainStack.Screen name="PaymentInvoice" component={PaymentInvoiceScreen} />
      <MainStack.Screen name="Payments" component={Payments} />
      <MainStack.Screen name="PaymentDetail" component={PaymentDetail} />
      <MainStack.Screen name="Rating" component={Rating} />
    </MainStack.Navigator>
  );
}
