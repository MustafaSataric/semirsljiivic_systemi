<html>
    <head>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <?php
          
            $server = "mysql:host=localhost;dbname=fivemdb";
            $user = "root";
            $pass = "";
            $database = "fivemdb";

            $conn = new PDO($server, $user, $pass);

            $sqlchoose = "select * from report";
            $sqlchoose2 = "select * from ask";
            $sqlchoose3 = "select * from smrti";
            $sqlchoose4 = "select * from joinleave";


            $quest = $conn->prepare($sqlchoose);
            $quest->execute();

            $quest2 = $conn->prepare($sqlchoose2);
            $quest2->execute();

            $quest3 = $conn->prepare($sqlchoose3);
            $quest3->execute();

            $quest4 = $conn->prepare($sqlchoose4);
            $quest4->execute();


            $answers = $quest->fetchAll();
            $answers2 = $quest2->fetchAll();
            $answers3 = $quest3->fetchAll();
            $answers4 = $quest4->fetchAll();


        ?>
        <script>
            function dodone(x){
                document.getElementById(x).style.backgroundColor = "red";
                
            }
            function disableallexcepta(){
                document.getElementById("grid-container-report").style.display = "block";
                document.getElementById("grid-container-ask").style.display = "none";
                document.getElementById("grid-container-death").style.display = "none";
                document.getElementById("grid-container-join").style.display = "none";
                document.getElementById("report").style.backgroundColor = "rgb(87, 87, 87)";
            }
            function disableallexceptb(){
                document.getElementById("grid-container-report").style.display = "none";
                document.getElementById("grid-container-ask").style.display = "block";
                document.getElementById("grid-container-death").style.display = "none";
                document.getElementById("grid-container-join").style.display = "none";
                document.getElementById("report").style.backgroundColor = "rgb(87, 87, 87)";
            }
            function disableallexceptc(){
                document.getElementById("grid-container-report").style.display = "none";
                document.getElementById("grid-container-ask").style.display = "none";
                document.getElementById("grid-container-death").style.display = "block";
                document.getElementById("grid-container-join").style.display = "none";
                document.getElementById("report").style.backgroundColor = "rgb(87, 87, 87)";
            }
            function disableallexceptd(){
                document.getElementById("grid-container-report").style.display = "none";
                document.getElementById("grid-container-ask").style.display = "none";
                document.getElementById("grid-container-death").style.display = "none";
                document.getElementById("grid-container-join").style.display = "block";
                document.getElementById("report").style.backgroundColor = "rgb(87, 87, 87)";
            }
        </script>

        <div id="box" class="box">
                    <h1>Logovi</h1>
                        <input type="button" class="button" value="Reports" onclick="disableallexcepta();">    
                        <input type="button" class="button" value="Asks" onclick="disableallexceptb();">        
                        <input type="button" class="button" value="Deaths" onclick="disableallexceptc();">        
                        <input type="button" class="button" value="Joins" onclick="disableallexceptd();">        
                
            
            <div id="grid-container-report">
              <?php foreach($answers as $row){ ?>
                    <div class="grid-item-report">
                    <input type="button" id="<?= $row['reportid'] ?>" class="done" value="X" onclick="dodone(<?= $row['reportid'] ?>);">    
                    <p class="headc">Report: <?= $row['reportername'] ?>[<?= $row['userid'] ?>]</p>
                    <hr style="color:black;margin:2px;">
                    <p class="mainc"><?= $row['reportreason'] ?></p>
                    </div>    
                <?php } ?>
                
             </div>
             <div id="grid-container-ask">
             <?php foreach($answers2 as $row){ ?>
                <div class="grid-item-ask">
                    <input type="button" id="<?= $row['askid'] ?>" class="done" value="X" onclick="dodone(<?= $row['askid'] ?>);">    
                    <p class="headc">Ask: <?= $row['askername'] ?>[<?= $row['userid'] ?>]</p>
                    <hr style="color:black;margin:2px;">
                    <p class="mainc"><?= $row['askreason'] ?></p>
                </div>
                <?php } ?>
             </div>   
             <div id="grid-container-death">
             <?php foreach($answers3 as $row){ ?>
                <div class="grid-item-death">
                    <p class="headc">Death-Log:</p>
                    <hr style="color:black;margin:2px;">
                    <p class="mainc"><?= $row['mrtvakime'] ?>[<?= $row['mrtvakid'] ?>] <?= $row['razlog'] ?></p>
                </div>
                <?php } ?>
             </div>   
             <div id="grid-container-join">
             <?php foreach($answers4 as $row){ ?>
                <div class="grid-item-join">
                    <p class="headc">Joining/Leaving Log:  </p>
                    <hr style="color:black;margin:2px;">
                    <p class="mainc"><?= $row['joininername'] ?>[<?= $row['joiningid'] ?>]: <?= $row['reason'] ?></p>
                </div>
                <?php } ?>
            </div>
        </div>
    </body>
</html>

