import { atom, selector } from 'recoil';
import Axios from '@hooks/Axios';

export const customerDataFamily = atom({
  key: 'customerDataFamily',
  default: {
    totalCustomers: 0,
    activeCount: 0,
    males: 0,
    females: 0,
    havePhone: 0,
    communicationPreferences: {},
  },
});

export const customerDataSelector = selector({
  key: 'customerDataSelector',
  get: async ({ get }) => {
    try {
      const response = await Axios({
        requestType: 'get',
        url: '/me_customer_info',
      });

      if (response?.status === 200) {
        const data = response?.data?.customer_data || {};
        return {
          totalCustomers: data.totalCustomers || 0,
          activeCount: data.activeCount || 0,
          males: data.males || 0,
          females: data.females || 0,
          havePhone: data.havePhone || 0,
          communicationPreferences: data.communicationPreferences || {},
        };
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
      return {
        totalCustomers: 0,
        activeCount: 0,
        males: 0,
        females: 0,
        havePhone: 0,
        communicationPreferences: {},
      };
    }
  },
  set: ({set}, newValue) => set(customerDataFamily, newValue),

});

