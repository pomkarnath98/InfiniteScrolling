const outerDiv = document.getElementById("outerDiv");
const imgDiv = document.getElementById("imageDiv");

let page_no = 1;

window.onload = async () => {
  let data = [];
  await getData(page_no, data);
  data.map((e) => {
    const image = document.createElement("img");
    image.className = "images";
    image.src = e.download_url;
    imgDiv.append(image);
  });
};

outerDiv.onscroll = async () => {
  const { scrollTop, clientHeight, scrollHeight } = outerDiv;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    let data = [];
    await getData(page_no, data);
    data.map((e) => {
      const image = document.createElement("img");
      image.className = "images";
      image.src = e.download_url;
      imgDiv.append(image);
    });
  }
};

const throttle = (fn, delay) => {
  let last = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - last > delay) {
      last = now;
      return fn(...args);
    }
  };
};

const getData = throttle(async (page, data) => {
  await fetch(`https://picsum.photos/v2/list?page=${page}&limit=25`)
    .then((res) => res.json())
    .then((res) => {
      data.push(...res);
      page_no++;
    })
    .catch((err) => console.log("Error:", err));
}, 1000);
