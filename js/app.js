$(document).ready(function () {
    var haserror = false;
    var users = [];
    var name = window.sessionStorage.getItem('uname');

    var found = false;
    var user = null;
    var myusersdata = window.localStorage.getItem('users');

    if (myusersdata != null) {
        
        users = JSON.parse(myusersdata);
        console.log(users)
    }
    if(name != null && name != ''){
      
       $('#signout').show() 
       $('#name').show() 
       $('#namesec').html(name)  
       $('#signinlink').hide() 
       $('#signuplink').hide() 


    }
    else{
        signout()
    }
    $('#signout').click (function () {
        // $('#signinlink').show();
        // $('#signuplink').show();
        // $('#signout').hide();
        // $('#name').hide();
        signout()
    })

    $('#signinlink').click(function () {
        $('#overlay').show() ;
        $('#signinbox').slideDown("slow") ;
    })

    $('#close').click(function () {
        
        $('#signinbox').hide() ;
        $('#overlay').hide();
    })

    $('input').focus(function () {
                $('.info').hide();
                $(this).parent().next().hide() ; 
                $(this).parent().css({'border': 'none', 'margin-bottom': '4%'});
            })

    function emptyfield(id) {
        if ($(id).val() == '') {
            $(id).parent().css({'border':'1px solid red', 'margin-bottom': '0.5%' });
            $(id).parent().next('.errormsg').show().text('This field is required').css({
                'color':'red','margin-bottom': '3%',  'padding-left': '5%', 'font-size':'18px', 'font-weight': '500'
        })
           haserror = true;
        }
        else{
            haserror = false;
           
        }
       
    }
   
  
    function checkemail(id) {
        var email = $(id).val();
        console.log(id)
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!emailReg.test(email)) {
            $(id).parent().css({'border':'1px solid red', 'margin-bottom': '0.5%' });
            $(id).parent().next('.emailinfo').show().html('Email should contain @domain.com').css({
                'color':'red','margin-bottom': '3%',  'padding-left': '5%', 'font-size':'18px', 'font-weight': '500'
        });
                             
        }
        else{
            $(id).parent().css({'border':'1px solid green', 'margin-bottom': '4%' });
            $('.emailinfo').hide();
        }
    }
   
    function signout() {
        
        $('#signinlink').show();
        $('#signuplink').show();
        $('#signout').hide();
        $('#name').hide();
       
    }
    
    $('#signinbutton').click(function (){

      
        var email = $('#email').val();
        var password = $('#password').val();
        console.log(email)
        console.log(password)
        emptyfield('#email');
        emptyfield('#password');
        
      
       for (let i = 0; i < users.length; i++) {
            user = users[i];
            console.log(user)
           if (user.email  == email && user.password == password ) {
               window.sessionStorage.setItem('uname', user.name);
              console.log(user)
               found = true;
               break;
           }
           
       }

       if ( email != '' && password != '') {
        if (!found ) {
        $('.info').show().html('Invalid email and password').css({'color': 'red', 'padding': '0% 12%', 'font-size': '20px', 'padding-top': '2%'
    })
        haserror =  true;
    }
       else{
        $('#signout').show() 
        $('#name').show() 
        $('#namesec').html(user.name)  
        $('#signinlink').hide() 
        $('#signuplink').hide() 
        
           
        //    signin();
//                 $('.bar').hide();
//                 // $('#signuplink').hide();
//                 // $('#signout').show();
//                 $('#name').show();
//                 $('#namesec').html(user.name);
// alert('successfull')
haserror = false;
       }

       }
                     if(haserror ){
           return false;
       }
       
       
    //    if(emptyfield('#password') == false){
    //        return false
    //    }
    //    if (checkemail(email) == false) {
    //        return false
    //    }
        // if (email == '') {
        //     console.log(email);
        //     $('#email').parent().css('border','1px solid red ');
        //     // $('#email').next('#emailinfo').html('This field is required');
        //     return false;
        // }
        
    }) 

    $('#signuplink').click(function () {
        $('#overlay').show();;
        $('#signupbox').slideDown('slow')
    })
    $('input[type=email]').keyup(function () {
        checkemail(this)
        
    })
    // $('#email').keypress(function () {
    //     checkemail(this)
    // })
        $('#sconfirmpassword').keyup(function () {
            var password = $('#spassword').val();
            var cpassword = $('#sconfirmpassword').val();
            if (password != cpassword) {
                $(this).parent().css({'border':'1px solid red', 'margin-bottom': '0.5%' });
            $(this).parent().next('.errormsg').show().text('Password is not matched ').css({
                'color':'red','margin-bottom': '3%',  'padding-left': '5%', 'font-size':'18px', 'font-weight': '500'
        })
            }
            else{
                $(this).parent().css({'border':'1px solid green', 'margin-bottom': '4%' });
                $(this).parent().next('.errormsg').hide()
            }
        })

    $('#signupbutton').click(function () 
    {
        var flag = false;
        var name = $('#sname').val();
    var email = $('#semail').val();
    var password = $('#spassword').val();
    var cpassword = $('#confirmpassword').val();
        emptyfield('#sname');
        emptyfield('#semail');
        emptyfield('#spassword');
        emptyfield('#sconfirmpassword');

        
    for (let i = 0; i < users.length; i++) {
        var user = users[i];
        if(user.email == email ){
            console.log(email)
            flag = true;
            break;
        } 
    }
    if ( email != '' && password != '' && name != '' && cpassword != '') {
    if(!flag){
        users.push({
                 'id': users.length + 1, 'name': name, 'email': email, 'password': password
                 
                })
                haserror = false;
        }
        else{
            $('.info').show().html('User account alresdy exist ').css({'color': 'red', 'padding': '0% 12%', 'font-size': '20px', 'padding-top': '2%'})
                          
            haserror = true;
        }
    }
          window.localStorage.setItem("users" , JSON.stringify(users));
             if(haserror ){
           return false;
       }
  
    })

    
    $('#sname').keyup(function () {
        var name = $('#sname').val();
        console.log(character)
        for (let i = 0; i < name.length; i++) {
            var character = name[i];
            if(character >= '0' && character <= '9'){
               console.log(character)
                $(this).parent().css({'border':'1px solid red', 'margin-bottom': '0.5%' });
            $(this).parent().next('.errormsg').show().text('Please enter valid name ').css({
                'color':'red','margin-bottom': '3%',  'padding-left': '5%', 'font-size':'18px', 'font-weight': '500'
        })
            }
            else{
                $(this).parent().css({'border':'1px solid green', 'margin-bottom': '4%' });
                $(this).parent().next('.errormsg').hide()
            }
            
            
        }
    })
    
    $('.closee').click(function () {
        $('#overlay').hide();
        $('#signinbox').hide();
        $('#signupbox').hide();
        $('.info').hide();
    })

var data = [
    {  name: '#abce', price: 123},
    {  name: '#xyz', price: 123},
    {  name: 'abce', price: 123},
    {  name: 'abce', price: 123}
]
$('.searchbtn').click(function () 
    
{
    $('#overlay').show() 
    $('#searchoverlay').show();  
    var keyword = $('.searchinput').val();
    console.log(keyword);
for (let i = 0; i < data.length; i++) {
    var product = data[i];
    if (product.name.indexOf(keyword) > -1) {
        console.log(product.name);
     var text = "<li><a href="+product.id+">"+product.name+"</a></li>";
     $('#searchlist').append(text);
  
    }
}
})
$('#searchlist').click(function () {
         $('#overlayy').hide();
         $('#searchoverlay').hide();
     })

    });