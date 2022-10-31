import actions from '@redux/actions';
import { harmonyApi, useQueryCallback } from '@shared/services';
import ICONS from 'assets';
import { Modal } from 'components';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const DeleteAccountButton = ({}) => {
  const dispatch = useDispatch();
  const { userInfoLogin } = useSelector(state => state.authReducer);
  const token = useSelector(state => state.datalocalReducer.token);

  const [isShowPopupDelete, setShowPopupDelete] = React.useState(false);

  const [isLoading, setShowLoading] = React.useState(false);

  const [deleteUser, { loading: deleteUserLoading }] = useQueryCallback(
    harmonyApi.useDeleteUserAccountMutation,
    result => {
      const { data } = result;
      if (data) {
        setShowPopupDelete(false);

        dispatch(actions.authAction.logout(token));
        setShowLoading(false);
      } else {
        alert('Delete account error unknown ...');
      }
    },
    error => {
      console.log(error);
      if (error?.message) {
        alert(error?.message);
      }
    },
  );

  const _onHandleDeleteAccountConfirm = () => {
    setShowPopupDelete(true);
  };

  const _onHandleDeleteAccount = () => {
    setShowLoading(true);
    deleteUser(userInfoLogin?.userId);
  };

  const _onHandleCloseConfirmModal = () => {
    setShowPopupDelete(false);
    setShowLoading(false);
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          height: scaleHeight(48),
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
          onPress={_onHandleDeleteAccountConfirm}>
          <Text
            style={{
              fontSize: scaleFont(16),
              color: 'red',
              fontWeight: '500',
            }}>{`Delete My Account`}</Text>
        </TouchableOpacity>
        <AntDesign name="right" size={scaleWidth(18)} color={'red'} />
      </View>
      <ModalConfirmDelete
        isVisible={isShowPopupDelete}
        onForceClose={_onHandleCloseConfirmModal}
        onDeleteAccount={_onHandleDeleteAccount}
      />
    </>
  );
};

const TEXT_CONFIRM = 'DELETE';

export const ModalConfirmDelete = ({
  isVisible,
  onForceClose,
  onDeleteAccount,
}) => {
  const [confirmText, setConfirmText] = React.useState(null);
  const [isShowConfirm, setShowConfirm] = React.useState(false);

  const _onHandleTypeConfirm = textChange => {
    setConfirmText(textChange);
    setShowConfirm(false);
  };

  const _onResetModal = () => {
    setConfirmText(null);
  };

  const _onHandleClose = () => {
    _onResetModal();
    if (onForceClose && typeof onForceClose === 'function') {
      onForceClose();
    }
  };

  const _onHandleConfirmDelete = () => {
    setShowConfirm(true);
  };

  const _onHandleDeleteAccount = () => {
    _onResetModal();
    if (onDeleteAccount && typeof onDeleteAccount === 'function') {
      onDeleteAccount();
    }
  };

  return (
    <Modal onRequestClose={_onHandleClose} isVisible={isVisible}>
      <KeyboardAvoidingView behavior={'position'}>
        <TouchableOpacity
          style={{
            width: screenWidth(),
            height: screenHeight(),
            backgroundColor: 'white',
          }}
          activeOpacity={1}>
          <View
            style={{
              height: scaleHeight(100),
              width: '100%',
              backgroundColor: 'white',
              elevation: 3,
              backgroundColor: '#FFF',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.13,
              shadowRadius: 2.82,
            }}>
            <View style={{ height: scaleHeight(26) }} />
            <View
              style={{
                flex: 1,
                paddingTop: scaleHeight(10),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: scaleWidth(60),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={_onHandleClose}>
                <Image
                  source={ICONS.arrow_back_ios}
                  style={{ height: scaleHeight(20), width: scaleWidth(20) }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: scaleFont(18), color: '#4d4d4d' }}>
                  Delete Account
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  height: '100%',
                  width: scaleWidth(60),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={_onHandleClose}>
                <Text style={{ fontSize: scaleFont(16), color: 'red' }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              paddingTop: scaleHeight(20),
              paddingHorizontal: scaleWidth(10),
            }}>
            <Text
              style={{
                fontSize: scaleFont(18),
                color: '#373737',
                fontWeight: '700',
              }}>{`If you delete your account, you will permanently lose:`}</Text>
            <View
              style={{
                height: scaleHeight(5),
                width: '100%',
              }}
            />
            <Text style={styles.textFont}>{`    - Profile`}</Text>
            <Text style={styles.textFont}>{`    - Appointments`}</Text>
            <Text style={styles.textFont}>{`    - User card`}</Text>
            <View style={{ height: scaleHeight(50) }} />
            <Text
              style={
                styles.textFont
              }>{`Why do you want to delete your account?`}</Text>
            <View
              style={{
                height: scaleHeight(15),
                width: '100%',
              }}
            />
            <View
              style={{
                borderColor: '#BABABA',
                borderWidth: 1,
                borderRadius: scaleWidth(3),
                paddingVertical: scaleHeight(2),
                paddingHorizontal: scaleHeight(5),
              }}>
              <TextInput
                style={{
                  fontSize: scaleFont(18),
                  fontWeight: '500',
                  paddingVertical: scaleWidth(10),
                  color: '#646464',
                  height: scaleHeight(100),
                }}
                value={confirmText}
                onChangeText={_onHandleTypeConfirm}
                multiline
              />
            </View>
          </View>

          <View
            style={{
              height: scaleHeight(150),
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: scaleWidth(5),
            }}>
            <TouchableOpacity
              style={{
                width: scaleWidth(300),
                height: scaleHeight(44),
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: scaleWidth(3),
                backgroundColor: '#ED1C24',
              }}
              onPress={_onHandleConfirmDelete}>
              <Text
                style={{
                  fontSize: scaleFont(16),
                  color: 'white',
                  fontWeight: '500',
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
          {isShowConfirm && (
            <View
              style={{
                position: 'absolute',
                opacity: 1,
                zIndex: 10000,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0004',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}>
              <View
                style={{
                  width: scaleWidth(351),
                  height: scaleHeight(271),
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: scaleWidth(16),
                  paddingHorizontal: scaleWidth(12),
                }}>
                <View style={{ height: scaleHeight(10) }} />
                <Text style={{ fontSize: scaleFont(24), fontWeight: '600' }}>
                  Confirm Delete
                </Text>
                <View style={{ height: scaleHeight(10) }} />

                <Text
                  style={{
                    fontSize: scaleFont(16),
                    fontWeight: '400',
                    textAlign: 'center',
                  }}>
                  Are you sure you want to delete your account?
                </Text>
                <View style={{ height: scaleHeight(10) }} />

                <TouchableOpacity
                  style={{
                    height: scaleHeight(45),
                    width: scaleWidth(288),
                    backgroundColor: '#0764B0',
                    borderRadius: scaleWidth(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={_onHandleDeleteAccount}>
                  <Text
                    style={{
                      fontSize: scaleFont(16),
                      fontWeight: '400',
                      color: 'white',
                      fontWeight: '700',
                    }}>
                    Confirm
                  </Text>
                </TouchableOpacity>
                <View style={{ height: scaleHeight(10) }} />

                <TouchableOpacity
                  style={{
                    height: scaleHeight(45),
                    width: scaleWidth(288),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setShowConfirm(false);
                  }}>
                  <Text
                    style={{
                      fontWeight: '400',
                      color: '#F81F1F',
                      fontWeight: '700',
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <View style={{ height: scaleHeight(10) }} />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textFont: {
    fontSize: scaleFont(16),
    color: '#404040',
    fontWeight: '600',
  },
});
