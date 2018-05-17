/**
 * variáveis do shuffle
 */
var Shuffle = window.Shuffle;
var todos_shuffle = document.getElementById("todos_shuffle");
var economia_shuffle = document.getElementById("economia_shuffle");
var meio_ambiente_shuffle = document.getElementById("meio_ambiente_shuffle");
var cultura_shuffle = document.getElementById("cultura_shuffle");
var gestao_shuffle = document.getElementById("gestao_shuffle");
var social_shuffle = document.getElementById("social_shuffle");
var seguranca_e_defesa_shuffle = document.getElementById("seguranca_e_defesa_shuffle");

var last_shuffle = Shuffle.ALL_ITEMS;

/**
 *
 * @type {NodeList}
 *
 * div do shuffle
 */
var shuffleDivs = document.getElementsByClassName('shuffle-container');
var shuffleInstance = [];

/**
 *
 * @type {string}
 *
 * tamanhos dos tiles quando clicados
 */
var clicked_width = '100vw';
var clicked_height = 'auto';

/**
 *
 * TODO: autenticar no bitly
 * Variáveis Bitly
 * api_key_from_bitly_account
 * username_from_bitly_account
 */
var apiKey = null;
var username = null;

/**
 * inicia o shufflejs
 */
for (var i = 0; i < shuffleDivs.length; i++) {
    var el = document.querySelector("#" + shuffleDivs[i].id);

    //var sizer = document.querySelector('.my-sizer-element');
    shuffleInstance[i] = new Shuffle(el,{
        itemSelector: '.picture-item',
        //sizer: sizer,
    });
}

/**
 * rolar pro topo ao carregar
 */
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

/**
 * reativa o ultimo shuffle ao clicar no body
 */
document.body.onclick = function() {
    for (var i = 0; i < shuffleInstance.length; i++) {
        shuffleInstance[i].filter(last_shuffle);
    }
};

window.onload = function() {
    getUrlParameter('v');
    changeOGMetaTag('images/city.jpeg');

    var topSite = document.getElementById('top-site-text');
    topSite.style.opacity = "1";
    topSite.style.top = "40%";

    mountTilesHeights();
    mountEventsTiles();
};

