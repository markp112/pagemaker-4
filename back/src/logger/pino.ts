import { Request, Response } from 'express';
import pino from 'pino';
 import { createId } from '@paralleldrive/cuid2';;

const genReqId = (req?: Request, res?: Response) => {
  if(req) {
    const existingId = req.id ?? req.headers["x-request-id"];
    if (existingId) return existingId;
  }
  const id = createId();
  res.setHeader('x-request-id', id);
  return id; 
};

const logger = pino({
  level: process.env.PINO_LOG_LEVEL || 'info',
  
  formatters: {
    bindings: (bindings) => {
      return {
        reqId: bindings.pid,
        node_version: process.version,
        hostName: bindings.hostname,
        level: bindings.label
      };
    },
      level: (label) => {
        return { level: label.toUpperCase() };
      }
  },
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export { logger, genReqId };


