import '@ui-kitten/components';
import { TColor, TTypedComponentProps } from '@shared/models';

declare module '@ui-kitten/components' {
  export type ButtonProps = TTypedComponentProps<ButtonProps>;

  export function useTheme(): Record<TColor, string>;
}
