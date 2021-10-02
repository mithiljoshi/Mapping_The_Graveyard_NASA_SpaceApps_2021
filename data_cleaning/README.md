# Cleaning Data Source 🚀 #
## Motivation ##
This project has been built during NASA Space Apps Challenge 2021 🌍. We Debris_Mappers, are working on a web app for 'Mapping Space Trash in Real Time' 🗑. Indeed Space Trash is a matter of grave concern for potential space explorations.
### Data Cleaning is a highly underrated part of any project. ### 
We generally get the data for our project in the TLE form. It can be a tedious task to handle such a .txt file 😞. But don't worry we have got you covered. These are some scripts that can prove helpful. 😀
## Approach 🚀 ##
We see that there are two JS files. The update_scripts.js file on running will produce the JSON file, tle.json as output. This file shall have key value pair mapping. The key will be the unique ID and the the value will be an object with line1, line2 and commonName as attributes. This file is used on our server as well as frontend but as a JavaScript object exported from a file. This makes handling data simpler. <br/>
Next comes the id_final.js file. This file when run after the update_script.json, shall produce an output with each common name mapped to the list of ID names that have the same common name. This file, again, is present on our server and frontend as a JS object.

### Some Issues: ####
At times the .txt file may not be very clean. We may get a \r at the end of each line. However, these issues can be taken care of without writing code. The modern IDE has features like change all occurrences. This can prove handy.

