class SonarrUpcomingCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = this.config.title;
      this.content = document.createElement('div');
      this.content.style.padding = '0 0px 0px';
      card.appendChild(this.content);
      this.appendChild(card);
      var attcount = 0; 
    }
//Hardcode entity from custom sonarr component
      const entityId = 'sensor.sonarr_upcoming_card';
//Config options
      const imgstyle = this.config.image_style;
      const clock = this.config.clock;
      const max = this.config.max;
      const showcolor = this.config.show_color;
      const episodecolor = this.config.episode_color;
      const timecolor = this.config.time_color;
      const dlcolor = this.config.downloaded_color;
      const ribboncolor = this.config.ribbon_color;
      const bordercolor = this.config.border_color;
//
      const state = hass.states[entityId].state;
      const style = document.createElement('style');
      var loop = 0;
//Convert date to day of the week
      function getWeekday(dateStr, locale) {
          var date = new Date(dateStr.replace(/-/g, '\/'));
            return date.toLocaleDateString(locale, { weekday: 'long' });
      }
//Convert 24h to 12h
      function get12h (time) {
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
          time = time.slice (1);
          time[5] = +time[0] < 12 ? ' ᴀᴍ' : ' ᴘᴍ';
          time[0] = +time[0] % 12 || 12;
        }
        return time.join ('');
      }
//Truncate text, it's much better looking than wrapping
      function trunc(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
      }
      function getSeriesPoster (seriesId){
        return this.config.sonarrProtocol + "://" + this.config.sonarrHost + ':' + this.config.sonarrPort 
            + '/api/MediaCover/' + seriesId + '/poster-250.jpg?apikey=' + this.config.sonarrAPIKey;
      }
      
//css for poster view
      if (imgstyle == 'poster') {
      style.textContent = `
          * {
            --responsive: calc((var(--min-font) * 1px) + (var(--max-font) - var(--min-font)) * ((100vw - 420px) / (1200 - 420)));
          }
          img {
            width:100%;
            box-shadow: 6px 10px 15px #111;
            outline-width: 3px;
            outline-style: solid;
            outline-color:${bordercolor};
          }
          table {
            width:100%;
            border-collapse: collapse;
            margin-left: 10px;
          }
          td:nth-child(1) {
            padding:10px;
          }
          td:nth-child(2) {
            padding:10px;
            width:65%;
          }
          .show_title {
            --max-font: 23;
            --min-font: 21;
            font-size: var(--responsive);
            font-weight: 600;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
            color:${showcolor};
          }
          .ep_title {
            --max-font: 18;
            --min-font: 16;
            font-size: var(--responsive);
            font-weight: 500;
            line-height: 0;
            margin-top:-4px;
            color:${episodecolor};
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
          }
          .ep_date {
            --max-font: 15;
            --min-font: 14;
            font-size: var(--responsive);
            line-height: 1.2;
            margin-top: 0px;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
          }
          .ribbon {
            background-color:${ribboncolor};
            padding: 4px 17px;
            width: 100%;
            margin-left: -17px;
            margin-top: -65px;
            box-shadow: inset 12px 0 15px -7px rgba(0,0,0,0.8);
          }
          .container {
            min-width:350px;
          }
      `;
//css for banner view
      } else {
          style.textContent = `
          * {
            --responsive: calc((var(--min-font) * 1px) + (var(--max-font) - var(--min-font)) * ((100vw - 420px) / (1200 - 420)));
          }
          img {
            width:95%;
            box-shadow: 6px 10px 15px #111;
            outline-width: 3px;
            outline-style: solid;
            outline-color:${bordercolor};
            display: block;
            margin: 0px auto;
          }
          table {
            width:100%;
            margin-left: auto;
            margin-right: auto;
            margin-top:0px;
            padding:0px 3px;
          }
          .ep_title {
            --max-font: 15;
            --min-font: 14;
            font-size: var(--responsive);
            font-weight: 500;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
            line-height:0;
            text-align:left;
            color:${episodecolor};
            
          }
          .ep_date {
            --max-font: 15;
            --min-font: 14;
            font-size: var(--responsive);
            font-weight: 400;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
            line-height:0;
            text-align:right;
          }
          .ribbon {
            background-color:${ribboncolor};
            box-shadow: inset 0px 30px 55px -7px rgba(0,0,0,0.8);
            height:32px;
            top:10px;
            width:96.3%;
            margin: 0 auto;
          }
          .container {
            min-width:350px;
            padding: 15px;
          }
      `;
      }
