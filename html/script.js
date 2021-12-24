$(function () {
    function display(bool) {
        if (bool) {
            $("#container").show();
        } else {
            $("#container").hide();
        }
    }

    display(false)

    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)
            } else {
                display(false)
            }
        }
    })
                
            var ispit = true;
            var ispit2 = true;
            var ispit3=true;

            function dodone(x){
                var elements = document.getElementsByClassName(x);
                for(var i = 0; i < elements.length; i++) {
                    elements[i].style.backgroundColor="gray";
                }

            }
            function disableallexcepta(){
                document.getElementById("grid-container-sve").style.display = "block";
                document.getElementById("grid-container-report").style.display = "none";
                document.getElementById("grid-container-ask").style.display = "none";
                document.getElementById("grid-container-death").style.display = "none";
                document.getElementById("grid-container-join").style.display = "none";
                document.getElementById("sve").style.backgroundColor = "blue";
                document.getElementById("report").style.backgroundColor = "gray";
                document.getElementById("ask").style.backgroundColor = "gray";
                document.getElementById("kill").style.backgroundColor = "gray";
                document.getElementById("exit").style.backgroundColor = "gray";

            }
            function disableallexceptb(){
                document.getElementById("grid-container-sve").style.display = "none";
                document.getElementById("grid-container-report").style.display = "block";
                document.getElementById("grid-container-ask").style.display = "none";
                document.getElementById("grid-container-death").style.display = "none";
                document.getElementById("grid-container-join").style.display = "none";
                document.getElementById("sve").style.backgroundColor = "gray";
                document.getElementById("report").style.backgroundColor = "blue";
                document.getElementById("ask").style.backgroundColor = "gray";
                document.getElementById("kill").style.backgroundColor = "gray";
                document.getElementById("exit").style.backgroundColor = "gray";            
            }
            function disableallexceptc(){
                document.getElementById("grid-container-sve").style.display = "none";
                document.getElementById("grid-container-report").style.display = "none";
                document.getElementById("grid-container-ask").style.display = "block";
                document.getElementById("grid-container-death").style.display = "none";
                document.getElementById("grid-container-join").style.display = "none";
                document.getElementById("sve").style.backgroundColor = "gray";
                document.getElementById("report").style.backgroundColor = "gray";
                document.getElementById("ask").style.backgroundColor = "blue";
                document.getElementById("kill").style.backgroundColor = "gray";
                document.getElementById("exit").style.backgroundColor = "gray";            
            }
            function disableallexceptd(){
                document.getElementById("grid-container-sve").style.display = "none";
                document.getElementById("grid-container-report").style.display = "none";
                document.getElementById("grid-container-ask").style.display = "none";
                document.getElementById("grid-container-death").style.display = "block";
                document.getElementById("grid-container-join").style.display = "none";
                document.getElementById("sve").style.backgroundColor = "gray";
                document.getElementById("report").style.backgroundColor = "gray";
                document.getElementById("ask").style.backgroundColor = "gray";
                document.getElementById("kill").style.backgroundColor = "blue";
                document.getElementById("exit").style.backgroundColor = "gray";            
            }
            function disableallexcepte(){
                document.getElementById("grid-container-sve").style.display = "none";
                document.getElementById("grid-container-report").style.display = "none";
                document.getElementById("grid-container-ask").style.display = "none";
                document.getElementById("grid-container-death").style.display = "none";
                document.getElementById("grid-container-join").style.display = "block";
                document.getElementById("sve").style.backgroundColor = "gray";
                document.getElementById("report").style.backgroundColor = "gray";
                document.getElementById("ask").style.backgroundColor = "gray";
                document.getElementById("kill").style.backgroundColor = "gray";
                document.getElementById("exit").style.backgroundColor = "blue";            
            }

            function pokaziask(){
                if(ispit){
                    document.getElementById("sveask").style.display="block";
                    ispit=false;
                }
                else{
                    document.getElementById("sveask").style.display="none";
                    ispit=true;
                }
            }

            function pokazikill(){
                if(ispit2){
                    document.getElementById("svekill").style.display="block";
                    ispit2=false;
                }
                else{
                    document.getElementById("svekill").style.display="none";
                    ispit2=true;
                }
            }

            function pokaziexit(){
                if(ispit3){
                    document.getElementById("sveexit").style.display="block";
                    ispit3=false;
                }
                else{
                    document.getElementById("sveexit").style.display="none";
                    ispit3=true;
                }
            }
