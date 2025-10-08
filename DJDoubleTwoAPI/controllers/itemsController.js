const db = require('../config/config');

const itemsQuery = `
    SELECT
        i.ItemID,
        i.ItemName, 
        (SELECT GROUP_CONCAT(DISTINCT a.artistname order by a.artistname separator ', ')
            FROM ItemArtists ia
            JOIN Artists a ON ia.ArtistID = a.ArtistID
            WHERE i.ItemID = ia.ItemID)
        AS ItemArtists,
        i.ItemFormat, 
        DAY(i.ItemReleaseDate) AS ItemReleaseDay,
        MONTH(i.ItemReleaseDate) AS ItemReleaseMonth,
        YEAR(i.ItemReleaseDate) AS ItemReleaseYear, 
        i.ItemLabel, 
        i.ItemTrackCount,
        i.ItemCoverImage
    FROM
        Items i
    WHERE
        i.itemname LIKE ?
        OR EXISTS (SELECT 1
                FROM ItemArtists ia
                JOIN Artists a ON ia.ArtistID = a.ArtistID
                WHERE ia.ItemID = i.ItemID AND a.ArtistName LIKE ?)
        OR i.itemlabel LIKE ?
        OR i.ItemReleaseDate LIKE ?
    GROUP BY
        i.itemid, i.itemname
    ORDER BY
        i.itemname asc;
`

const itemsRandQuery = `
    SELECT
        i.ItemID,
        i.ItemName, 
        group_concat(DISTINCT a.artistname order by a.artistname separator ', ') as ItemArtists,
        i.ItemFormat, 
        DAY(i.ItemReleaseDate) AS ItemReleaseDay,
        MONTH(i.ItemReleaseDate) AS ItemReleaseMonth,
        YEAR(i.ItemReleaseDate) AS ItemReleaseYear, 
        i.ItemLabel, 
        i.ItemTrackCount,
        i.ItemCoverImage
    FROM
        ItemArtists ia
    INNER JOIN
        Items i on ia.itemid = i.itemid
    INNER JOIN
        Artists a on a.artistid = ia.artistid
    GROUP BY
        i.itemid, i.itemname
    ORDER BY
        RAND()
    LIMIT 
        100;
`

const itemsByArtistQuery = `
    SELECT DISTINCT
        i.ItemID,
        i.ItemName, 
        group_concat(DISTINCT a.artistname order by a.artistname separator ', ') as ItemArtists,
        i.ItemFormat, 
        DAY(i.ItemReleaseDate) AS ItemReleaseDay,
        MONTH(i.ItemReleaseDate) AS ItemReleaseMonth,
        YEAR(i.ItemReleaseDate) AS ItemReleaseYear, 
        i.ItemLabel, 
        i.ItemTrackCount,
        i.ItemCoverImage
    FROM
        ItemArtists ia
    INNER JOIN
        Items i on ia.itemid = i.itemid
    INNER JOIN
        Artists a on a.artistid = ia.artistid
    INNER JOIN
        Tracks t ON t.TrackItem = i.ItemID
    LEFT JOIN 
        TrackArtists ta ON ta.TrackID = t.TrackID
    LEFT JOIN
        TrackProducers tp ON tp.TrackID = t.TrackID
    LEFT JOIN 
        TrackFeatures tf ON tf.TrackID = t.TrackID
    WHERE
        ta.ArtistID = ? OR
        tf.FeatureID = ? OR
        tp.ProducerID = ?
    GROUP BY
        i.ItemID, i.ItemName
    ORDER BY
        i.ItemID asc;
`

exports.getRandItems = (req, res) => {
  db.query(itemsRandQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to retrieve items' });
    }
    res.json(results);
  });
};

exports.searchItems = (req, res) => {
  const searchTerm = `%${req.query.q || ''}%`;
  const values = [searchTerm, searchTerm, searchTerm, searchTerm];

  db.query(itemsQuery, values, (err, results) => {
    if (err) {
      console.error('Search query error:', err);

      return res.status(500).json({ error: 'Search failed' });
    }
    res.json(results);
  });
};

exports.searchItemsByArtist = (req, res) => {
  const searchTerm = `${req.query.q || ''}`;
  const values = [searchTerm, searchTerm, searchTerm];

  db.query(itemsByArtistQuery, values, (err, results) => {
    if (err) {
      console.error('Search query error:', err);

      return res.status(500).json({ error: 'Search failed' });
    }
    res.json(results);
  });
};