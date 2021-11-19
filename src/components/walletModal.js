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
      style={{
        marginTop: '5rem',
      }}>
      <Grid
        item
        md={3}
        spacing={5}
        style={{ background: 'white', height: '400px', borderRadius: '10px' }}
        justifyContent="center"
        alignItems="center">
        <Grid
          item
          md={12}
          container
          justifyContent="flex-end"
          alignItems="center"
          style={{ height: '10%', color: '#03B68C' }}>
          <Grid
            style={{ marginRight: '2rem', cursor: 'pointer' }}
            onClick={modalClose}>
            <HighlightOffIcon />
          </Grid>
        </Grid>
        <Grid
          item
          container
          md={12}
          style={{ height: '90%', overflowX: 'hidden' }}>
          <Grid item md={12} container style={{ height: '30%' }}>
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
              <Grid style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                Connect wallet
              </Grid>
            </Grid>
            <Grid item md={12} container justifyContent="center">
              <Grid style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                to start using Algodesk
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} container style={{ height: '50%' }}>
            <Grid
              item
              md={12}
              container
              className="buttons"
              alignItems="center"
              onClick={walletConnect}>
              <Grid item md={3} container justifyContent="center">
                <Grid>
                  <img
                    src={algosigner}
                    alt="logo"
                    style={{ height: '30px', width: '30px' }}
                  />
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid>Algosigner</Grid>
              </Grid>
              <Grid item md={3} container justifyContent="flex-start">
                <Grid>
                  <ArrowForwardIosIcon
                    style={{ height: '1rem', width: '1rem' }}
                  />
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
                  <img
                    src={wallet}
                    alt="logo"
                    style={{ height: '30px', width: '30px' }}
                  />
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid>MyAlgo Wallet</Grid>
              </Grid>
              <Grid item md={3} container justifyContent="flex-start">
                <Grid>
                  <ArrowForwardIosIcon
                    style={{ height: '1rem', width: '1rem' }}
                  />
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
                  <img
                    src={algorand}
                    alt="logo"
                    style={{ height: '30px', width: '30px' }}
                  />
                </Grid>
              </Grid>
              <Grid item md={6}>
                <Grid>Algorand Mobile Wallet</Grid>
              </Grid>
              <Grid item md={3} container justifyContent="flex-start">
                <Grid>
                  <ArrowForwardIosIcon
                    style={{ height: '1rem', width: '1rem' }}
                  />
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
              style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
              By connecting, I accept Algodesk Terms of Service
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
