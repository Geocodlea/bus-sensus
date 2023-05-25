# Bussensus

This is a real life project for the Public Transportation System of Brasov, used by the people for the people. By gathering data sent by passengers, the administration will optimize public transportation vehicles based on the number of passengers at different time intervals. During peak hours, they will increase the number of buses, while during off-peak hours, they will reduce their number.

To start the application, you need to do the following:

- create a file ".env.local", with MONGO_URL="your MongoDb connection"
- npm install;
- npm run dev;
- go to localhost:3000 for the user page, where you can select a bus, route and station and introduce the no. of passengers in the bus;
- go to localhost:3000/admin for the admin page, where you can select a bus, route and station and visualize the average no. of passengers by hours.

### You can check the online example: [here](https://bus-sensus.vercel.app/)
