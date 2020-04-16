// Write your JavaScript code here!
window.addEventListener("load", function(){
   //Make a GET request using fetch to the planets API.
   const fetchPromise = fetch("https://handlers.education.launchcode.org/static/planets.json");
   fetchPromise.then(function(response){
      response.json().then(function(json) {      
         const missionTarget = document.getElementById("missionTarget");

         //Bonus Mission: Pick a random destination from available options.
         let choice = Math.floor(Math.random() * Math.floor(json.length)); 

         //create and populate a string literal with planet information.
         missionTarget.innerHTML += `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[choice].name}</li>
               <li>Diameter: ${json[choice].diameter}</li>
               <li>Star: ${json[choice].star}</li>
               <li>Distance from Earth: ${json[choice].distance}</li>
               <li>Number of Moons: ${json[choice].moons}</li>
            </ol>
            <img src="${json[choice].image}">
         `;
      });
   });
   //Process form input and output information. 
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();

      //Get user input from the form.
      let pilotName = document.getElementById('pilotName');
      let copilotName = document.getElementById('copilotName');
      let fuelLevel = document.getElementById('fuelLevel');
      let cargoMass = document.getElementById('cargoMass');

      //Verify that all fields are filled and all inputs meets requirements.
      let validatedInputs = false;
      if(pilotName.value === '' || copilotName.value === '' || fuelLevel.value === '' || cargoMass.value === ''){
         //This block verifies all field have input.
         alert("All fields are required!");
      }else if(!isNaN(Number(pilotName.value)) || !isNaN(Number(copilotName.value)) || isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))){
         //This block verifies all inputs are valid 
         alert("Make sure to enter valid information for each field!");
      }else{
         //This block ensures that all above tests have passed.
         validatedInputs = true;
      }
      
      //Get fields that needs to be updated with output information.
      let pilotStatus = document.getElementById('pilotStatus');
      let copilotStatus = document.getElementById('copilotStatus');
      let fuelStatus = document.getElementById('fuelStatus');
      let cargoStatus = document.getElementById('cargoStatus');
      let launchStatus = document.getElementById('launchStatus');
      let faultyItems = document.getElementById('faultyItems');

      //Process input data and prepare it for output display.
      let isFuelLevelGood = Number(fuelLevel.value) >= 10000;
      let isCargoMassGood = Number(cargoMass.value) <= 10000;
      let fuel = isFuelLevelGood ? 'high enough' : 'is too low';
      let cargo = isCargoMassGood ? 'low enough' : 'is too heavy';
      let shuttleStatus = isFuelLevelGood && isCargoMassGood ? 'ready' : 'not ready';
      
      //Format for launch status display based on whether requirements are met or not met.
      let isNotReady = ((!isFuelLevelGood || !isCargoMassGood) && validatedInputs);
      launchStatus.style = isNotReady ? "color: Red" : "color: Green";
      faultyItems.style = isNotReady ? "visibility: visible" : "visibility: hidden";
   
      if(!validatedInputs){
         //Reset launch status display if user enters invalid information.
         launchStatus.innerText ="Awaiting Information Before Launch";
         launchStatus.style ="color: Black";
         faultyItems.style = "visibility: hidden";
      }else{
         //Update launch status display if user enters valid information.
         launchStatus.innerText = `Shuttle is ${shuttleStatus} for launch`;
         pilotStatus.innerText = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerText = `Co-pilot ${copilotName.value} is ready for launch`;
         fuelStatus.innerText = `Fuel level ${fuel} for launch`;
         cargoStatus.innerText = `Cargo mass ${cargo} for launch`;
      }
   });
});