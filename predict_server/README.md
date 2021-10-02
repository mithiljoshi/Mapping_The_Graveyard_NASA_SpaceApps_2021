# Predicting Occurrence of a Satellite Above a Ground Station 🚀#
## Motivation ##
This project has been built during NASA Space Apps Challenge 2021 🌍. We Debris_Mappers, are working on a web app for 'Mapping Space Trash in Real Time' 🗑. Indeed Space Trash is a matter of grave concern for potential space explorations. We felt it would be great if the user would be able to know when a piece of DEbris would be above a given ground station.
## Approach ##
We used TLE and the famous jspredict library to predict occurrences of a piece of Space Trash above a ground station. WE created a POST request handler to accept ID of debris, latitude and longitude of place. Using the library we were able to do the prediction 💻.