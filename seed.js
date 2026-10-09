const data = [
  {
    "title": "Beautiful 3-Bedroom Apartment in Dhanmondi",
    "description": "A spacious and well-lit apartment suitable for a family. South facing.",
    "price": 25000,
    "location": "Dhanmondi, Dhaka",
    "bedrooms": 3,
    "bathrooms": 2,
    "imageUrl": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    "isAvailable": true,
    "ownerName": "Rahim Khan",
    "contactNumber": "01711000000"
  },
  {
    "title": "Modern Studio in Banani",
    "description": "Fully furnished studio apartment perfect for a bachelor or couple.",
    "price": 18000,
    "location": "Banani, Dhaka",
    "bedrooms": 1,
    "bathrooms": 1,
    "imageUrl": "https://images.unsplash.com/photo-1502672260266-1c1f512760a3?auto=format&fit=crop&q=80&w=800",
    "isAvailable": true,
    "ownerName": "Salma Begum",
    "contactNumber": "01811000000"
  },
  {
    "title": "Luxury Duplex in Gulshan 2",
    "description": "Premium duplex house with modern amenities, car parking and security.",
    "price": 85000,
    "location": "Gulshan 2, Dhaka",
    "bedrooms": 4,
    "bathrooms": 4,
    "imageUrl": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
    "isAvailable": true,
    "ownerName": "Chowdhury Shaheb",
    "contactNumber": "01911000000"
  }
];

async function seed() {
    for (const item of data) {
        const res = await fetch('http://localhost:5000/api/houses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        if(res.ok) {
            console.log(`Added: ${item.title}`);
        } else {
            console.error(await res.text());
        }
    }
}
seed();
