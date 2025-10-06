const db = require('../config/config');

const tracksQuery = `
   SELECT
      t.TrackID,
      t.TrackName,
      (SELECT GROUP_CONCAT(DISTINCT a1.ArtistName ORDER BY a1.ArtistName ASC SEPARATOR ', ')
         FROM TrackArtists ta
         JOIN Artists a1 ON ta.ArtistID = a1.ArtistID
         WHERE ta.TrackID = t.TrackID)
      AS TrackArtists,
      (SELECT GROUP_CONCAT(DISTINCT a2.ArtistName ORDER BY a2.ArtistName ASC SEPARATOR ', ')
         FROM TrackProducers tp
         JOIN Artists a2 ON tp.ProducerID = a2.ArtistID
         WHERE tp.TrackID = t.TrackID) 
      AS TrackProducers,
      (SELECT GROUP_CONCAT(DISTINCT a3.ArtistName ORDER BY a3.ArtistName ASC SEPARATOR ', ')
         FROM TrackFeatures tf
         JOIN Artists a3 ON tf.FeatureID = a3.ArtistID
         WHERE tf.TrackID = t.TrackID)
      AS TrackFeatures,
      i.ItemName,
      i.ItemLabel,
      i.ItemCoverImage,
      DAY(i.ItemReleaseDate) AS ItemReleaseDay,
      MONTH(i.ItemReleaseDate) AS ItemReleaseMonth,
      YEAR(i.ItemReleaseDate) AS ItemReleaseYear,
      t.TrackLength,
      t.TrackItemLoc
   FROM
      Tracks t
   INNER JOIN
      Items i ON t.TrackItem = i.ItemID
   WHERE
      t.TrackName LIKE ?
      OR i.ItemName LIKE ?
      OR i.ItemLabel LIKE ?
      OR EXISTS (SELECT 1
         FROM TrackArtists ta
         JOIN Artists a1 ON ta.ArtistID = a1.ArtistID
         WHERE ta.TrackID = t.TrackID AND a1.ArtistName LIKE ?)
      OR EXISTS (SELECT 1
         FROM TrackProducers tp
         JOIN Artists a2 ON tp.ProducerID = a2.ArtistID
         WHERE tp.TrackID = t.TrackID AND a2.ArtistName LIKE ?)
      OR EXISTS (SELECT 1
         FROM TrackFeatures tf
         JOIN Artists a3 ON tf.FeatureID = a3.ArtistID
         WHERE tf.TrackID = t.TrackID AND a3.ArtistName LIKE ?)
      OR EXISTS (SELECT 1
         FROM TrackArtists ta
         JOIN GroupMembers gm ON ta.ArtistID = gm.GroupID
         JOIN Artists ag ON gm.MemberID = ag.ArtistID
         WHERE ta.TrackID = t.TrackID AND ag.ArtistName LIKE ?)
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
      i.ItemCoverImage,
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
   GROUP BY
      t.TrackID, t.TrackName, i.ItemName, i.ItemLabel, t.TrackLength, t.TrackItemLoc
   ORDER BY
      RAND()
   LIMIT 
      100;
`

const tracksItemQuery = `
   SELECT
      t.TrackID,
      t.TrackName,
      (SELECT GROUP_CONCAT(DISTINCT a1.ArtistName ORDER BY a1.ArtistName ASC SEPARATOR ', ')
         FROM TrackArtists ta
         JOIN Artists a1 ON ta.ArtistID = a1.ArtistID
         WHERE ta.TrackID = t.TrackID)
      AS TrackArtists,
      (SELECT GROUP_CONCAT(DISTINCT a2.ArtistName ORDER BY a2.ArtistName ASC SEPARATOR ', ')
         FROM TrackProducers tp
         JOIN Artists a2 ON tp.ProducerID = a2.ArtistID
         WHERE tp.TrackID = t.TrackID) 
      AS TrackProducers,
      (SELECT GROUP_CONCAT(DISTINCT a3.ArtistName ORDER BY a3.ArtistName ASC SEPARATOR ', ')
         FROM TrackFeatures tf
         JOIN Artists a3 ON tf.FeatureID = a3.ArtistID
         WHERE tf.TrackID = t.TrackID)
      AS TrackFeatures,
      i.ItemName,
      i.ItemLabel,
      i.ItemCoverImage,
      DAY(i.ItemReleaseDate) AS ItemReleaseDay,
      MONTH(i.ItemReleaseDate) AS ItemReleaseMonth,
      YEAR(i.ItemReleaseDate) AS ItemReleaseYear,
      t.TrackLength,
      t.TrackItemLoc
   FROM
      Tracks t
   INNER JOIN
      Items i ON t.TrackItem = i.ItemID
   WHERE
      i.ItemID LIKE ?
   ORDER BY
      t.TrackID;
`

exports.searchTracks = (req, res) => {
    const searchTerm = `%${req.query.q || ''}%`;
    const values = [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm];
    
    db.query(tracksQuery, values, (err, results) => {
        if (err) {
            console.error('Search query error:', err);
            return res.status(500).json({ error: 'Search failed' });
        }
        res.json(results);
    });
};

exports.getRandTracks = (req, res) => {
    db.query(tracksRandQuery, (err, results) => {
    if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to retrieve tracks' });
    }
    res.json(results);
    });
};

exports.searchTracksByItem = (req, res) => {
    const searchTerm = `%${req.query.q || ''}%`;
    const values = [searchTerm];
    
    db.query(tracksItemQuery, values, (err, results) => {
        if (err) {
            console.error('Search query error:', err);
            return res.status(500).json({ error: 'Search failed' });
        }
        res.json(results);
    });
};