var user = {
    key: 'MDI3NDczNTAxMDE0NzY2NTUyMjJhM2QwMw000',
};

function updateWindowHash(hash) {
    window.location.hash = hash;
}

$('.navButtons li').click(function(event) {
  $('.navButtons li').removeClass("active");
  $(this).addClass("active");
    var name = $(this).attr('data-name');
    updateWindowHash(name);
    if (name == "ted") {
        var responseTED = $.getJSON('http://api.npr.org/query?id=57&apiKey=' + user.key + '&output=JSON').then(function(response) {
            handleResponse(response);
        });
    } else if (name == "music") {
        var responseMusic = $.getJSON('http://api.npr.org/query?id=1039&apiKey=' + user.key + '&output=JSON').then(function(response) {
            handleResponse(response);
        });
    } else {
generateHome();
    }
});

function generateHome() {
    clearContent();
}

function handleResponse(response) {
    var picture;
    var shortTitle;
    var datePublish;
    var fullArticle;
    clearContent();
    for (var index = 0; index < response.list.story.length; index++) {
        var item = response.list.story[index];
        if (!item.link) {
            continue;
        }
        picture = (item.image) ? item.image[0].src : "/assets/nprIcon.jpg";
        shortTitle = item.title.$text;
        datePublish = item.pubDate.$text;
        fullArticle = (item.link) ? item.link[0].$text : "";
        group = [picture, shortTitle, datePublish, fullArticle];
        generateContent(group);

    }
}

function generateContent(group) {

    var source = $('#story').html(); //string of html from #story
    var template = Handlebars.compile(source); //makes template a function
    var context = { //creates an object
        picture: group[0],
        shortTitle: group[1],
        datePublish: group[2],
        fullArticle: group[3]
    };
    var html = template(context); //passes object as argument to template function
    $('.mainContent').append(html);
}

function clearContent() {
    $('.mainContent').empty();
}

function updateHash() {
    if (window.location.hash)
        page = window.location.hash.replace('#', '');
    this.generateTemplate(page);
    $('li' + page).addClass('active');
    console.log(page);
}
