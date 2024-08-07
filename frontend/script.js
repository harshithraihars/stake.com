const body=document.querySelector("body")
const topdiv=document.querySelector(".topdiv")
const Manualbutton=document.querySelector(".manual")
const autobutton=document.querySelector(".auto")
const selectmine=document.querySelector("select")
const halfbutton=document.querySelector(".half")
const doublebutton=document.querySelector(".double")
const moneyinput=document.querySelector(".moneyinput")
const squares=document.querySelectorAll(".square")
const first=document.querySelector(".square")
const minenumber=document.querySelector(".selectmine")
const betbutton=document.querySelector(".betbutton")
const innerpart=document.querySelector(".innerdiv")
const leftpart=document.querySelector(".leftpart")
const rightpart=document.querySelector(".rightpart")
const footer=document.querySelector(".footer")
totalmoney=document.querySelector(".money")
regbutton=document.querySelector(".reg-button")
signin=document.querySelector(".signinlink")
let regpage
let signinpage=null
let current_user
function signin_page(){
    
}
function showall(){
    setTimeout(()=>{
        squares.forEach((box)=>{
            if(!checked.includes(box)){
                if(box.classList.contains("p")){
                    box.classList.add("mine")
                    box.style.opacity=0.3
                }
                else{
                    box.classList.add("gem")
                    box.style.opacity=0.3;
                }
            }
        })
    },500)
}

function winningbox(profit){
    const profitinfo=document.createElement("div")
    profitinfo.setAttribute("class","profitinfo")
    rightpart.appendChild(profitinfo)
    times=(Number(profit.innerText)/Number(moneyinput.value)).toFixed(2)
    profitinfo.innerHTML=`<p class="times"><b>${times}x</b></p> 
                          <p class="profitmoney"><i class="fa-solid fa-indian-rupee-sign symbol"></i>${profit.innerText}</p>`
    setTimeout(()=>{
        rightpart.removeChild(profitinfo)
    },4000)
}


function reduct(){
    const bet_money=moneyinput.value
    totalmoney.innerText=(Number(totalmoney.innerText)-Number(bet_money)).toFixed(2)
}


function clearsquares(){
    squares.forEach((square)=>{
        square.classList.remove("p")
        square.classList.remove("gem")
        square.classList.remove("mine")
        square.style.opacity=1;
    })
}


function generategen(n,gemmineheading,headings,withdraw,profit) {

    let check = [];

    while (check.length < n) {
        let x = Math.floor(Math.random() * 25) + 1;
        if (!check.includes(x)) {
            check.push(x);
        }
    }

    check.forEach((val)=>{
        const classname="square"+val
        const minesquare=document.querySelector("."+classname)
        minesquare.classList.add("p")
    })

    squares.forEach((square)=>{

        function reset(){
            gemmineheading.classList.add("hidden")
            headings.classList.add("hidden")
            withdraw.classList.add("hidden")
            leftpart.appendChild(betbutton)
        }

        checked=[]
        profit_money=0
        const betamount=Number(moneyinput.value)
        const nmines=Number(minenumber.value)
        count=0

        square.onclick=()=>{

            if(!square.classList.contains("p")){
                square.classList.add("gem")
                checked.push(square)

                count+=1
                profit_money=((nmines*count)/(25-3))+1
                actual_profit=1.8*((betamount*profit_money)-betamount)
                profit.innerText=Number(actual_profit).toFixed(4)
    
            }

            else{
                square.classList.add("mine")
                checked.push(square)
                reset()
                showall()
                // moneyinput.value='0.0000000'
            }

            console.log(checked)

        }
    })
}
function invalidbox(temp){

    const check=document.querySelector(".invalid")

    if(!check){
        invalid=document.createElement("div")
        invalid.setAttribute("class","invalid")
        if(temp){
            invalid.innerHTML=`<p class="invalidmoney">Invalid amount</p>`
        }

        else{
            invalid.innerHTML=`<p class="invalidmoney">Insufficient Money</p>`
        }
        
        leftpart.appendChild(invalid)
        return invalid
    }
}

