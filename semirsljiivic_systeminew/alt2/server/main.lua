local connections = {}
local kills = {}
local vehicles = {}
local weapons = {}
local chat = {}


local connectedAdmins = {}

ESX = nil

TriggerEvent('esx:getSharedObject', function(obj)
    ESX = obj
end)

local vrijeme = 0
local provjera = {}
local cekanje = 60
local reportovi = {}
local askovi = {}
local statusAdmina = {}



function initLogs()

  local resourceName = GetCurrentResourceName()

  if(resourceName:lower() ~= resourceName) then
    print('^1'..getString("resourceContainsCapital")..'^0')
  end


  connections = json.decode(LoadResourceFile(GetCurrentResourceName(), "logs/connections.json") or "[]")
  kills = json.decode(LoadResourceFile(GetCurrentResourceName(), "logs/kills.json") or "[]")
  vehicles = json.decode(LoadResourceFile(GetCurrentResourceName(), "logs/vehicles.json") or "[]")
  weapons = json.decode(LoadResourceFile(GetCurrentResourceName(), "logs/weapons.json") or "[]")
  chat = json.decode(LoadResourceFile(GetCurrentResourceName(), "logs/chat.json") or "[]")
end

Citizen.CreateThread(function()
  initLogs()
end)

function getDate()
  return os.date("%x - %X")
end



