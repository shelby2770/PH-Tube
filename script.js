let active = "button_container1";
let active_id = "1000";
const button_changer = (data = button_container1) => {
  let button_toInactive = document.getElementById(active);
  button_toInactive.innerHTML = `
    <button class="btn btn-sm btn-outline rounded-md bg-third_clr text-black normal-case">${button_toInactive.innerText}</button>
    `;

  active = data.id;
  const name = data.innerText;
  data.innerHTML = `
    <button class="btn btn-sm btn-outline rounded-md bg-primary_clr text-white normal-case">${name}</button>
  `;
  add_first(name);
};

const add_first = async (category) => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  for (let i = 0; i < data.data.length; ++i) {
    if (data.data[i].category === category) {
      active_id = data.data[i].category_id;
      add_item(data.data[i].category_id);
      return;
    }
  }
};

const add_item = async (item, isModify = false) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${item}`
  );
  const data = await res.json();

  let container = document.getElementById("contents_container");
  container.innerHTML = `
  <div id="all_contents" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  </div>
  `;
  let data_array = data.data;
  if (isModify) data_array = sort(data_array);
  if (!data_array.length) {
    container.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
    <div class= "flex flex-col text-center gap-4 mt-8 md:mt-28 lg:mt-40">
        <img class= "place-self-center h-32 w-32" src="./Icon.png" alt="">
        <h1 class="font-bold text-2xl text-center">Oops!! Sorry, There is no<br> content here</h1>
    </div>
    `;
    container.appendChild(div);
    return;
  }

  let real_container= document.getElementById("all_contents")
  let count = 0;
  for (let i of data_array) {
    let div = document.createElement("div");
    div.innerHTML = `
    <div class="flex flex-col gap-4">
        <div class= "flex flex-col">    
            <img class="rounded-md object-fill h-48 w-96" src="${i.thumbnail}" alt="">
            <div id= "img_container${count}" class= "flex flex-row justify-end -mt-6 mr-4">
            </div>
        </div>
        
        <div class= "flex flex-row gap-2">
            <div>
                <img class="rounded-full object-fill h-8 w-8" src="${i.authors[0].profile_picture}" alt="">
            </div>

            <div class= "flex flex-col items-start">
                <h3 class= "font-semibold text-lg">${i.title}</h3>
                <div id= "author_details${count}" class= "flex flex-row gap-2">
                    <p class= "text-sm">${i.authors[0].profile_name}</p>
                </div>
                <p class= "text-sm">${i.others.views} views</p>
            </div>
        </div>

    </div>
    `;

    real_container.appendChild(div);
    if (i.authors[0].verified) {
      let blue = document.getElementById(`author_details${count}`);
      let svg = document.createElement("div");
      svg.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <g clip-path="url(#clip0_11_34)">
                <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
                <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
            </g>
            <defs>
                <clipPath id="clip0_11_34">
                <rect width="20" height="20" fill="white"/>
                </clipPath>
            </defs>
            </svg>
        `;
      blue.appendChild(svg);
    }

    if (i.others.posted_date) {
      let sec = parseInt(i.others.posted_date);
      const hour = Math.floor(sec / 3600);
      sec = sec % 3600;
      const min = Math.floor(sec / 60);

      const time = `${hour} hrs ${min} min ago`;
      let time_div = document.createElement("div");
      time_div.innerHTML = `
      <div class= " bg-black text-white text-xs rounded-sm w-max">
        <p>${time}</p>
      </div>
      `;

      let img_container = document.getElementById(`img_container${count}`);
      img_container.appendChild(time_div);
    } else {
      blank_div = document.createElement("div");
      blank_div.innerHTML = `
        <div class= "mt-4"></div>
        `;
      let img_container = document.getElementById(`img_container${count}`);
      img_container.appendChild(blank_div);
    }
    count++;
  }
};

function sort(data) {
  let new_array = data.sort(function (a, b) {
    return parseInt(b.others.views) - parseInt(a.others.views);
  });
  return new_array;
}

const sort_view = () => {
  add_item(active_id, true);
};
button_changer();