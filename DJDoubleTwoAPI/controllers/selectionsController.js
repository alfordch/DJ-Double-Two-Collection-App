const db = require('../config/config');

// Start with logic for fetching selections

const getSelectionsQuery = `
   SELECT
      us.selectionName,
      us.selectionID,
      us.trackCount,
      us.selectionUser,
   FROM 
      UserSelections us
   WHERE 
      us.selectionUser = UUID_TO_BIN(?)
   ORDER BY
      us.selectionName asc;
`

const searchSelectionByNameQuery = `
   SELECT
      us.selectionName,
      us.selectionID,
      us.trackCount,
      us.selectionUser,
   FROM 
      UserSelections us
   WHERE 
      us.selectionUser = UUID_TO_BIN(?)
      AND us.selectionName LIKE ?
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
      us.selectionUser,
   FROM 
      UserSelections us
   WHERE 
      us.selectionUser = UUID_TO_BIN(?)
   ORDER BY
      RAND()
   LIMIT
      1;
`

exports.getSelections = (req, res) => {
   const searchTerm = `${req.query.q || ''}`;
   const values = [ searchTerm ];

   db.query(getSelectionsQuery, values, (err, results) => {
      if (err) {
         console.error('Search query error:', err);

         return res.status(500).json({ error: 'Search failed' });
      }
      res.json(results);
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
      res.json(results);
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
      res.json(results);
   });
};

// Now get to creating, deleting, and editing selections

const createSelectionQuery = `
   INSERT INTO
      UsersSelections us (selectionUser, selectionName)
   VALUES
      (?, ?);
`

exports.createSelection = (req, res) => {
   const parameters = `${req.query.q || ''}`;
   const values = [ parameters, parameters ];

   db.query(createSelectionQuery, values, (err, results) => {
      if (err) {
         console.error('Selection creation error: ', err);
         return res.status(500).json({ error: 'Selection creation failed' });
      }

      // check insert status
      /* const getSelectionQuery = `
         SELECT
            BIN_TO_UUID(selectionUser) AS userID, selectionName, createdAt
         FROM
            userSelections
         WHERE

      ` */
   });
}