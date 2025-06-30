const db = require('../config/config');

exports.getAllTracks = (req, res) => {
  const limit = parseInt(req.query.limit) || 50;

  db.query('SELECT * FROM tracks LIMIT ?', [limit], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to retrieve tracks' });
    }

    res.json(results);
  });
};

exports.searchTracks = (req, res) => {
  const searchTerm = `%${req.query.q || ''}%`;

  const sql = `
    SELECT
        t.TrackName,
        GROUP_CONCAT(DISTINCT a1.ArtistName ORDER BY a1.ArtistName ASC SEPARATOR ', ') AS TrackArtists,
        GROUP_CONCAT(DISTINCT a2.ArtistName ORDER BY a2.ArtistName ASC SEPARATOR ', ') AS TrackProducers,
        GROUP_CONCAT(DISTINCT a3.ArtistName ORDER BY a3.ArtistName ASC SEPARATOR ', ') AS TrackFeatures,
        i.ItemName,
        i.ItemLabel,
        t.TrackLength,
        t.TrackItemLoc
    FROM
        Tracks t
    INNER JOIN
        Items i ON t.TrackItem = i.ItemID
    INNER JOIN
        TrackArtists ta ON t.TrackID = ta.TrackID
    INNER JOIN
        Artists a1 ON ta.ArtistID = a1.ArtistID
    LEFT JOIN
        TrackProducers tp ON t.TrackID = tp.TrackID
    LEFT JOIN
        Artists a2 ON tp.ProducerID = a2.ArtistID
    LEFT JOIN
        TrackFeatures tf ON t.TrackID = tf.TrackID
    LEFT JOIN
        Artists a3 ON tf.FeatureID = a3.ArtistID
    WHERE
        t.TrackName LIKE ?
        OR i.ItemName LIKE ?
        OR i.ItemLabel LIKE ?
        OR a1.ArtistName LIKE ?
        OR a2.ArtistName LIKE ?
        OR a3.ArtistName LIKE ?
    GROUP BY
        t.TrackID, t.TrackName, i.ItemName, i.ItemLabel, t.TrackLength, t.TrackItemLoc
    ORDER BY
        t.TrackID
    LIMIT 100;
  `;

  const values = [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Search query error:', err);
      return res.status(500).json({ error: 'Search failed' });
    }
    res.json(results);
  });
};