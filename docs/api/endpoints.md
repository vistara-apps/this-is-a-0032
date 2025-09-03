# API Endpoints

This document provides detailed information about the AnimalSnap Search API endpoints.

## Search Photos

Search for animal photos based on various criteria.

### Request

```
GET /photos/search
```

### Query Parameters

| Parameter    | Type   | Required | Description                                                |
|--------------|--------|----------|------------------------------------------------------------|
| query        | string | Yes      | Search query (e.g., "golden retriever")                    |
| page         | number | No       | Page number (default: 1)                                   |
| per_page     | number | No       | Number of results per page (default: 12, max: 30)          |
| orientation  | string | No       | Photo orientation (landscape, portrait, squarish)          |
| color        | string | No       | Dominant color (black, white, yellow, orange, etc.)        |
| order_by     | string | No       | Order results by (relevant, latest, popular)               |

### Response

```json
{
  "results": [
    {
      "id": "photo-123",
      "description": "Golden retriever sitting in a field",
      "alt_description": "Golden retriever sitting in a field",
      "urls": {
        "raw": "https://images.animalsnap.example.com/photo-123/raw.jpg",
        "full": "https://images.animalsnap.example.com/photo-123/full.jpg",
        "regular": "https://images.animalsnap.example.com/photo-123/regular.jpg",
        "small": "https://images.animalsnap.example.com/photo-123/small.jpg",
        "thumb": "https://images.animalsnap.example.com/photo-123/thumb.jpg"
      },
      "links": {
        "self": "https://api.animalsnap.example.com/v1/photos/photo-123",
        "html": "https://animalsnap.example.com/photos/photo-123",
        "download": "https://api.animalsnap.example.com/v1/photos/photo-123/download"
      },
      "user": {
        "id": "user-456",
        "name": "John Photographer",
        "username": "johnphotographer"
      },
      "likes": 234,
      "width": 5184,
      "height": 3456,
      "price": {
        "small": "$0.50",
        "regular": "$1.50",
        "full": "$2.00"
      },
      "licensing": {
        "type": "standard",
        "description": "Commercial and non-commercial use"
      }
    }
    // More photos...
  ],
  "total": 100,
  "total_pages": 9
}
```

## Get Photo

Get detailed information about a specific photo.

### Request

```
GET /photos/{photo_id}
```

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| photo_id  | string | Yes      | Photo ID    |

### Response

```json
{
  "id": "photo-123",
  "description": "Golden retriever sitting in a field",
  "alt_description": "Golden retriever sitting in a field",
  "urls": {
    "raw": "https://images.animalsnap.example.com/photo-123/raw.jpg",
    "full": "https://images.animalsnap.example.com/photo-123/full.jpg",
    "regular": "https://images.animalsnap.example.com/photo-123/regular.jpg",
    "small": "https://images.animalsnap.example.com/photo-123/small.jpg",
    "thumb": "https://images.animalsnap.example.com/photo-123/thumb.jpg"
  },
  "links": {
    "self": "https://api.animalsnap.example.com/v1/photos/photo-123",
    "html": "https://animalsnap.example.com/photos/photo-123",
    "download": "https://api.animalsnap.example.com/v1/photos/photo-123/download"
  },
  "user": {
    "id": "user-456",
    "name": "John Photographer",
    "username": "johnphotographer"
  },
  "likes": 234,
  "width": 5184,
  "height": 3456,
  "price": {
    "small": "$0.50",
    "regular": "$1.50",
    "full": "$2.00"
  },
  "licensing": {
    "type": "standard",
    "description": "Commercial and non-commercial use",
    "details": "This photo is provided under the standard license, which grants you extensive usage rights including commercial and non-commercial use, editing, and distribution as part of your work."
  },
  "tags": [
    "dog",
    "golden retriever",
    "pet",
    "animal",
    "field"
  ],
  "exif": {
    "make": "Canon",
    "model": "Canon EOS 5D Mark IV",
    "exposure_time": "1/250",
    "aperture": "f/2.8",
    "focal_length": "50mm",
    "iso": 100
  },
  "location": {
    "name": "Central Park, New York",
    "country": "United States"
  },
  "created_at": "2023-06-15T10:30:00Z",
  "updated_at": "2023-06-15T10:30:00Z"
}
```

## Download Photo

Download a photo after purchase.

### Request

```
GET /photos/{photo_id}/download
```

### Path Parameters

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| photo_id  | string | Yes      | Photo ID    |

### Query Parameters

| Parameter | Type   | Required | Description                                    |
|-----------|--------|----------|------------------------------------------------|
| size      | string | No       | Photo size (small, regular, full, raw)         |
| token     | string | Yes      | Download token obtained after purchase         |

### Response

The API will respond with a 302 redirect to the photo file or a direct file download.

## User Account

### Create Account

Create a new user account.

#### Request

```
POST /users
```

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

#### Response

```json
{
  "id": "user-789",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2023-06-15T10:30:00Z"
}
```

### Get User Profile

Get the current user's profile.

#### Request

```
GET /users/me
```

#### Response

```json
{
  "id": "user-789",
  "email": "user@example.com",
  "name": "John Doe",
  "created_at": "2023-06-15T10:30:00Z",
  "subscription": {
    "plan": "free",
    "expires_at": null
  },
  "stats": {
    "downloads": 5,
    "searches": 20
  }
}
```

## Purchase History

### Get Purchase History

Get the current user's purchase history.

#### Request

```
GET /purchases
```

#### Query Parameters

| Parameter | Type   | Required | Description                                    |
|-----------|--------|----------|------------------------------------------------|
| page      | number | No       | Page number (default: 1)                       |
| per_page  | number | No       | Number of results per page (default: 10)       |

#### Response

```json
{
  "purchases": [
    {
      "id": "purchase-123",
      "photo_id": "photo-123",
      "photo_url": "https://images.animalsnap.example.com/photo-123/regular.jpg",
      "photo_thumbnail": "https://images.animalsnap.example.com/photo-123/thumb.jpg",
      "size": "regular",
      "price": "$1.50",
      "transaction_id": "tx-456",
      "download_token": "download-token-789",
      "purchased_at": "2023-06-15T10:30:00Z"
    }
    // More purchases...
  ],
  "total": 5,
  "total_pages": 1
}
```

### Create Purchase

Create a new purchase.

#### Request

```
POST /purchases
```

#### Request Body

```json
{
  "photo_id": "photo-123",
  "size": "regular",
  "payment_method": "wallet",
  "wallet_address": "0x1234567890abcdef"
}
```

#### Response

```json
{
  "id": "purchase-123",
  "photo_id": "photo-123",
  "photo_url": "https://images.animalsnap.example.com/photo-123/regular.jpg",
  "photo_thumbnail": "https://images.animalsnap.example.com/photo-123/thumb.jpg",
  "size": "regular",
  "price": "$1.50",
  "transaction_id": "tx-456",
  "download_token": "download-token-789",
  "purchased_at": "2023-06-15T10:30:00Z",
  "download_url": "https://api.animalsnap.example.com/v1/photos/photo-123/download?token=download-token-789&size=regular"
}
```

