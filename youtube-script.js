const youtube_theme_manifestUri = 'https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd';

// Example ClearKey config (Replace with your real keys and key IDs)
const clearKeyConfig = {
  'drm': {
    'clearKeys': {
      // Format: 'key-id-in-hex': 'key-in-hex'
      'ae26845bd33038a9c0774a0981007294': '63ac662dde310cfb4cc6f9b43b34196d'
    }
  }
};

async function init() {
  const video = document.getElementById('youtube-theme');
  const ui = video['ui'];
  
  const config = {
    seekBarColors: {
      base: 'rgba(255,255,255,.2)',
      buffered: 'rgba(255,255,255,.4)',
      played: 'rgb(255,0,0)',
    }
  };
  
  ui.configure(config);
  
  const controls = ui.getControls();
  const player = controls.getPlayer();

  // Apply the DRM configuration
  player.configure(clearKeyConfig);

  try {
    await player.load(youtube_theme_manifestUri);
    console.log('Video loaded successfully!');
  } catch (error) {
    console.error('Error loading video:', error);
  }

  // Vanilla JS replacements for jQuery operations:
  const overflowBtn = document.querySelector('.shaka-overflow-menu-button');
  if (overflowBtn) overflowBtn.textContent = 'settings';

  const backBtnIcon = document.querySelector('.shaka-back-to-overflow-button .material-icons-round');
  if (backBtnIcon) backBtnIcon.textContent = 'arrow_back_ios_new';
}

document.addEventListener('shaka-ui-loaded', init);
