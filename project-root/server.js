require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const orderHistoryRoutes = require('./routes/orderHistoryRoutes'); // Import the order history route file

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

// PayPal client configuration
const configureEnvironment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
};

const client = new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());

// Scenario 1: Payment Gateway Failure (No Response)
app.post('/create-order', async (req, res) => {
  // Intentionally do nothing - no response
});

// Login Route (post request)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Bypass password validation: accept any password
  if (username) {
    req.session.user = username; // Store user info in session
    req.session.message = 'Login successfully!'; // Set the success message in session
    return res.redirect('/login'); // Redirect to login page to show success message
  } else {
    return res.redirect('/login'); // Stay on login page if no username is provided
  }
});

// Route to handle Login Page
app.get('/login', (req, res) => {
  const message = req.session.message; // Retrieve the message from session
  req.session.message = null; // Clear the message after displaying it

  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="style.css">
        <script>
          window.onload = function() {
            const message = '${message || ''}';
            if (message) {
              alert(message); // Show the alert if there's a message
            }
          };
        </script>
      </head>
      <body>
        <div class="login-container">
          <h2>Login</h2>
          <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

// Route to handle successful login and redirect to search
app.get('/search', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login'); // If no user is logged in, redirect to login
  }
  res.send('<h2>Welcome to the Search Page!</h2>');
});

// Scenario 4: Slow Order History Page (User Experience Issue)
app.get('/order-history', (req, res) => {
  setTimeout(() => { 
    res.json([{ id: 1, item: "Product A" }]);
  }, 150000); // 2.5-minute delay
});

// Scenario 6: Broken Signup Route (Allows form submission but does nothing)
app.post('/signup', (req, res) => {
  res.redirect('/login.html'); // Fake success, no account creation
});

// Use the order history routes
app.use('/', orderHistoryRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
