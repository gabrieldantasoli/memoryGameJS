var start = document.querySelector('#start') ;
start.addEventListener('click',checkCanStart) ;

var gameMode = false , gameDificulty = false;

function checkCanStart(){
    let gamemode = document.querySelectorAll('.gamemode input[type="radio"]') ;
    for (let index = 0; index < gamemode.length; index++){
        if (gamemode[index].checked) {
            gameMode = gamemode[index].id ;
            break ;
        }
    } ;

    let gamedificulty = document.querySelectorAll('.gamedificulty input[type="radio"]') ;
    for (let index = 0; index < gamedificulty.length; index++) {
        if (gamedificulty[index].checked) {
            gameDificulty = gamedificulty[index].getAttribute('data-number') ;
            break ;
        } ;
    }

    if (gameMode == false || gameDificulty == false) {
        alert('Error ! Choose the game\'s Mode and game\' Dificulty') ;
    }else{
        startGame() ;
    } ;
} ;

function startGame() {
    document.querySelector('footer').classList.toggle('active') ;
    document.querySelector('#gameOptions').style.display = 'none' ;
    document.querySelector('#gameContainer').style.display = 'initial' ;

    if (gameMode == 'multiplayer') {
        document.querySelector('.pointsp1').style.display = 'block' ;
    }else{
        document.querySelector('.pointsp2').style.display = 'block' ;
    } ;

    let index = 0 ;
    let indey = 0 ;
    for (let inde = 0; inde < gameDificulty; inde++) {
        if (inde % Math.sqrt(gameDificulty) == 0 && inde > 0) {
            indey += 1 ;
            index = 0 ;
        } ;
        let div = document.createElement('div')
        div.setAttribute('data-number',inde + 1)
        div.style.top = `calc(${((100 / Math.sqrt(gameDificulty)))*indey}% + 1px)` ;
        div.style.left = `calc(${((100 / Math.sqrt(gameDificulty)))*index}% + 1px)` ;
        div.style.width = `calc(${100 / Math.sqrt(gameDificulty)}% - 2px)` ;
        div.style.height = `calc(${100 / Math.sqrt(gameDificulty)}% - 2px)` ;
        document.querySelector('#divGame').append(div) ;
        index += 1 ;
    } ;
} ;