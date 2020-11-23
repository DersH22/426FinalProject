
const submitPoll = function(event) {

    event.preventDefault();

    //console.log('test');

    //create data object to submit later in axios request
    let data = {};

    let radios = document.getElementsByName('president');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "donaldtrump") {
                data.president = "DonaldTrump";
            } 
            if (radios[i].value == "joebiden") {
                data.president = "JoeBiden";
            }            

            break;
        }
    }

    radios = document.getElementsByName('governor');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "danforest") {
                data.governor = "DanForest";
            } 
            if (radios[i].value == "roycooper") {
                data.governor = "RoyCooper";
            }            

            break;
        }
    }

    radios = document.getElementsByName('ncsenator');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "thomtillis") {
                data.NCsenator = "ThomTillis";
            } 
            if (radios[i].value == "calcunningham") {
                data.NCsenator = "CalCunningham";
            }            

            break;
        }
    }

    radios = document.getElementsByName('alsenator');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "tommytuberville") {
                data.ALsenator = "TommyTuberville";
            } 
            if (radios[i].value == "dougjones") {
                data.ALsenator = "DougJones";
            }            

            break;
        }
    }

    radios = document.getElementsByName('azsenator');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "marthamcsally") {
                data.AZsenator = "MarthaMcsally";
            } 
            if (radios[i].value == "markkelly") {
                data.AZsenator = "MarkKelly";
            }            

            break;
        }
    }

    radios = document.getElementsByName('mesenator');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "susancollins") {
                data.MEsenator = "SusanCollins";
            } 
            if (radios[i].value == "saragideon") {
                data.MEsenator = "SaraGideon";
            }            

            break;
        }
    }

    radios = document.getElementsByName('approval');
    //console.log(radios);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            if (radios[i].value == "yes") {
                data.approval = "yes";
            } 
            if (radios[i].value == "no") {
                data.approval = "no";
            }            

            break;
        }
    }

    //console.log(data);

    sendPollToDB(data, event);
}

async function sendPollToDB(data, event) {

    event.preventDefault();

    //redirect to results page first
    window.location.href = "http://localhost:3000/pollingResults.html";

    const result = await axios({
        method: 'post',
        url: "http://localhost:3030/pollEntry",
        data: {
            president: data.president,
            governor: data.governor,
            NCsenator: data.NCsenator,
            ALsenator: data.Alsenator,
            AZsenator: data.AZsenator,
            MEsenator: data.MEsenator,
            approval: data.approval
        },
      });

    //console.log(result);
}

const testfunction = function() {
    console.log('test');
}

function loadIntoDOM() {
    //root element
    const $root = $('#root');
    //console.log($root.children());

    //html page displays the poll for the candidates

    //return list of every form:
    //$root.children()

    let test = document.getElementsByName('president');
    //console.log(test);

    //add listener to submit button
    $root.on("click", ".submitpoll", submitPoll);
    
}

$(function() {
    loadIntoDOM();
});