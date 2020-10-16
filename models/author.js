var mongoose = require("mongoose");
var moment = require("moment");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  family_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  date_of_birth: {
    type: Date
  },
  date_of_death: {
    type: Date
  }
});

// Virtual for author's full name
AuthorSchema
  .virtual("name")
  .get(function(){
    var fullname = "";
    if(this.first_name && this.family_name){
      fullname = this.family_name + ", " + this.first_name;
    }
    if(!this.first_name || !this.family_name){
      fullname = "";
    }

    return fullname;
  });

// Virtual for author's life span
AuthorSchema
  .virtual("lifespan")
  .get(function(){
    if(this.date_of_birth && this.date_of_death){
      return `${moment(this.date_of_birth).format("MMMM Do, YYYY")} - ${moment(this.date_of_death).format("MMMM Do, YYYY")}`;
    }else if(this.date_of_birth){
      return `${moment(this.date_of_birth).format("MMMM Do, YYYY")} - `;
    }else{
      return "-";
    }
  });

// Virtual for author's url
AuthorSchema
  .virtual("url")
  .get(function(){
    return "/catalog/author/" + this._id;
  });

// Virtual for author date_of_birth
AuthorSchema
  .virtual("date_of_birth_formatted")
  .get(function(){
    return moment(this.date_of_birth).format("YYYY-MM-DD");
  })

// Virtual for author date_of_death
AuthorSchema
  .virtual("date_of_death_formatted")
  .get(function(){
    return moment(this.date_of_death).format("YYYY-MM-DD");
  })


// Export model
module.exports = mongoose.model("Author", AuthorSchema);
