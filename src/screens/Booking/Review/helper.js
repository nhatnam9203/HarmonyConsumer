export const totalDuration = (services, extras) => {
  let total = 0;
  for (let i = 0; i < services.length; i++) {
    total += services[i].duration;
  }
  for (let i = 0; i < extras.length; i++) {
    total += extras[i].duration;
  }
  return total;
};

//extras : tras của booking,
//extrasOfService : tìm extra của service onPress
export const findExtraEdit = (sv, extras, services_store) => {
  let extrasOfService = extras.filter(
    (ex) =>
      (ex.bookingServiceId === sv.bookingServiceId || ex.serviceId === sv.serviceId) && ex.isCheck,
  );

  let item = services_store.find((obj) => obj.serviceId === sv.serviceId);
  let extras_edit = [];

  if (item) {
    extras_edit = item.extras;

    for (let i = 0; i < item.extras.length; i++) {
      const index = extrasOfService.findIndex((obj) => obj.extraId === item.extras[i].extraId);
      if (index !== -1) {
        extras_edit[i].isCheck = true;
      } else {
        extras_edit[i].isCheck = false;
      }
      extras_edit[i].serviceId = item.serviceId;
    }
  }
  return extras_edit;
};

export const adapterExtrasEdit = (extras = []) => {
  let tempArr = extras;
  for (let i = 0; i < extras.length; i++) {
    if (extras[i].isCheck) {
      tempArr[i].status = 1;
    } else {
      tempArr[i].status = 2;
    }
  }
  return tempArr;
};

export const notesEdit = (notesAppointment = [], noteEdit = "") => {
  let arrTemp = [];
  if (noteEdit.toString().trim() == "") {
    arrTemp = notesAppointment;
  } else {
    arrTemp = [
      ...notesAppointment,
      {
        appointmentNoteId: 0,
        note: noteEdit,
      },
    ];
  }
  return arrTemp;
};
