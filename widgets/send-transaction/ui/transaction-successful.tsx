import { CopyButton, Row, Typography } from '@shared/ui';
import { View } from 'react-native';
import { Hex } from 'viem';

export const TransactionSuccessful = ({ txHash }: { txHash: Hex }) => {
  return (
    <View className="gap-2">
      <Typography category="h6" status="success">
        Transaction Successful!
      </Typography>

      <Typography category="s1">Tx hash:</Typography>

      <Row className="justify-between gap-2">
        <Typography className="flex-1">{txHash}</Typography>

        <CopyButton stringToCopy={txHash} />
      </Row>
    </View>
  );
};
