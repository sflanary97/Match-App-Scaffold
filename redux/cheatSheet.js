import {createSlice} from '@reduxjs/toolkit';

export const cheatSheet = createSlice({
  name: 'cheat',
  initialState: {
    flatArray: [0, 1, 2, 3, 4],
    nestedArray: [
      [0, 2, 3, 4],
      [0, 1, 2, 3, 4],
    ],
    object: {field1: 'test', field2: 5, field3: null},
    objectArray: [
      {field1: 'test1', field2: 2, field3: null},
      {field1: 'test2', field2: 4, field3: null},
      {field1: 'test3', field2: 5, field3: null},
    ],
  },
  reducers: {
    /*dispatch(updateObjectInArray(
      {
        index: int,
        fieldName: string,
        newValue: object
      }
    ))))
    */
    updateObjectInArray: (state, action) => {
      state.objectArray[action.payload.index].fieldName =
        action.payload.newValue;
    },
    /*dispatch(addToArray(
      {
        newValue: object
      }
    ))))
    */
    addToArray: (state, action) => {
      state.flatArray.push(action.payload.newValue);
    },
    /*dispatch(updateObjectField(
      {
        index: fieldName
        newValue: object
      }
    ))))
    */
    updateObjectField: (state, action) => {
      state.object.fieldName = action.payload.newValue;
    },
  },
});

// Action creators are generated for each case reducer function
export const {updateObjectInArray} = cheatSheet.actions;

export default cheatSheet.reducer;
