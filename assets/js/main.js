(function() {
var topics = ["ferrari", "lamborghini", "porsche"];
var topicsContainer = $('#topics-container');
var html = "";
var resultsContainer = $('.results-container');

for (let i = 0; i < topics.length; i++) {
    // console.log(topics[i]);
    html = "<button class='button' value='"+ topics[i] +"'>"+ topics[i] + "</button>";
    topicsContainer.append(html);
}

function createButtons(){
    var button = $(".button");

    button.on('click', function(){
        
        var buttonValue = $(this).attr("value");
       

        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search?q="+ buttonValue +"&api_key=zMoij53dJtaDNLffO8myvY9zd0eITOfI&limit=10",
            method: "GET"
        }).then(function(data){
            
           

            var actualData = data['data'];

            resultsContainer.html(''); //empty out the results div first

            for (var i = 0; i < actualData.length; i++) {
                // console.log('for loop');
                var image = "<div class='image-wrap'>";
                    image += "<img class='image' src='"+ actualData[i]['images']['fixed_height_still']['url'] +"' data-still='"+ actualData[i]['images']['fixed_height_still']['url'] +"' data-move='"+ actualData[i]['images']['fixed_height']['url'] +"' >";
                    image += "<p class='rating'> Rating:"+ actualData[i]['rating'] +"</p>";
                    image += "</div>";
                // console.log(image);

                resultsContainer.append(image);
                
            }

            $('.image').on('click', function(){
                // console.log('clicky');
                var imageSrc = $(this).attr("src");

                var dataMove = $(this).attr("data-move");
                var dataStill = $(this).attr("data-still");
                console.log(dataMove);

                if (imageSrc === dataMove){
                    $(this).attr("src", dataStill);
                }else {
                    $(this).attr("src", dataMove);
                }
            });

        
        });
        
    });
};
createButtons();

function addButton(){
    var inputVal = $('.input').val();
        html = "<button class='button' value='"+ inputVal +"'>"+ inputVal + "</button>";
        topicsContainer.append(html);
        createButtons();
}

var inputButton = $('.input-button');
inputButton.on('click', function(){
    addButton();
});


var input = $('.input');
input.on('keydown',function(event){
    if (event.keyCode === 13){
        event.preventDefault();
        addButton();
    }
});

})();

