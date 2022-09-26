import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const getDemoData = createAsyncThunk(
  'demo/getData',
  async (initialData: string) => {
    const res = await axios.post('http://localhost:3000/api/get-demo-data', {
      content: initialData,
    })

    return res.data?.data?.content
  },
)

const demoReducer = createSlice({
  name: 'demo',
  initialState:
    typeof window !== 'undefined'
      ? (window as any)?.context?.state?.demo
      : {
          content: '默认数据',
        },
  // 同步 reducer
  reducers: {},
  // 异步 reducer
  extraReducers(build) {
    build
      .addCase(getDemoData.pending, state => {
        state.content = 'pending'
      })
      .addCase(getDemoData.fulfilled, (state, action) => {
        state.content = action.payload
      })
      .addCase(getDemoData.rejected, state => {
        state.content = 'rejected'
      })
  },
})

export { demoReducer, getDemoData }
