document.addEventListener("DOMContentLoaded", () => {
    const dogBar = document.querySelector("#dog-bar");
    const dogInfo = document.querySelector("#dog-info");

    // Step 2: Fetch and display pup data
    fetch("http://localhost:3000/pups")
        .then(response => response.json())
        .then(pups => {
            pups.forEach(pup => {
                const span = document.createElement("span");
                span.textContent = pup.name;
                span.className = "dog-button";
                span.addEventListener("click", () => showPupInfo(pup));
                dogBar.appendChild(span);
            });
        });

    // Step 3: Show pup info on click
    function showPupInfo(pup) {
        dogInfo.innerHTML = `
            <img src="${pup.image}" class="dog-info img" />
            <h2>${pup.name}</h2>
            <button class="good-btn">${pup.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
        `;
        dogInfo.className = "dog-info";
        const button = dogInfo.querySelector("button");
        button.addEventListener("click", () => toggleGoodDog(pup, button));
    }

    // Step 4: Toggle Good Dog/Bad Dog
    function toggleGoodDog(pup, button) {
        const newStatus = !pup.isGoodDog;
        fetch(`http://localhost:3000/pups/${pup.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ isGoodDog: newStatus })
        })
            .then(response => response.json())
            .then(updatedPup => {
                button.textContent = newStatus ? "Good Dog!" : "Bad Dog!";
                pup.isGoodDog = newStatus;
            })
            .catch(error => console.error("Error updating pup:", error));
    }
});
