## Simple App that shows information about countries

This is my implementation to problems 2.12 ~ 2.14 from [FullStackOpen](https://fullstackopen.com/en/)

It's a simple application that fetch data about all countries in the world from [RestCountries API](https://restcountries.eu). 

<br/>

### How it works

Through the input the names are filtered, when there's less than 10 names that match with the partial input name they're shown, if there's only one match its information is displayed.

The informations are:
- Country name
- Capital name
- Spoken languages
- The flag

It'll also fetch data from [WeatherStack API](https://weatherstack.com/), and display the current weather condition in the capital.

<br/>

### How to run

You can run it locally by cloning all the repo files, navigating to `helsinki-fullstackopen/part2/countries`, run `npm install` to install all depedencies and then `npm start`, but running it locally won't show the weather infos because an api_key is required.

<br/>

### Gif showing it working 

<p align="center">
<img src="https://user-images.githubusercontent.com/62313672/124417457-95b80a80-dd2f-11eb-8bae-6472bc4e0899.gif" width="50%">
</p>
