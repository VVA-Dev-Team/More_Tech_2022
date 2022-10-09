import { configureStore } from '@reduxjs/toolkit'
import adminReducer from './admin.reducer';
import corpReducer from './corp.reducer';

import mapReducer from './map.reducer';
import userReducer from './user.reducer';

export default configureStore({
    reducer: {
        mapData: mapReducer,
        adminData: adminReducer,
        corpData: corpReducer,
        userData: userReducer
    }
})