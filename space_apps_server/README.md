# Server For Periodic Refresh of Space Debris Data 🚀
## Motivation
Earlier, we were planning to perform the entire computation on the frontend. However, it was becoming very heavy for the browser 😔.
Hence, there was a need for a server. We decided to go for NodeJS as it is fast, robust and easy. Moreover, we could use satellite.js in Node environment.
## Approach
The GET handler accepted an ID along with date as path parameters and returned the location back to the client.