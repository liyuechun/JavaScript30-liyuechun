import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'body': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'demo-containerclocks': {
    'background': '#3cd19e',
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': '%H', 'value': 1 }],
    'height': [{ 'unit': 'vh', 'value': 100 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'overflow': 'hidden'
  },
  'clock': {
    'borderRadius': '50%',
    'background': '-webkit-radial-gradient(#000000, #000000 0.1em, #ffffff 0.1em, #ffffff), #fff',
    'background': 'radial-gradient(#000000, #000000 0.1em, #ffffff 0.1em, #ffffff), #fff',
    'display': 'inline-block',
    'margin': [{ 'unit': '%V', 'value': 0.01 }, { 'unit': '%H', 'value': 0.01 }, { 'unit': '%V', 'value': 0.01 }, { 'unit': '%H', 'value': 0.01 }],
    'paddingBottom': [{ 'unit': '%V', 'value': 0.31 }],
    'position': 'relative',
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'width': [{ 'unit': '%H', 'value': 0.31 }],
    'opacity': '0',
    'WebkitTransform': 'translateY(-40%)',
    'transform': 'translateY(-40%)'
  },
  'clockshow': {
    'opacity': '1',
    'WebkitTransform': 'translateY(-50%)',
    'transform': 'translateY(-50%)',
    'WebkitTransition': 'all 2.5s 0.5s cubic-bezier(0.12, 1.03, 0.34, 1)',
    'transition': 'all 2.5s 0.5s cubic-bezier(0.12, 1.03, 0.34, 1)'
  },
  'clock::after': {
    'background': 'red',
    'borderRadius': '50%',
    'content': '""',
    'position': 'absolute',
    'left': [{ 'unit': '%H', 'value': 0.5 }],
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'WebkitTransform': 'translate(-50%, -50%)',
    'transform': 'translate(-50%, -50%)',
    'width': [{ 'unit': '%H', 'value': 0.04 }],
    'height': [{ 'unit': '%V', 'value': 0.04 }],
    'zIndex': '10'
  },
  'minutes-container': {
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }]
  },
  'hours-container': {
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }]
  },
  'seconds-container': {
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': 0 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'left': [{ 'unit': 'px', 'value': 0 }]
  },
  'hours-container': {
    'WebkitAnimation': 'rotate 43200s infinite linear',
    'animation': 'rotate 43200s infinite linear'
  },
  'linear minutes-container': {
    'WebkitAnimation': 'rotate 3600s infinite linear',
    'animation': 'rotate 3600s infinite linear'
  },
  'linear seconds-container': {
    'WebkitAnimation': 'rotate 60s infinite linear',
    'animation': 'rotate 60s infinite linear'
  },
  'steps minutes-container': {
    'WebkitAnimation': 'rotate 3600s infinite steps(60)',
    'animation': 'rotate 3600s infinite steps(60)'
  },
  'steps seconds-container': {
    'WebkitAnimation': 'rotate 60s infinite steps(60)',
    'animation': 'rotate 60s infinite steps(60)'
  },
  'localsteps minutes-container': {
    'WebkitAnimation': 'none',
    'animation': 'none'
  },
  'bounce minutes-container': {
    'WebkitTransition': '-webkit-transform 0.3s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
    'transition': '-webkit-transform 0.3s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
    'transition': 'transform 0.3s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
    'transition': 'transform 0.3s cubic-bezier(0.4, 2.08, 0.55, 0.44), -webkit-transform 0.3s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
  },
  'bounce seconds-container': {
    'WebkitTransition': '-webkit-transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
    'transition': '-webkit-transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
    'transition': 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
    'transition': 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44), -webkit-transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
  },
  'hours': {
    'background': '#000',
    'width': [{ 'unit': '%H', 'value': 0.035 }],
    'height': [{ 'unit': '%V', 'value': 0.4 }],
    'position': 'absolute',
    'left': [{ 'unit': '%H', 'value': 0.4825 }],
    'top': [{ 'unit': '%V', 'value': 0.22 }],
    'WebkitTransformOrigin': '50% 71%',
    'transformOrigin': '50% 71%'
  },
  'minutes': {
    'background': '#000',
    'width': [{ 'unit': '%H', 'value': 0.035 }],
    'height': [{ 'unit': '%V', 'value': 0.55 }],
    'position': 'absolute',
    'left': [{ 'unit': '%H', 'value': 0.4825 }],
    'top': [{ 'unit': '%V', 'value': 0.07 }],
    'WebkitTransformOrigin': '50% 78.5%',
    'transformOrigin': '50% 78.5%'
  },
  'seconds': {
    'background': 'red',
    'width': [{ 'unit': '%H', 'value': 0.015 }],
    'height': [{ 'unit': '%V', 'value': 0.42 }],
    'position': 'absolute',
    'left': [{ 'unit': '%H', 'value': 0.4925 }],
    'top': [{ 'unit': '%V', 'value': 0.2 }],
    'WebkitTransformOrigin': '50% 71%',
    'transformOrigin': '50% 71%',
    'zIndex': '8'
  },
  'label': {
    'background': '#fff',
    'borderRadius': '0.25em',
    'color': '#000',
    'fontFamily': 'MyriadPro-Regular, 'Myriad Pro Regular', MyriadPro, 'Myriad Pro', Helvetica, Arial, sans-serif',
    'fontSize': [{ 'unit': 'em', 'value': 1 }],
    'fontWeight': 'bold',
    'textTransform': 'uppercase',
    'padding': [{ 'unit': 'em', 'value': 0.5 }, { 'unit': 'em', 'value': 0.75 }, { 'unit': 'em', 'value': 0.25 }, { 'unit': 'em', 'value': 0.75 }],
    'position': 'absolute',
    'top': [{ 'unit': 'em', 'value': -4 }],
    'left': [{ 'unit': '%H', 'value': 0.5 }],
    'WebkitTransform': 'translate(-50%, 0)',
    'transform': 'translate(-50%, 0)'
  },
  'clockstation': {
    'background': '#fff url(//cssanimation.rocks/assets/images/posts/clocks/station_clock.svg) no-repeat center',
    'backgroundSize': '95%',
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'em', 'value': 0.5 }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.2)' }, { 'unit': 'string', 'value': 'rgba(0, 0, 0, 0.2)' }, { 'unit': 'string', 'value': 'inset' }]
  },
  'clockstation seconds::before': {
    'background': 'red',
    'borderRadius': '50%',
    'content': '""',
    'position': 'absolute',
    'top': [{ 'unit': '%V', 'value': -0.09 }],
    'left': [{ 'unit': '%H', 'value': -2 }],
    'height': [{ 'unit': '%V', 'value': 0.18 }],
    'width': [{ 'unit': '%H', 'value': 5 }]
  },
  'clockios7': {
    'background': '#fff url(/assets/images/posts/clocks/ios_clock.svg) no-repeat center',
    'backgroundSize': '88%'
  },
  'clockios7:before': {
    'background': 'black',
    'borderRadius': '50%',
    'content': '""',
    'position': 'absolute',
    'left': [{ 'unit': '%H', 'value': 0.5 }],
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'WebkitTransform': 'translate(-50%, -50%)',
    'transform': 'translate(-50%, -50%)',
    'width': [{ 'unit': '%H', 'value': 0.06 }],
    'height': [{ 'unit': '%V', 'value': 0.06 }],
    'zIndex': '0'
  },
  'clockios7:after': {
    'width': [{ 'unit': '%H', 'value': 0.02 }],
    'height': [{ 'unit': '%V', 'value': 0.02 }]
  },
  'clockios7 seconds': {
    'borderRadius': '200%/10%',
    'height': [{ 'unit': '%V', 'value': 0.3 }],
    'left': [{ 'unit': '%H', 'value': 0.495 }],
    'top': [{ 'unit': '%V', 'value': 0.2 }],
    'width': [{ 'unit': '%H', 'value': 0.01 }],
    'WebkitTransformOrigin': '50% 100%',
    'transformOrigin': '50% 100%'
  },
  'clockios7 minutes': {
    'borderRadius': '150%/10%',
    'width': [{ 'unit': '%H', 'value': 0.02 }],
    'height': [{ 'unit': '%V', 'value': 0.35 }],
    'left': [{ 'unit': '%H', 'value': 0.49 }],
    'top': [{ 'unit': '%V', 'value': 0.15 }],
    'WebkitTransformOrigin': '50% 100%',
    'transformOrigin': '50% 100%'
  },
  'clockios7 hours': {
    'borderRadius': '85%/10%',
    'width': [{ 'unit': '%H', 'value': 0.02 }],
    'height': [{ 'unit': '%V', 'value': 0.2 }],
    'left': [{ 'unit': '%H', 'value': 0.49 }],
    'top': [{ 'unit': '%V', 'value': 0.3 }],
    'WebkitTransformOrigin': '50% 100%',
    'transformOrigin': '50% 100%'
  },
  'clocksimple': {
    'background': '#fff url(/assets/images/posts/clocks/ios_clock.svg) no-repeat center',
    'backgroundSize': '88%'
  },
  'clocksimple:after': {
    'backgroundColor': '#000',
    'width': [{ 'unit': '%H', 'value': 0.05 }],
    'height': [{ 'unit': '%V', 'value': 0.05 }]
  },
  'clocksimple seconds': {
    'backgroundColor': '#000',
    'height': [{ 'unit': '%V', 'value': 0.45 }],
    'left': [{ 'unit': '%H', 'value': 0.495 }],
    'top': [{ 'unit': '%V', 'value': 0.14 }],
    'width': [{ 'unit': '%H', 'value': 0.01 }],
    'WebkitTransformOrigin': '50% 80%',
    'transformOrigin': '50% 80%'
  },
  'clocksimple minutes': {
    'width': [{ 'unit': '%H', 'value': 0.02 }],
    'height': [{ 'unit': '%V', 'value': 0.4 }],
    'left': [{ 'unit': '%H', 'value': 0.49 }],
    'top': [{ 'unit': '%V', 'value': 0.1 }],
    'WebkitTransformOrigin': '50% 100%',
    'transformOrigin': '50% 100%'
  },
  'clocksimple hours': {
    'width': [{ 'unit': '%H', 'value': 0.025 }],
    'height': [{ 'unit': '%V', 'value': 0.2 }],
    'left': [{ 'unit': '%H', 'value': 0.4875 }],
    'top': [{ 'unit': '%V', 'value': 0.3 }],
    'WebkitTransformOrigin': '50% 100%',
    'transformOrigin': '50% 100%'
  },
  'hoursangled': {
    'WebkitTransform': 'rotateZ(-40deg)',
    'transform': 'rotateZ(-40deg)'
  },
  'minutesangled': {
    'WebkitTransform': 'rotateZ(40deg)',
    'transform': 'rotateZ(40deg)'
  }
});
