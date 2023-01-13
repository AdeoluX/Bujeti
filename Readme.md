# Bujeti Assesment

Microservice template

## Testing Proceedure

```
## Steps to run code.
```

- run `npm i`
- run `npm start`
- runs on `PORT: 5115`

## End Points
- base_url is `http://localhost:5115`

- endpoint to get all urban area `GET` `${base_url}/api/v1/urban-areas`

- endpoint to get all user `GET` `${base_url}/api/v1/urban-area?area=<sample-urban-area>`

## Environment Variable

- Teleport Base url `TELEPORT_BASE_URL=https://api.teleport.org/api`

- Success response is in the format

```json
{
    "status": 200,
    "success": true,
    "message": "success",
    "data": [
        {
            ...
        }
    ]
}
```

- Error response is in the format

```json
{
    "status": <error_code>,
    "success": false,
    "message": "Sample error message",
    "data": []
}
```

- Responses with status code 422 (validation errors) will contain a JSON object as message, describing the errors for each field

```json
{
  "status": 422,
  "success": false,
  "message": {
    "custom_field_1": [
      "Validation error message for custom_field_1",
      "Another validation error message for custom_field_1"
    ],
    "custom_field_2": ["Validation error message for custom_field_2"]
  },
  "data": []
}
```
