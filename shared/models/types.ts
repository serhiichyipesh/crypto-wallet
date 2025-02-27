import {
  COMPONENT_APPEARANCES,
  COMPONENT_SIZES,
  COMPONENT_STATUSES,
  theme,
} from '@shared/config';

type TEvaProps = Record<string, unknown>;

export type TWithoutEvaProps<T extends Record<string, unknown>> = Omit<
  T,
  'status' | 'size' | 'appearance'
>;

export type TColor = keyof typeof theme;

type TComponentStatus = (typeof COMPONENT_STATUSES)[number];

type TComponentSize = (typeof COMPONENT_SIZES)[number];

type TComponentsAppearance = (typeof COMPONENT_APPEARANCES)[number];

export type TTypedComponentProps<T extends TEvaProps> = Omit<
  T,
  'status' | 'size' | 'appearance'
> & {
  status?: TComponentStatus;
  size?: TComponentSize;
  appearance?: TComponentsAppearance;
};
