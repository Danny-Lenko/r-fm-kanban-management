import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '../../library/common/components/Drawer/drawerSlice';
// import { apiSlice } from '../../library/common/slices/api/apiSlice';
// import todosReducer from '../../modules/TodosList/todosSlice'
// import deleteModalReducer from '../../library/common/components/DeleteModal/deleteModalSlice';

export const store = configureStore({
   reducer: {
      drawer: drawerReducer
   }
      //     todos: todosReducer,
      //     deleteModal: deleteModalReducer,
      //     [apiSlice.reducerPath]: apiSlice.reducer,
      //   },
      //   middleware: (getDefaultMiddleware) => {
      //     return getDefaultMiddleware().concat(apiSlice.middleware);
      //   },
   });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
