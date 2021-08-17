let times = 0;      // 游戏盘数

// 随机函数产生答案
function getRandom(n){
    let kNum;
    do{
        kNum = parseInt(Math.random()*Math.pow(10,n));
    }
    while(kNum < Math.pow(10, n-1));

    return kNum.toString();
}

// 设置游戏难度和猜数字位数
// btn onclick
function gameGenerate(){
    n = Number(document.getElementById('n').value);
    kString = getRandom(n);     // 产生n位数的答案

    // 是否有重复数字

    // 是否内测
    // document.getElementById('kString').value = kString;
    // document.getElementById('gameDisplay').innerHTML = '答案已生成，游戏开始';
    
    console.log(kString);       // 后台答案
    
    // 游戏界面调整
    document.getElementById("guess").style.display = "block";   // 显示猜数字板
    document.getElementById("answerBoard").style.display = "none";  // 禁用难度板
    document.getElementById("levelDisplay").innerHTML = `已成功加载游戏难度为 ${n} 位数的游戏，开始挑战！`;
    document.getElementById("newGame").value = "重新开始";
}

// 游戏玩耍的计分
function gameCaculate(n, iString){
    // 计分
    let result = [0,0];

    const keyNum = new Array(n);
    const inputNum = new Array(n);
    const bookKey = new Array(10);
    const bookInput = new Array(10);

    for (j = 0; j < 10; j ++){
        bookKey[j] = 0;
        bookInput[j] = 0;
    }
    
    for (i = 0; i < n; i ++){
        keyNum[i] = Number(kString[i]);
        inputNum[i] = Number(iString[i]);
    
        bookKey[keyNum[i]]++;
        bookInput[inputNum[i]]++;
    
        if(kString[i] == iString[i]){
            result[0] ++;
        }
    }
    
    for(j = 0; j < 10; j++){
        if(bookKey[j]){
            result[1] += bookInput[j];
        }
    }
    
    console.log(keyNum);
    console.log(inputNum);
    console.log(bookKey);
    console.log(bookInput);
    console.log(`a = ${result[0]}`);
    console.log(`b = ${result[1]}`);

    return result;
}


let sum = 0;


// 获得游戏输入
// btn onclick
function guessNumber(){
    sum ++;
    let iString = document.getElementById('iString').value;
    // kString = document.getElementById('kString').value;
    const n = Number(document.getElementById('n').value);
    const isRepeat = true;

    let result = gameCaculate(n, iString);
    let newRow = document.getElementById('gameBoard').insertRow(sum);
    newRow.insertCell(0).innerHTML = sum;
    newRow.insertCell(1).innerHTML = iString;
    newRow.insertCell(2).innerHTML = result[0];
    newRow.insertCell(3).innerHTML = result[1];
    // newRow.insertCell(4).innerHTML = kString;

    if(kString == iString){
        document.getElementById("gameResult").innerHTML = "恭喜你猜对了，还剩几根头发？";
        document.getElementById("newGame").value = "再来一局"
        times ++;

        document.getElementById("scoreBoard").style.display = "block";
        let newScore = document.getElementById('scoreBoard').insertRow(times);
        newScore.insertCell(0).innerHTML = times;
        newScore.insertCell(1).innerHTML = n;
        newScore.insertCell(2).innerHTML = isRepeat.toString();
        newScore.insertCell(3).innerHTML = kString;
        newScore.insertCell(4).innerHTML = sum;
    }
}

// initialization
// btn onclick
function newGame(){
    document.getElementById("guess").style.display = "none";   // 显示猜数字板
    document.getElementById("answerBoard").style.display = "block";  // 禁用难度板
    document.getElementById("levelDisplay").innerHTML = "";     // 取消游戏难度提示板
    for(i=1; i<=sum; i++){
        document.getElementById("gameBoard").deleteRow(1);
    }
    document.getElementById("gameResult").innerHTML = "没头发了还继续玩啊～";
    sum = 0;    // 计次归零
}