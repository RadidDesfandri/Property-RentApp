const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000',
  'https://property-rent-app-one.vercel.app',
];

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if ((origin && allowedOrigins.indexOf(origin) !== -1) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
