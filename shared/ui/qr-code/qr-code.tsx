import QRCodeStyled, { QRCodeStyledProps } from 'react-native-qrcode-styled';
import React, { memo } from 'react';
import { useTheme } from '@ui-kitten/components';

type TQrCodeProps = Partial<Omit<QRCodeStyledProps, 'data'>> &
  Required<Pick<QRCodeStyledProps, 'data'>>;

export const QrCode = memo((props: TQrCodeProps) => {
  const theme = useTheme();

  return (
    <QRCodeStyled
      outerEyesOptions={{ borderRadius: 6 }}
      innerEyesOptions={{ borderRadius: 2 }}
      pieceCornerType="rounded"
      isPiecesGlued={true}
      pieceBorderRadius={4}
      pieceSize={7}
      color={theme['color-primary-500']}
      pieceScale={1.04}
      // logo={{ href: logo, padding: 6, scale: 1.1 }}
      {...props}
    />
  );
});

QrCode.displayName = 'QrCode';
