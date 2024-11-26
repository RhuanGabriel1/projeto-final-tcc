import Toast from "react-native-toast-message";

export const errorToast = ({ title, description, timer }) => {
  Toast.show({
    type: "error",
    text1: title,
    text2: description || "",
    visibilityTime: timer || 5000,
  });
};

export const successToast = ({ title, description, timer }) => {
  Toast.show({
    type: "success",
    text1: title,
    text2: description || "",
    visibilityTime: timer || 5000,
  });
};
