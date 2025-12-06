import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  center: [39.9334, 32.8597],
  zoom: 6,
  selectedLocation: null,
  isSidebarOpen: false,
  isAddingMode: false,
  addLocationModalOpen: false,
  newLocationPosition: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapPosition: (state, action) => {
      state.center = action.payload.center;
      state.zoom = action.payload.zoom;
    },

    setViewState: (state, action) => {
      const { latitude, longitude, zoom } = action.payload;
      
      if (latitude !== undefined && longitude !== undefined) {
        state.center = [latitude, longitude];
      }
    
      if (zoom !== undefined) {
        state.zoom = zoom;
      }
    },
    // -------------------------
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
      state.isSidebarOpen = true;
      state.isAddingMode = false;
    },
    clearSelection: (state) => {
      state.selectedLocation = null;
      state.isSidebarOpen = false;
    },
    toggleAddingMode: (state) => {
      state.isAddingMode = !state.isAddingMode;
      state.selectedLocation = null;
      state.isSidebarOpen = false;
    },
    setNewLocationPosition: (state, action) => {
      state.newLocationPosition = action.payload;
      state.addLocationModalOpen = true;
      state.isAddingMode = false;
    },
    closeAddLocationModal: (state) => {
      state.addLocationModalOpen = false;
      state.newLocationPosition = null;
    }
  },
});

export const { 
  setMapPosition, 
  setViewState, 
  setSelectedLocation, 
  clearSelection, 
  toggleAddingMode,
  setNewLocationPosition,
  closeAddLocationModal
} = mapSlice.actions;

export default mapSlice.reducer;