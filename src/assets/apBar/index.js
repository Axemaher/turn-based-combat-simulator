import c0 from "./c0.png";
import c1 from "./c1.png";
import c2 from "./c2.png";
import c3 from "./c3.png";
import c4 from "./c4.png";
import playerStats from '../../js/stats/playerStats';

const apBarCircles = [c0, c1, c2, c3, c4];

let randomCircles = [];

for (let i = 0; i < playerStats.maxAp; i++) {
    randomCircles.push(
        apBarCircles[Math.floor(Math.random() * apBarCircles.length)]
    );
};

export default randomCircles;