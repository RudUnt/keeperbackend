import db from "../config/db.js";

async function setNote(note) {
  try {
    const resultedNote = await db.query(
      "INSERT INTO note (user_id, note_title, note_content, note_date) VALUES($1,$2,$3,$4) RETURNING *",
      note
    );
    return resultedNote;
  } catch (err) {
    console.log(err);
  }
}

async function getNotesByUserID(userID) {
  try {
    // const notes = await db.query("SELECT * FROM note WHERE user_id = $1", [
    const notes = await db.query(
      "SELECT note_id, user_id, note_title, note_content, TO_CHAR(note_date, 'YYYY-MM-DD') AS note_date FROM note WHERE user_id = $1 ORDER BY note_date DESC",
      [userID]
    );
    return notes;
  } catch (err) {
    console.log(err);
  }
}

async function deleteNoteByUserIDAndNoteID(noteDeletionDetails) {
  try {
    const deletedNote = await db.query(
      "DELETE FROM note WHERE user_id = $1 AND note_id = $2  returning *",
      noteDeletionDetails
    );
    return deletedNote;
  } catch (err) {
    console.log(err);
  }
}

async function getNotesByIDAndDate(detail) {
  try {
    const notesByDate = await db.query(
      "SELECT note_id, user_id, note_title, note_content, TO_CHAR(note_date, 'DD-MM-YYYY') AS note_date FROM note WHERE user_id = $1 AND note_date = $2",
      detail
    );
    return notesByDate;
  } catch (err) {
    console.log(err);
  }
}

export {
  setNote,
  getNotesByUserID,
  deleteNoteByUserIDAndNoteID,
  getNotesByIDAndDate,
};
