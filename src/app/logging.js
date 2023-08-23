import winston from 'winston'

export const logger = winston.createLogger({
    Level: 'info',
    format: winston.format.json(),
    transport: [
        new winston.transport.Console({

        })
    ]
    
})