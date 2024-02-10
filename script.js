const splashScreen = document.getElementById('splash-screen');
const countScreen = document.getElementById('count-screen');
const attributeScreen = document.getElementById('attribute-screen');
const teamScreen = document.getElementById('team-screen');
const analysisScreen = document.getElementById('analysis-screen');
const teamCountLabel = document.getElementById('team-count-label');

var teamCount = 1;
var attributes = ["Attribute 1", "Attribute 2", "Attribute 3", "Attribute 4", "Attribute 5", "Attribute 6"];
var teamData = [];

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        splashScreen.style.opacity = '0';
        setTimeout(function() {
            splashScreen.style.display = 'none';
            countScreen.style.display = 'flex';
            setTimeout(function() {
                countScreen.style.opacity = '1';
            }, 100);
        }, 800);
    }, 900);
});

function submitCount() {
    teamCount = parseInt(document.querySelector("#count-slider").value);
    setTimeout(function() {
        countScreen.style.opacity = '0';
        setTimeout(function() {
            countScreen.style.display = 'none';
            attributeScreen.style.display = 'flex';
            setTimeout(function() {
                attributeScreen.style.opacity = '1';
            }, 100);
        }, 800);
    }, 900);
}

function submitAttributes() {
    attributes[0] = document.querySelector('input[name="att1"]').value;
    attributes[1] = document.querySelector('input[name="att2"]').value;
    attributes[2] = document.querySelector('input[name="att3"]').value;
    attributes[3] = document.querySelector('input[name="att4"]').value;
    attributes[4] = document.querySelector('input[name="att5"]').value;
    attributes[5] = document.querySelector('input[name="att6"]').value;
    setTimeout(function() {
        attributeScreen.style.opacity = '0';
        setTimeout(function() {
            attributeScreen.style.display = 'none';
            teamScreen.style.display = 'flex';
            setTimeout(function() {
                teamScreen.style.opacity = '1';
            }, 100);
        }, 800);
    }, 900);
    generateTeams();
    createDataStorage();
}

function submitTeams() {
    setTimeout(function() {
        teamScreen.style.opacity = '0';
        setTimeout(function() {
            teamScreen.style.display = 'none';
            analysisScreen.style.display = 'flex';
            setTimeout(function() {
                analysisScreen.style.opacity = '1';
            }, 100);
        }, 800);
    }, 900);
    generateAnalysis();
}

function generateTeams() {
    teamScreen.innerHTML = '';
    for (let i = 1; i <= teamCount; i++) {
        const label = document.createElement('label');
        label.textContent = 'Team ' + i;
        label.classList.add('team-label');
        teamScreen.appendChild(label);
        const teamDiv = document.createElement('div');
        teamDiv.classList.add('team-container-' + i);
        const button = document.createElement('button');
        button.textContent = 'Add a team member';
        button.classList.add('add-member-button');
        teamDiv.style.display = 'flex';
        teamDiv.style.flexDirection = 'row';
        teamDiv.style.padding = '30px';
        button.addEventListener('click', function() {
            addTeamMember(teamDiv)
        });
        teamDiv.appendChild(button);
        teamScreen.appendChild(teamDiv);
    }
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('button-75');
    nextButton.addEventListener('click', submitTeams);
    teamScreen.appendChild(nextButton);
}

function addTeamMember(teamDiv) {
    const name = prompt("Enter team member's name:");
    if (name === null) return;
    const card = document.createElement('div');
    card.classList.add('card');
    const firstContent = document.createElement('div');
    firstContent.classList.add('first-content');
    firstContent.textContent = name;
    const secondContent = document.createElement('div');
    secondContent.classList.add('second-content');
    const scores = [];
    for (let i = 0; i < attributes.length; i++) {
        const value = parseInt(prompt(attributes[i] + ":"));
        if (isNaN(value) || value < 0 || value > 100) {
            alert("Please enter an integer from 0 to 100!");
            return;
        }
        scores.push(value)
    }
    const teamIndex = parseInt(teamDiv.classList[0].split('-')[2]) - 1;
    teamData[teamIndex].push(scores);
    for (let i = 0; i < attributes.length; i++) {
        const attributeSpan = document.createElement('span');
        attributeSpan.textContent = attributes[i] + ": " + scores[i];
        secondContent.appendChild(attributeSpan);
    }
    card.appendChild(firstContent);
    card.appendChild(secondContent);
    teamDiv.appendChild(card);
}

function createDataStorage() {
    for (let i = 0; i < teamCount; i++) {
        teamData.push([]);
    }
}

function generateAnalysis() {
    analysisScreen.innerHTML = '';
    for (let i = 1; i <= teamCount; i++) {
        const label = document.createElement('label');
        label.textContent = 'Team ' + i;
        label.classList.add('team-label');
        analysisScreen.appendChild(label);
        const kiviatDiv = document.createElement('div');
        kiviatDiv.id = 'kiviatDiagram' + i;
        kiviatDiv.classList.add('kiviatDiagram');
        analysisScreen.appendChild(kiviatDiv);
        var kiviatDiagramData = [{
            type: 'scatterpolar',
            r: [10, 20, 30, 40, 50, 60], ////
            theta: [attributes[0], attributes[1], attributes[2], attributes[3], attributes[4], attributes[5]],
            fill: 'toself',
            name: 'Team Avg',
            line: {
                color: '#f34079'
            }
        }, {
            type: 'scatterpolar',
            r: [20, 40, 10, 50, 80, 40], ////
            theta: [attributes[0], attributes[1], attributes[2], attributes[3], attributes[4], attributes[5]],
            fill: 'toself',
            name: 'Cumu Avg',
            line: {
                color: '#fc894d'
            }
        }];
        var kiviatDiagramLayout = {
            polar: {
                radialaxis: {
                    visible: false,
                    range: [0, 100]
                }
            },
            showlegend: true,
            paper_bgcolor: 'transparent'
        };
        Plotly.newPlot('kiviatDiagram' + i, kiviatDiagramData, kiviatDiagramLayout);



        const barChart = document.createElement('div');
        barChart.id = 'barChart' + i;
        barChart.classList.add('barChart');
        analysisScreen.appendChild(barChart);
        var barChartData = [{
            x: [attributes[0], attributes[1], attributes[2], attributes[3], attributes[4], attributes[5]],
            y: [10, 20, 30, 40, 50, 60], ////
            type: 'bar',
            name: 'Team Avg',
            marker: {
                color: '#f34079'
            }
        }, {
            x: [attributes[0], attributes[1], attributes[2], attributes[3], attributes[4], attributes[5]],
            y: [60, 40, 50, 30, 60], ////
            type: 'bar',
            name: 'Cumu Avg',
            marker: {
                color: '#fc894d'
            }
        }];
        var barChartLayout = {
            xaxis: {
                title: 'Attributes'
            },
            yaxis: {
                title: '%'
            },
            paper_bgcolor: 'transparent'
        };
        Plotly.newPlot('barChart' + i, barChartData, barChartLayout);
    }
    //console.log(teamData[0][0][0]); First team First member First attribute
    //console.log(teamData[0][0][1]); First team First member Second attribute
}

function updateTeamCountLabel() {
    teamCountLabel.textContent = document.getElementById('count-slider').value;
}