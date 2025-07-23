const db = require('../config/config');

const tracksQuery = `
    SELECT
            t.TrackName,
            GROUP_CONCAT(DISTINCT a1.ArtistName ORDER BY a1.ArtistName ASC SEPARATOR ', ') AS TrackArtists,
            GROUP_CONCAT(DISTINCT a2.ArtistName ORDER BY a2.ArtistName ASC SEPARATOR ', ') AS TrackProducers,
            GROUP_CONCAT(DISTINCT a3.ArtistName ORDER BY a3.ArtistName ASC SEPARATOR ', ') AS TrackFeatures,
            i.ItemName,
            i.ItemLabel,
            DAY(i.ItemReleaseDate) AS ItemReleaseDay,
            MONTH(i.ItemReleaseDate) AS ItemReleaseMonth,
            YEAR(i.ItemReleaseDate) AS ItemReleaseYear,
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
            t.TrackID;
  `

const tracksRandQuery = `
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
    GROUP BY
        t.TrackID, t.TrackName, i.ItemName, i.ItemLabel, t.TrackLength, t.TrackItemLoc
    ORDER BY
        RAND()
    LIMIT 
        100;
  `

exports.getRandTracks = (req, res) => {
  db.query(tracksRandQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to retrieve tracks' });
    }
    res.json(results);
  });
};

exports.searchTracks = (req, res) => {
  const searchTerm = `%${req.query.q || ''}%`;
  const values = [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm];

  db.query(tracksQuery, values, (err, results) => {
    if (err) {
      console.error('Search query error:', err);
      return res.status(500).json({ error: 'Search failed' });
    }
    res.json(results);
  });
};