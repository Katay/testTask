import { configureStore } from '@reduxjs/toolkit'

import videoReducer from './video/reducer'

export const store = configureStore({
  reducer: {
    video: videoReducer,
  }
})
