/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
} from "../constant/notesConstants";

interface NoteListState {
  loading: boolean;
  error?: string;
  notes: any;
}

const initialState1: NoteListState = {
  loading: false,
  error: undefined,
  notes: [],
};
export const noteListReducer = (
  state: NoteListState = initialState1,
  action: { type: string; payload?: any }
): NoteListState => {
  switch (action.type) {
    case NOTES_LIST_REQUEST:
      return { ...state, loading: true };
    case NOTES_LIST_SUCCESS:
      return { loading: false, notes: action.payload };
    case NOTES_LIST_FAIL:
      return { loading: false, error: action.payload, notes: [] };
    default:
      return state;
  }
};

interface NoteCreateState {
  loading?: boolean;
  success?: boolean;
  error?: string;
  note?: any; // replace `any` with your note type if you have one
}

const initialNoteCreateState: NoteCreateState = {
  loading: false,
  success: false,
  error: undefined,
  note: undefined,
};

export const noteCreateReducer = (
  state: NoteCreateState = initialNoteCreateState,
  action: { type: string; payload?: any }
): NoteCreateState => {
  switch (action.type) {
    case NOTES_CREATE_REQUEST:
      return { loading: true };
    case NOTES_CREATE_SUCCESS:
      return { loading: false, success: true, note: action.payload };
    case NOTES_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

interface NoteDeleteState {
  loading?: boolean;
  success?: boolean;
  error?: string;
}

const initialDeleteState: NoteDeleteState = {
  loading: false,
  success: false,
  error: undefined,
};

export const noteDeleteReducer = (
  state: NoteDeleteState = initialDeleteState,
  action: { type: string; payload?: any }
): NoteDeleteState => {
  switch (action.type) {
    case NOTES_DELETE_REQUEST:
      return { loading: true };
    case NOTES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

interface NoteUpdateState {
  loading?: boolean;
  success?: boolean;
  error?: string;
}

// Define the initial state using that interface
const initialUpdateState: NoteUpdateState = {
  loading: false,
  success: false,
  error: undefined,
};

// Use the interface in the reducer function
export const noteUpdateReducer = (
  state: NoteUpdateState = initialUpdateState,
  action: { type: string; payload?: any }
): NoteUpdateState => {
  switch (action.type) {
    case NOTES_UPDATE_REQUEST:
      return { loading: true };
    case NOTES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case NOTES_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};