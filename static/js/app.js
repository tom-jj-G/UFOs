// from data.js
const tableData = data;


// get table references
var tbody = d3.select("tbody");


function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}


// Keep track of all filters
var filters = [];


// This function will replace your handleClick function
function updateFilters(event) {
  
  // Save the element, value, and id of the filter that was changed
  let id = d3.event.target.id;
  // Removing white spaces
  let value = d3.event.target.value.trim();

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (value == null || value.trim() === '') {
    // Removing the filter is no value entered or if only spaces inputted
    filters = filters.filter(row => row.id != id);
  }  
  else {
    let newFilter = {
      id: id,
      value: value
    };
    // Removing existing value if aleardy entered
    filters = filters.filter(row => row.id != id);
    // Adding the new value
    filters.push(newFilter);
  }

  // Call function to apply all filters and rebuild the table
  filterTable();
}


function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  filters.forEach((filterRow) => {
    let idFilter = filterRow.id.replace('#','');
    let valueFilter = filterRow.value;
    filteredData = filteredData.filter(row => row[idFilter] === valueFilter);
  });

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}


// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#datetime").on("change",updateFilters);
d3.selectAll("#city").on("change",updateFilters);
d3.selectAll("#state").on("change",updateFilters);
d3.selectAll("#country").on("change",updateFilters);
d3.selectAll("#shape").on("change",updateFilters);


// Build the table when the page loads
buildTable(tableData);