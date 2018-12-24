function resize() {
  const tallied = document.getElementsByClassName('calculated')[0];
  tallied.style.right =
    window.innerWidth > 1000 ? `${(window.innerWidth - 970) / 2}px` : '20px';
}
window.addEventListener('resize', resize, false);

const tally = ({ text, night, untracked, notParsed }) => {
  if (!notParsed) notParsed = [];
  const times = text.split('\n\n');
  let time = untracked || 0;

  for (let i in times) {
    const cur = times[i];
    if (!night || (cur.split('\n')[3] && cur.split('\n')[3].match(/Night/i))) {
      let t;
      try {
        t = cur.split('\n')[2].split(' ');
      } catch (e) {
        t = ['0', 'min'];
        notParsed.push(cur);
      }
      const n = parseFloat(t[0]);
      switch (t[1]) {
        case 'min':
          time += n / 60;
          break;
        case 'hr':
          time += n;
          break;
        default:
          notParsed.push(cur);
      }
    }
  }

  return time;
};

const app = new Vue({
  el: '#app',
  data: {
    untracked: 0,
    untrackedNight: 0,
    text: '',
    noParse: []
  },
  computed: {
    total() {
      this.noParse = [];
      return tally({
        text: this.text,
        untracked: this.untracked,
        notParsed: this.noParse
      });
    },
    night() {
      return tally({
        text: this.text,
        night: true,
        untracked: this.untrackedNight
      });
    },
    totalStr() {
      return this.total
        ? `${Math.round(this.total * 100) / 100} hours`
        : 'None';
    },
    nightStr() {
      return this.night
        ? `${Math.round(this.night * 100) / 100} hours`
        : 'None';
    }
  },
  mounted() {
    resize();
  }
});