AddEventHandler("playerDropped", function(reason)
  local _source = source

  local cpt=1
  while(cpt<=#connectedAdmins and (connectedAdmins[cpt] ~= _source)) do
    cpt=cpt+1
  end

  if(cpt<=#connectedAdmins) then
    table.remove(connectedAdmins, cpt)
  end


	if(config.LogDisconnect) then

    local disconnectReason = getString("disconnectedByUser")

    if(reason=="Timed out after 60 seconds.") then
      disconnectReason = getString("timeout")
    elseif(reason=="Exiting") then
      disconnectReason = getString("disconnectedQuitCommand")
    end

    local log = {
      name=GetPlayerName(_source),
      info= getString("disconnected").." ("..disconnectReason..")",
      date=getDate(),
      steamID=GetPlayerIdentifiers(_source)[1]
    }

    table.insert(connections, log)
    SaveResourceFile(GetCurrentResourceName(), "logs/connections.json", json.encode(connections), -1)

    local encodedLog = json.encode(log)
    for _,adminSource in pairs(connectedAdmins) do
      TriggerClientEvent("logs:updateConnections", adminSource, encodedLog)
    end
	end
end)


RegisterServerEvent("logs:playerConnected")
AddEventHandler("logs:playerConnected", function()
  local _source = source
  local pIdentifier = GetPlayerIdentifiers(_source)[1]

  local cpt=1
  while(cpt<=#config.admins and (config.admins[cpt]:lower() ~= pIdentifier:lower())) do
    cpt=cpt+1
  end

  TriggerClientEvent("logs:setAdmin", _source, cpt<=#config.admins)

  if(cpt<=#config.admins or config.debug) then
    table.insert(connectedAdmins, _source)

    local connectionsArray = json.encode(connections)
    local killsArray       = json.encode(kills)
    local vehiclesArray    = json.encode(vehicles)
    local weaponsArray     = json.encode(weapons)
    local chatArray        = json.encode(chat)

    TriggerClientEvent("logs:init", _source, connectionsArray, killsArray, vehiclesArray, weaponsArray, chatArray)
  end



  if(config.LogConnect) then
    local log = {
      name=GetPlayerName(_source),
      info= getString("connected"),
      date=getDate(),
      steamID=pIdentifier
    }

    table.insert(connections, log)
    SaveResourceFile(GetCurrentResourceName(), "logs/connections.json", json.encode(connections), -1)
    local encodedLog = json.encode(log)
    for _,adminSource in pairs(connectedAdmins) do
      TriggerClientEvent("logs:updateConnections", adminSource, encodedLog)
    end
  end
end)


RegisterServerEvent("logs:addKill")
AddEventHandler("logs:addKill", function(killerSource, targetSource, killerCoords, targetCoords)
  local killerName = nil
  local targetName = GetPlayerName(targetSource)
  local identifier = nil

  if(killerSource ~= -1) then
    killerName = GetPlayerName(killerSource)
    identifier = GetPlayerIdentifiers(killerSource)[1]
  end


  if(killerName ~= nil or config.LogPnjKills) then
    if(killerName==nil) then
      killerName = getString("pnjsuicide")
      identifier = GetPlayerIdentifiers(targetName)[1]
    end

    local log = {
      name=killerName,
      target=targetName,
      killerCoords=json.encode(killerCoords),
      targetCoords=json.encode(targetCoords),
      date=getDate(),
      steamID=identifier
    }

    table.insert(kills, log)
    SaveResourceFile(GetCurrentResourceName(), "logs/kills.json", json.encode(kills), -1)
    local encodedLog = json.encode(log)
    for _,adminSource in pairs(connectedAdmins) do
      TriggerClientEvent("logs:updateKills", adminSource, encodedLog)
    end
  end
end)








RegisterServerEvent("logs:addVehicle")
AddEventHandler("logs:addVehicle", function(vehicleTarget, coords)
  local _source = source


  local log = {
    name=GetPlayerName(_source),
    target=vehicleTarget,
    coords=json.encode(coords),
    date=getDate(),
    steamID=GetPlayerIdentifiers(_source)[1]
  }

  table.insert(vehicles, log)
  SaveResourceFile(GetCurrentResourceName(), "logs/vehicles.json", json.encode(vehicles), -1)
  local encodedLog = json.encode(log)
  for _,adminSource in pairs(connectedAdmins) do
    TriggerClientEvent("logs:updateVehicles", adminSource, encodedLog)
  end
end)












  RegisterCommand('report', function(source, args)
    if (not provjera[source] or provjera[source] <= os.time() - cekanje) then
        provjera[source] = os.time()
        TriggerClientEvent('chat:addMessage', source, {
          args = {"^2Vas report je poslan svim online adminima."}
        })
        vrijeme = 60*1000
        local xPlayers = ESX.GetPlayers()
            for i=1, #xPlayers, 1 do
                local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
                if xPlayer.getGroup() ~= "user" then
                    TriggerClientEvent('chat:addMessage', xPlayer.source, {
                        args = {"^4Igrac " .. GetPlayerName(source) .. ' [ID : ' .. source .. '] je poslao report /' .. table.concat(args, " ")}
                    })
                 for i = 0, #reportovi, 1 do
                    table.insert(reportovi, {ime = GetPlayerName(source),idigraca = source, poruka = table.concat(args, " "), idreporta = i + 1})
                    local log = {
                      name=GetPlayerName(source),
                      id=source,
                      poruka=table.concat(args, " ")
                    }
                    table.insert(chat, log)
                    SaveResourceFile(GetCurrentResourceName(), "logs/chat.json", json.encode(chat), -1)
                    local encodedLog = json.encode(log)
                    for _,adminSource in pairs(connectedAdmins) do
                      TriggerClientEvent("logs:updateChat", adminSource, encodedLog)
                    end
                  end
                end
            end
            while vrijeme ~= 0 do
            vrijeme = vrijeme - 1000
            Wait(1000)
            end
    else
        local format = vrijeme / 1000
        TriggerClientEvent('chat:addMessage', source, {
            args = {"^7Pricekaj ^1^*60 ^7^rsekundi prije slanja sledeceg reporta."}
          })
        end 
    end)
   
RegisterServerEvent("logs:logChat")
AddEventHandler("logs:logChat", function(command)
    SaveResourceFile(GetCurrentResourceName(), "logs/chat.json", json.encode(chat), -1)
    local encodedLog = json.encode(log)
    for _,adminSource in pairs(connectedAdmins) do
      TriggerClientEvent("logs:updateChat", adminSource, encodedLog)
    end
end)


RegisterCommand('report', function(source, args)
  if (not provjera[source] or provjera[source] <= os.time() - cekanje) then
      provjera[source] = os.time()
      TriggerClientEvent('chat:addMessage', source, {
        args = {"^2Vas report je poslan svim online adminima."}
      })
      vrijeme = 60*1000
      local xPlayers = ESX.GetPlayers()
          for i=1, #xPlayers, 1 do
              local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
              if xPlayer.getGroup() ~= "user" then
                  TriggerClientEvent('chat:addMessage', xPlayer.source, {
                      args = {"^4Igrac " .. GetPlayerName(source) .. ' [ID : ' .. source .. '] je poslao report /' .. table.concat(args, " ")}
                  })
               for i = 0, #reportovi, 1 do
                  table.insert(reportovi, {ime = GetPlayerName(source),idigraca = source, poruka = table.concat(args, " "), idreporta = i + 1})
                  local log = {
                    name=GetPlayerName(source),
                    id=source,
                    poruka=table.concat(args, " ")
                  }
                  table.insert(chat, log)
                  SaveResourceFile(GetCurrentResourceName(), "logs/chat.json", json.encode(chat), -1)
                  local encodedLog = json.encode(log)
                  for _,adminSource in pairs(connectedAdmins) do
                    TriggerClientEvent("logs:updateChat", adminSource, encodedLog)
                  end
                end
              end
          end
          while vrijeme ~= 0 do
          vrijeme = vrijeme - 1000
          Wait(1000)
          end
  else
      local format = vrijeme / 1000
      TriggerClientEvent('chat:addMessage', source, {
          args = {"^7Pricekaj ^1^*60 ^7^rsekundi prije slanja sledeceg reporta."}
        })
      end 
  end)
 

RegisterCommand('ask', function(source, args)
  if (not provjera[source] or provjera[source] <= os.time() - cekanje) then
      provjera[source] = os.time()
      TriggerClientEvent('chat:addMessage', source, {
        args = {"^2Vas Ask je poslan svim online adminima."}
      })
      vrijeme = 60*1000
      local xPlayers = ESX.GetPlayers()
          for i=1, #xPlayers, 1 do
              local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
              if xPlayer.getGroup() ~= "user" then
                  TriggerClientEvent('chat:addMessage', xPlayer.source, {
                      args = {"^4Igrac " .. GetPlayerName(source) .. ' [ID : ' .. source .. '] je poslao ask /' .. table.concat(args, " ")}
                  })
               for i = 0, #askovi, 1 do
                  table.insert(askovi, {ime = GetPlayerName(source),idigraca = source, poruka = table.concat(args, " "), idreporta = i + 1})
                  local log = {
                    name=GetPlayerName(source),
                    id=source,
                    poruka=table.concat(args, " ")
                  }
                  table.insert(weapons, log)
                  SaveResourceFile(GetCurrentResourceName(), "logs/weapons.json", json.encode(weapons), -1)
                  local encodedLog = json.encode(log)
                  for _,adminSource in pairs(connectedAdmins) do
                    TriggerClientEvent("logs:updateWeapons", adminSource, encodedLog)
                  end
                end
              end
          end
          while vrijeme ~= 0 do
          vrijeme = vrijeme - 1000
          Wait(1000)
          end
  else
      local format = vrijeme / 1000
      TriggerClientEvent('chat:addMessage', source, {
          args = {"^7Pricekajte ^1^*60 ^7^rsekundi prije slanja sledeceg Aska."}
        })
      end 
  end)
 
RegisterServerEvent("logs:addWeapon")
AddEventHandler("logs:addWeapon", function(command)
  SaveResourceFile(GetCurrentResourceName(), "logs/weapons.json", json.encode(weapons), -1)
  local encodedLog = json.encode(log)
  for _,adminSource in pairs(connectedAdmins) do
    TriggerClientEvent("logs:updateWeapons", adminSource, encodedLog)
  end
end)