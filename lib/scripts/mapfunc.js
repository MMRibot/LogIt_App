module.exports = {
  views : {
        map: function(doc, meta)
    {
      if ( doc.personId && doc.personId === "Id" ) {
      emit( doc.personId, [ doc.date, doc.musclegroup, doc.exercise, doc.Sets ]);
      }
    }
  }
};
