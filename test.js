fetch("https://api.jejaring.cc/videos.php?id=zV1y3efjEP")
  .then(res => res.text())
  .then(data => console.log(data));
