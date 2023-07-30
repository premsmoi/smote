import { createUseStyles } from 'react-jss';

export const useNoteItemStyles = createUseStyles({
  noteItem: {
    border: '2px solid black',
    lineHeight: '50px',
    padding: '5px',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    position: 'absolute'
  },
  header: {
    height: '25px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  moveNoteArea: {
    width: '100%',
    height: 'inherit',
    cursor: 'grab',
    touchAction: 'none'
  },
  colorPicker: {
    position: 'absolute',
    top: '30px',
    backgroundColor: 'white',
    overflow: 'hidden',
    transition: 'max-height 0.2s ease-out',
    display: 'flex',
    border: '0px solid lightgrey'
  },
  color: {
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  noteEditor: {
    width: '195px',
    height: '195px',
    fontSize: '16px',
    fontFamily: 'inherit',
    color: 'inherit',
    border: 'unset',
    backgroundColor: 'unset',
    outline: 'unset',
    resize: 'none'
  },
  hide: {
    transition: '0.01s',
    transform: 'translateX(-9999px)'
  }
});
