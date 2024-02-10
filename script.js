const splashScreen = document.getElementById('splash-screen');
const countScreen = document.getElementById('count-screen');
const attributeScreen = document.getElementById('attribute-screen');
const teamScreen = document.getElementById('team-screen');
const analysisScreen = document.getElementById('analysis-screen');
const teamCountLabel = document.getElementById('team-count-label');

var teamCount = 1;
var attributes = ["Attribute 1", "Attribute 2", "Attribute 3", "Attribute 4", "Attribute 5", "Attribute 6"];
var teamData = [];
var teamAverages = [];
var cumulativeAverages = [0, 0, 0, 0, 0, 0];

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        transitionHelper(splashScreen, countScreen);
    }, 900);
});

function submitCount() {
    teamCount = parseInt(document.querySelector("#count-slider").value);
    setTimeout(function() {
        transitionHelper(countScreen, attributeScreen);
    }, 900);
}

function submitAttributes() {
    // Check if any of the 6 attribute fields are empty
    const isEmpty = Array.from(document.querySelectorAll('input[type="text"]')).some(input => input.value.trim() === '');
    if (isEmpty) {
        alert("Please fill in all attribute fields!");
        return;
    }
    attributes[0] = document.querySelector('input[name="att1"]').value;
    attributes[1] = document.querySelector('input[name="att2"]').value;
    attributes[2] = document.querySelector('input[name="att3"]').value;
    attributes[3] = document.querySelector('input[name="att4"]').value;
    attributes[4] = document.querySelector('input[name="att5"]').value;
    attributes[5] = document.querySelector('input[name="att6"]').value;
    setTimeout(function() {
        transitionHelper(attributeScreen, teamScreen);
    }, 900);
    generateTeams();
    createDataStorage();
}

function submitTeams() {
    computeAverages();
    setTimeout(function() {
        teamScreen.style.opacity = '0';
        transitionHelper(teamScreen, analysisScreen);
    }, 900);
    generateAnalysis();
}

function transitionHelper(hide, show) {
    hide.style.opacity = '0';
    setTimeout(function() {
        hide.style.display = 'none';
        show.style.display = 'flex';
        setTimeout(function() {
            show.style.opacity = '1';
        }, 100);
    }, 800);
}

function generateTeams() {
    // Generate content for team screen
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
    // Set up button to the next page
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.classList.add('button-75');
    nextButton.addEventListener('click', submitTeams);
    teamScreen.appendChild(nextButton);
}

function addTeamMember(teamDiv) {
    // Once the user decides to add a member, prompt a series of inputs
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
    // Store user inputs in a data structure
    const teamIndex = parseInt(teamDiv.classList[0].split('-')[2]) - 1;
    teamData[teamIndex].push(scores);
    // Display attribute scores assigned by the user on the flip side of the card
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
        teamAverages.push([]);
    }
}

function generateAnalysis() {
    // Generate content for analysis screen
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
        // Kiviat Diagram for each team
        var kiviatDiagramData = [{
            type: 'scatterpolar',
            r: [teamAverages[i-1][0], teamAverages[i-1][1], teamAverages[i-1][2], teamAverages[i-1][3], teamAverages[i-1][4], teamAverages[i-1][5]],
            theta: [attributes[0], attributes[1], attributes[2], attributes[3], attributes[4], attributes[5]],
            fill: 'toself',
            name: 'Team Avg',
            line: {
                color: '#f34079'
            }
        }, {
            type: 'scatterpolar',
            r: [cumulativeAverages[0], cumulativeAverages[1], cumulativeAverages[2], cumulativeAverages[3], cumulativeAverages[4], cumulativeAverages[5]],
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
        // Bar Chart for each team
        const barChart = document.createElement('div');
        barChart.id = 'barChart' + i;
        barChart.classList.add('barChart');
        analysisScreen.appendChild(barChart);
        var barChartData = [{
            x: [attributes[0], attributes[1], attributes[2], attributes[3], attributes[4], attributes[5]],
            y: [teamAverages[i-1][0], teamAverages[i-1][1], teamAverages[i-1][2], teamAverages[i-1][3], teamAverages[i-1][4], teamAverages[i-1][5]],
            type: 'bar',
            name: 'Team Avg',
            marker: {
                color: '#f34079'
            }
        }, {
            x: [attributes[0], attributes[1], attributes[2], attributes[3], attributes[4], attributes[5]],
            y: [cumulativeAverages[0], cumulativeAverages[1], cumulativeAverages[2], cumulativeAverages[3], cumulativeAverages[4], cumulativeAverages[5]],
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
}

function computeAverages() {
    for (let i = 0; i < teamCount; i++) {
        let teamAverage = [0, 0, 0, 0, 0, 0]; // Initialize team average array
        for (let j = 0; j < teamData[i].length; j++) {
            for (let k = 0; k < attributes.length; k++) {
                teamAverage[k] += teamData[i][j][k]; // Accumulate scores for each attribute
            }
        }
        for (let k = 0; k < attributes.length; k++) {
            teamAverage[k] /= teamData[i].length; // Calculate average for each attribute
        }
        teamAverages[i] = teamAverage;
        for (let j = 0; j < attributes.length; j++) {
            cumulativeAverages[j] += teamAverages[i][j]; // Accumulate team averages
        }
    }
    for (let j = 0; j < attributes.length; j++) {
        cumulativeAverages[j] /= teamCount;
    }
}

function updateTeamCountLabel() {
    teamCountLabel.textContent = document.getElementById('count-slider').value;
}