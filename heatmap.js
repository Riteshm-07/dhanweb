const calendar =
document.getElementById("calendar");

let chart;

/* DATA */

function getData(){

  return JSON.parse(
    localStorage.getItem("plData")
  ) || {};

}

function saveData(data){

  localStorage.setItem(
    "plData",
    JSON.stringify(data)
  );

}

/* SAVE */

function savePL(){

  const date =
  document.getElementById("dateInput").value;

  const value =
  Number(
    document.getElementById("plInput").value
  );

  if(!date){

    alert("Select Date");

    return;
  }

  let data = getData();

  data[date] = value;

  saveData(data);

  renderAll();

}

/* COLOR */

function getColor(val){

  if(val > 0){

    if(val < 500) return "g1";

    if(val < 2000) return "g2";

    return "g3";

  }

  if(val < 0){

    if(val > -500) return "r1";

    if(val > -2000) return "r2";

    return "r3";

  }

  return "";

}

/* HEATMAP */

function renderHeatmap(){

  calendar.innerHTML = "";

  const data = getData();

  const year =
  new Date().getFullYear();

  let start =
  new Date(year,0,1);

  let end =
  new Date(year,11,31);

  let current =
  new Date(start);

  while(current <= end){

    const week =
    document.createElement("div");

    week.className = "week";

    for(let i=0;i<7;i++){

      if(current > end) break;

      const d =
      new Date(current);

      const dateStr =
      d.toISOString().split("T")[0];

      const val =
      data[dateStr] || 0;

      const box =
      document.createElement("div");

      box.className =
      "day " + getColor(val);

      box.title =
      dateStr + " ₹" + val;

      week.appendChild(box);

      current.setDate(
        current.getDate() + 1
      );

    }

    calendar.appendChild(week);

  }

}

/* STATS */

function renderStats(){

  const data = getData();

  let total = 0;

  let win = 0;

  let loss = 0;

  Object.values(data).forEach(v=>{

    total += v;

    if(v>0) win++;

    if(v<0) loss++;

  });

  document.getElementById("totalPL")
  .innerText = "₹" + total;

  let rate =
  win + loss === 0
  ? 0
  : ((win/(win+loss))*100).toFixed(1);

  document.getElementById("winRate")
  .innerText = rate + "%";

}

/* CHART */

function renderChart(){

  const data = getData();

  let dates =
  Object.keys(data).sort();

  let balance = 0;

  let values = dates.map(d=>{

    balance += data[d];

    return balance;

  });

  if(chart) chart.destroy();

  chart = new Chart(
    document.getElementById("chart"),
    {
      type:"line",

      data:{
        labels:dates,

        datasets:[{
          label:"Equity Curve",
          data:values,
          borderColor:"#0059c9",
          tension:0.3
        }]
      }
    }
  );

}

/* MAIN */

function renderAll(){

  renderHeatmap();

  renderStats();

  renderChart();

}

renderAll();