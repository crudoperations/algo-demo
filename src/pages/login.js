import React, { useEffect, useState } from 'react'
import algosigner from '../assets/image/algosigner.png'
import wallet from '../assets/image/wallet.png'
import algorand from '../assets/image/algorand mobile wallet.png'
import theme from 'theme'
import { ThemeProvider } from '@theme-ui/core'
import { StickyProvider } from 'contexts/app/app.provider'
import Layout from 'components/layout'
import SEO from 'components/seo'
import { CustomMessage, setSelectedAccount } from 'function/HelperFunction'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import { Modal } from '@material-ui/core'

export default function Login() {
  const [walletValue, setWalletValue] = useState('')
  const [isWalletPopupDisplay, setisWalletPopupDisplay] = useState(false)
  const [address, setAddress] = useState([])
  const [open, setOpen] = useState(false)

  const handleCloseModal = () => setOpen(false)
  const { enqueueSnackbar } = useSnackbar()
  const history = useRouter()

  useEffect(() => {
    // getAccount()
  }, [])

  const handleChange = (event) => {
    const walletValue = event.target.value
    setWalletValue(walletValue)
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
        ledger: 'TestNet',
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
          <div className="content-body">
            <div className="container-fluid wider">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card login-forms">
                    <div className="card-body text-center ai-icon  text-primary">
                      <h3 className="font-h3">Connect Wallet</h3>
                      <div className="basic-form">
                        <form>
                          <div className="mb-3 mb-0">
                            <label className="radio-inline me-3">
                              <input
                                type="radio"
                                name="optradio"
                                onChange={handleChange}
                              />{' '}
                              TestNet{' '}
                            </label>
                            <label className="radio-inline me-3">
                              <input
                                type="radio"
                                name="optradio"
                                onChange={handleChange}
                              />{' '}
                              BetaNet{' '}
                            </label>
                            <label className="radio-inline me-3">
                              <input
                                type="radio"
                                name="optradio"
                                onChange={handleChange}
                              />{' '}
                              MainNet{' '}
                            </label>
                          </div>
                        </form>
                      </div>

                      <button
                        type="button"
                        onClick={handleValue}
                        className="btn btn-primary mb-2"
                        data-toggle="modal"
                        data-target="#exampleModal">
                        <i class="fas fa-link"></i> Connect
                      </button>
                      <div
                        style={{
                          display: isWalletPopupDisplay ? 'block' : 'none',
                        }}>
                        <div
                          className="modal fade"
                          id={walletValue && 'exampleModal'}>
                          <div
                            className="modal-dialog modal-dialog-centered"
                            role="document">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close MuiButtonBase-root MuiIconButton-root MuiIconButton-colorPrimary"
                                  data-dismiss="modal"></button>
                              </div>
                              <div className="modal-body">
                                <div className="logo-title">
                                  <i class="fas fa-link"></i>
                                  <h3> Connect Wallet</h3>
                                  <h5 className="color-h5">
                                    to start using Algodesk
                                  </h5>

                                  <div className="body home-container">
                                    <div className="AlgoSigner">
                                      <img
                                        className="logo"
                                        src={algosigner}
                                        alt="logo"
                                      />
                                      <span className="name">AlgoSigner</span>
                                      <svg
                                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true">
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
                                      </svg>
                                    </div>
                                    <div
                                      className="AlgoSigner"
                                      onClick={connectWallet}>
                                      <img
                                        className="logo"
                                        src={wallet}
                                        alt="logo"
                                      />
                                      <span className="name">AlgoSigner</span>
                                      <svg
                                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true">
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
                                      </svg>
                                    </div>
                                    <div className="AlgoSigner">
                                      <img
                                        className="logo"
                                        src={algorand}
                                        alt="logo"
                                      />
                                      <span className="name">AlgoSigner</span>
                                      <svg
                                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge"
                                        focusable="false"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true">
                                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
                                      </svg>
                                    </div>
                                  </div>
                                </div>

                                <div className="modal-footer">
                                  <div className="footer">
                                    <h6 className="MuiTypography-root">
                                      By connecting, I accept Algodesk Terms of
                                      Service
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="btn-close"
                      data-bs-dismiss="modal"></button>
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
        </Layout>
      </StickyProvider>
    </ThemeProvider>
  )
}
