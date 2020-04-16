//Add code that runs on the window load event.
window.addEventListener("load", function(){
    //Make a GET request using fetch to the astronauts API.
    const fetchPromise = fetch("https://handlers.education.launchcode.org/static/astronauts.json");
    fetchPromise.then(function(response){
        response.json().then(function(json) {
        //astronauts sorted from most to least time in space.
        json.sort(function(a, b){return b.hoursInSpace - a.hoursInSpace});

        //Add each astronaut returned to the web page.
        const container = document.getElementById("container");
        let count;
        for(count = 0; count < json.length; count++){
            let color = "Red";
            if(json[count].active === true){
            color = "Green"
            }
            container.innerHTML += `
            <div class="astronaut" style="background-color: ${color}">
                <div class="bio">
                    <h3>${json[count].firstName} ${json[count].lastName}</h3>
                    <ul>
                        <li>Hours in space: ${json[count].hoursInSpace}</li>
                        <li>Active: ${json[count].active}</li>
                        <li>Skills: ${json[count].skills}</li>
                    </ul>
                </div>
                <img class="avatar" src=${json[count].picture}>
            </div>
            `;
        }
        container.innerHTML += `
            <div id="astronautCount">
            <h3>Total Number Of Astronauts: ${count}</h3>
            </div>
            `;
        });
    });
});