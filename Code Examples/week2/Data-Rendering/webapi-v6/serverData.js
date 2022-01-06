// ################################################################################
// Data service operations setup

// load the data in dbdata-theaters.json
const data = require("./dbdata-theaters.json");

// Add more code here, if necessary

// ################################################################################
// Define the functions that can be called by server.js

module.exports = {

  // ############################################################
    // theater requests

    // Fetch all 
    theaterGetAll: function () {
      // Optionally, sort the results...
      // Make a copy of the source data (we don't want to mutate the original array).
      // The `...data` portion uses the new Spread Syntax in order to expand the the contents
      // of the original array into the body of a newly created array.  See
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
      let dataCopy = [...data];
      
      // Then sort the results by theater ID (descending)
      dataCopy.sort((a, b) => b.theaterId - a.theaterId);

      // During development and testing, can "limit" the returned results to a smaller number
      // Remove that function call when deploying into production
      return dataCopy.slice(0, 20);
    },

    // Fetch one by its item identifier (NOT the MongoDB ObjectID)
    theaterGetById: function (itemId) {
      // This will return an object or undefined
      return data.find(i => i._id == itemId);
    },

    // Add new 
    theaterAdd: function (newItem) {
      // Add to the array
      data.push(newItem);
      return newItem;
    },

    // Edit existing 
    theaterEdit: function (newItem) {
      // Get the matching array index
      let index = data.findIndex(i => i._id == newItem._id);

      // If found, replace, otherwise return undefined
      if (data[index]) {
        data[index] = newItem;
        return newItem;
      }
      
      return data[index];
    },

    // Delete item
    theaterDelete: function (itemId) {
      // Get the matching array index
      let index = data.findIndex(i => i._id == itemId);
      // If found, delete, otherwise return undefined
      if (data[index]) {
        data.splice(index, 1);
      }
    }

} // module.exports
