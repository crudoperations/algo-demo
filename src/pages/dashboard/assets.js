import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@theme-ui/core'
import { StickyProvider } from 'contexts/app/app.provider'
import theme from 'theme'
import { GET_ASSETS } from 'function/APiUrl'
import axios from 'axios'
import algosdk from 'algosdk'
import CodeImg from '../../assets/image/code.png'
import {
  Modal,
  TextField,
  Box,
  Typography,
  makeStyles,
  InputAdornment,
} from '@material-ui/core'
import SEO from 'components/seo'
import { useRouter } from 'next/router'
import { CustomMessage, getSelectedAccount } from 'function/HelperFunction'
import CreateAssets from 'components/createAssets'
import QRCode from 'react-qr-code'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import Swal from 'sweetalert2'
import CopyToClipboard from 'react-copy-to-clipboard'
import SearchIcon from '@material-ui/icons/Search'
import { useSnackbar } from 'notistack'

export default function Assets() {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const [assets, setAssets] = useState([])
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [createdAssets, setCreatedAssets] = useState([])
  const [txParamsJS, setTxParamsJS] = useState()
  const [open, setOpen] = useState(false)
  const [QRopen, setQROpen] = useState(false)
  const [loading, setloading] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const showQRCode = () => setQROpen(true)
  const hideQRCode = () => {
    setQROpen(!QRopen)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    inputText: {
      '& label.Mui-focused': {
        color: '#03B68C',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#03B68C',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#03B68C',
        },
      },
    },
  }))
  const classes = useStyles()

  const style = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    width: '55%',
    outerHeight: 'auto',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffff',
    boxShadow: 24,
    p: 4,
  }

  const QRstyle = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    width: '25%',
    outerHeight: 'auto',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffff',
    boxShadow: 24,
    p: 4,
  }

  useEffect(() => {
    getAssets()
    if (loading) {
      Swal.fire({
        title: 'Waiting for confirmation...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: true,
        didOpen: () => {
          Swal.showLoading()
        },
      })
    }
  }, [loading])

  const getAssets = () => {
    axios.get(`${GET_ASSETS}/${getSelectedAccount()}`).then((response) => {
      const { assets, amount, address } = response.data
      setupSDK()
      setAssets(assets)
      setAddress(address)
      setAmount(amount)
      setCreatedAssets(response.data['created-assets'])
    })
  }

  const setupSDK = () => {
    const server = 'https://testnet-algorand.api.purestake.io/ps2'
    const token = { 'X-API-Key': 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab' }
    const port = ''

    const algodClient = new algosdk.Algodv2(token, server, port)

    algodClient
      .healthCheck()
      .do()
      .then((d) => {
        getParams()
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const getParams = () => {
    const server = 'https://testnet-algorand.api.purestake.io/ps2'
    const token = { 'X-API-Key': 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab' }
    const port = ''
    const algodClient = new algosdk.Algodv2(token, server, port)
    algodClient
      .getTransactionParams()
      .do()
      .then((d) => {
        setTxParamsJS(d)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const handleSearch = (event) => {
    const searchString = event.target.value
    setSearchValue(searchString)
  }

  const showCopyText = () => {
    CustomMessage('Address copied', 'success', enqueueSnackbar)
  }

  return (
    <ThemeProvider theme={theme}>
      <StickyProvider>
        <SEO title="Digital-Q" />
        <div className="container">
          <div className="content-body">
            <div className="header-navigation">
              <div className="header-Left-actions">
                <img
                  src="https://digitalq.co.in/assets/images/dq-logo.svg"
                  height="100em"
                />
              </div>
              <div className="header-navigation-actions">
                <div className="MuiButton-outlinedPrimary">
                  <label>
                    <input type="radio" name="radio" checked />
                    <span>TestNet</span>
                  </label>
                  <label>
                    <input type="radio" name="radio" />
                    <span>BetaNet</span>
                  </label>
                  <label>
                    <input type="radio" name="radio" />
                    <span>MainNet</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card">
              <main className="main">
                <div className="responsive-wrapper">
                  <div className="dashboard">
                    <div class="row">
                      <div class="col-lg-9 col-md-9 addr">
                        <div className="addr1">
                          <img
                            src={CodeImg}
                            alt="address"
                            className="codeImg"
                          />
                          &nbsp;&nbsp;{' '}
                          <span id="clipboard-area">{address}</span>
                          <CopyToClipboard text={address}>
                            <span
                              onClick={showCopyText}
                              className="action jss122"
                              id="cursor"
                              title="Copy Address">
                              <svg
                                class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true">
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z"></path>
                              </svg>
                            </span>
                          </CopyToClipboard>
                          <span
                            onClick={showQRCode}
                            className="action jss121 jss122"
                            id="cursor"
                            title="Show QR code">
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall"
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true">
                              <path d="M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"></path>
                            </svg>
                          </span>
                          <Modal
                            open={QRopen}
                            onClose={hideQRCode}
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description">
                            <Box sx={QRstyle} borderRadius="3%">
                              <div onClick={hideQRCode} className="qrCode">
                                <HighlightOffIcon className="closeIcon" />
                              </div>
                              <QRCode value={address} />
                            </Box>
                          </Modal>
                          <div className="balance">
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-colorPrimary"
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true">
                              <path
                                d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                                className="closeIcon"></path>
                            </svg>
                            {amount / 1000000}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-3">
                        <div className="addr3">
                          <span
                            onClick={() => router.push('/login')}
                            className="action jss36"
                            id="logout"
                            title="Logout">
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-colorSecondary MuiSvgIcon-fontSizeLarge"
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true">
                              <path
                                d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
                                className="logoutSvg"></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="content-header">
                      <button
                        onClick={handleOpenModal}
                        type="button"
                        className="btn btn-primary mb-2"
                        data-bs-toggle="modal"
                        data-bs-target=".bd-example-modal-lg"
                        id="assetIcon">
                        <i class="fas fa-plus"></i>&nbsp;Create Asset
                      </button>
                      <input
                        type="checkbox"
                        id="Hide"
                        name="Hide"
                        value="balances"
                        className=" hide_bals"
                      />
                      <label for="Hide" class="hide_bal">
                        &nbsp; Hide 0 balances&nbsp;
                      </label>
                      <Modal
                        open={open}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={style} borderRadius="3%">
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2">
                            <CreateAssets
                              setModal={setOpen}
                              asstes={createdAssets}
                              txParamsJS={txParamsJS}
                              getAssets={getAssets}
                              address={address}
                              setloading={setloading}
                            />
                          </Typography>
                        </Box>
                      </Modal>

                      <div className="content-header-actions">
                        <TextField
                          fullWidth
                          className={classes.inputText}
                          label="Search asset"
                          variant="outlined"
                          placeholder="Name"
                          value={searchValue}
                          id="custom-css-outlined-input"
                          onChange={handleSearch}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">
                                {/* <SearchIcon /> */}
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>

                    <div className="content">
                      <div className="content-main">
                        <div className="row">
                          {createdAssets &&
                            createdAssets.length > 0 &&
                            createdAssets.map((asset, index) => (
                              <div className="col-lg-6 col-md-6" key={index}>
                                <div className="card-body roots">
                                  <div className="assets" id="assetTable">
                                    <div className="col-lg-10 col-md-10 asset-id">
                                      <p> ID: {asset.index}</p>
                                    </div>
                                    <div class="col-lg-2 col-md-2">
                                      <svg
                                        className="MuiSvgIcon-root"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true">
                                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
                                      </svg>

                                      <svg
                                        className="MuiSvgIcon-root"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true">
                                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                                      </svg>
                                    </div>
                                  </div>

                                  <div className="assets" id="assetTable">
                                    <div className="col-lg-6 col-md-6 assets jss38">
                                      <p>{asset.params.name}</p>
                                    </div>

                                    <div className="col-lg-6 col-md-6 assets">
                                      <p>
                                        Bal: {asset.params.total}{' '}
                                        {asset.params['unit-name']}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="assets" id="assetTable">
                                    <div className="col-lg-6 col-md-6 assets">
                                      <div className="param assets">
                                        <div className="key assets">
                                          Manager
                                        </div>
                                        <div className="value  assets back-highlight clickable">
                                          {asset.params.manager}
                                          <span className="indicator">
                                            <svg
                                              className="assets MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeLarge"
                                              focusable="false"
                                              viewBox="0 0 24 24"
                                              aria-hidden="true">
                                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                      <div className="param assets">
                                        <div className="key assets">
                                          Reserve
                                        </div>
                                        <div className="value assets back-highlight clickable">
                                          {asset.params.reserve}
                                          <span className="indicator">
                                            <svg
                                              className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeLarge"
                                              focusable="false"
                                              viewBox="0 0 24 24"
                                              aria-hidden="true">
                                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="assets" id="assetTable">
                                    <div className="col-lg-6 col-md-6 assets">
                                      <div className="param assets">
                                        <div className="key assets">Freeze</div>
                                        <div className="value  assets back-highlight clickable">
                                          {asset.params.freeze}
                                          <span className="indicator">
                                            <svg
                                              className="assets MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeLarge"
                                              focusable="false"
                                              viewBox="0 0 24 24"
                                              aria-hidden="true">
                                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                      <div className="param assets">
                                        <div className="key assets">
                                          Clawback
                                        </div>
                                        <div className="value assets back-highlight clickable">
                                          {asset.params.clawback}
                                          <span className="indicator">
                                            <svg
                                              className="MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeLarge"
                                              focusable="false"
                                              viewBox="0 0 24 24"
                                              aria-hidden="true">
                                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                                            </svg>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </StickyProvider>
    </ThemeProvider>
  )
}
