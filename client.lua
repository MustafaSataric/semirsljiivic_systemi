RegisterNetEvent("chatMessageClient")
    AddEventHandler("chatMessageClient", function(arg)
    TriggerEvent( "chatMessage", "[Server]", {0,255,0}, arg)
end)

local showUI = false,
--  10 is PageUp

Citizen.CreateThread(function()
    if IsControlJustPressed(1, 10) then
        if showui == false then
            SendNUIMessage({type = "enableui"})
            showUI = true
        else
            SendNUIMessage({type = "disableui"})
            showUI = false
        end
    end 
end)
