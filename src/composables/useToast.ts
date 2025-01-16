export enum ToastType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
}

export enum ToastPosition {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  TOP_CENTER = "top-center",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

const toggle = (
  message: string,
  type: ToastType = ToastType.SUCCESS,
  position: ToastPosition = ToastPosition.TOP_RIGHT,
  duration: number = 2000
) => {
  useNuxtApp().$toast[type](message, {
    position,
    autoClose: duration,
  });
};

const useToastity = () => {
  return { toggle };
};

export default useToastity;
