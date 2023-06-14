import { shuffle } from './js/utils.mjs';

let backTimer;
let flagFirst = true;
let cardFisrst; 
const maxPair = 9;
const cardImage =[];

// HTML のパース完了後まで initialize の実行を遅延させるための処理
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

function initialize() {
    const arr = [];

    for (let i = 0; i < maxPair; i++){
        arr.push(i)
        arr.push(i)
    }

    shuffle(arr)

    const panel =document.getElementById('panel');
    for (let i = 0 ; i < maxPair * 2; i++){
        const div = document.createElement('div');
        div.classList.add('card', 'back');
        div.dataset.index = i;
        div.dataset.number =arr[i]; 
        div.onclick = turn;
        panel.appendChild(div);

        const img = new Image();
        img.src='images/card'+ (arr[i]+1) +'.png'
        cardImage.push(img);
    }
}

function turn(e){
    const div =e.currentTarget;
    
    if(backTimer) return;
    
    if(div.classList.contains('back')){
        //裏向きのカードをクリックした場合
        div.classList.remove('back');
        div.appendChild(cardImage[div.dataset.index]);
    }else{
        //表向きのカードはreturn
        return;
    }

    if(flagFirst){
        //1枚目の処理
        cardFisrst = div;
        flagFirst = false;

    }else{
        //2枚目の処理
        if(cardFisrst.dataset.number ==div.dataset.number){
        //数字が1枚目と一致する場合
        backTimer = setTimeout(function(){
            div.classList.add('finish');
            backTimer = NaN;
        },500)
         }else{
        //一致しない場合
        backTimer = setTimeout(function(){
            div.classList.add('back');
            div.innerHTML = '';
            cardFisrst.classList.add('back');
            cardFisrst.innerHTML = '';
            cardFisrst = null;
            backTimer = NaN;
        
        },500)
        
        }
        flagFirst = true;
    }
}