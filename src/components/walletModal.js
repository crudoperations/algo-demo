import React from 'react'
import { Grid } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import algosigner from '../assets/image/algosigner.png'
import wallet from '../assets/image/wallet.png'
import algorand from '../assets/image/algorand mobile wallet.png'

export default function WalletModal({ connectWallet, setWalletOpen }) {
  const walletConnect = () => {
    setWalletOpen(false)
    connectWallet()
  }

  const modalClose = () => {
    setWalletOpen(false)
  }
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="walletModal">
      <Grid
        item
        md={3}
        spacing={5}
        className="walletGrid"
        justifyContent="center"
        alignItems="center">
        <Grid
          item
          md={12}
          container
          justifyContent="flex-end"
          alignItems="center"
          className="walletFlex">
          <Grid className="walletCloseBtn" onClick={modalClose}>
            <HighlightOffIcon />
          </Grid>
        </Grid>
        <Grid item container md={12} className="walletBox">
          <Grid item md={12} container className="walletLogo">
            <Grid
              item
              md={12}
              container
              justifyContent="center"
              alignItems="center">
              <div className="logo-title">
                <Grid>
                  <i class="fas fa-link"></i>
                </Grid>
              </div>
            </Grid>
            <Grid item md={12} container justifyContent="center">
              <Grid className="connectWallet">Connect wallet</Grid>
            </Grid>
            <Grid item md={12} container justifyContent="center">
              <Grid className="walletStart">to start using Algodesk</Grid>
            </Grid>
          </Grid>
          <Grid item md={12} container className="walletTable">
            <Grid
              item
              md={12}
              container
              className="buttons"
              alignItems="center"
              onClick={walletConnect}>
              <Grid item md={3} container justifyContent="center">
                <Grid>
                  <img src={algosigner} alt="logo" className="walletImg" />
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid>Algosigner</Grid>
              </Grid>
              <Grid item md={3} container justifyContent="flex-start">
                <Grid>
                  <ArrowForwardIosIcon className="arrowIcon" />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={12}
              container
              className="buttons"
              alignItems="center">
              <Grid item md={3} container justifyContent="center">
                <Grid>
                  <img src={wallet} alt="logo" className="walletImg" />
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid>MyAlgo Wallet</Grid>
              </Grid>
              <Grid item md={3} container justifyContent="flex-start">
                <Grid>
                  <ArrowForwardIosIcon className="arrowIcon" />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={12}
              container
              className="buttons"
              alignItems="center">
              <Grid item md={3} container justifyContent="center">
                <Grid>
                  <img src={algorand} alt="logo" className="walletImg" />
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid>Algorand Mobile Wallet</Grid>
              </Grid>
              <Grid item md={3} container justifyContent="flex-start">
                <Grid>
                  <ArrowForwardIosIcon className="arrowIcon" />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={12}
              container
              //   className="buttons"
              alignItems="center"
              justifyContent="center"
              className="walletStart">
              By connecting, I accept Algodesk Terms of Service
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
