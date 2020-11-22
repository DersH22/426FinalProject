const poll_data = require('data-store')( {path: process.cwd() + '/data/pollData.json'})


class Polldata {
    constructor(id, owner, data) {
        this.id = id
        this.owner = owner
        this.info = info
    }
}


Polldata.registerVotes = (data) => {
    let currentData = poll_data.get("pollData")
    if (data.president == "DonaldTrump") {
        currentData.president.donaldTrump +=1
    } else {
        currentData.president.joeBiden +=1
    }
    if (data.governor == "DanForest") {
        currentData.governor.danForest +=1
    } else {
        currentData.governor.royCooper +=1
    }
    if (data.NCsenator == "ThomTillis") {
        currentData.NCsenator.thomTillis +=1
    } else {
        currentData.NCsenator.calCunningham +=1
    }
    if (data.ALsenator == "TommyTuberville") {
        currentData.ALsenator.tommyTuberville +=1
    } else {
        currentData.ALsenator.dougJones +=1
    }
    if (data.AZsenator == "MarthaMcsally") {
        currentData.AZsenator.marthaMcsally +=1
    } else {
        currentData.AZsenator.markKelly +=1
    }
    if (data.MEsenator == "SusanCollins") {
        currentData.MEsenator.susanCollins +=1
    } else {
        currentData.MEsenator.dougJones +=1
    }
    if (data.ALsenator == "TommyTuberville") {
        currentData.ALsenator.tommyTuberville +=1
    } else {
        currentData.Alsenator.dougJones +=1
    }
    if (data.approval == "yes") {
        currentData.approval.yes +=1
    } else {
        currentData.approval.no +=1
    }

    poll_data.set("pollData", currentData)

    
}

Polldata.getPollData = () => {
    return poll_data.get("pollData")
}





module.exports = Polldata;