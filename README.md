# sbab-busline

Code test for SBAB.
For this code test I am using Vite (https://vitejs.dev/), a web development framework and build tool for modern JavaScript-based applications.

# Run the application

1. Obtain Api Key
   To start the app, one will need to obtain an API key from https://developer.trafiklab.se/ and then get the key for "SL Hållplatser och Linjer 2"

2. In a terminal window(might as well start with a split terminal). Navigate to the server folder using "cd src/server" and then add an .env file "touch .env"

3. In your .env file. Add your api key obtained from step 1 above add this.
   APIKEY="<YOUR_API_KEY>"

4. In the other terminal window(root of the project). Run "npm install".

5. Once npm install is done, run the command "npm run dev". This will fire up the client side of the application.

6. However, in order to obtain data from the server. One will need to start the server as well. In your first terminal window you are at that location. Run the command "node server.js". If you see "Server is running on http://localhost:3000" in the terminal window you are connected to the server.

7. In order to run the test file busLines.test.js. Run the script "npm test".
