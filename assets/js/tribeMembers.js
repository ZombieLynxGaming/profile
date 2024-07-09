export function displayTribeMembers(user) {
    const tribeMembersContainer = document.querySelector(".tribe-members");
    tribeMembersContainer.innerHTML = "";
    const pastelColors = [
      "pastel-blue",
      "pastel-green",
      "pastel-purple",
      "pastel-pink",
      "pastel-yellow",
      "pastel-orange",
      "pastel-teal",
      "pastel-red",
    ];
    const fallbackImage = "./path/to/default-image.png"; // Replace with the path to your fallback image
  
    user.tribeMembers.forEach((member, index) => {
      const memberDiv = document.createElement("div");
      memberDiv.classList.add("tribe-member");
      memberDiv.setAttribute("data-bs-toggle", "popover");
      memberDiv.setAttribute("data-bs-html", "true");
      memberDiv.setAttribute(
        "data-bs-content",
        `
              <div class="text-center">
                  <div class="profile-card d-flex align-items-center row">
                      <div class="profile-image col-6 ps-0 rounded d-flex justify-content-center">
                          <img class="text-center align-self-center rounded-circle popover-avatar w-75" src="${
                            member.avatar || fallbackImage
                          }" alt="Profile Image">
                      </div>
                      <div class="profile-info flex-grow-1 col-6 ps-0 pe-4">
                          <div class="my-0 text-start text-white tribe-member-text-1 m-0 p-0"><strong>${
                            member.name
                          }</strong></div>
                          <div class="fw-light my-0 text-start align-items-start align-top text-white tribe-member-text-2 m-0 p-0 mb-15">${
                            user.tribe
                          }</div>
                          <div class="row d-flex justify-content-around mt-3">
                              <div class="stat col-4 px-2">
                                  <img src="./assets/images/kills.png" alt="" style="width: 12px !important; height: 12px !important;">
                                  <div class="stat-number-small fw-bolder">${
                                    member.kills
                                  }</div>
                              </div>
                              <div class="stat col-4 px-2">
                                  <img src="./assets/images/deaths.png" alt="" style="width: 12px !important; height: 12px !important;">
                                  <div class="stat-number-small fw-bolder">${
                                    member.deaths
                                  }</div>
                              </div>
                              <div class="stat col-4 px-2">
                                  <img src="./assets/images/kd.png" alt="" style="width: 12px !important; height: 12px !important;">
                                  <div class="stat-number-small fw-bolder">${
                                    member.kd
                                  }</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>    
          `
      );
      memberDiv.setAttribute("data-bs-placement", "top");
      memberDiv.classList.add("popover-tribe");
  
      if (member.avatar) {
        const memberImg = document.createElement("img");
        memberImg.src = member.avatar;
        memberImg.classList.add("tribe-member-avatar");
        memberDiv.appendChild(memberImg);
      } else {
        memberDiv.classList.add(
          "tribe-member-initial",
          pastelColors[index % pastelColors.length]
        );
        memberDiv.innerText = member.initial;
      }
      memberDiv.style.zIndex = user.tribeMembers.length - index;
      tribeMembersContainer.appendChild(memberDiv);
  
      console.log(`Tribe member ${member.name} created with popover.`);
    });
  }
  