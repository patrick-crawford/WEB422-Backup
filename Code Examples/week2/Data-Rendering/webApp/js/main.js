let theatersModel = [];

function initializeTheatersModel(){

    fetch("http://localhost:8080/api/theaters")
        .then(response => response.json())
        .then(refreshTheaterRows)
        .catch(err => console.error('Unable to load theaters data:', err));
}

function refreshTheaterRows(theaters){

    $("theaters-table tbody").empty();

    let rowsTemplate = _.template(
        `<% _.forEach(theaters, function(theater) { %>
            <tr data-id=<%- theater._id %>>
                <td><%- theater.theaterId %></td>
                <td><%- theater.location.address.street1 %></td>
            </tr> 
        <% }); %>`);

    let rows = rowsTemplate({'theaters': theaters});
    $("#theaters-table tbody").html(rows);
    
}

function getTheaterModelById(id){

    for(let i =0; i < theatersModel.length; i++){
        if(theatersModel[i]._id == id){
            return _.cloneDeep(theatersModel[i]);
        }

    }
    return null;
}


$(function(){

    initializeTheatersModel();

    $("#theaters-table tbody").on("click","tr",function(e){
       
        let theater = getTheaterModelById($(this).attr("data-id"));

        console.log(theater);
         
    });

});