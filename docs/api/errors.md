# Error Handling

This document provides information about error handling in the AnimalSnap Search API.

## Error Response Format

When an error occurs, the API returns a JSON response with the following structure:

```json
{
  "error": {
    "code": "error_code",
    "message": "A human-readable error message",
    "status": 400,
    "details": {
      // Additional error details (optional)
    }
  }
}
```

## HTTP Status Codes

The API uses standard HTTP status codes to indicate the success or failure of a request:

| Status Code | Description                                                  |
|-------------|--------------------------------------------------------------|
| 200         | OK - The request was successful                              |
| 201         | Created - The resource was successfully created              |
| 400         | Bad Request - The request was invalid                        |
| 401         | Unauthorized - Authentication is required                    |
| 403         | Forbidden - The request is not allowed                       |
| 404         | Not Found - The requested resource was not found             |
| 422         | Unprocessable Entity - The request was well-formed but invalid |
| 429         | Too Many Requests - Rate limit exceeded                      |
| 500         | Internal Server Error - Something went wrong on the server   |
| 503         | Service Unavailable - The service is temporarily unavailable |

## Error Codes

The API uses the following error codes:

| Error Code                | Description                                                  |
|---------------------------|--------------------------------------------------------------|
| `invalid_request`         | The request was invalid                                      |
| `authentication_required` | Authentication is required                                   |
| `invalid_credentials`     | The provided credentials are invalid                         |
| `access_denied`           | The request is not allowed                                   |
| `resource_not_found`      | The requested resource was not found                         |
| `validation_error`        | The request was well-formed but invalid                      |
| `rate_limit_exceeded`     | Rate limit exceeded                                          |
| `server_error`            | Something went wrong on the server                           |
| `service_unavailable`     | The service is temporarily unavailable                       |
| `photo_not_available`     | The requested photo is not available                         |
| `payment_required`        | Payment is required to access this resource                  |
| `payment_failed`          | The payment failed                                           |
| `invalid_payment_method`  | The payment method is invalid                                |
| `download_expired`        | The download token has expired                               |
| `invalid_download_token`  | The download token is invalid                                |

## Validation Errors

For validation errors (status code 422), the API returns detailed information about the validation errors:

```json
{
  "error": {
    "code": "validation_error",
    "message": "The request was well-formed but invalid",
    "status": 422,
    "details": {
      "fields": {
        "email": ["Email is required", "Email is invalid"],
        "password": ["Password must be at least 8 characters long"]
      }
    }
  }
}
```

## Error Handling Examples

### Authentication Error

```json
{
  "error": {
    "code": "authentication_required",
    "message": "Authentication is required to access this resource",
    "status": 401
  }
}
```

### Resource Not Found

```json
{
  "error": {
    "code": "resource_not_found",
    "message": "The requested photo was not found",
    "status": 404
  }
}
```

### Rate Limit Exceeded

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Please try again later.",
    "status": 429,
    "details": {
      "rate_limit": {
        "limit": 100,
        "remaining": 0,
        "reset": 1625097600
      }
    }
  }
}
```

### Payment Required

```json
{
  "error": {
    "code": "payment_required",
    "message": "Payment is required to download this photo",
    "status": 402,
    "details": {
      "photo_id": "photo-123",
      "price": {
        "small": "$0.50",
        "regular": "$1.50",
        "full": "$2.00"
      }
    }
  }
}
```

## Handling Errors in Your Application

When making requests to the AnimalSnap Search API, always check for error responses and handle them appropriately. Here's an example of error handling in JavaScript:

```javascript
async function searchPhotos(query) {
  try {
    const response = await fetch(`https://api.animalsnap.example.com/v1/photos/search?query=${encodeURIComponent(query)}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message || 'An error occurred');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching photos:', error);
    throw error;
  }
}
```

