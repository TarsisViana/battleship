export default async function aiPlay() {
  let x = parseInt(Math.random() * 8);
  let y = await resolveAfter2Seconds();
  return [x, y];
}

function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(parseInt(Math.random() * 8));
    }, 2000);
  });
}
