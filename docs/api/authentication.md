# Authentication

This document provides information about authentication methods for the AnimalSnap Search API.

## API Key Authentication

The primary method of authentication for the AnimalSnap Search API is API key authentication. You can obtain an API key by registering on the [AnimalSnap Search website](https://animalsnap.example.com).

### Using API Keys in Requests

Include your API key in the request header:

```
Authorization: Bearer YOUR_API_KEY
```

Example:

```bash
curl -X GET "https://api.animalsnap.example.com/v1/photos/search?query=golden+retriever" \
  -H "Authorization: Bearer your_api_key"
```

### API Key Security

- Keep your API key secure and do not share it publicly
- Do not include your API key in client-side code
- Use environment variables to store your API key in your application
- Rotate your API key periodically for enhanced security

## Wallet Authentication

For payment-related operations, the AnimalSnap Search API also supports wallet authentication using Web3 wallets.

### Wallet Authentication Flow

1. User connects their Web3 wallet (e.g., MetaMask) to your application
2. Your application requests a signature from the user's wallet
3. The signature is sent to the AnimalSnap Search API for verification
4. If the signature is valid, the API returns a session token
5. The session token is used for subsequent requests

### Example: Wallet Authentication

```javascript
// Using ethers.js
const ethers = require('ethers');

async function authenticateWithWallet() {
  // Connect to the user's wallet
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  
  // Get the authentication message from the API
  const response = await fetch('https://api.animalsnap.example.com/v1/auth/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ address })
  });
  
  const { message } = await response.json();
  
  // Sign the message
  const signature = await signer.signMessage(message);
  
  // Verify the signature and get a session token
  const authResponse = await fetch('https://api.animalsnap.example.com/v1/auth/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ address, signature, message })
  });
  
  const { token } = await authResponse.json();
  
  // Use the token for subsequent requests
  return token;
}
```

## Session Tokens

After successful authentication with a wallet, the API returns a session token that can be used for subsequent requests.

### Using Session Tokens

Include the session token in the request header:

```
Authorization: Session YOUR_SESSION_TOKEN
```

Example:

```bash
curl -X GET "https://api.animalsnap.example.com/v1/purchases" \
  -H "Authorization: Session your_session_token"
```

### Session Token Expiration

Session tokens expire after 24 hours. After expiration, you need to authenticate again to get a new token.

## Error Handling

### Invalid API Key

If you provide an invalid API key, the API will return a 401 Unauthorized response:

```json
{
  "error": {
    "code": "invalid_credentials",
    "message": "Invalid API key",
    "status": 401
  }
}
```

### Missing API Key

If you don't provide an API key, the API will return a 401 Unauthorized response:

```json
{
  "error": {
    "code": "authentication_required",
    "message": "Authentication is required to access this resource",
    "status": 401
  }
}
```

### Invalid Session Token

If you provide an invalid session token, the API will return a 401 Unauthorized response:

```json
{
  "error": {
    "code": "invalid_credentials",
    "message": "Invalid session token",
    "status": 401
  }
}
```

### Expired Session Token

If your session token has expired, the API will return a 401 Unauthorized response:

```json
{
  "error": {
    "code": "invalid_credentials",
    "message": "Session token has expired",
    "status": 401
  }
}
```

## Best Practices

1. **Store API Keys Securely**: Never expose your API key in client-side code or public repositories.

2. **Use Environment Variables**: Store your API key in environment variables to keep it secure.

3. **Implement Rate Limiting**: Implement rate limiting in your application to avoid exceeding the API rate limits.

4. **Handle Authentication Errors**: Properly handle authentication errors in your application and prompt the user to re-authenticate when needed.

5. **Rotate API Keys**: Periodically rotate your API keys to enhance security.

6. **Use HTTPS**: Always use HTTPS when making requests to the API to ensure secure communication.

