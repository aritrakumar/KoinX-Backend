# **KoinX Backend Application**

A backend application built using Node.js and Express.js that fetches cryptocurrency data, stores it in a MongoDB database, and provides RESTful APIs to retrieve cryptocurrency statistics and calculate price standard deviation.

---

## **Features**
- **Background Job**:
  - Automatically fetches cryptocurrency data every 2 hours from the CoinGecko API.
  - Data includes price, market cap, and 24-hour percentage change.
- **APIs**:
  - Retrieve the latest stats for Bitcoin, Ethereum, and Matic.
  - Calculate the standard deviation of prices for the last 100 records of a cryptocurrency.
- **Extensible Design**:
  - Easily extendable to fetch and handle additional cryptocurrencies.

---

## **Technologies Used**
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB Atlas**: Cloud database for storing cryptocurrency data.
- **Mongoose**: ODM for MongoDB to manage schema and interactions.
- **Axios**: HTTP client for interacting with the CoinGecko API.
- **node-schedule**: For scheduling background jobs.
- **dotenv**: For managing environment variables securely.

---

## **Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/aritrakumar/koinx-backend.git
cd koinx-backend
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Configure Environment Variables**
Create a `.env` file in the root directory and add the following:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
PORT=3000
```
- Replace `<username>`, `<password>`, `<cluster-url>`, and `<database>` with your MongoDB Atlas details.

### **4. Start the Application**
#### Development Mode:
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The server will run at `http://localhost:3000`.

---

## **API Documentation**

### **1. Get Latest Stats**
- **Endpoint**: `/stats`
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: Cryptocurrency ID (e.g., `bitcoin`, `ethereum`, `matic-network`).

#### Example Request:
```bash
GET http://localhost:3000/stats?coin=bitcoin
```

#### Example Response:
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

---

### **2. Get Standard Deviation**
- **Endpoint**: `/deviation`
- **Method**: `GET`
- **Query Parameters**:
  - `coin`: Cryptocurrency ID (e.g., `bitcoin`, `ethereum`, `matic-network`).

#### Example Request:
```bash
GET http://localhost:3000/deviation?coin=bitcoin
```

#### Example Response:
```json
{
    "deviation": 4082.48
}
```

---

## **Background Job**
The application uses `node-schedule` to fetch cryptocurrency data every **2 hours** from the CoinGecko API. This data includes:
- Current price in USD.
- Market cap in USD.
- 24-hour percentage change.

Fetched data is stored in the `Crypto` collection in MongoDB Atlas.

---

## **Folder Structure**
```
koinx-backend/
├── models/
│   └── Crypto.js         # Mongoose schema for cryptocurrency data
├── node_modules/         # Installed dependencies
├── .env                  # Environment variables
├── fetchData.js          # Logic for fetching and storing cryptocurrency data
├── index.js              # Entry point of the application
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Dependency lock file
```

---

## **Contributing**
Contributions are welcome! If you'd like to improve this application:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and submit a pull request.

---

## **License**
This project is licensed under the MIT License.

---

## **Contact**
For questions or collaboration, feel free to reach out:
- **Email**: [kumararitra03@gmail.com](mailto:kumararitra03@gmail.com)
- **GitHub**: [aritrakumar](https://github.com/aritrakumar)
