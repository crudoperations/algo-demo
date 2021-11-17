import React from 'react'
export const CustomMessage = (message, type, enqueueSnackbar) => {
  enqueueSnackbar(message, {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    variant: type,
    autoHideDuration: 2000,
  })
}

let selectedAccount = ''
export function setSelectedAccount(val) {
  selectedAccount = val
}

export function getSelectedAccount() {
  return selectedAccount
}

export function getAddressParams() {
  return localStorage.getItem('USER_ADDRESS')
}
