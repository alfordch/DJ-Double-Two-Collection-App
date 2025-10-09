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

// Now get to creating and adding to selections

