import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'html': {
    'fontSize': [{ 'unit': 'px', 'value': 10 }],
    'background': 'url(http://i.imgur.com/b9r5sEL.jpg) bottom center',
    'backgroundSize': 'cover'
  },
  'body': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontFamily': 'sans-serif'
  },
  'html': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontFamily': 'sans-serif'
  },
  'keys': {
    'display': 'flex',
    'flex': '1',
    'minHeight': [{ 'unit': 'vh', 'value': 100 }],
    // height: 200px;
    'alignItems': 'center',
    'justifyContent': 'center'
  },
  'key': {
    'border': [{ 'unit': 'rem', 'value': 0.4 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'black' }],
    'borderRadius': '.5rem',
    'margin': [{ 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 1 }],
    'fontSize': [{ 'unit': 'rem', 'value': 1.5 }],
    'padding': [{ 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 0.5 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'rem', 'value': 0.5 }],
    'transition': 'all .07s ease',
    'width': [{ 'unit': 'rem', 'value': 10 }],
    'textAlign': 'center',
    'color': 'white',
    'background': 'rgba(0, 0, 0, 0.4)',
    'textShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 0.5 }, { 'unit': 'string', 'value': 'black' }]
  },
  'playing': {
    'transform': 'scale(1.1)',
    'borderColor': '#ffc600',
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'rem', 'value': 1 }, { 'unit': 'string', 'value': '#ffc600' }]
  },
  'kbd': {
    'display': 'block',
    'fontSize': [{ 'unit': 'rem', 'value': 4 }]
  },
  'sound': {
    'fontSize': [{ 'unit': 'rem', 'value': 1.2 }],
    'textTransform': 'uppercase',
    'letterSpacing': [{ 'unit': 'rem', 'value': 0.1 }],
    'color': '#ffc600'
  }
});