document.getElementById('scroll-to-page').addEventListener('click', function() {
    smoothScroll(todos_shuffle);

    //setTimeout(function () {
    //    document.getElementById('container').remove();
    //}, 500);
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
todos_shuffle.addEventListener('click', function() {
    resetButtons();

    todos_shuffle.className += ' button-active';
    last_shuffle = Shuffle.ALL_ITEMS;
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
economia_shuffle.addEventListener('click', function() {
    resetButtons();

    economia_shuffle.className += ' button-active';
    last_shuffle = 'economia';
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
meio_ambiente_shuffle.addEventListener('click', function() {
    resetButtons();

    meio_ambiente_shuffle.className += ' button-active';
    last_shuffle = 'meio-ambiente';
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
cultura_shuffle.addEventListener('click', function() {
    resetButtons();

    cultura_shuffle.className += ' button-active';
    last_shuffle = 'cultura';
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
gestao_shuffle.addEventListener('click', function() {
    resetButtons();

    gestao_shuffle.className += ' button-active';
    last_shuffle = 'gestao';
    resizeAll();
});


/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
social_shuffle.addEventListener('click', function() {
    resetButtons();

    social_shuffle.className += ' button-active';
    last_shuffle = 'social';
    resizeAll();
});

/**
 * TODO: criar evento genérico para todos os botões e tipo de dado
 */
seguranca_e_defesa_shuffle.addEventListener('click', function() {
    resetButtons();

    seguranca_e_defesa_shuffle.className += ' button-active';
    last_shuffle = 'seguranca-e-defesa';
    resizeAll();
});

/**
 * remove a classe 'button-active' de todos os botões de filtro
 */
function resetButtons() {
    var buttons = document.getElementsByClassName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('button-active');
    }
}

/**
 * adiciona o evento de click a todos os tiles da página
 */
function mountEventsTiles() {
    var controler = document.getElementsByClassName('picture-item');

    for (var i = 0; i < controler.length; i++) {
        controler[i].onclick = function (e) {
            if(this.style.width != clicked_width) {
                eventFire(document.body, 'click');

                resizeAll();

                var square = this;

                document.location.hash = "v=" + square.getAttribute('id');

                square.setAttribute('width', square.style.width);
                square.setAttribute('height', square.style.height);

                square.style.width = clicked_width;
                square.style.minHeight = '100vh';
                square.style.height = clicked_height + "!important";

                if( !(mobileAndTabletcheck()) ) {
                    square.style.marginLeft = '-50%';
                }

                square.style.position = 'fixed!important';

                if( square.getElementsByClassName('content').length > 0 ) {
                    square.getElementsByClassName('content')[0].style.width = "40%";
                    square.getElementsByClassName('content')[0].style.paddingLeft = "20%";
                    square.getElementsByClassName('content')[0].style.paddingRight = "20%";
                }

                if( square.getElementsByClassName('float-title').length > 0 ) {
                    square.getElementsByClassName('float-title')[0].style.opacity = "0";
                }

                if (square.getElementsByClassName('thumb')[0]){
                    square.getElementsByClassName('thumb')[0].style.display = "none";
                }

                if( square.getElementsByClassName('button-close').length > 0 ) {
                    square.getElementsByClassName('button-close')[0].className += " active";
                }

                var paragraphs = square.getElementsByTagName('p');

                for(var p = 0; paragraphs.length > p; p++){
                    paragraphs[p].style.maxHeight = '100%';
                }

                var h2 = square.getElementsByTagName('h2');

                for(var h = 0; h2.length > h; h++){
                    h2[h].style.maxHeight = '100%';
                }

                setTimeout(function(){
                    square.getElementsByClassName('type')[0].setAttribute('width', square.getElementsByClassName('type')[0].style.width);
                    square.getElementsByClassName('type')[0].setAttribute('height', square.getElementsByClassName('type')[0].style.height);
                    square.getElementsByClassName('type')[0].setAttribute('left', square.getElementsByClassName('type')[0].style.left);
                    square.getElementsByClassName('type')[0].setAttribute('top', square.getElementsByClassName('type')[0].style.top);

                    square.getElementsByClassName('type')[0].style.width = '100%';
                    square.getElementsByClassName('type')[0].style.minHeight = '100vh';
                    square.getElementsByClassName('type')[0].style.height = 'auto';
                    square.getElementsByClassName('type')[0].style.left = '0%';
                    square.getElementsByClassName('type')[0].style.top = '0%';

                    square.getElementsByClassName('type')[0].style.background = 'white';

                    setTimeout(function() {
                        square.getElementsByClassName('content')[0].style.opacity = "1";
                    }, 500);

                    square.className += ' active';

                    setTimeout(function() {
                        smoothScroll(square);
                    }, 1000);
                }, 500);
            } else {
                if(e.target.classList.contains('button-close')) {
                    //resizeAll();

                    var square = this;

                    square.getElementsByClassName('content')[0].style.opacity = "0";

                    setTimeout(function() {
                        square.style.width = square.getAttribute('width');
                        square.style.minHeight = '0%';
                        square.style.height = square.getAttribute('height');
                        square.style.marginLeft = '0%';

                        eventFire(document.body, 'click');

                        square.getElementsByClassName('type')[0].style.width = square.getElementsByClassName('type')[0].getAttribute('width');
                        square.getElementsByClassName('type')[0].style.minHeight = "0%";
                        square.getElementsByClassName('type')[0].style.height = square.getElementsByClassName('type')[0].getAttribute('height');
                        square.getElementsByClassName('type')[0].style.left = square.getElementsByClassName('type')[0].getAttribute('left');
                        square.getElementsByClassName('type')[0].style.top = square.getElementsByClassName('type')[0].getAttribute('top');

                        square.getElementsByClassName('type')[0].style.background = 'black';

                        square.getElementsByClassName('content')[0].style.width = null;
                        square.getElementsByClassName('content')[0].style.paddingLeft = null;
                        square.getElementsByClassName('content')[0].style.paddingRight = null;

                        var paragraphs = square.getElementsByTagName('p');

                        for(p = 0; paragraphs.length > p; p++){
                            paragraphs[p].style.maxHeight = '0px';
                        }

                        var h2 = square.getElementsByTagName('h2');

                        for(var h = 0; h2.length > h; h++){
                            h2[h].style.maxHeight = '0px';
                        }

                        e.target.parentElement.parentElement.classList.remove('active');

                        setTimeout(function(){
                            square.getElementsByClassName('float-title')[0].style.opacity = "1";

                            setTimeout(function() {
                                if (square.getElementsByClassName('thumb')[0]){
                                    square.getElementsByClassName('thumb')[0].style.display = "block";
                                }
                            }, 500);
                            eventFire(document.body, 'click');
                        }, 500);
                    }, 300);
                }

                if(e.target.parentElement.classList.contains('button-facebook')) {
                    window.open(
                        "https://www.facebook.com/sharer/sharer.php?u=" + document.URL,
                        '',
                        'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
                    );
                }
                if(e.target.parentElement.classList.contains('twitter')) {
                    var url = shortURL(document.URL);
                    var text = el.parentElement.parentElement.getElementsByClassName('materia-title')[0].innerHTML;
                    window.open(
                        'http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text),
                        '',
                        'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0'
                    );
                }
            }
        }
    }
}

function mountTilesHeights() {
    var tiles = document.getElementsByClassName('picture-item');

    for(var t = 0; tiles.length > t; t++) {
        //tiles[t].clientHeight = tiles[t].clientWidth;

        if(mobileAndTabletcheck()) {
            if (tiles[t].classList.contains('alternate')) {
                tiles[t].style.height = (tiles[t].clientWidth / 2) + 'px';
            } else {
                tiles[t].style.height = tiles[t].clientWidth + 'px';
            }
        } else {
            if (tiles[t].classList.contains('square-two-rows')) {
                tiles[t].style.height = (tiles[t].clientWidth * 2) + 'px';
            } else if ( (tiles[t].classList.contains('square-two-columns')) || (tiles[t].classList.contains('alternate'))) {
                tiles[t].style.height = (tiles[t].clientWidth / 2) + 'px';
            } else if( (tiles[t].classList.contains('square')) || ((tiles[t].classList.contains('square-two-rows-and-columns'))) ){
                tiles[t].style.height = tiles[t].clientWidth + 'px';
            }
        }
    }

    eventFire(document.body, 'click');
}

/**
 *
 * @param el - elemento
 * @param etype - evento
 *
 * dispara o evento definido no elemento definido
 */
function eventFire(el, etype){
    setTimeout(function(){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }

        mountTilesHeights();
    },500);
}

/**
 * retorna todos os tiles para seus formatos originais
 *
 * TODO: pausar os vídeos
 */
function resizeAll() {

    var buttonClose = document.getElementsByClassName('button-close active');

    for(var b = 0; buttonClose.length > b; b++) {
        eventFire(buttonClose[b], 'click');
        buttonClose[b].classList.remove('active');
    }

    eventFire(document.body, 'click');
}

/**
 *
 * @returns {boolean}
 * verifica se a página foi aberta em um sistema mobile
 */
function mobileAndTabletcheck() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

/**
 * @param sParam
 * retorna valor do parâmetro passado na URL(http://url?parametro=valor)
 */
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0][sParameterName[0].length-1] === sParam) {
            //return sParameterName[1] === undefined ? true : sParameterName[1];
            var element = document.getElementById(sParameterName[1] === undefined ? true : sParameterName[1]);

            if(element) {
                if(element.getElementsByClassName('content').length > 0) {
                    if(element.getElementsByClassName('content')[0].getElementsByClassName('infos').length) {
                        var imageUrl = element.getElementsByClassName('content')[0].getElementsByClassName('infos')[0].getElementsByTagName('img')[0].getAttribute('src');
                        changeOGMetaTag(imageUrl);
                    }
                }

                setTimeout(function() {
                    smoothScroll(element);
                    setTimeout(function() {
                        eventFire(element, 'click');
                    }, 1000);
                }, 500);
            }
        }
    }
}

function shortURL( pLongUrl ) {
    if ( !pLongUrl.match(/(ftp|http|https):\/\//i) ) {
        return "Error: Link must start with a protocol (e.g.: http or https).";
    }
    if(apiKey == null) {
        return pLongUrl;
    }

    $.ajax(
        {
            url: 'https://api-ssl.bitly.com/v3/shorten?login=' + username + '&apiKey=' + apiKey + '&format=json&longUrl=' + encodeURIComponent(pLongUrl),

            dataType: 'jsonp',

            success: function( response ) {
                if ( response.status_code == 500) {

                    /*500 status code means the link is malformed.*/
                    return "Error: Invalid link.";

                } else if ( response.status_code != 200) {

                    /*If response is not 200 then an error ocurred. It can be a network issue or bitly is down.*/
                    return "Error: Service unavailable.";

                    /*Uncomment the following line only for debugging purposes*/
                    /*console.log('Response: ' + response.status_code + '-' + response.status_txt);*/
                }
                else
                    return response.data.url; /* OK, return the short link */
            },

            contentType: 'application/json'
        }
    );
}

function smoothScroll(el) {
    window.scroll({
        top: window.pageYOffset + el.getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth'
    });
}

function changeOGMetaTag(imageURL) {
    var url = document.URL.replace(document.location.hash, '');
    var link = document.createElement('meta');
    link.setAttribute('property', 'og:image');
    link.content = url + imageURL;

    console.log(link.content);

    document.getElementsByTagName('head')[0].appendChild(link);
}

function getAllAnchorLinks() {
    var ids = document.querySelectorAll('*[id]');

    for(var x = 0; ids.length > 0; x++) {
        if(ids[x] !== undefined){
            if(ids[x].classList.contains('picture-item')){
                console.log(document.URL + "#v=" + ids[x].getAttribute('id'));
            }
        }
    }

    return false;
}