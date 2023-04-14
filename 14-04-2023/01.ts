const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  WARNING: 'WARNING',
  ERROR: 'ERROR'
} as const

type ObjectValues<T> = T[keyof T]

type LogLevel1 = keyof typeof LOG_LEVEL;

type LogLevel = ObjectValues<typeof LOG_LEVEL>

// type LogLevel = "DEBUG" | "WARNING" | "ERROR"

function log(message: string, level: LogLevel) {

}

log('hey', LOG_LEVEL.ERROR)
log('hey', 'DEBUG')
log('bug', 'WARNING')

// type can't be appended too but interface can be appended too


// interface extend & and can merge together 
// two interface with same name merge property together 


type JSONValue = string | number | boolean | { [key: string]: JSONValue }

// if type extend another type then use interface 

export const MIME_TYPE = {
  json: 'application/json',
  svg: 'image/svg+html',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  binary: 'image/octet-stream'
} as const;

// const MIME_TYPE: {
//   readonly json: "application/json";
//   readonly svg: "image/svg+html";
//   readonly png: "image/png";
//   readonly jpg: "image/jpg";
//   readonly gif: "image/gif";
//   readonly ico: "image/x-icon";
//   readonly binary: "image/octet-stream";
// }

//after removing as const 
// const MIME_TYPE: {
//   json: string;
//   svg: string;
//   png: string;
//   jpg: string;
//   gif: string;
//   ico: string;
//   binary: string;
// }

export const ALLOWED_IMAGE_MIME_TYPES = [
  MIME_TYPE.jpg,
  MIME_TYPE.binary,
  MIME_TYPE.gif,
  MIME_TYPE.ico,
  MIME_TYPE.json,
  MIME_TYPE.svg,
  MIME_TYPE.png
] as const

export const AllowedImageMimeTypes = typeof ALLOWED_IMAGE_MIME_TYPES


export const TEXT_ALIGN = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right'
} as const

export const VERTICAL_ALIGN = {
  TOP: 'top',
  CENTER: 'center',
  BOTTOM: 'bottom',
} as const

export const COOKIES = {
  AUTH_STATE_COOKIE: 'expulus-auth'
} as const