function createbox(){
    const gemmineheading=document.createElement("div")
    betbutton.remove()
    headings=document.createElement("div")
    headings.setAttribute("class","heading")
    leftpart.appendChild(headings)
    gemmineheading.setAttribute("class","gemminheading")
    leftpart.appendChild(gemmineheading)

    mines=document.createElement("div")
    mines.setAttribute("class","mines")
    mines.innerHTML=`<p class"minegem">Mines&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gems</p>`
    headings.appendChild(mines)

    minediv=document.createElement("div")
    minediv.setAttribute("class","minediv")
    minenum=minenumber.value
    gemnum=25-minenum
    minediv.innerHTML=`<p class="minenum">${minenum}</p>`
    gemdiv=document.createElement("div")
    gemdiv.setAttribute("class","gemdiv")
    gemdiv.innerHTML=`<p class="minenum">${gemnum}</p>`
    gemmineheading.appendChild(minediv)
    gemmineheading.appendChild(gemdiv)
    console.log(leftpart)

    profit=document.createElement("div")
    profit.setAttribute("class","profit")
    // profit.innerHTML=`<p class="profitval">0.00</p>`
    profit.innerText="0.00"
    const profitval=document.querySelector(".profitval")
    // console.log(profitval)
    gemmineheading.appendChild(profit)

    pickrandom=document.createElement("div")
    pickrandom.setAttribute("class","profit")
    pickrandom.innerHTML=`<p class="pickrandom">Pick random file</p>`
    gemmineheading.appendChild(pickrandom)

    withdraw=document.createElement("button")
    withdraw.innerText="Withdraw"
    withdraw.setAttribute("class","withdraw")
    leftpart.appendChild(withdraw)

    let profitinfo; // Declare profitinfo in the outer scope

    withdraw.addEventListener("click", () => {
        gemmineheading.classList.add("hidden");
        headings.classList.add("hidden");
        withdraw.classList.add("hidden");
        leftpart.appendChild(betbutton);
        const remaining=Number(totalmoney.innerText) + Number(profit.innerText)
        totalmoney.innerText =remaining ;
        showall();
        profitinfo = winningbox(profit); // Assign value to the outer scoped profitinfo
        minenumber.disabled=false

        // database

        async function update(){
            await fetch(api,{
            method:"PATCH",
            headers:{
                'Accept':'application/json,text/plain,*/*',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"email":current_user,"money":remaining})
        }).then(res=>res.json)
        }
        update()
        
    });

    return [gemmineheading,headings,withdraw,profit]
}


autobutton.onclick=()=>{
    Manualbutton.classList.remove("selected");
    autobutton.classList.add("selected");
}

Manualbutton.onclick=()=>{
    autobutton.classList.remove("selected");
    Manualbutton.classList.add("selected");
}

let options=[]
for(let i=2;i<25;i++){
    options.push(i);
}

for(let x of options){
    let newopt=document.createElement("option")
    newopt.innerText=x;
    selectmine.append(newopt)
}

halfbutton.onclick=()=>{
    let value=moneyinput.value
    moneyinput.value=Number(0.5*value).toFixed(4)
}

doublebutton.onclick=()=>{
    let value=moneyinput.value
    moneyinput.value=(2*value).toFixed(4)
}
first.onclick=()=>{
    first.classList.add("mine")
}
betbutton.onclick=()=>{
    if(!current_user){
        reg_page()
    }
    else{
        if(Number(moneyinput.value)==0 || moneyinput.value>Number(totalmoney.innerText)){
            if(Number(moneyinput.value)==0){
                temp=true
            }
            else{
                temp=false
            }
            invalid=invalidbox(temp)
            // minenumber.disabled=true
            moneyinput.value=''
            moneyinput.focus()
            totalmoney.focus()
        }
        else{
            const values=createbox()
            clearsquares()
            const number=minenumber.value
            reduct()
            generategen(number,values[0],values[1],values[2],values[3])
            // leftpart.removeChild(invalid)
            leftpart.removeChild(range)
            minenumber.disabled=true
        }
    }
}
moneyinput.addEventListener("blur",()=>{
    moneyinput.value=Number(moneyinput.value).toFixed(4)
})

// backend
api="http://localhost:5000/api/register"

function close(){
    rightpart.classList.remove("blur")
    topdiv.classList.remove("blur")
    leftpart.classList.remove("blur")
    last.classList.remove("hidden")
}

