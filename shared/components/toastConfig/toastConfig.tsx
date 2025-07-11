import { BaseToastProps } from 'react-native-toast-message'
import { CustomToast } from '../CustomToast/CustomToast'

export const toastConfig = {
  customToast: (props: BaseToastProps) => <CustomToast {...props} />,
}
