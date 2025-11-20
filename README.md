
# 🔗 URL Shortener – Backend API (Node.js + Express)

A lightweight and efficient backend service for generating short URLs, redirecting users, and tracking click analytics.
This service powers the frontend URL Shortener app and is built using **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

### 🔥 Core Capabilities

* Generate short URLs from long URLs
* Redirect using a short code
* Track click count and access history
* Validate incoming URLs
* RESTful API structure
* Error handling & input sanitization

### 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB / Mongoose**
* **CORS**
* **Dotenv** for environment configs

---

## 📁 Project Structure

```
src/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── services/
 ├── utils/
 ├── app.js
 └── server.js
.env
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:5000
```

### 4️⃣ Start the server

#### Development mode:

```sh
npm run dev
```

#### Production mode:

```sh
npm start
```

Server will start on:

```
http://localhost:5000
```

---

## 📡 API Endpoints

### **1. Shorten URL**

**POST** `/api/shorten`

#### Request Body:

```json
{
  "longUrl": "https://example.com/very/long/url"
}
```

#### Response:

```json
{
  "shortUrl": "http://localhost:5000/abc123",
  "shortCode": "abc123",
  "clicks": 0
}
```

---

### **2. Redirect to Original URL**

**GET** `/:shortCode`

Redirects the user to the corresponding long URL.

---

### **3. Get Analytics**

**GET** `/api/analytics/:shortCode`

#### Response:

```json
{
  "originalUrl": "https://example.com",
  "shortCode": "abc123",
  "clicks": 10,
  "createdAt": "2025-11-20T09:00:00Z"
}
```

---

## 🧪 Testing

You can test APIs using:

* Postman
* Thunder Client (VS Code)
* cURL

Import the Postman collection (optional if you want, I can create one).

---

## 🐳 Docker Support

### Example Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "start"]
```

---

## 🌐 Deployment

You can host the backend on:

* **Render**
* **Railway**
* **AWS EC2**
* **Azure App Service**
* **Heroku**
* **Docker Containers**

---

## 🙌 Contributing

Pull Requests are welcome.
Please follow clean commit messages and include proper PR descriptions.