function addblur(){
    rightpart.classList.add("blur")
    topdiv.classList.add("blur")
    leftpart.classList.add("blur")
    last.classList.add("hidden")

}
last=document.querySelector(".last")
function reg_page(){
    if(!regpage){
        regpage=document.createElement("div")
        regpage.setAttribute("class","regpage")
        innerpart.appendChild(regpage)

        // innner part
        cross=document.createElement("div")
        regpage.appendChild(cross)
        cross.innerHTML=`<i class="fa-solid fa-xmark exit"></i>`
        closeregister=document.querySelector(".exit")
        cross.setAttribute("class","cross")
        cac=document.createElement("div")
        regpage.appendChild(cac)
        cac.setAttribute("class","cac")
        cac.innerHTML=`<p class="createaccount"><b>Create an Account</b></p>`

        fod=document.createElement("div")
        regpage.appendChild(fod)
        fod.innerHTML=`<p class="createaccount fod"><b>Step 1/2: Fill out your details</b></p>`
        fod.style.opacity=0.7

        emaildiv=document.createElement("div")
        regpage.appendChild(emaildiv)
        emaildiv.innerHTML=`<p class="inputtext">Email *</p><input type="email" class="inputs emailinput">`

        userdiv=document.createElement("div")
        regpage.appendChild(userdiv)
        userdiv.innerHTML=`<p class="inputtext">Username *</p><input class="inputs username"><p class="usernameinfo">Your username must be 3-14 characters long.</p>`

        passdiv=document.createElement("div")
        regpage.appendChild(passdiv)
        passdiv.innerHTML=`<p class="inputtext">Password *</p><input type="password" class="inputs password">`

        dobdiv=document.createElement("div")
        regpage.appendChild(dobdiv)
        dobdiv.innerHTML=`<p class="inputtext">Date of Birth *</p>
                            <div class="dob"><input type="number" min="1" max="31" class="date"><select class="date select"><input type="number" min="1996" max="2005" class="date year"></div>`
        options=["January","Febraury","March","April","May","june","July","August","September","October","November","December"]
        select=document.querySelector(".select")
        options.forEach((opt)=>{
            newopt=document.createElement("option")
            newopt.innerText=opt
            newopt.value=opt
            select.append(newopt)
        })

        phonediv=document.createElement("div")
        regpage.appendChild(phonediv)
        phonediv.innerHTML=`<p class="inputtext">Phone (Optional)</p>
                            <div class="phone"><input value="+91" class="phcode"><input class="phno"></div>`
        
        optional=document.createElement("div")
        optional.setAttribute("class","optional")
        regpage.appendChild(optional)
        optional.innerHTML=`<input type="checkbox"><p>&nbsp&nbspCode(Optional)</p>`
        console.log(optional)

        continu=document.createElement("button")
        continu.setAttribute("class","continu")
        continu.innerText="Continue"
        regpage.appendChild(continu)

        or_div=document.createElement("div")
        or_div.setAttribute("class","or_div")
        or_div.innerHTML=`<div class="rectangle"></div><p id="or">&nbspOR&nbsp</p><div class="rectangle"></div>`
        regpage.appendChild(or_div)

        already_div=document.createElement("div")
        already_div.setAttribute("class","already_div")
        already_div.innerHTML=`<p class="text">Already have an account?</p><a href="#" class="link">&nbspSign In</a>`
        regpage.appendChild(already_div)

        let link=document.querySelector(".link")
        link.onclick=()=>{
            sign()
            // innerpart.removeChild(regpage)
            regpage.classList.add("hidden")

        }

        closeregister.onclick=()=>{
            regpage.classList.add("hidden")
            close()
        }
    }
    else{
        last.classList.add("hidden")
        regpage.classList.remove("hidden")
    }

    // creating a post request
    let emailinput=document.querySelector(".emailinput")
    let usernameinput=document.querySelector(".username")
    let passwordinput=document.querySelector(".password")
    let dayinput=document.querySelector(".date")
    let monthinput=document.querySelector(".select")
    let yearinput=document.querySelector(".year")
    let inputs=document.querySelectorAll(".inputs")

    validemail=document.createElement("p")
    validemail.setAttribute("id","validation")
    inputs = document.querySelectorAll(".inputs");
    inputs.forEach(input => {
        input.onfocus = () => {
            input.style.border = "3px solid #2F4553";
        };
    });

    inputs.forEach(input => {
        input.onblur = () => {
            if(emaildiv.contains(validemail)){
                emaildiv.removeChild(validemail)
            }
        };
    });

    continu.onclick= async ()=>{
        email=emailinput.value
        username=usernameinput.value
        password=passwordinput.value
        day=dayinput.value
        month=monthinput.value
        year=yearinput.value
        DOB=day+"/"+month+"/"+year
        if(!email | !username | !password){
            if(!email){
                emailinput.style.border="3px solid rgb(247, 81, 81)"
            }
            if(!username){
                usernameinput.style.border="3px solid rgb(247, 81, 81)"
            }
            if(!password){
                passwordinput.style.border="3px solid rgb(247, 81, 81)"
            }
        }

        else if(!email.endsWith("@gmail.com")){
            emailinput.style.border="3px solid rgb(247, 81, 81)"
        validemail.innerText="Please Enter a Valid Email"
            emaildiv.appendChild(validemail)
        }

        else if(username.length<3 | username.length>14){
            usernameinput.style.border="3px solid rgb(247, 81, 81)"
        }

        else{
            const datas=await fetch(api).then(res=>res.json())
            const data=datas.find((data)=>data.email==email)
            if(data){
                validemail.innerText="Email already exist"
                emaildiv.appendChild(validemail)
                emailinput.style.border="3px solid rgb(247, 81, 81)"
            }
            else{
                await fetch(api,{
                method:"POST",
                headers:{
                    'Accept':'application/json,text/plain,*/*',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"email":email,"username":username,"password":password,"DOB":DOB})
            }).then(res=>res.json).then(res=>{
            })
            // location.reload()
            regpage.classList.add("hidden")
            rightpart.classList.remove("blur")
            topdiv.classList.remove("blur")
            leftpart.classList.remove("blur")
            last.classList.remove("hidden")
            totalmoney.innerText="2000"
            }
        }
        
    }
}
regbutton.onclick=()=>{
    reg_page()
    addblur()
}
let cross;
let signheading;
let emaildiv;
let passdiv;
let continu;
let Inval_user;

