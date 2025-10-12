const db = require('../config/config');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "superscret";

exports.userSignUp = (req, res) => {
   try {
      let { userName, password, displayName } = req.body;

      if (!userName || !password) {
         return res.status(400).json({error: "Username and Password are required"});
      }

      userName = String(userName).trim();

      if (userName.length > 50 || userName.length < 8) {
         return res.status(400).json({error: "Username must be between 8 and 50 characters"});
      }

      if (password.length < 12) {
         return res.status(400).json({error: "Password must be at least 12 characters"});
      }

      bcrypt.hash(password, 12, (hashErr, hash) => {
         if (hashErr) {
               return res.status(500).json({error: "Password hash failed"});
         }

         // Set displayName if not provided
         if (!displayName) {
               displayName = userName;
         }

         // Users table insert
         const signUpQuery = `
               INSERT INTO Users (userName, displayName, passwordHash)
               VALUES(?, ?, ?);
         `;

         db.query(signUpQuery, [userName, displayName, hash], (signUpErr) => {
               if (signUpErr) {
                  if (signUpErr.code === "ER_DUP_ENTRY") {
                     return res.status(400).json({error: "Username is already taken"});
                  }
                  return res.status(500).json({error: "A server error occurred. Please try again."});
               }

               // Check status of insert (if successful) 
               const getUserQuery = `
                  SELECT BIN_TO_UUID(userID) AS userID, userName, displayName, createdAt, activeUser, lastLogin
                  FROM Users 
                  WHERE userName = ?
                  LIMIT 1;
               `;

               db.query(getUserQuery, [userName], (getUserErr, results) => {
                  const user = results && results[0] ? results[0] : null;
                  
                  const token = jwt.sign(
                     {id: user.userID.toString("hex"), userName: user.userName}, JWT_SECRET, {expiresIn: "1h"}
                  );
                  
                  if (getUserErr) {
                     return res.status(201).json({message: "User created. Issue found with getting user information", getUserErr, token});
                  }

                  return res.status(201).json({message: "User created and retrieved successfully", user, token});
               });
         });
      });
   }

   catch(e) {
      return res.status(500).json({error: "A server error occurred when signing up. Please try again."});
   }
} 

exports.userLogin = (req, res) => {
   try {
      let {userName, password} = req.body;

      if (!userName || !password) {
         return res.status(400).json({error: "Please enter a username and password"});
      }

      userName = String(userName).trim();

      // Get user from db (Users)
      const getUserQuery = `
         SELECT userID, userName, displayName, passwordHash 
         FROM Users
         WHERE userName = ? 
         AND activeUser = 1
         LIMIT 1;
      `;

      db.query(getUserQuery, [userName], async (getUserErr, results) => {
         if (getUserErr) {
               return res.status(500).json({error: "A server error has occurred. Please try again"});
         }

         if (!results || results.length === 0) {
               return res.status(400).json({error: "Invalid login credentials"});
         }

         const user = results[0];

         // Check password and confirm login
         const match = await bcrypt.compare(password, user.passwordHash);

         if (!match) {
               return res.status(400).json({error: "Invalid login credentials"});
         }

         // Create JWT
         const token = jwt.sign(
               {id: user.userID.toString("hex"), userName: user.userName}, JWT_SECRET, {expiresIn: "1h"}
         );

         // Update lastLogin
         const updateUserQuery = `
               UPDATE Users
               SET lastLogin = CURRENT_TIMESTAMP
               WHERE userID = ?;
         `;

         db.query(updateUserQuery, [user.userID], (updateUserErr, results) => {
               if (updateUserErr) {
                  return res.status(500).json({error: "Failed to update user login timestamp"});
               }
         });

         return res.json({
               message: "Login successful",
               user: {
                  userID: user.userID.toString("hex"),
                  userName: user.userName,
                  displayName: user.displayName,
               },
               token,
         });
      });
   }

   catch(e) {
      return res.status(500).json({error: "A server error occurred when logging in. Please try again."});
   }
}