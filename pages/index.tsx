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
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useWeb3React } from '@web3-react/core';
import { Connector } from '@/constants';
import {
  useBalance,
  useBlockNumber,
  useContract,
  useEagerConnect,
  useInactiveListener,
  useSaleState,
} from '@/hooks';
import {
  formatAccount,
  formatBalance,
  formatBlockNumber,
  formatChainId,
  formatErrorMessage,
  formatSaleState,
  resetWalletConnectProvider,
} from '@/utils';
import {
  CloudQueue as CloudQueueIcon,
  CloudOff as CloudOffIcon,
  LocalFireDepartment as LocalFireDepartmentIcon,
} from '@mui/icons-material';
import { MetaMaskIcon, WalletConnectIcon } from '@/assets/icons';
import { parseEther } from '@ethersproject/units';

const Home: NextPage = memo(() => {
  const [wallet, setWallet] = useState<TWallet>('MetaMask');

  const [isActivating, setIsActivating] = useState(false);

  const { connector, chainId, account, active, error, activate, deactivate } = useWeb3React();
  const balance = useBalance();
  const blockNumber = useBlockNumber();

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

  const contract = useContract();
  const saleState = useSaleState();
  const [count, setCount] = useState(1);
  const [isSqeezing, setIsSqeezing] = useState(false);
  const [sqeezeResponse, setSqeezeResponse] = useState<any>();
  const [sqeezeError, setSqeezeError] = useState<any>();
  const sqeeze = () => {
    if (contract) {
      setIsSqeezing(true);
      contract
        .sqeezePigmentTube(count, { value: parseEther((0.055 * count).toString()) })
        .then((result: any) => {
          // TODO
          console.log('result', result);
          result
            .wait()
            .then((response: any) => {
              console.log('response', response);
              setSqeezeResponse(response);
            })
            .catch((newError: any) => {
              console.error('error', newError);
              setSqeezeError(newError);
            });
        })
        .catch((newError: any) => {
          // TODO
          console.error('error', newError);
          setSqeezeError(newError);
        })
        .finally(() => {
          setIsSqeezing(false);
        });
    }
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
                <Typography variant="body1">Sale State: {formatSaleState(saleState)}</Typography>
                {contract && saleState === 1 && (
                  <>
                    <TextField
                      label="Count"
                      value={count}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={(event) => {
                        setCount(
                          Number.isNaN(Number.parseInt(event.target.value, 10))
                            ? 0
                            : Number.parseInt(event.target.value, 10),
                        );
                      }}
                      className="mt-4"
                    />
                    <LoadingButton
                      loading={isSqeezing}
                      variant="contained"
                      onClick={sqeeze}
                      startIcon={<LocalFireDepartmentIcon />}
                    >
                      Sqeeze Pigment Tube
                    </LoadingButton>
                  </>
                )}
                {sqeezeResponse && (
                  <Typography variant="body1">
                    Response: {JSON.stringify(sqeezeResponse)}
                  </Typography>
                )}
                {sqeezeError && (
                  <Typography variant="body1" className="text-red-600">
                    Error: {sqeezeError?.message ?? sqeezeError}
                  </Typography>
                )}
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
