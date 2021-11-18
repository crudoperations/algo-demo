import {
  TextField,
  Grid,
  ListItem,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
} from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'
import { getSelectedAccount } from 'function/HelperFunction'

export default function CreateAssets({
  setModal,
  assets,
  txParamsJS,
  getAssets,
}) {
  const [assetName, setAssetName] = useState('')
  const [decimal, setDecimal] = useState('')
  const [total, setTotal] = useState('')
  const [unitName, setUnitName] = useState('')
  const [notes, setNotes] = useState('')
  const handleChangeName = (event) => {
    const assetVal = event.target.value
    setAssetName(assetVal)
  }
  const handleChangeDeciamal = (event) => {
    const decimalVal = event.target.value
    setDecimal(decimalVal)
  }
  const handleChangeTotal = (event) => {
    const totalVal = event.target.value
    setTotal(totalVal)
  }
  const handleChangeUnitName = (event) => {
    const unitVal = event.target.value
    setUnitName(unitVal)
  }

  const handleChangeNotes = (event) => {
    const noteVal = event.target.value
    setNotes(noteVal)
  }

  const createAsset = () => {
    let _AlgoSigner = AlgoSigner || null

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: getSelectedAccount(),
      assetName: assetName,
      unitName: unitName,
      total: +total,
      decimals: +decimal,
      note: AlgoSigner.encoding.stringToByteArray(notes),
      suggestedParams: { ...txParamsJS },
    })

    const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte())

    _AlgoSigner
      .signTxn([{ txn: txn_b64 }])
      .then((d) => {
        getAssets()
      })
      .catch((e) => {})
      .finally(() => {})
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    input: {
      color: '#666',
    },
    note: {
      height: '20rem',
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
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  const handleClose = () => {
    setModal(false)
  }

  const AddSwitch = withStyles({
    switchBase: {
      color: '#03B68C',
      '&$checked': {
        color: '#03B68C',
      },
      '&$checked + $track': {
        backgroundColor: '#03B68C',
      },
    },
    checked: {},
    track: {},
  })(Switch)

  const CreateButton = withStyles((theme) => ({
    root: {
      color: '#fff',

      backgroundColor: '#03B68C',
      '&:hover': {
        background:
          'linear-gradient(56.21deg, #0BB68C -43.1%, #60DD8B 132.97%)',
        backgroundColor: '#03B68C',
        color: '#fff',
      },
    },
  }))(Button)

  return (
    <>
      <Grid item xs={12}>
        <ListItem>
          <div
            style={{
              marginLeft: '37rem',
              marginBottom: '2rem',
              cursor: 'pointer',
            }}
            onClick={handleClose}>
            <HighlightOffIcon style={{ color: '#03B68C' }} />
          </div>
        </ListItem>
      </Grid>
      <Grid
        container
        spacing={24}
        justifyContent="center"
        style={{
          overflowY: 'scroll',
          overflowX: 'clip',
          maxHeight: '400px',
        }}>
        <Grid item xs={12}>
          <ListItem style={{ fontSize: '20px', fontWeight: '700' }}>
            Asset details
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <ListItem>
            <TextField
              // multiline={true}
              fullWidth
              className={classes.inputText}
              value={assetName}
              onChange={handleChangeName}
              label="Name*"
              variant="outlined"
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <ListItem>
            <TextField
              multiline={true}
              fullWidth
              className={classes.inputText}
              onChange={handleChangeUnitName}
              label="Unit name*"
              variant="outlined"
              value={unitName}
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <ListItem>
            <TextField
              multiline={true}
              fullWidth
              className={classes.inputText}
              onChange={handleChangeTotal}
              label="Total supply*"
              variant="outlined"
              value={total}
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <ListItem>
            <TextField
              multiline={true}
              fullWidth
              className={classes.inputText}
              onChange={handleChangeDeciamal}
              label="Decimals"
              variant="outlined"
              value={decimal}
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={12}>
          <ListItem style={{ fontSize: '20px', fontWeight: '700' }}>
            Asset management
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <div style={{ marginLeft: '16rem' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <AddSwitch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                  />
                }
              />
            </FormGroup>
          </div>
          <ListItem>
            <TextField
              multiline={true}
              fullWidth
              className={classes.inputText}
              InputProps={{
                className: classes.input,
              }}
              label="Manger"
              variant="outlined"
              value="XJE4PSPQPFSUSIH76OIISHITKV5KO3NLAE3ISJHMARS722FRE5AR4XUXUQ"
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <div style={{ marginLeft: '16rem' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <AddSwitch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                  />
                }
              />
            </FormGroup>
          </div>
          <ListItem>
            <TextField
              multiline={true}
              fullWidth
              className={classes.inputText}
              InputProps={{
                className: classes.input,
              }}
              label="Reserve"
              variant="outlined"
              value="XJE4PSPQPFSUSIH76OIISHITKV5KO3NLAE3ISJHMARS722FRE5AR4XUXUQ"
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <div style={{ marginLeft: '16rem' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <AddSwitch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                  />
                }
              />
            </FormGroup>
          </div>
          <ListItem>
            <TextField
              multiline={true}
              fullWidth
              className={classes.inputText}
              InputProps={{
                className: classes.input,
              }}
              label="Freeze"
              variant="outlined"
              value="XJE4PSPQPFSUSIH76OIISHITKV5KO3NLAE3ISJHMARS722FRE5AR4XUXUQ"
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <div style={{ marginLeft: '16rem' }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <AddSwitch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                  />
                }
              />
            </FormGroup>
          </div>
          <ListItem>
            <TextField
              multiline={true}
              fullWidth
              className={classes.inputText}
              InputProps={{
                className: classes.input,
              }}
              label="Clawback"
              variant="outlined"
              value="XJE4PSPQPFSUSIH76OIISHITKV5KO3NLAE3ISJHMARS722FRE5AR4XUXUQ"
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={12}>
          <ListItem>
            <TextField
              multiline={true}
              fullWidth
              className={classes.inputText}
              InputProps={{
                className: classes.input,
              }}
              onChange={handleChangeNotes}
              value={notes}
              label="Note"
              variant="outlined"
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <CreateButton
          variant="contained"
          color="primary"
          style={{ cursor: 'pointer' }}
          className={classes.inputText}
          onClick={createAsset}
          InputProps={{
            className: classes.note,
          }}>
          Create
        </CreateButton>
      </Grid>
    </>
  )
}
