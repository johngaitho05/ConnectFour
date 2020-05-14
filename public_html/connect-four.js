/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
alert('Welcome to connect-four game. P1 will take blue and P2 will take red');
p1 = 'P1';
p2 = 'P2';
turn = p1;
$('#turn').text(turn);
p1Color = 'rgb(0, 0, 255)';
p2Color = 'rgb(255, 0, 0)';

chips = [
    'ccccccc',
    'ccccccc',
    'ccccccc',
    'ccccccc',
    'ccccccc',
    'ccccccc'
];

function displayBoard(){ 
    board = $('#board');
    content = "";
    for(i=0;i<chips.length;i++){
        row = chips[i];
        subContent = '<tr>';
        for(j=0;j<row.length;j++){
            subContent  += `<td><button class='chip' onclick='play(${j})' id='${i}_${j}'></button></td>`;
        }
        subContent += '</tr>';
        content += subContent
    } 
    board.html(content);
    return false;
} 

function play(j){
    chip = getChip(j)
    if(chip){
        if (turn === p1){
            chip.css('background-color', p1Color);
            $('#turn').text(p2);
            if(checkWin()){
                announceWinner(turn);
            }
            turn = p2;
            
        }else{
            chip.css("background-color",p2Color);
            $('#turn').text(p2);
            if(checkWin()){
                announceWinner(turn);
            }
            turn = p1;
            $('#turn').text(p1);
        }
            
    } 
    
}

function getChip(j){
    n = chips.length-1
    for(i=n;i>=0;i--){
        id = '#'+ i + '_' + j
        chip = $(id);
        if(chip.css('background-color') === 'rgb(128, 128, 128)'){
            return chip
        }
    }
    return false
}

function checkWin(){
    n = (chips.length - 1);
    for(i=n;i>=0;i--){
        row = chips[i];
        for(j=0;j<=(row.length-4);j++){
            color = getColor(i,j);
            if(color === getColor(i,j+1) && color === getColor(i,j+2) && 
                    color === getColor(i,j+3) && color  != 'rgb(128, 128, 128)'){
                return true 
            } 
        }
    }
    for (j=0;j<chips[0].length;j++){
        for(i=n;i>=3;i--){
            color = getColor(i,j);
            if(color === getColor(i-1,j) && color=== getColor(i-2,j) && 
                    color===getColor(i-3,j) && color  != 'rgb(128, 128, 128)'){
                return true 
            } 
        }
    }
    for(i=n;i>2;i--){
        row = chips[i]
        if(i=== n){
            start = 3;
        }else{
            start = row.length-1;
        }
        for(j=start;j<row.length;j++){
            count = 0;
            x = i;
            y = j;
            color = null;
            while(x>-1 && y>-1){
                newColor = getColor(x,y);
                if(newColor === color && color !== 'rgb(128, 128, 128)'){
                    count += 1;
                    if(count === 4)
                        return true
                }else{
                    count = 1;
                }    
                color = newColor;
                x-=1;
                y-=1;
            }
        }
    }
    empty = 0;
    for(i=0;i<chips.length;i++){
        row = chips[i];
        for(j=0;j<row.length;j++){
            chip = $('#'+i+'_'+j);
            if(chip.css('background-color')==='rgb(128, 128, 128)'){
                empty += 1;
            }
        }
    }
    if(empty === 0){
        alert('Game over')
        restartGame();
    }
    return false
}
 
 
function getColor(i,j){
    id = '#'+i + '_'+ j;
    chip = $(id);
    return chip.css('background-color');
}

function announceWinner(winner){
    alert(winner+ ' wins! game will restart');
    restartGame();
}

function restartGame(){
    $('.chip').css('background-color','rgb(128, 128, 128)');
}
