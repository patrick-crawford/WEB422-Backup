let theatersModel = [];

function initializetheatersModel(){

    fetch("http://localhost:8080/api/theaters")
    .then(response => response.json())
    .then(json => {
        theatersModel = json;
        refreshTheaterRows(theatersModel); 
    });

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

function gettheaterModelById(id){

    let retVal = null;
    for(let i =0; i < theatersModel.length; i++){
        if(theatersModel[i]._id == id){
            retVal = _.cloneDeep(theatersModel[i]);
        }

    }
    return retVal;
}


$(document).ready(function(){

    initializetheatersModel();

    $("#theaters-table tbody").on("click","tr",function(e){
       
        let theater = gettheaterModelById($(this).attr("data-id"));

        console.log(theater);
         
    });
});