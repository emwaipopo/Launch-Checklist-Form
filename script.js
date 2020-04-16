// Write your JavaScript code here!
window.addEventListener("load", function(){
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      //Verify all fields have valid input.
      let pilotName = document.getElementById('pilotName');
      let copilotName = document.getElementById('copilotName');
      let fuelLevel = document.getElementById('fuelLevel');
      let cargoMass = document.getElementById('cargoMass');

      let validatedInputs = false;
      if(pilotName.value === '' || copilotName.value === '' || fuelLevel.value === '' || cargoMass.value === ''){
         alert("All fields are required!");
      }else if(!isNaN(Number(pilotName.value)) || !isNaN(Number(copilotName.value)) || isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))){
         alert("Make sure to enter valid information for each field!");
      }else{
         validatedInputs = true;
      }
      //Check shuttle status.
      let pilotStatus = document.getElementById('pilotStatus');
      let copilotStatus = document.getElementById('copilotStatus');
      let fuelStatus = document.getElementById('fuelStatus');
      let cargoStatus = document.getElementById('cargoStatus');
      let launchStatus = document.getElementById('launchStatus');

      let isFuelLevelGood = Number(fuelLevel.value) >= 10000;
      let isCargoMassGood = Number(cargoMass.value) <= 10000;
      let fuel = isFuelLevelGood ? 'high enough' : 'is too low';
      let cargo = isCargoMassGood ? 'low enough' : 'is too heavy';
      
      let shuttleStatus = isFuelLevelGood && isCargoMassGood ? 'ready' : 'not ready';
      let faultyItems = document.getElementById('faultyItems');

      //Update page output.
      if((!isFuelLevelGood || !isCargoMassGood) && validatedInputs){
         launchStatus.style ="color: Red";
         faultyItems.style = "visibility: visible";
      }else if(validatedInputs){
         launchStatus.style ="color: Green";
         faultyItems.style = "visibility: hidden";
      }
      if(!validatedInputs){
         launchStatus.innerText ="Awaiting Information Before Launch";
         launchStatus.style ="color: Black";
         faultyItems.style = "visibility: hidden";
      }else{
         launchStatus.innerText = `Shuttle is ${shuttleStatus} for launch`;
         pilotStatus.innerText = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerText = `Co-pilot ${copilotName.value} is ready for launch`;
         fuelStatus.innerText = `Fuel level ${fuel} for launch`;
         cargoStatus.innerText = `Cargo mass ${cargo} for launch`;
      }
      
   });
   //Make a GET request using fetch to the planets API.
   const fetchPromise = fetch("https://handlers.education.launchcode.org/static/planets.json");
   fetchPromise.then(function(response){
      response.json().then(function(json) {
         const missionTarget = document.getElementById("missionTarget");
         let choice = Math.floor(Math.random() * Math.floor(json.length));
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
/*----------------------Drop-Down-Menu-Button--(Under-Construction)-------------*/
         // let list = document.getElementById("destinationOptions");
         // list.addEventListener("click", function(e) {
         //e.preventDefault();         
         const destinationOptions = document.getElementById("destinationOptions");
         destinationOptions.innerHTML += `
            <div class="dropdown">
               <button class="dropbtn">Select Destination</button>
               <div class="dropdown-content">
                  <a href='#' value='0'>${json[0].name}</a>
                  <a href='#' value='1'>${json[1].name}</a>
                  <a href='#' value='2'>${json[2].name}</a>
                  <a href='#' value='3'>${json[3].name}</a>
                  <a href='#' value='4'>${json[4].name}</a>
                  <a href='#' value='5'>${json[5].name}</a>
               </div>
            </div>
         `;
         // let selection = document.getElementById('planets');
         // choice = selection.options[selection.selectedIndex].value;
         // console.log(choice);
         // });
/*---------------------------------------------------------------------*/
      });
   });
});