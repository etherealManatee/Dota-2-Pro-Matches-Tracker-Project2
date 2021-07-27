# Dota-2-Pro-Matches-Tracker
A place to track the performance of Dota 2 Pro teams. Practice for React.js.

#Description
This project is built using the React framework, practice of components, props, state properties, setState, routes and 3rd party API using Axios. 

#Technicals Used
- Node.js
- React.js
- Axios

#User Stories
User must be able to:
- see all latest matches played by any pro team
- see who won these matches
- able to go to the next 100 matches
- access individual match to see more match details
- access individual team to see all matches that have been played

#Planning and Development Process
Understand what the API is giving me and subsequently see if this fits into what I envision the app to look like. 

##Problem-Solving Strategy
Biggest problem was pagination due to the data returning a limit of only the most recent 100 matches. Information of match ID is required to get the next 100. Solved through a setState and finding the last match id and doing another API call when going to the next page. 

#APIs used
https://www.opendota.com/
https://api.opendota.com/api/proMatches

#Acknowledgements
Grateful for my tutor Ebere.