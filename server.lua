RegisterCommand('report', function(source, args)
    MySQL.async.fetchAll("INSERT INTO report (reportid, reportdate, userid, reportreason, reportername, seen) VALUES (@reportid, @reportdate, @userid, @reportreason, @reportername, @seen)",
    {["@source"] = source, ["@name"] = GetPlayerName(source), ["@Text"] = table.concat(args, "")},
    function(result)
        TriggerClientEvent("chatMessageClient", source, "Hierkommtuirein"
    end)
end)

RegisterCommand('select', function(source, args)
    MySQL.Async.fetchaAll("SELECT from test",{
    }, function(result
    TriggerClientEvent("chatMessageClient", source, result[i].name)
    end)
end)