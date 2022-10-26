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

export const DeleteAccountButton = ({}) => {
  const dispatch = useDispatch();
  const { userInfoLogin } = useSelector(state => state.authReducer);
  const token = useSelector(state => state.datalocalReducer.token);

  const [isShowConfirm, setShowConfirm] = React.useState(false);
  const [isLoading, setShowLoading] = React.useState(false);

  const [deleteUser, { loading: deleteUserLoading }] = useQueryCallback(
    harmonyApi.useDeleteUserAccountMutation,
    result => {
      const { data } = result;
      if (data) {
        setShowConfirm(false);

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
    setShowConfirm(true);
  };

  const _onHandleDeleteAccount = () => {
    setShowLoading(true);
    deleteUser(userInfoLogin?.userId);
  };

  const _onHandleCloseConfirmModal = () => {
    setShowConfirm(false);
    setShowLoading(false);
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          height: scaleHeight(80),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: scaleWidth(300),
            height: scaleHeight(48),
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scaleWidth(3),
            backgroundColor: '#ED5241',
            borderColor: '#f44',
            borderWidth: 1,
          }}
          onPress={_onHandleDeleteAccountConfirm}>
          <Text
            style={{
              fontSize: scaleFont(18),
              color: 'white',
              fontWeight: '600',
            }}>{`Delete My Account`}</Text>
        </TouchableOpacity>
      </View>
      <ModalConfirmDelete
        isVisible={isShowConfirm}
        onForceClose={_onHandleCloseConfirmModal}
        onDeleteAccount={_onHandleDeleteAccount}
      />
      {/* {isLoading && (
        <View
          style={{
            position: 'absolute',
            opacity: 1,
            zIndex: 10000,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          <ActivityIndicator size={'large'} color="white" />
        </View>
      )} */}
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

  const _onHandleTypeConfirm = textChange => {
    setConfirmText(textChange);
  };

  const _isCanDelete = React.useMemo(() => {
    return confirmText === TEXT_CONFIRM;
  }, [confirmText]);

  const _onResetModal = () => {
    setConfirmText(null);
  };

  const _onHandleClose = () => {
    _onResetModal();
    if (onForceClose && typeof onForceClose === 'function') {
      onForceClose();
    }
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
        <View
          style={{
            width: scaleWidth(360),
            minHeight: scaleHeight(300),
            backgroundColor: 'white',
            borderRadius: scaleWidth(3),
            padding: scaleWidth(10),
          }}>
          <View
            style={{
              height: scaleHeight(40),
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: scaleFont(24), color: '#4d4d4d' }}>
              Delete Account
            </Text>
            <TouchableOpacity
              style={{
                height: scaleWidth(36),
                width: scaleWidth(36),
                backgroundColor: '#6d6d6d',
                borderRadius: scaleWidth(18),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={_onHandleClose}>
              <Image
                source={ICONS.close_header}
                style={{
                  width: scaleWidth(18),
                  height: scaleWidth(18),
                  tintColor: '#fff',
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#ddd',
              marginVertical: scaleHeight(10),
            }}
          />
          <Text
            style={
              styles.textFont
            }>{`Are you sure you want to delete your account? If you delete your account, you will permanently lose `}</Text>
          <View
            style={{
              height: scaleHeight(5),
              width: '100%',
            }}
          />
          <Text style={styles.textFont}>{`    - Profile`}</Text>
          <Text style={styles.textFont}>{`    - Appointments`}</Text>
          <Text style={styles.textFont}>{`    - User card`}</Text>
          <View
            style={{
              height: scaleHeight(15),
              width: '100%',
            }}
          />
          <Text style={{ fontSize: scaleFont(12), color: '#6d6d6d' }}>
            Type DELETE, to confirm this
          </Text>

          <View
            style={{
              height: scaleHeight(50),
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: scaleWidth(5),
            }}>
            <View style={{ flex: 1, marginRight: scaleWidth(20) }}>
              <View
                style={{
                  flex: 1,
                  borderColor: '#646464',
                  borderWidth: 1,
                  borderRadius: scaleWidth(3),
                  paddingVertical: scaleHeight(2),
                  paddingHorizontal: scaleHeight(5),
                }}>
                <TextInput
                  style={{
                    fontSize: scaleFont(16),
                    fontWeight: '600',
                    flex: 1,
                    paddingVertical: scaleWidth(10),
                    color: '#646464',
                  }}
                  value={confirmText}
                  onChangeText={_onHandleTypeConfirm}
                />
              </View>
            </View>

            <TouchableOpacity
              style={{
                width: scaleWidth(80),
                height: scaleHeight(44),
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: scaleWidth(3),
                backgroundColor: _isCanDelete ? '#dd3030' : '#ef6f6f',
                borderColor: '#ee6e6e',
                borderWidth: 1,
              }}
              disabled={!_isCanDelete}
              onPress={_onHandleDeleteAccount}>
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
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textFont: {
    fontSize: scaleFont(18),
    color: '#666',
  },
});