function sign(){
    if(!signinpage){
        signinpage=document.createElement("div")
        signinpage.setAttribute("class","signinpage")
        innerpart.appendChild(signinpage)

        cross=document.createElement("div")
        signinpage.appendChild(cross)
        cross.innerHTML=`<i class="fa-solid fa-xmark exit2"></i>`
        // closeregister=document.querySelector(".exit")
        cross.setAttribute("class","cross")

        signheading=document.createElement("div")
        signinpage.appendChild(signheading)
        signheading.setAttribute("class","cac")
        signheading.innerHTML=`<p class="createaccount"><b>Sign In</b></p>`

        emaildiv=document.createElement("div")
        signheading.appendChild(emaildiv)
        emaildiv.innerHTML=`<p class="inputtext">Email or Username *</p><input type="email" class="inputs emailinput" autocomplete="off">`

        passdiv=document.createElement("div")
        signinpage.appendChild(passdiv)
        passdiv.innerHTML=`<p class="inputtext">Password *</p><input type="password" class="inputs password" autocomplete="off">`

        continu=document.createElement("button")
        continu.setAttribute("class","continu")
        continu.innerText="Sign In"
        continu.style.marginTop="3rem"
        signinpage.appendChild(continu)

        closesigninbox=document.querySelector(".exit2")

        closesigninbox.onclick=()=>{
            signinpage.classList.add("hidden")
            close()
        }

        let email_username=document.querySelector(".emailinput")
        passwordinput=document.querySelector(".password")

        inputs = document.querySelectorAll(".inputs");

        Inval_user=document.createElement("p")
        Inval_user.setAttribute("class","inputtext")
        Inval_user.style.color="red"
        Inval_user.style.fontSize="large"
        inputs.forEach(input => {
            input.onfocus = () => {
                if(passdiv.contains(Inval_user)){
                    passdiv.removeChild(Inval_user)
                }
        };
    });

        continu.onclick=async ()=>{
            email_user=email_username.value
            password=passwordinput.value
            if(!email_user | !password){
                Inval_user.innerText="Please provide all the details"
                passdiv.appendChild(Inval_user)

            }
            else{
                const check=await fetch(api+"/"+email_user+"/"+password).then(res=>res.json())
                console.log(check.success)
                if(check.success){
                    current_user=check.email
                    done=document.createElement("div")
                    done.innerHTML=`<p class="createaccount complete">Login Successfull</p>`
                    signinpage.appendChild(done)
                    totalmoney.innerText=check.amount
                    async function success(){
                        return new Promise((resolve,reject)=>{
                            setTimeout(()=>{
                                signinpage.removeChild(done)
                                resolve()
                            },2000)
                        })
                        
                    }
                    success().then(()=>{
                        signinpage.classList.add("hidden")
                        close()
                    })
                }
                else{
                    Inval_user.innerText="Invalid Username or Password"
                    passdiv.appendChild(Inval_user)
                }
            }
        }
    }
    else{
        signinpage.classList.remove("hidden")
    }
    
}
signin.onclick=()=>{
    // if(innerpart.contains(regpage)){
    //     innerpart.removeChild(regpage)
    // }  
    sign()
    addblur()
}

