var moment = require("moment");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId, // reference to associated book
    ref: "Book",
    required: true
  },
  imprint: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance"
  },
  due_back: {
    type: Date,
    default: Date.now
  }
});

// Virtual for bookinstance's url
BookInstanceSchema
  .virtual("url")
  .get(function(){
    return "/catalog/bookinstance/" + this._id;
  });

// Virtual for due_back_formatted
BookInstanceSchema
  .virtual("due_back_formatted")
  .get(function(){
    return moment(this.due_back).format("MMMM Do, YYYY");
  });

BookInstanceSchema
  .virtual('due_back_yyyy_mm_dd')
  .get(function () {
    return moment(this.due_back).format("YYYY-MM-DD"); //format 'YYYY-MM-DD'
  });

// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);