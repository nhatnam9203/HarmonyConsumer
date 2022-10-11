import React from "react";
import { Modal, Button } from "components";
import { View, 
    StyleSheet, 
    FlatList, 
    Dimensions, 
    Text,
    Image
} from "react-native";
import { scaleSize } from "utils";
import ICONS from 'assets';
const { width, height } = Dimensions.get("window");

export const PopupMerchantList = ({onRequestClose, isVisible, merchantList=[]}) => {
    const renderItem = (item) => {
        return (
            <>
                <Text style={styles.textRow}>
                    {item?.item}
                </Text>
                <View style={styles.separatorLine}/>
            </>
        )
    }
    return (
        <Modal
            onRequestClose={onRequestClose} 
            isVisible={isVisible}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Store</Text>
                    <Button onPress={onRequestClose}>
                        <Image 
                        style={styles.closeIcon}
                        source={ICONS.close_header}
                        resizeMode={'center'}
                        />
                    </Button>
                </View>
                <View style={styles.separatorLine}/>
                
                    <FlatList
                        data={merchantList}
                        renderItem={renderItem}
                    />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        backgroundColor: "#FFFF",
        borderRadius: scaleSize(10),
        justifyContent: "center",
        minHeight: scaleSize(400),
        paddingBottom: scaleSize(20)
    },
    textRow: {
      fontSize: scaleSize(17),
      color: "#0764B0",
      margin: scaleSize(15),
      width: '90%'
    },
    header: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        padding: scaleSize(15)
    },
    headerText: {
        fontSize: scaleSize(17),
    },
    closeIcon: {
        width: scaleSize(30),
        height: scaleSize(30),
    },
    separatorLine: {
        height: scaleSize(1),
        backgroundColor: '#bfbfbf',
        marginLeft: scaleSize(10),
        marginRight: scaleSize(10)
    },
})