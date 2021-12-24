fx_version 'cerulean'

game 'gta5'

author 'SemirSljiivic'
description 'Report i Ask system inspirisan od AirboNa'
version '1.0.0'

ui_page "html/index.php"

files{
    "html/index.php",
    "html/style.css",
    "html/script.js"
}

client_scripts{
    "client.lua"
}

server_scripts{
    "server.lua",
    "@mysql-async/lib/MySQL.lua"
    
}