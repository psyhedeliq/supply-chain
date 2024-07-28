import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { Request, Response, NextFunction } from 'express';
import { ValidateFunction } from 'ajv';

const ajv = new Ajv();
addFormats(ajv);

export const validatePayload = (validator: ValidateFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const valid = validator(req.body);
        if (!valid) {
            const errors = validator.errors;
            return res.status(400).json({ errors });
        }
        next();
    };
};

export const itemInputSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        color: { type: 'string' },
        price: { type: 'number' },
    },
    required: ['id', 'name', 'color', 'price'],
    additionalProperties: false,
};

export const itemUpdateInputSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        color: { type: 'string' },
        price: { type: 'number' },
    },
    additionalProperties: false,
};

export const eventInputSchema = {
    type: 'object',
    properties: {
        location: { type: 'string' },
        custodian: { type: 'string' },
        timestamp: { type: 'string', format: 'date-time' },
    },
    required: ['location', 'custodian'],
    additionalProperties: false,
};

export const validateItemInput = ajv.compile(itemInputSchema);
export const validateItemUpdateInput = ajv.compile(itemUpdateInputSchema);
export const validateEventInput = ajv.compile(eventInputSchema);
