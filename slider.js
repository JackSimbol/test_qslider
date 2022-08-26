function addListener(sid, wid){
    var sliderEl = document.querySelector("#"+sid);
    var selectedEl = document.querySelector("#"+wid);
    
    sliderEl.addEventListener("input", () => { //根据滑块值修改填写值
        selectedEl.value = sliderEl.value;
    });
    selectedEl.addEventListener("input", () =>{ //根据输入修改滑块值
        sliderEl.value = selectedEl.value;  
    })
}

function send(){
    var aa = selectedEl;
    window.location.href="reviewfield.php?data="+aa;
}

/*
oid: list
*/
function get_sum(oid, tid){ //得到除了tid以外的所有选项的值
    var sum = 0;
    for(var id of oid){
        if(id !== tid){
            var weight = parseInt(document.getElementById(id).value);
            sum += weight;
        }
    }
    if(sum > 100) {
        console.error("Error: The total weight must be 100");
        return false;
    }
    return sum;
}

function set_max(oid, tid){  //控制每个滑动条的最大值
    return 100 - get_sum(oid, tid);
}

/*
tid: textspace id（滑动条左侧显示数据） 
*/
function keep_value(tid, maxval){ //控制滑动条不超过最大值 
    if(document.getElementById(tid).value > maxval){
        document.getElementById(tid).value = maxval;
        var wid = document.getElementById(tid).getAttribute("wid");
        document.getElementById(wid).value = maxval;
    }
}

function auto_selected(oid){ //剩余一项未填时，自动获取该项值
    var cnt_zero = 0;
    var zero_id;
    for(var id of oid){
        if(document.getElementById(id).value == 0){
            cnt_zero += 1;
            zero_id = id;
        }
    }
    if(cnt_zero == 1){
        var autoval = set_max(oid, zero_id);
        document.getElementById(zero_id).value = autoval;
        var wid = document.getElementById(zero_id).getAttribute("wid");
        document.getElementById(wid).value = autoval;
    }
}

function check_sum(oid){ //检查总和是否为100
    var sum = 0;
    for(var id of oid){
        sum += parseInt(document.getElementById(id).value);
    }
    if(sum !== 100){
        return false;
    }
    return true;
}

/*
tid: 问题id
lid: slider下方一行显示报错log
*/
function check(tid){  //提交前/作答完成后检查
    var oid = get_id(document.getElementById(tid).getAttribute("idlist"));
    var lid = document.getElementById(tid).getAttribute("logid");
    if(!check_sum(oid)){
        document.getElementById(lid).innerHTML = "Error: sum of weight must be 100.";
        document.getElementById(lid).style.color = "#f53b57";
        return false;
    }
    document.getElementById(lid).innerHTML = "OK.";
    document.getElementById(lid).style.color = "#00ff00";
    return true;
}

function process_slider(idlist, tid){
    var oid = get_id(idlist);
    keep_value(tid, set_max(oid, tid));
    auto_selected(oid);
}

/*
idlist: String
*/
function get_id(idlist){
    return idlist.split(',');
}

/*
application on demo
*/
addListener("slider-input1", "weight-input1");
addListener("slider-input2", "weight-input2");
addListener("slider-input3", "weight-input3");

var idlist = document.getElementById("testTab1").getAttribute("idlist");

document.getElementById("slider-input1").oninput = function(){
    process_slider(idlist,"slider-input1");
}

document.getElementById("slider-input2").oninput = function(){
    process_slider(idlist,"slider-input2");
}

document.getElementById("slider-input3").oninput = function(){
    process_slider(idlist,"slider-input3");
}

document.getElementById("check").onclick = function(){
    check("testTab1");
}
