
$(document).ready(function(){
  $("#lolo").prop("disabled",true); 
  $("#pass").keyup(function(){


    if(validatepass()){
  $("#princ").hide();


      // Si le mdp est valide
      $("#pass").css("border","3px solid green");
      $("#MsgV").html("mot de passe valide");
      $("#MsgV").css("color","green");
      $("#MsgV").css("font-style","italic");  
$(document).ready(function(){
  $("#pass1").keyup(function(){
      if($("#pass1").val()== $("#pass").val()){
        $("#lolo").prop("disabled",false);
        $("#va1").html("mot de passe compatible");
        $("#va1").css("color","green");
      $("#va1").css("font-style","italic");
      }
      else {
        $("#lolo").prop("disabled",true); 
        $("#va1").html("mot de passe incompatible");
        $("#va1").css("color","red");
      $("#va1").css("font-style","italic");
      }
    });
  });  
    }else{
           $("#MsgV").html("");  
             $("#princ").show();
 
      $("#pass").css("border","3px solid red");
      if(!valuppercase()){
      $("#va").css("color","red");
      $("#va").css("font-style","italic");
      $("#va").html("uppercase letter");
      }
      else {
      
        $("#va").css("color","green");
        $("#va").css("font-style","italic");
        $("#va").html("uppercase letter");
      }
    if(!vallowercase()){
      $("#va2").css("color","red");
      $("#va2").css("font-style","italic");
      $("#va2").html("lowercase letter");
    }
    else {
      
      $("#va2").css("font-style","italic");
      $("#va2").html("lowercase letter");
      $("#va2").css("color","green");
    }
    if(!valspecial()){
      $("#va3").css("color","red");
      $("#va3").css("font-style","italic");
      $("#va3").html("special character");
    }
      else{
        $("#va3").css("color","green");
        $("#va3").css("font-style","italic");
        $("#va3").html("special character");
      }
      if(!valnumber()){
      $("#va4").css("color","red");
      $("#va4").css("font-style","italic");
      $("#va4").html("number");
      }
      else {  
      $("#va4").css("font-style","italic");
      $("#va4").html("number");
      $("#va4").css("color","green");
      }
      if($("#pass").val().length<8){
      $("#va5").css("color","red");
      $("#va5").css("font-style","italic");
      $("#va5").html("Min 8 characters");
      }else {
     
      $("#va5").css("color","green");
      }
    }
  });  
});

var c;
c=0;
//////////////////////////////////////////////////////////validation de mdp
function valuppercase()
{
  var mdp3=$("#pass").val();
    // use reular expression
     var reg = new RegExp('[A-Z]');
     if(reg.test(mdp3)){
      return true;
     }else{
      return false;
     }
}
function vallowercase()
{
  var mdp3=$("#pass").val();
    // use reular expression
     var reg = new RegExp('[a-z]');
     if(reg.test(mdp3)){
      return true;
     }else{
      return false;
     }
}
function valspecial()
{
  var mdp3=$("#pass").val();
     var reg = /[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g;
     if(reg.test(mdp3)){
      return true;
     }else{
      return false;
     }
}
function valnumber()
{
  var mdp3=$("#pass").val();
    // use reular expression
     var reg = new RegExp('[0-9]');
     if(reg.test(mdp3)){
      return true;
     }else{
      return false;
     }
}

function validatepass(){
  var mdp3=$("#pass").val();
   var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/gi ;
   if(reg.test(mdp3)){
    return true;
   }else{
    return false;
   }

};
const cryptPass = function(str) {
    const hs=[0xdeadbeef ^ 0,0x41c6ce57 ^ 0,0xfae69b63 ^ 0,0xbadcaffe ^ 0];
    const imu2prm=[2654435761,1597334677,9745628194,6219433873,
                   2246822507,3266489909,9807643451,4576128788];
    let hash,i,ch;
    for (i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        for(let j=0;j<4;j++){
            hs[j] = Math.imul(hs[j] ^ ch, imu2prm[j]);
        }
    }  
    for(i=0;i<4;i+=2){
        hs[i] = Math.imul(hs[i] ^ (hs[i]<<32), imu2prm[i+4]) ^ Math.imul(hs[i+1] ^ (hs[i+1]<<9), imu2prm[i+5]);
        hs[i+1] = Math.imul(hs[i+1] ^ (hs[i+1]<<32), imu2prm[i+4]) ^ Math.imul(hs[i] ^ (hs[i]<<9), imu2prm[i+5]);
    } 

    hash=(hs[1]>>>0).toString(32).padStart(16,(hs[2]>>>0).toString(16).padStart(8,0));
    hash+=(hs[0]>>>0).toString(32).padStart(16,(hs[3]>>>0).toString(16).padStart(8,0));
    return hash;
 };
 
function signup(event){
  event.preventDefault();
var email=$("#email").val();
var mdp=$("#pass").val();
var nom=$("#nom").val();
var prenom=$("#prenom").val();

var utilisateur={
  email:email,
  nom:nom,
  prenom:prenom,
  pass:cryptPass(mdp),
};
localStorage.setItem(email,JSON.stringify(utilisateur));
console.log('utilisateur ajoute');
}
function login(event){
  event.preventDefault();
  var email=$("#email").val();
  var pass=$("#pass").val();
  var res=$("#hcn");
  var utilisateur=localStorage.getItem(email);
  var data=JSON.parse(utilisateur);
  console.log(data);

 if(utilisateur==null){
  res.html("wrong email");
  }
else if(email==data.email&&cryptPass(pass)==data.pass){
  res.html("logged in");
}
else{
  res.html("wrong password");
}

}