import {makeStyles} from "@material-ui/core/styles/index";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
    display: 'flex',
    flexDirection: 'column',
    border: 'solid 2px grey'
  },
  form: {
    width: '10%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
  },
  buttons: {
    '& > *': {
      display: 'flex',
      justifyContent: 'space-between',
      margin: theme.spacing(3),
      // marginLeft: theme.spacing(12),
    },
  },
  formEdit: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '96%',
    },
  },
  close: {
    backgroundColor: '#f5f5f5',
    color: 'black',
    width: '1px'
  },
  save: {
    color: 'black',
    fontWeight: '900',
    backgroundColor: 'green'
  }
}));

export default useStyles;