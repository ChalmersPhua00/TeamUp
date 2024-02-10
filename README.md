# TeamUp
A web application that builds team formations by analyzing the collective traits and skills of team members.

## Description
TeamUp is a web application that acts as a userful companion while creating teams. Ideal for organizing sports teams, hackathon teams, work projects, or any group activity, TeamUp ensures everyone finds their perfect spot. It can be helpful for event organizers, professors, or hiring managers who just welcomed their summer intern class, TeamUp is a digital solution that aims to bridge gaps and strengthens the bonds between diverse communities and individuals.

## Future Work
A button that automates the process of distributing available rosters into teams with the most optimal fairness and balance in terms of skill sets.
Here's a pseudocode to convey the idea:
'''
for i in (tCr total possible combinations): // generates all possible combinations of t teams using the r available rosters.
        averages = compute teamAverages and cumulativeAverages for combo i // refer to script.js of this project to see what teamAverages and cumulativeAverages entails
        optimization to find the combo i that minimizes the difference between the teamAverages[ for each team ] and the cumulativeAverages. In other words, minimize the MST cost function: Cost = (teamAverages[0] - cumulativeAverages)^2 + (teamAverages[1] - cumulativeAverages)^2 + ... + (teamAverages[number of teams-1] - cumulativeAverages)^2
'''
A button that clusters rosters with similar skill sets into the same team using k-means clustering.
The idea is that given a 6 dimensional data space with datapoints representing individual rosters according to their respective values for the 6 attributes. First, initialize t number of centroids where t is the number of teams. Then, run it on the k-means clustering algorithm. Finally, you'll get the final result!

## Links
* TeamUp Video Demo: https://player.vimeo.com/video/911877240?h=add3d373e5
* Try it out: https://chalmersphua00.github.io/TeamUp/
