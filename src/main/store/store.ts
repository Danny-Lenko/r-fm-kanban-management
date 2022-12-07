import { configureStore } from '@reduxjs/toolkit';
import drawerReducer from '../slices/drawerSlice';
import dataReducer from '../slices/dataSlice';
import modalsReducer from '../slices/modalElsSlice'
// import { apiSlice } from '../../library/common/slices/api/apiSlice';
// import todosReducer from '../../modules/TodosList/todosSlice'
// import deleteModalReducer from '../../library/common/components/DeleteModal/deleteModalSlice';

export const store = configureStore({
   reducer: {
      drawer: drawerReducer,
      data: dataReducer,
      modals: modalsReducer
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
