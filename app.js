const btns = document.querySelectorAll(".btn");

btns.forEach((btn) => {
  btn.addEventListener("click", setTimeFrame);
});

function setTimeFrame(e) {
  removeClassList();
  const currentBtn = e.currentTarget.dataset.id;
  const btn = e.currentTarget;
  btn.classList.add("active");
  if (currentBtn === "daily") {
    getDailyTimeFrame();
  } else if (currentBtn === "weekly") {
    getWeeklyTimeFrame();
  } else if (currentBtn === "monthly") {
    getMonthlyTimeFrame();
  }
}

async function updateContent(elements, values) {
  elements.forEach((element, index) => {
    element.textContent = values[index];
  });
}

async function getDailyTimeFrame() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    const currentHours = data.map((item) => item.timeframes.daily.current);
    const previousHours = data.map((item) => item.timeframes.daily.previous);

    updateContent(
      document.querySelectorAll(".current"),
      currentHours.map((value) => `${value}hrs`)
    );

    updateContent(
      document.querySelectorAll(".previous"),
      previousHours.map((value) => `Last Day - ${value}hrs`)
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getWeeklyTimeFrame() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    const currentHours = data.map((item) => item.timeframes.weekly.current);
    const previousHours = data.map((item) => item.timeframes.weekly.previous);

    updateContent(
      document.querySelectorAll(".current"),
      currentHours.map((value) => `${value}hrs`)
    );

    updateContent(
      document.querySelectorAll(".previous"),
      previousHours.map((value) => `Last Week - ${value}hrs`)
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getMonthlyTimeFrame() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();

    const currentHours = data.map((item) => item.timeframes.monthly.current);
    const previousHours = data.map((item) => item.timeframes.monthly.previous);

    updateContent(
      document.querySelectorAll(".current"),
      currentHours.map((value) => `${value}hrs`)
    );
    updateContent(
      document.querySelectorAll(".previous"),
      previousHours.map((value) => `Last Month - ${value}hrs`)
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function removeClassList() {
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
}
