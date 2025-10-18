const db = require('../config/config');

// Start with logic for fetching selections

const getSelectionsQuery = `
   SELECT
      us.selectionName,
      us.selectionID,
      us.trackCount,
      us.selectionUser
   FROM 
      UserSelections us
   WHERE 
      us.selectionUser = UUID_TO_BIN(?)
      AND us.activeSelection = TRUE
   ORDER BY
      us.selectionName asc;
`

const searchSelectionByNameQuery = `
   SELECT
      us.selectionName,
      us.selectionID,
      us.trackCount,
      us.selectionUser
   FROM 
      UserSelections us
   WHERE 
      us.selectionUser = UUID_TO_BIN(?)
      AND us.selectionName LIKE ?
      AND us.activeSelection = TRUE
   ORDER BY
      us.selectionName asc
   LIMIT
      1;
`

const getRandomSelectionQuery = `
   SELECT
      us.selectionName,
      us.selectionID,
      us.trackCount,
      us.selectionUser
   FROM 
      UserSelections us
   WHERE 
      us.selectionUser = UUID_TO_BIN(?)
      AND us.activeSelection = TRUE
   ORDER BY
      RAND()
   LIMIT
      1;
`

const inactivateSelectionQuery = `
   UPDATE
      UserSelections us
   SET
      us.activeSelection = FALSE
   WHERE
      us.selectionUser = UUID_TO_BIN(?)
      AND us.selectionID = ?
      AND us.activeSelection = TRUE;
`

exports.getSelections = (req, res) => {
   const searchTerm = `${req.query.q || ''}`;
   const values = [ searchTerm ];

   db.query(getSelectionsQuery, values, (err, results) => {
      if (err) {
         console.error('Search query error:', err);

         return res.status(500).json({ error: 'Search failed' });
      }
      //res.json(results);
      //return res.json(results);

      const formattedSelections = results.map(row => {
         return {
            ...row,
            selectionID: row.selectionID?.toString("hex") || null,
            selectionUser: row.selectionUser?.toString("hex") || null
         };
      });

      return res.json(formattedSelections);
   });
};

exports.searchSelectionByName = (req, res) => {
   const searchTerm = `%${req.query.q || ''}%`;
   const values = [ searchTerm, searchTerm ];

   db.query(searchSelectionByNameQuery, values, (err, results) => {
      if (err) {
         console.error('Search query error:', err);

         return res.status(500).json({ error: 'Search failed' });
      }
      return res.json(results);
   });
};

exports.getRandSelection = (req, res) => {
   const searchTerm = `${req.query.q || ''}`;
   const values = [ searchTerm ];

   db.query(getRandomSelectionQuery, values, (err, results) => {
      if (err) {
         console.error('Search query error:', err);

         return res.status(500).json({ error: 'Search failed' });
      }
      return res.json(results);
   });
};

// Now get to creating, deleting, and editing selections

const createSelectionQuery = `
   INSERT INTO
      UserSelections (selectionUser, selectionName)
   VALUES
      (UUID_TO_BIN(?), ?);
`

exports.createSelection = (req, res) => {
   const parameters = req.body;
   const values = [ parameters['userID'], parameters['selectionName'] ];

   db.query(createSelectionQuery, values, (err, results) => {
      if (err) {
         console.error('Selection creation error: ', err);
         return res.status(500).json({ error: 'Selection creation failed' });
      }

      // Check insert status (if successful)
      const getSelectionQuery = `
         SELECT
            BIN_TO_UUID(selectionUser), BIN_TO_UUID(selectionID), selectionName, createdAt
         FROM 
            UserSelections
         WHERE 
            selectionUser = UUID_TO_BIN(?)
            AND selectionName = ?
            AND us.activeSelection = TRUE
         LIMIT
            1;
      `

      db.query(getSelectionQuery, values, (getSelectionErr, results) => {
         if (getSelectionErr) {
            return res.status(201).json({message: "Selection created. Issue found with getting selection information", getSelectionErr});
         }
         return res.status(201).json(results);
      });
   });
}

exports.deleteSelection = (req, res) => {
   const parameters = req.body;
   const values = [ parameters['userID'], parameters['selectionID'] ];

   db.query(inactivateSelectionQuery, values, (err, results) => {
      if (err) {
         console.error('Selection deletion error: ', err);
         return res.status(500).json({ error: 'Selection deletion failed' });
      }
   });
}