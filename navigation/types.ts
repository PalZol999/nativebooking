import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  LoginScreen: undefined;
  MyDatePicker: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
