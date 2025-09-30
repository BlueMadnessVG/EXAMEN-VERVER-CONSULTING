import { useSnackbar, type ProviderContext, type VariantType } from "notistack";

let useSnackBarRef: ProviderContext;
export const SnackbarUtilitiesConfiguration = () => {
  useSnackBarRef = useSnackbar();
  return null;
};

export const SnackbarUtilities = {
  toast(msg: string, variant: VariantType = "default") {
    useSnackBarRef.enqueueSnackbar(msg, { variant });
  },

  success(msg: string) {
    this.toast(msg, "success");
  },
  error(msg: string) {
    this.toast(msg, "error");
  },
  info(msg: string) {
    this.toast(msg, "info");
  },
  warning(msg: string) {
    this.toast(msg, "warning");
  },
};
