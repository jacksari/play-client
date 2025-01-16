
import { defu } from "defu";
import type { UseFetchOptions } from "nuxt/app";
import useToastity from "./useToast";

export const useApi = async <T>(
  url: MaybeRefOrGetter<string>,
  options: UseFetchOptions<T> = {}
) => {
  const config = useRuntimeConfig();
  const { toggle } = useToastity()
//   const { logout, clearUser } = useAuthStore();
  const { isPreloading } = useLoading();
  const accessToken = useCookie("accessToken");
  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBase as string,
    key: toValue(url),
    headers: accessToken.value
      ? {
          Authorization: `Bearer ${accessToken.value}`,
        }
      : {},
  };

  const params = defu(options, defaults);

  const data = await useFetch(url, params);

  if (
    data.error.value?.statusCode &&
    [400, 401, 402, 404].includes(data.error.value?.statusCode)
  ) {
    const message = data.error.value.data.message || "Error de codigo 400";
    toggle(message, ToastType.ERROR);
    if (data.error.value?.statusCode === 401) {
    //   clearUser();
      navigateTo("/");
      isPreloading(false);
    }

    return {
      status: false,
      message: message,
      data: null,
    };
  }

  if (data.error.value?.statusCode === 500) {
    toggle(data.error.value?.data.message, ToastType.ERROR);

    // clearUser();
    return {
      status: false,
      message: data.error.value?.data.message,
      data: null,
    };
  }

  if (data.error.value?.statusCode == 405) {
    // console.error(data.error);
    toggle("Error de codigo 405", ToastType.ERROR);

    // clearUser();
    return {
      status: false,
      message: "Error de codigo 405",
      data: null,
    };
  }

  // 403
  if (data.error.value?.statusCode === 403) {
    toggle("No tienes permisos para acceder a esta ruta", ToastType.ERROR);

    // logout();

    return;
  }

  return data.data.value;
};
