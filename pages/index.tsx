import type { NextPage } from 'next';
import { memo, useState, useEffect } from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useWeb3React } from '@web3-react/core';
import { Connector } from '@/constants';
import { useBalance, useBlockNumber, useEagerConnect, useInactiveListener } from '@/hooks';
import {
  formatAccount,
  formatBalance,
  formatBlockNumber,
  formatChainId,
  formatErrorMessage,
  resetWalletConnectProvider,
} from '@/utils';
import { CloudQueue as CloudQueueIcon, CloudOff as CloudOffIcon } from '@mui/icons-material';
import { MetaMaskIcon, WalletConnectIcon } from '@/assets/icons';

const Home: NextPage = memo(() => {
  const [wallet, setWallet] = useState<TWallet>('MetaMask');

  const [isActivating, setIsActivating] = useState(false);

  const { connector, chainId, account, active, error, activate, deactivate } = useWeb3React();
  const balance = useBalance();
  const blockNumber = useBlockNumber();
  useEffect(() => {
    if (error) {
      Connector[wallet].deactivate();
    }
  }, [error, wallet]);

  const [activatingConnector, setActivatingConnector] = useState<any>();
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  const activateConnector = async () => {
    setIsActivating(true);
    // https://github.com/NoahZinsmeister/web3-react/issues/124#issuecomment-984882534
    await activate(Connector[wallet], () => {
      resetWalletConnectProvider();
    }).finally(() => {
      setIsActivating(false);
    });
  };
  const deactivateConnector = () => deactivate();

  const toggleConnectorStatus = () => {
    if (active) {
      deactivateConnector();
      return;
    }
    activateConnector();
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Box component="header" className="flex items-center justify-center flex-none">
        Header here.
      </Box>
      <Box component="main" className="flex flex-col items-center justify-center flex-auto">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center">
              <FormControl component="fieldset" sx={{ flexDirection: 'row' }}>
                <RadioGroup
                  row
                  aria-label="wallet"
                  name="wallet-group"
                  value={wallet}
                  onChange={(event) => {
                    setWallet(event.target.value as TWallet);
                  }}
                >
                  <FormControlLabel
                    value="MetaMask"
                    disabled={active}
                    control={<Radio />}
                    label={
                      <Box className="flex items-center justify-center">
                        <MetaMaskIcon className="mr-1" />
                        MetaMask
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="WalletConnect"
                    disabled={active}
                    control={<Radio />}
                    label={
                      <Box className="flex items-center justify-center">
                        <WalletConnectIcon className="mr-1" />
                        WalletConnect
                      </Box>
                    }
                  />
                </RadioGroup>
                <LoadingButton
                  loading={isActivating}
                  variant="contained"
                  onClick={toggleConnectorStatus}
                  startIcon={active ? <CloudOffIcon /> : <CloudQueueIcon />}
                >
                  {active ? 'Disconnect' : 'Connect'}
                </LoadingButton>
              </FormControl>
            </Grid>
            {!!error && (
              <Grid container justifyContent="center" alignItems="center">
                <Typography variant="body1" className="text-red-600">
                  {formatErrorMessage(error)}
                </Typography>
              </Grid>
            )}
            {!error && active && (
              <Grid container justifyContent="center" alignItems="center" flexDirection="column">
                <Typography variant="body1">Chain Id: {formatChainId(chainId)}</Typography>
                <Typography variant="body1">
                  Block Number: {formatBlockNumber(blockNumber)}
                </Typography>
                <Typography variant="body1">Account: {formatAccount(account)}</Typography>
                <Typography variant="body1">Balance: {formatBalance(balance)}</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box component="footer" className="flex items-center justify-center flex-none">
        Footer here.
      </Box>
    </Container>
  );
});

export default Home;
