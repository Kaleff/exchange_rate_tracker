# Exchange rate tracker built on LARAVEL + REACT stack

This is the project that allows to track exchange rates among EUR and USD, AUD, GBP and their history.

# LARAVEL BACK-END

> [!NOTE]
> To run laravel back-end you need to utilise MAC, LINUX or Windows with WSL2 and a docker engine running.
> In case you are using Windows WSL2, make sure to mount this project repository in WSL2 and run from there.

1) Copy the env.example contents and create the .env file and configure it, the token will be provided via e-mail.
2) Copy the API Token included in the e-mail to the ```OUTER_API_TOKEN=``` line in the .env file 
3) Make sure that apache is not running to avoid possible conflicts

```
sudo /etc/init.d/apache2 stop
```

4) Run the application using SAIL, make sure the docker engine is running

```
cd laravel-backend && ./vendor/bin/sail up
```

5) Run the migrations
```
./vendor/bin/sail artisan migrate:fresh
```

6) Populate the exchange rates table either
Manually, by running the command
```
./vendor/bin/sail updaterates
```
Or setting up the schedule worker
```
./vendor/bin/sail artisan schedule:work
```
> [!NOTE]
> If you decide to use schedule worker, for the sake of testing, change the frequency of execution in the
> ```routes/console.php``` file by uncommenting the line with 15 second frequence, and commenting the one that runs daily.

# REACT FRONT-END

1) Copy the env.example contents and create the .env file with said contents and configure it, depending on the url the back-end utilises for the API communication
2) Install all the dev dependencies
```
cd react-front-end && npm i
```
3) Run the application in the dev environment
```
npm run dev
```
> [!NOTE]
> Make sure you're running the version of Node Package Manager compatible with React 18.2
4) Select the link with desired currency. The pagination and sorting order are also included, change the sorting by clicking on the table heading for date stamps
