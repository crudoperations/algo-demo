import React, { useEffect, useState } from 'react'
import algosigner from '../assets/image/algosigner.png'
import theme from 'theme'
import { ThemeProvider } from '@theme-ui/core'
import { StickyProvider } from 'contexts/app/app.provider'
import Layout from 'components/layout'
import SEO from 'components/seo'
import {
  CustomMessage,
  getSelectedWallet,
  setSelectedAccount,
  setSelectedWallet,
} from 'function/HelperFunction'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import WalletModal from 'components/walletModal'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles, Modal } from '@material-ui/core'

export default function Login() {
  const [walletValue, setWalletValue] = useState('')
  const [isWalletPopupDisplay, setisWalletPopupDisplay] = useState(false)
  const [address, setAddress] = useState([])
  const [open, setOpen] = useState(false)
  const [walletOpen, setWalletOpen] = useState(false)

  const handleCloseModal = () => setOpen(false)
  const { enqueueSnackbar } = useSnackbar()
  const history = useRouter()

  const useStyles = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
    },
    Paper: {
      width: '100%',
      height: '100%',
      paddingTop: '22%',
      paddingBottom: '15%',
      borderRadius: '15px',
    },
    innerContainer: {
      width: '100%',
      height: '100%',
    },
    heading: {
      fontWeight: '600',
      fontSize: '26px',
      marginBottom: '60px',
    },
    Button: {
      textTransform: 'capitalize',
      background: 'linear-gradient(56.21deg, #0BB68C -43.1%, #60DD8B 132.97%)',
      marginTop: '60px',
      color: 'white',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '20px',
      paddingRight: '20px',
      fontWeight: 'bold',
      fontSize: '18px',
      borderRadius: '10px',
    },
    radio: {
      color: '#03B68C',
      '&$checked': {
        color: '#03B68C',
      },
    },
  })
  const classes = useStyles()

  const handleChange = (event) => {
    const walletValue = event.target.value
    setWalletValue(walletValue)
    setSelectedWallet(walletValue)
  }

  const navigateToAssetPage = (address) => {
    localStorage.setItem('USER_ADDRESS', address)
    setSelectedAccount(address)
    history.push('/dashboard/assets')
  }
  const connectWallet = (address) => {
    let _AlgoSigner = AlgoSigner || null
    if (_AlgoSigner && walletValue) {
      _AlgoSigner
        .connect()
        .then((d) => {
          setOpen(false)
          getAccount()
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }

  const getAccount = () => {
    $('#exampleModal').modal('hide')
    let _AlgoSigner = AlgoSigner ? AlgoSigner : null
    _AlgoSigner
      .accounts({
        ledger: getSelectedWallet(),
      })
      .then((d) => {
        setAddress(d)
        if (d) {
          setOpen(true)
        }
      })
      .catch((e) => {
        console.error('error...', e)
      })
  }
  const handleValue = () => {
    if (!walletValue) {
      CustomMessage('Please select wallet...', 'error', enqueueSnackbar)
    } else {
      setWalletOpen(true)
      try {
        if (AlgoSigner) {
          setisWalletPopupDisplay(true)
        } else {
          alert('algo signer.....')
        }
      } catch (e) {
        CustomMessage(
          'Algosigner is not installed...',
          'error',
          enqueueSnackbar
        )
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <Layout>
          <SEO title="Digital-Q" />
          <div>
            <Grid container className={classes.root}>
              <Grid item xs={8} md={4}>
                <Paper elevation={4} className={classes.Paper}>
                  <Grid container direction="column" alignItems="center">
                    <Typography
                      variant="h4"
                      component="h1"
                      gutterBottom
                      className={classes.heading}>
                      Connect wallet
                    </Typography>

                    <Grid
                      item
                      container
                      direction="row"
                      justifyContent="center"
                      xs={12}
                      md={12}>
                      <FormControl component="fieldset">
                        <RadioGroup row aria-label="wallet" name="wallet">
                          <FormControlLabel
                            value="TestNet"
                            control={
                              <Radio color="default" onChange={handleChange} />
                            }
                            label="TestNet"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio color="default" />}
                            label="BetaNet"
                          />
                          <FormControlLabel
                            value="other"
                            control={
                              <Radio color="default" onChange={handleChange} />
                            }
                            label="MainNet"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Button
                      size="large"
                      className={classes.Button}
                      variant="contained"
                      onClick={handleValue}
                      startIcon={
                        <i className="fas fa-link" id="connectBtn"></i>
                      }>
                      {' '}
                      Connect wallet
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>

          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div>
              <div
                className="modal-dialog modal-dialog-centered"
                role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title1">
                      <img className="logo" src={algosigner} alt="logo" />
                      <span className="name">AlgoSigner</span>
                    </h5>
                    <HighlightOffIcon
                      className="closeIcon"
                      onClick={handleCloseModal}
                    />
                  </div>
                  <div className="modal-body">
                    <div className="param assets">
                      {address &&
                        address.length > 0 &&
                        address.map((asset, index) => (
                          <div
                            key={index}
                            className="value  assets back-highlight1"
                            onClick={() => navigateToAssetPage(asset.address)}>
                            {asset.address}
                            <span className="indicator"></span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            open={walletOpen}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <WalletModal
              connectWallet={connectWallet}
              setWalletOpen={setWalletOpen}
            />
          </Modal>
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  )
}
