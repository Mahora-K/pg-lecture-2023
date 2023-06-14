import { shuffle } from './js/utils.mjs';

const maxPair =9;
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

function turn(){
    
}
