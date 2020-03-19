import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  formContainer: {
    '& .MuiTextField-root': {
      // margin: ' 1rem 0',
    },
  },
  exerciseNameField: {
    width: '103px',
    '& input': {
      'font-size': '13px',
    },
  },
  weightRepsField: {
    width: '34px',
    float: 'right',
    '& .MuiOutlinedInput-input': {
      padding: '0.50rem 0',
      margin: '0 0 0 5px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      'padding-left': '0',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(7px, -6px) scale(0.75)',
    },
  },
});
