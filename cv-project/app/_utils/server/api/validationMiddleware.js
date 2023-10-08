import joi from "joi";

export async function validateMiddleware(req, schema) {
    if (!schema) return;

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
    };

    const body = await req.json();
    const { error, value } = schema.validate(body, options);

    if (error) {
        throw `Validation error: ${error.details.map(detail = detail.message).join(', ')}`;
    }
    req.json = () => value;
}