# Leave on Time (Readme)

An app that informs you about the next departure of your SL bus/metro and shows you when you need to leave your house to catch the train/bus. The interface is automatically presented as soon as you open the app because your routes have been saved to your account. This way, you will not miss the bus/metro, nor leave too early or too late, as the app/infoscreen notifies you when it's time to depart. Users can individually customize which stations are of interest and specify the distance from their residence. The app also allows you to choose your commuting style, whether it involves biking, walking, or using a different form of
transportation.

Additionally, this app offers a level of efficiency not typically found in native apps, shaving off
precious seconds from your daily routine.

## Framework
- React
- Vue
- API:
- - trafiklab api,
- - -->SL platsuppslag
- - -->SL Realttidsinformation 4
- - https://www.trafiklab.se/api/

## App-data
From api --> departure times for busses and metro.
App --> model with: user data, distance to station etc. persistance with firebase (user settings, routes, etc.)

## Description
### Essential:
- /src/reactjs/ReactRoot.jsx
- /src/index.jsx

### Model:
- /src/CommuteModel.js
- /src/firebaseModel.se
- /src/MetrosArray.js
- /src/timetableSource.js

### Presenters:
- /src/reactjs/addRoutePresenter.jsx
- /src/reactjs/locationPresenter.jsx
- /src/reactjs/sidebarPresenter.jsx

### Views:
- /src/view/addRouteView.jsx
- /src/view/locationView.jsx
- /src/view/sidebarView.jsx
- /src/view/testView.jsx
- /src/view/searchResultsView.jsx
- /src/view/settingsView.jsx

## DONE
- A functional sidebar
- A basic layout
- A model
- A basic API call (only visible through consos.

## TODO
- A login functionality
- Being able to save the route to proceed from the addRoute page
- Firebase persistance
- A card design for the various stations added to each location.
