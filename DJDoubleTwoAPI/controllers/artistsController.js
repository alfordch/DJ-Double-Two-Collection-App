const db = require('../config/config');

const artistsQuery = `
    SELECT
        a.ArtistID,
        a.ArtistName,
        a.ArtistTags,
        a.ArtistHometown,
        GROUP_CONCAT(DISTINCT g.ArtistName ORDER BY g.ArtistName ASC SEPARATOR ', ') AS GroupMemberships,
        COUNT(DISTINCT ia.ItemID) AS ItemCount,
        COUNT(DISTINCT gm.groupID) AS GroupCount,
        a.ArtistImage
    FROM
        Artists a
    LEFT JOIN
        GroupMembers gm ON a.ArtistID = gm.MemberID
    LEFT JOIN 
        Artists g ON gm.GroupID = g.ArtistID
    LEFT JOIN 
        ItemArtists ia ON a.ArtistID = ia.ArtistID
    WHERE
        a.ArtistName LIKE ?
        OR a.ArtistTags LIKE ? 
        OR a.ArtistHometown LIKE ?
    GROUP BY
        a.ArtistID, a.ArtistName, a.ArtistTags, a.ArtistHometown
    ORDER BY
        a.ArtistName ASC;
`

const artistsRandQuery = `
SELECT
        a.ArtistID,
        a.ArtistName,
        a.ArtistTags,
        a.ArtistHometown,
        GROUP_CONCAT(DISTINCT g.ArtistName ORDER BY g.ArtistName ASC SEPARATOR ', ') AS GroupMemberships,
        COUNT(DISTINCT ia.ItemID) AS ItemCount,
        COUNT(DISTINCT gm.groupID) AS GroupCount,
        a.ArtistImage
    FROM
        Artists a
    LEFT JOIN
        GroupMembers gm ON a.ArtistID = gm.MemberID
    LEFT JOIN 
        Artists g ON gm.GroupID = g.ArtistID
    LEFT JOIN 
        ItemArtists ia ON a.ArtistID = ia.ArtistID
    GROUP BY
        a.ArtistID, a.ArtistName, a.ArtistTags, a.ArtistHometown
    ORDER BY
        RAND()
    LIMIT 
        100;
`

exports.getRandArtists = (req, res) => {
  db.query(artistsRandQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to retrieve items' });
    }
    res.json(results);
  });
};

exports.searchArtists = (req, res) => {
  const searchTerm = `%${req.query.q || ''}%`;
  const values = [searchTerm, searchTerm, searchTerm, searchTerm];

  db.query(artistsQuery, values, (err, results) => {
    if (err) {
      console.error('Search query error:', err);

      return res.status(500).json({ error: 'Search failed' });
    }
    res.json(results);
  });
};