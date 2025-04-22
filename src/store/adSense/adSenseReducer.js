// import {
//   AD_UNITS_CREATE_PENDING,
//   AD_UNITS_CREATE_SUCCESS,
//   AD_UNITS_CREATE_ERROR,
//   AD_UNITS_FETCH_ALL_PENDING,
//   AD_UNITS_FETCH_ALL_SUCCESS,
//   AD_UNITS_FETCH_ALL_ERROR,
//   AD_UNITS_FETCH_ONE_PENDING,
//   AD_UNITS_FETCH_ONE_SUCCESS,
//   AD_UNITS_FETCH_ONE_ERROR,
//   AD_UNITS_UPDATE_PENDING,
//   AD_UNITS_UPDATE_SUCCESS,
//   AD_UNITS_UPDATE_ERROR,
//   AD_UNITS_DELETE_PENDING,
//   AD_UNITS_DELETE_SUCCESS,
//   AD_UNITS_DELETE_ERROR,
//   AD_SETTINGS_FETCH_PENDING,
//   AD_SETTINGS_FETCH_SUCCESS,
//   AD_SETTINGS_FETCH_ERROR,
//   AD_SETTINGS_UPSERT_PENDING,
//   AD_SETTINGS_UPSERT_SUCCESS,
//   AD_SETTINGS_UPSERT_ERROR,
// } from "./adSenseActions";

// const initialState = {
//   adUnits: [],
//   adUnit: null,
//   adSettings: null,
//   loading: false,
//   error: null,
// };

// const adsenseReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // PENDING STATES
//     case AD_UNITS_CREATE_PENDING:
//     case AD_UNITS_FETCH_ALL_PENDING:
//     case AD_UNITS_FETCH_ONE_PENDING:
//     case AD_UNITS_UPDATE_PENDING:
//     case AD_UNITS_DELETE_PENDING:
//     case AD_SETTINGS_FETCH_PENDING:
//     case AD_SETTINGS_UPSERT_PENDING:
//       return { ...state, loading: true, error: null };

//     // AD UNITS SUCCESS
//     case AD_UNITS_CREATE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         adUnits: [...state.adUnits, action.payload],
//       };

//     case AD_UNITS_FETCH_ALL_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         adUnits: action.payload || [], // Store the entire response object
//       };

//     case AD_UNITS_FETCH_ONE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         adUnit: action.payload,
//       };

//       case AD_UNITS_UPDATE_SUCCESS: {
//         const updatedAdUnits = [];
//         for (const unit of Array.isArray(state.adUnits) ? state.adUnits : []) {
//           if (unit.id === action.payload.data.id) {
//             updatedAdUnits.push(action.payload.data);
//           } else {
//             updatedAdUnits.push(unit);
//           }
//         }
//         return {
//           ...state,
//           loading: false,
//           adUnits: updatedAdUnits,
//         };
//       }

//     case AD_UNITS_DELETE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         adUnits: state.adUnits.filter((unit) => unit.id !== action.payload),
//       };

//     // AD SETTINGS SUCCESS
//     case AD_SETTINGS_FETCH_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         adSettings: action.payload,
//       };

//     case AD_SETTINGS_UPSERT_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         adSettings: action.payload,
//       };

//     // ERRORS
//     case AD_UNITS_CREATE_ERROR:
//     case AD_UNITS_FETCH_ALL_ERROR:
//     case AD_UNITS_FETCH_ONE_ERROR:
//     case AD_UNITS_UPDATE_ERROR:
//     case AD_UNITS_DELETE_ERROR:
//     case AD_SETTINGS_FETCH_ERROR:
//     case AD_SETTINGS_UPSERT_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default adsenseReducer;


import {
  AD_UNITS_CREATE_PENDING,
  AD_UNITS_CREATE_SUCCESS,
  AD_UNITS_CREATE_ERROR,
  AD_UNITS_FETCH_ALL_PENDING,
  AD_UNITS_FETCH_ALL_SUCCESS,
  AD_UNITS_FETCH_ALL_ERROR,
  AD_UNITS_FETCH_ONE_PENDING,
  AD_UNITS_FETCH_ONE_SUCCESS,
  AD_UNITS_FETCH_ONE_ERROR,
  AD_UNITS_UPDATE_PENDING,
  AD_UNITS_UPDATE_SUCCESS,
  AD_UNITS_UPDATE_ERROR,
  AD_UNITS_DELETE_PENDING,
  AD_UNITS_DELETE_SUCCESS,
  AD_UNITS_DELETE_ERROR,
  AD_SETTINGS_FETCH_PENDING,
  AD_SETTINGS_FETCH_SUCCESS,
  AD_SETTINGS_FETCH_ERROR,
  AD_SETTINGS_UPSERT_PENDING,
  AD_SETTINGS_UPSERT_SUCCESS,
  AD_SETTINGS_UPSERT_ERROR,
} from "./adSenseActions";

const initialState = {
  adUnits: [],
  adUnit: null,
  adSettings: null,
  loading: false,
  error: null,
};

const adsenseReducer = (state = initialState, action) => {
  switch (action.type) {
    // PENDING STATES
    case AD_UNITS_CREATE_PENDING:
    case AD_UNITS_FETCH_ALL_PENDING:
    case AD_UNITS_FETCH_ONE_PENDING:
    case AD_UNITS_UPDATE_PENDING:
    case AD_UNITS_DELETE_PENDING:
    case AD_SETTINGS_FETCH_PENDING:
    case AD_SETTINGS_UPSERT_PENDING:
      return { ...state, loading: true, error: null };

    // AD UNITS SUCCESS
    case AD_UNITS_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        adUnits: [...state.adUnits.data, action.payload],
      };

    case AD_UNITS_FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        adUnits: action.payload || [],
      };

    case AD_UNITS_FETCH_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        adUnit: action.payload,
      };

    case AD_UNITS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        adUnit: action.payload, // Update single adUnit state
      };

    case AD_UNITS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        adUnits: state.adUnits.filter((unit) => unit.id !== action.payload),
        adUnit: null, // Clear single adUnit state
      };

    // AD SETTINGS SUCCESS
    case AD_SETTINGS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        adSettings: action.payload,
      };

    case AD_SETTINGS_UPSERT_SUCCESS:
      return {
        ...state,
        loading: false,
        adSettings: action.payload,
      };

    // ERRORS
    case AD_UNITS_CREATE_ERROR:
    case AD_UNITS_FETCH_ALL_ERROR:
    case AD_UNITS_FETCH_ONE_ERROR:
    case AD_UNITS_UPDATE_ERROR:
    case AD_UNITS_DELETE_ERROR:
    case AD_SETTINGS_FETCH_ERROR:
    case AD_SETTINGS_UPSERT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default adsenseReducer;