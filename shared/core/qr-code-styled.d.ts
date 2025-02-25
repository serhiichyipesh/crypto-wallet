declare module 'react-native-qrcode-styled' {
  import { ComponentType } from 'react';
  import { ImageSourcePropType, ViewStyle } from 'react-native';

  export interface QRCodeStyledProps {
    data: string | null;
    color?: string;
    pieceSize?: number;
    pieceScale?: number;
    pieceBorderRadius?: number;
    isPiecesGlued?: boolean;
    pieceCornerType?: 'rounded' | 'square';
    outerEyesOptions?: {
      borderRadius?: number;
    };
    innerEyesOptions?: {
      borderRadius?: number;
    };
    logo?: {
      href: ImageSourcePropType;
      padding?: number;
      scale?: number;
    };
    style?: ViewStyle;
  }

  const QRCodeStyled: ComponentType<QRCodeStyledProps>;
  export default QRCodeStyled;
}
