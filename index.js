let password_value=document.querySelector('.Password_value');
let password_length=document.querySelector('.Password_length');
let slider=document.querySelector(".slider");
let copy=document.querySelector('.copy_button');
let copy_status=document.querySelector('.copy_status');
let allcheckboxes=document.querySelectorAll('.checkbox');
let gen_btn=document.querySelector('.generate_button');
let uc=document.querySelector('#uc');
let lc=document.querySelector('#lc');
let no=document.querySelector('#no');
let sym=document.querySelector('#sym');
let strength=document.querySelector('.circle');
let reset_btn=document.querySelector('.reset_button');
let symbols="~`!@#$%^&*()_+-=\|}{[];:<>,.?/";

let pass_length=10;
let pass="";
let count=0;
handleSlider();
set_indicator('#ccc');

function set_indicator(color)
{
    strength.style.backgroundColor=color;
    strength.style.boxShadow=`0px 0px 12px 1px ${color}`;
}

function calc_strength()
{
    if((uc.checked && lc.checked) && (sym.checked || no.checked) && (pass_length >= 8))
       set_indicator('#0f0');

    else if((uc.checked || lc.checked) && (sym.checked || no.checked) && (pass_length >= 6))
       set_indicator('#ff0');
    
    else 
       set_indicator('#f00');
} 

function handleSlider()
{
   slider.value=pass_length;
   password_length.innerText=pass_length;
   let min=slider.min;
   let max=slider.max;
   slider.style.backgroundSize=((pass_length-min)*100/(max-min))+"% 100%";
}

slider.addEventListener('input',()=>{
   pass_length=slider.value;
   handleSlider();
});



function generateRandomInteger(min,max)
{
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateInteger()
{
    return generateRandomInteger(0,10);
}

function generateLowerCase()
{
    return String.fromCharCode(generateRandomInteger(97,123));
}

function generateUpperCase()
{
    return String.fromCharCode(generateRandomInteger(65,91));
}

function generateSymbol()
{
    let val=generateRandomInteger(0,symbols.length);
    return symbols[val];
}

async function copy_value()
{
    try{
        await navigator.clipboard.writeText(password_value.value);
        copy_status.innerText="Copied";        
    }
    catch(e)
    {
        copy_status.innerText="Failed";
    }

    copy_status.classList.add("active");

    setTimeout(()=>{
       copy_status.classList.remove("active");
    },2000);
}

copy.addEventListener("click",()=>{
    if(pass)
      copy_value();
});

function handlecheckbox()
{
    count=0;
    allcheckboxes.forEach((checkbox)=>{
          if(checkbox.checked)
            count++;
    });
}

allcheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckbox);
});

function shuffle(str)
{
    let arr=Array.from(str);
    for(let i=arr.length-1;i>0;i--)
    {
        let j=Math.floor(Math.random() * (i+1));
        let temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    }
    str="";
    for(let val=0;val<arr.length;val++)
      str+=arr[val];

    return str;
}

gen_btn.addEventListener('click',()=>{
  
    
    if(slider.value==0)
    {
        pass_length=0;
        password_value.value="Please update slider from 0";
        return;
    }

    if(count==0)
    {
        pass_length=count;
        handleSlider();
        password_value.value="Please select any checkbox";
        return;
    }
    
    if(pass_length < count)
    {
        pass_length=count;
        handleSlider();
    }

    
    pass="";

    let arr=[];
    
    if(uc.checked)
      arr.push(generateUpperCase);

    if(lc.checked)
      arr.push(generateLowerCase);

    if(no.checked)
      arr.push(generateInteger);

    if(sym.checked)
      arr.push(generateSymbol);
    
    for(let i=0;i<arr.length;i++)
      pass+=arr[i]();
    
    for(let i=0;i<pass_length-arr.length;i++)
    {
        let val=generateRandomInteger(0,arr.length);
        pass+=arr[val]();
    }
    
    pass=shuffle(pass);
    password_value.value=pass;
    calc_strength();
});

reset_btn.addEventListener('click',change);

function change()
{
    password_value.value="";
    pass="";
    pass_length=10;
    handleSlider();
    set_indicator('#ccc');
    count=0;

    if(uc.checked)
      uc.checked=false;

    if(lc.checked)
      lc.checked=false;

    if(no.checked)
      no.checked=false;

    if(sym.checked)
      sym.checked=false;
}