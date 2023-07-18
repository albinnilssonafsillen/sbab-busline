# sbab-busline

Code test for SBAB.

# Run the application

1. Obtain Api Key
   To start the app, one will need to obtain an API key from https://developer.trafiklab.se/ and then get the key for "SL Hållplatser och Linjer 2"

2. In a terminal window(might as well start with a split terminal). Navigate to the server folder using "cd src/server" and then add an .env file "touch .env"

3. In your .env file add your api key obtained from step 1 above add this.
   APIKEY="<YOUR_API_KEY>"

4. In the other terminal window, where you should be in the root of the project - run "npm install".

5. Once npm install is done, run the command "npm run dev". This will fire up the client side of the application.

6. However, in order to obtain data from the server. One will need to start the server as well. Luckly in your first terminal window you are at that exact location. Run the command "node server.js".
   If you see "Server is running on http://localhost:3000" in the terminal window you are connected to the server.
