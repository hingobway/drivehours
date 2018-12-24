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
      const times = this.text.split('\n\n');
      let time = this.untracked || 0;

      for (let i in times) {
        const cur = times[i];
        let t;
        try {
          t = cur.split('\n')[2].split(' ');
        } catch (e) {
          t = ['0', 'min'];
          this.noParse.push(cur);
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
            this.noParse.push(cur);
        }
      }

      return time;
    },
    night() {
      const times = this.text.split('\n\n');
      let time = this.untrackedNight || 0;

      for (let i in times) {
        const cur = times[i];
        if (cur.split('\n')[3] && cur.split('\n')[3].match(/Night/i)) {
          let t;
          try {
            t = cur.split('\n')[2].split(' ');
          } catch (e) {
            t = ['0', 'min'];
          }
          const n = parseFloat(t[0]);
          switch (t[1]) {
            case 'min':
              time += n / 60;
              break;
            case 'hr':
              time += n;
              break;
          }
        }
      }

      return time;
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
  }
});
