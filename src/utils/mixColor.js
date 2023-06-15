export default function mixColor(base, color, coef=0.2, rand=5) {
  const splittedBase = [
    base.slice(1, 3),
    base.slice(3, 5),
    base.slice(5, 7)
  ];

  const splittedColor = [
    color.slice(1, 3),
    color.slice(3, 5),
    color.slice(5, 7)
  ];

  for (let i = 0; i < 3; i++) {
    splittedBase[i] = parseInt(splittedBase[i], 16);
    splittedBase[i] = Math.round((splittedBase[i] + parseInt(splittedColor[i], 16) * coef) / (1 + coef));

    splittedBase[i] += Math.round(Math.random() * rand * 2 - rand);
    splittedBase[i] = Math.min(splittedBase[i], 255);
    
  }

  return "#" + splittedBase[0].toString(16) + splittedBase[1].toString(16) + splittedBase[2].toString(16);

}