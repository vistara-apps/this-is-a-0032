# API Usage Examples

This document provides code examples for using the AnimalSnap Search API in various programming languages.

## JavaScript (Fetch API)

### Search Photos

```javascript
const API_KEY = 'your_api_key';
const query = 'golden retriever';

fetch(`https://api.animalsnap.example.com/v1/photos/search?query=${encodeURIComponent(query)}`, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Search results:', data);
    // Process the search results
    data.results.forEach(photo => {
      console.log(`Photo ID: ${photo.id}, Description: ${photo.description}`);
    });
  })
  .catch(error => {
    console.error('Error searching photos:', error);
  });
```

### Get Photo Details

```javascript
const API_KEY = 'your_api_key';
const photoId = 'photo-123';

fetch(`https://api.animalsnap.example.com/v1/photos/${photoId}`, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(photo => {
    console.log('Photo details:', photo);
    // Process the photo details
    console.log(`Photo ID: ${photo.id}`);
    console.log(`Description: ${photo.description}`);
    console.log(`Photographer: ${photo.user.name}`);
    console.log(`Regular URL: ${photo.urls.regular}`);
  })
  .catch(error => {
    console.error('Error getting photo details:', error);
  });
```

### Purchase Photo

```javascript
const API_KEY = 'your_api_key';
const photoId = 'photo-123';

fetch('https://api.animalsnap.example.com/v1/purchases', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    photo_id: photoId,
    size: 'regular',
    payment_method: 'wallet',
    wallet_address: '0x1234567890abcdef'
  })
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(purchase => {
    console.log('Purchase successful:', purchase);
    // Process the purchase
    console.log(`Purchase ID: ${purchase.id}`);
    console.log(`Download URL: ${purchase.download_url}`);
    
    // Redirect to download URL
    window.location.href = purchase.download_url;
  })
  .catch(error => {
    console.error('Error purchasing photo:', error);
  });
```

## Python (Requests)

### Search Photos

```python
import requests

API_KEY = 'your_api_key'
query = 'golden retriever'

headers = {
    'Authorization': f'Bearer {API_KEY}'
}

response = requests.get(
    f'https://api.animalsnap.example.com/v1/photos/search',
    headers=headers,
    params={'query': query}
)

if response.status_code == 200:
    data = response.json()
    print(f"Found {len(data['results'])} photos")
    
    # Process the search results
    for photo in data['results']:
        print(f"Photo ID: {photo['id']}, Description: {photo['description']}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

### Get Photo Details

```python
import requests

API_KEY = 'your_api_key'
photo_id = 'photo-123'

headers = {
    'Authorization': f'Bearer {API_KEY}'
}

response = requests.get(
    f'https://api.animalsnap.example.com/v1/photos/{photo_id}',
    headers=headers
)

if response.status_code == 200:
    photo = response.json()
    print(f"Photo ID: {photo['id']}")
    print(f"Description: {photo['description']}")
    print(f"Photographer: {photo['user']['name']}")
    print(f"Regular URL: {photo['urls']['regular']}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

### Purchase Photo

```python
import requests

API_KEY = 'your_api_key'
photo_id = 'photo-123'

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

data = {
    'photo_id': photo_id,
    'size': 'regular',
    'payment_method': 'wallet',
    'wallet_address': '0x1234567890abcdef'
}

response = requests.post(
    'https://api.animalsnap.example.com/v1/purchases',
    headers=headers,
    json=data
)

if response.status_code == 201:
    purchase = response.json()
    print(f"Purchase successful!")
    print(f"Purchase ID: {purchase['id']}")
    print(f"Download URL: {purchase['download_url']}")
    
    # Download the photo
    download_response = requests.get(purchase['download_url'])
    if download_response.status_code == 200:
        with open(f"{photo_id}.jpg", 'wb') as f:
            f.write(download_response.content)
        print(f"Photo downloaded successfully!")
    else:
        print(f"Error downloading photo: {download_response.status_code}")
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

## Node.js (Axios)

### Search Photos

```javascript
const axios = require('axios');

const API_KEY = 'your_api_key';
const query = 'golden retriever';

axios.get(`https://api.animalsnap.example.com/v1/photos/search`, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  },
  params: {
    query: query
  }
})
  .then(response => {
    const data = response.data;
    console.log(`Found ${data.results.length} photos`);
    
    // Process the search results
    data.results.forEach(photo => {
      console.log(`Photo ID: ${photo.id}, Description: ${photo.description}`);
    });
  })
  .catch(error => {
    console.error('Error searching photos:', error.response ? error.response.data : error.message);
  });
```

### Complete Example: Search, Purchase, and Download

```javascript
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_KEY = 'your_api_key';
const query = 'golden retriever';

// Step 1: Search for photos
async function searchPhotos(query) {
  try {
    const response = await axios.get(`https://api.animalsnap.example.com/v1/photos/search`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      },
      params: {
        query: query
      }
    });
    
    return response.data.results;
  } catch (error) {
    console.error('Error searching photos:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Step 2: Purchase a photo
async function purchasePhoto(photoId, size = 'regular') {
  try {
    const response = await axios.post(`https://api.animalsnap.example.com/v1/purchases`, {
      photo_id: photoId,
      size: size,
      payment_method: 'wallet',
      wallet_address: '0x1234567890abcdef'
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error purchasing photo:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Step 3: Download the photo
async function downloadPhoto(downloadUrl, photoId) {
  try {
    const response = await axios.get(downloadUrl, {
      responseType: 'stream'
    });
    
    const filePath = path.join(__dirname, `${photoId}.jpg`);
    const writer = fs.createWriteStream(filePath);
    
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filePath));
      writer.on('error', reject);
    });
  } catch (error) {
    console.error('Error downloading photo:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Run the complete flow
async function run() {
  try {
    // Search for photos
    console.log(`Searching for "${query}" photos...`);
    const photos = await searchPhotos(query);
    
    if (photos.length === 0) {
      console.log('No photos found.');
      return;
    }
    
    console.log(`Found ${photos.length} photos.`);
    
    // Select the first photo
    const selectedPhoto = photos[0];
    console.log(`Selected photo: ${selectedPhoto.id} - ${selectedPhoto.description}`);
    
    // Purchase the photo
    console.log(`Purchasing photo...`);
    const purchase = await purchasePhoto(selectedPhoto.id);
    console.log(`Purchase successful! Purchase ID: ${purchase.id}`);
    
    // Download the photo
    console.log(`Downloading photo...`);
    const filePath = await downloadPhoto(purchase.download_url, selectedPhoto.id);
    console.log(`Photo downloaded successfully to: ${filePath}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

run();
```

