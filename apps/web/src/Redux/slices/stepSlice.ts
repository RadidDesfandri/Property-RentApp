import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
  name: "step",
  initialState: {
    currentStep: 1,
  },
  reducers: {
    nextStep: (state) => {
      state.currentStep = Math.min(state.currentStep + 1, 3);
    },
    prevStep: (state) => {
      state.currentStep = Math.max(state.currentStep - 1, 1);
    },
    resetStep :(state) =>{
      state.currentStep = 1
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { nextStep, prevStep, setStep, resetStep } = stepSlice.actions;
export default stepSlice.reducer;
