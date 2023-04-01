import { interfaceData } from "./data";
export const initialState = {
  interfaceData: interfaceData,
  currentEdit: "",
};
export const ACTIONS = {
  UPDATE_DATA: "UPDATE_DATA",
  ADD_DATA: "ADD_DATA",
  DELETE_DATA: "DELETE_DATA",
  SET_CURRENT_EDIT: "SET_CURRENT_EDIT",
};

export const reducer = (draft, action) => {
  switch (action.type) {
    case ACTIONS.UPDATE_DATA: {
      let { id, field, type, required } = action.dataToUpdate;
      let requiredField = draft.interfaceData;
      while (id.length >= 1) {
        let ind = Number(id[0]);
        requiredField = requiredField.children[ind];
        id = id.slice(1);
      }
      requiredField.field = field;
      requiredField.type = type;
      requiredField.required = required;
      requiredField.children =
        type === "object" ? requiredField.children || [] : null;
      return draft;
    }
    case ACTIONS.ADD_DATA: {
      let id = action.id;
      let requiredField = draft.interfaceData;
      while (id.length >= 1) {
        let ind = Number(id[0]);
        requiredField = requiredField.children[ind];
        id = id.slice(1);
      }
      const childrenLength = requiredField.children.length;
      let child = {
        id: action.id + `${childrenLength}`,
        field: "addName",
        type: "integer",
        required: false,
        children: null,
      };
      requiredField.children.push(child);
      draft.currentEdit=child.id;
      return draft;
    }
    case ACTIONS.DELETE_DATA: {
      let requiredField = draft.interfaceData;
      let parentId = action.id.slice(0, -1);
      while (parentId.length >= 1) {
        let ind = Number(parentId[0]);
        requiredField = requiredField.children[ind];
        parentId = parentId.slice(1);
      }
      let newChildren = requiredField.children.filter((child) => {
        if (child.id !== action.id) {
          return true;
        } else {
          return false;
        }
      });
      requiredField.children = newChildren;
      return draft;
    }
    case ACTIONS.SET_CURRENT_EDIT: {
      let id = action.id;
      draft.currentEdit=id;
      return draft;
    }
    default:
      return draft;
  }
};
