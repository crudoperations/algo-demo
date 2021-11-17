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

export default function CreateAssets({ setModal, assets }) {
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
            <InputTextField
              multiline={true}
              fullWidth
              className={classes.margin}
              label="Name*"
              variant="outlined"
              value=""
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <ListItem>
            <InputTextField
              multiline={true}
              fullWidth
              className={classes.margin}
              label="Unit name*"
              variant="outlined"
              value=""
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <ListItem>
            <InputTextField
              multiline={true}
              fullWidth
              className={classes.margin}
              label="Total supply*"
              variant="outlined"
              value=""
              id="custom-css-outlined-input"
            />
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <ListItem>
            <InputTextField
              multiline={true}
              fullWidth
              className={classes.margin}
              label="Decimals"
              variant="outlined"
              value=""
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
          <div style={{ marginLeft: '12rem' }}>
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
            <InputTextField
              multiline={true}
              fullWidth
              className={classes.margin}
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
          <div style={{ marginLeft: '12rem' }}>
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
            <InputTextField
              multiline={true}
              fullWidth
              className={classes.margin}
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
          <div style={{ marginLeft: '12rem' }}>
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
            <InputTextField
              multiline={true}
              fullWidth
              className={classes.margin}
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
          <div style={{ marginLeft: '12rem' }}>
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
            <InputTextField
              multiline={true}
              fullWidth
              className={classes.margin}
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
            <InputTextField
              multiline={true}
              fullWidth
              className={classes.margin}
              InputProps={{
                className: classes.input,
              }}
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
          className={classes.margin}
          InputProps={{
            className: classes.note,
          }}>
          Create
        </CreateButton>
      </Grid>
    </>
  )
}