//Loop through attributes and puke up HTML
      while (attcount < state) {
        attcount += 1;
        var imgnum = imgstyle + String(attcount);
        var seriesnum = 'series' + String(attcount);
        var epnum = 'episode' + String(attcount);
        var numnum = 'number' + String(attcount);
        var adnum = 'airdate' + String(attcount);
        var atnum = 'airtime' + String(attcount);
        var dlnum = 'hasFile' + String(attcount);
        var img = hass.states[entityId].attributes[imgnum];
        var series = hass.states[entityId].attributes[seriesnum];
        var episode = hass.states[entityId].attributes[epnum];
        var number = hass.states[entityId].attributes[numnum];
        var airdate = hass.states[entityId].attributes[adnum];
        var airday = getWeekday(hass.states[entityId].attributes[adnum], "en-US");
        var airtime12 = get12h(hass.states[entityId].attributes[atnum]);
        var airtime24 = hass.states[entityId].attributes[atnum];
        var hasFile = hass.states[entityId].attributes[dlnum];
//Display 12h or 24h
        if(clock == 24 || clock == '24'){
          var airtime = airtime24;
        } else {
          airtime = airtime12;
        }
//Show air day and time or "Downloaded" if it has been & change color accordingly
        if(hasFile == true){
          var downloaded = 'Downloaded';
          var datedl = dlcolor;
        } else {
          downloaded = airday + ' @ ' + airtime;
          datedl = timecolor;
        }
//HTML for poster view
        if (imgstyle == 'poster'){
            this.content.innerHTML += `
              <div class="container">
              <table><tr><td><img src="${img}"></td><td>
              <p class="show_title ribbon">${trunc(series,22)}</p>
              <p class="ep_title">${trunc(episode,27)}</p>
              <p class="ep_date" style="color:${datedl}">${downloaded}</p>
              </td></tr></table></div>
            `
//HTML for banner view
        } else {
            this.content.innerHTML += `
              <div class="container">
              <img src="${img}">
              <div class="ribbon"><table><tr><th>
              <p class="ep_title">${trunc(episode,22)}</p></th>
              <th><p class="ep_date" style="color:${datedl}">${downloaded}</p></th></tr>
              </div></div>
            `
        }
//We got style!
        this.appendChild(style);
//Stop once we hit the max set in config
        loop += 1;
        if (loop == max){
          break;
        }
      }
   }
  setConfig(config) {
//Set default views if not in config
    if (!config.image_style) config.image_style = 'poster';
//Defauts for banner view
    if (config.image_style == 'banner') {
        if (!config.episode_color) config.episode_color = '#fff';
        if (!config.time_color) config.time_color = '#fff';
        if (!config.downloaded_color) config.downloaded_color = '#fff';
        if (!config.ribbon_color) config.ribbon_color = '#000';
        if (!config.border_color) config.border_color = '#000';
//Defaults for poster view
    } else {
        if (!config.show_color) config.show_color = 'var(--primary-text-color)';
        if (!config.episode_color) config.episode_color = 'var(--primary-text-color)';
        if (!config.time_color) config.time_color = 'var(--primary-text-color)';
        if (!config.downloaded_color) config.downloaded_color = 'var(--primary-color)';
        if (!config.ribbon_color) config.ribbon_color = 'var(--primary-color)';
        if (!config.border_color) config.border_color = '#fff';
    }
    this.config = config;
  }
  getCardSize() {
    return 3;
  }
}

customElements.define('sonarr-upcoming-card', SonarrUpcomingCard);
