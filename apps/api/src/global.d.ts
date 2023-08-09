import 'multer';
import { IResult } from 'ua-parser-js';

declare global {
  declare namespace Express {
    export interface Request {
      _metadata: {
        timestamp: number;
        timeZone: string;
        userAgent: IResult;
      };
    }

    export interface Response {
      message: string;
      success: boolean;
    }
  }
}
