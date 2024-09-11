import { atom } from "recoil";
export const customerDataFamily = atom({
  key: "customerDataFamily",
  default: {
    totalCustomers: 0,
    activeCount: 0,
    males: 0,
    females: 0,
    havePhone: 0,
    communicationPreferences: {},
  },
});

