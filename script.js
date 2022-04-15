var cards = [] ;
var actives ;
var Pointsp1 = 0 ;
var Pointsp2 = 0 ;
var time = 0 ;

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
    cards.clear ;
    setCards() ;
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
        let divSimbol = document.createElement('div') ;
        let divNumber = document.createElement('div') ;
        divSimbol.classList.add('simbol') ;
        divNumber.classList.add('num') ;
        document.querySelector('#divGame').append(div) ;
        index += 1 ;
    } ;

    var divs = document.querySelectorAll('#divGame div')
    for (let p = 0; p<divs.length;p++) {
        divs[p].textContent = cards[p]['number']
    } ;
    divs.forEach(item => item.addEventListener('click',(e) => {
        document.querySelectorAll('#divGame div')[e.target.getAttribute('data-number') - 1].classList.add('active') ;
        actives = document.querySelectorAll('#divGame div.active') ;
        if (actives.length == 2) {
            document.querySelector('#divGame').style.pointerEvents = 'none' ;
            if (actives[0].textContent == actives[1].textContent) {
                setTimeout(() => {
                    actives.forEach(item => item.remove()) ;
                    let newDivs = document.querySelectorAll('#divGame div') ;
                    if (newDivs.length == 0) {
                        setTimeout(() => {
                            document.querySelector('.refresh').style.display = 'flex' ;
                            document.querySelector('.fa-arrows-rotate').addEventListener('click',() => {
                                window.location.href = 'index.html' ;
                            }) ;
                        },1500) ;
                    }
                    for (let index = 0; index < newDivs.length; index++) {
                        newDivs[index].setAttribute('data-number',index + 1) ;
                    } ;
                    if (gameMode == 'multiplayer') {
                        if (time % 2 == 0) {
                            Pointsp1 += 1 ;
                            document.querySelector('#pointsPlayer1').textContent = Pointsp1 ;
                        }else {
                            Pointsp2 += 1 ;
                            document.querySelector('#pointsPlayer2').textContent = Pointsp2 ;
                        } ;
                    }else{
                        Pointsp1 += 1 ;
                        document.querySelector('#pointsPlayerSimgle').textContent = Pointsp1 ;
                    } ;
                    
                    document.querySelector('#divGame').style.pointerEvents = 'auto' ;
                },500) ;
            }else{
                setTimeout(removeActives,500) ;
                time += 1 ;
                if (time % 2 == 0){
                document.querySelector('#p1').style.color = 'red' ;
                document.querySelector('#p2').style.color = 'white' ;
                }else{
                    document.querySelector('#p2').style.color = 'red' ;
                    document.querySelector('#p1').style.color = 'white' ;
                } ;
            } ;
            
        } ;
    })) ;
} ;

function removeActives() {
    actives.forEach(item => item.classList.remove('active')) ;
    document.querySelector('#divGame').style.pointerEvents = 'auto' ;
} ;

function setCards() {
    var list = [] ;
    for (let index = 1; index < (gameDificulty / 2) + 1; index++){
        list.push(index) ;
        list.push(index) ;
    } ;
    for (let index = 0; index < gameDificulty; index++){
        cards[index] = {number: null,'status': 1} ;
        while (true) {
            let position = parseInt(Math.random() * (gameDificulty + 1)) ;
            if (list[position] != null){
                cards[index]['number'] = list[position] ;
                list[position] = null ;
                break ;
            } ;
        } ;
    } ;
} ;

