# Licor Store

In this challenge i'm building a store to list and add wines, based in react.

The create-react-app boilerplate seemed a bit overkill for a simple web application, so for a lighter version parcel is used to serve the app and all npm modules wore add based on its necessity.

# Run the App

- Inside the folder run ```npm install```
- Run ```npm run start```, when building is finished the app should be available by http://localhost:1234

# Stack used

- NPM
- React
- React-Router
- Redux

# Features

- List Wines
- Add / Edit / Remove Wines;
- LocalStorage is used to persist information on client-side;
- Sorted List by Name, Vineyard, Year and Rating;
- Detail of Wines is shown as a Modal;
- Search in List by Name, Vineyard, Year and Rating;
- User can rate wines [0-5] with 0.5 increments;

## Others

Unfortunately none of the Wine API suggested to implement autocomplete was available. The alternative i could find was Global Wine Score API, but currently the page returns a Server Error 500 when i try to request an API key. For this i was unable to implement a suggestions to autofill option when adding / editing a wine.
