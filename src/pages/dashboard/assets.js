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
  Paper,
  withStyles,
  makeStyles,
} from '@material-ui/core'
import SEO from 'components/seo'
import { useRouter } from 'next/router'
import { getAddressParams, getSelectedAccount } from 'function/HelperFunction'
import CreateAssets from 'components/createAssets'

export default function Assets() {
  const router = useRouter()
  const [assets, setAssets] = useState([])
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState('')
  const [searchValue, setSearchValue] = useState('Name')
  const [createdAssets, setCreatedAssets] = useState([])
  const [txParamsJS, setTxParamsJS] = useState()
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }))
  const classes = useStyles()

  const style = {
    position: 'absolute',
    // overflow: 'auto',
    top: '48%',
    left: '50%',
    width: '55%',
    outerHeight: 'auto',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffff',
    boxShadow: 24,
    p: 4,
  }

  useEffect(() => {
    // if (!localStorage) {
    axios.get(`${GET_ASSETS}/${getSelectedAccount()}`).then((response) => {
      const { assets, amount, address } = response.data
      setupSDK()
      setAssets(assets)
      setAddress(address)
      setAmount(amount)
      setCreatedAssets(response.data['created-assets'])
    })
    // }
  }, [])

  // useEffect(() => {
  //   window.onbeforeunload = function () {
  //     router.push('/login')
  //   }

  //   return () => {
  //     window.onbeforeunload = null
  //   }
  // }, [])

  const setupSDK = () => {
    const server = 'https://testnet-algorand.api.purestake.io/ps2'
    const token = { 'X-API-Key': 'B3SU4KcVKi94Jap2VXkK83xx38bsv95K5UZm2lab' }
    const port = ''

    // let _AlgoSigner = AlgoSigner || null

    const algodClient = new algosdk.Algodv2(token, server, port)
    console.log('algodClient', algodClient)

    algodClient
      .healthCheck()
      .do()
      .then((d) => {
        console.log('d', d)
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
        console.log(d)
        setTxParamsJS(d)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const InputTextField = withStyles({
    root: {
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
  })(TextField)

  const createAssets = () => {
    let _AlgoSigner = AlgoSigner || null
    console.log('adsk', algosdk)
    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      // from: document.getElementById('from').value,
      assetName: document.getElementById('name').value,
      unitName: document.getElementById('unit-name').value,
      total: +document.getElementById('total').value,
      decimals: +document.getElementById('decimal').value,
      assetURL: +document.getElementById('asset-url').value,
      assetMetadataHash: +document.getElementById('asset-hash').value,
      // note: _AlgoSigner.encoding.stringToByteArray(
      //   document.getElementById('note').value
      // ),
      // suggestedParams: { ...txParamsJS },
    })

    // const txn_b64 = _AlgoSigner.encoding.msgpackToBase64(txn.toByte())
    console.log('txn', txn)

    // _AlgoSigner
    //   .signTxn([{ txn: txn_b64 }])
    //   .then((d) => {
    //     signedTxs = d
    //     signCodeElem.innerHTML = JSON.stringify(d, null, 2)
    //   })
    //   .catch((e) => {
    //     console.error(e)
    //   })
  }

  const copyText = () => {
    let copyText = document.getElementById('copyText')
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    navigator.clipboard.writeText(copyText.value)
  }
  const handleSearch = (event) => {
    const searchString = event.target.value
    setSearchValue(searchString)
    // const filterValue = searchString
    //   ? createdAssets.filter((asset) =>
    //       asset.params.name
    //         .toString()
    //         .toLowerCase()
    //         .includes(searchString.toLocaleLowerCase())
    //     )
    //   : createdAssets
    // setCreatedAssets(filterValue)
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
                <fieldset>
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
                </fieldset>
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
                            style={{ width: '30px' }}
                          />
                          &nbsp;&nbsp; {address}
                          <span
                            className="action jss121 jss122"
                            title="Copy Address">
                            <svg
                              class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall"
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true">
                              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z"></path>
                            </svg>
                          </span>
                          <span
                            className="action jss121 jss122"
                            title="Show QR code">
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall"
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true">
                              <path d="M3 5v4h2V5h4V3H5c-1.1 0-2 .9-2 2zm2 10H3v4c0 1.1.9 2 2 2h4v-2H5v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2V5c0-1.1-.9-2-2-2z"></path>
                            </svg>
                          </span>
                          <div className="balance">
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-colorPrimary"
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true">
                              <path
                                d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
                                style={{ color: '#03B68C' }}></path>
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
                            style={{ float: 'right' }}
                            title="Logout">
                            <svg
                              className="MuiSvgIcon-root MuiSvgIcon-colorSecondary MuiSvgIcon-fontSizeLarge"
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true">
                              <path
                                d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
                                style={{
                                  color: '#V',
                                  cursor: 'pointer',
                                }}></path>
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
                        style={{ padding: '13px 30px 13px 30px' }}>
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
                        {/* <div
                          tabindex="-1"
                          role="dialog"
                          aria-hidden="true">
                          <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  onClick={handleCloseModal}
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"></button>
                              </div>
                              <div className="modal-body scroll">
                                <div className="col-xl-12 col-lg-12">
                                  <div className="card">
                                    <div className="card-header">
                                      <h3 className="card-title">
                                        Asset Details
                                      </h3>
                                    </div>
                                    <div className="card-body">
                                      <div className="basic-form">
                                        <form>
                                          <div className="row">
                                            <div className="mb-3 col-md-6">
                                              <input
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                              />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                              <input
                                                id="unit-name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Unit Name"
                                              />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                              <input
                                                id="total"
                                                type="text"
                                                className="form-control"
                                                placeholder="Total Supply"
                                              />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                              <input
                                                id="decimal"
                                                type="text"
                                                className="form-control"
                                                placeholder="Decimal"
                                              />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                              <input
                                                id="asset-url"
                                                type="text"
                                                className="form-control"
                                                placeholder="url"
                                              />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                              <input
                                                id="asset-hash"
                                                type="text"
                                                className="form-control"
                                                placeholder="Metadata Hash"
                                              />
                                            </div>
                                          </div>
                                          <div className="card-header">
                                            <h3 className="card-title">
                                              Asset Management
                                            </h3>
                                          </div>
                                          <div className="row">
                                            <div className="mb-3 col-md-6">
                                              <label className="toggle">
                                                <input
                                                  type="checkbox"
                                                  checked
                                                />{' '}
                                                <span></span>
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							                    	 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                                              />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                              <label className="toggle">
                                                <input
                                                  type="checkbox"
                                                  checked
                                                />{' '}
                                                <span></span>
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							                    	 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                                              />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                              <label className="toggle">
                                                <input
                                                  type="checkbox"
                                                  checked
                                                />{' '}
                                                <span></span>
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							                    	 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                                              />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                              <label className="toggle">
                                                <input
                                                  type="checkbox"
                                                  checked
                                                />{' '}
                                                <span></span>
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							                        	 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
                                              />
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    onClick={createAssets}
                                    type="button"
                                    className="btn btn-primary">
                                    <i class="fas fa-plus"></i>&nbsp;Create
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}
                        <Box sx={style} borderRadius="3%">
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2">
                            <CreateAssets
                              setModal={setOpen}
                              asstes={createdAssets}
                              txParamsJS={txParamsJS}
                            />
                          </Typography>
                        </Box>
                      </Modal>

                      {/* modal */}
                      <div className="content-header-actions">
                        <div className="search">
                          <InputTextField
                            fullWidth
                            className={classes.margin}
                            label="Note"
                            variant="outlined"
                            value="Name"
                            id="custom-css-outlined-input"
                            onChange={handleSearch}
                          />
                          <button type="submit">
                            <i class="ph-magnifying-glass-bold"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* content */}

                    <div className="content">
                      <div className="content-main">
                        <div className="row">
                          {createdAssets &&
                            createdAssets.length > 0 &&
                            createdAssets.map((asset, index) => (
                              <div className="col-lg-6 col-md-6" key={index}>
                                <div className="card-body roots">
                                  <div
                                    className="assets"
                                    style={{ display: 'flex' }}>
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

                                  <div
                                    className="assets"
                                    style={{ display: 'flex' }}>
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

                                  <div
                                    className="assets"
                                    style={{ display: 'flex' }}>
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

                                  <div
                                    className="assets"
                                    style={{ display: 'flex' }}>
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
