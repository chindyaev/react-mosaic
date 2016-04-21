var PaneConstants = 
{
    START_HOLE: [0,0],
    ANIMATION_DURATION: 75, // ms
    CLICK_DELAY: 350, //ms
    SHUFFLE_DEPTH: 100, //60
    LOADING_EDGE: 40, //px
    ACTION_MOUNT: 'CHUNK_MOUNT',
    ACTION_UNMOUNT: 'CHUNK_UNMOUNT',
    ACTION_SHUFFLE: 'CHUNK_SHUFFLE',
    ACTION_CRAWL: 'CHUNK_CRAWL',
    ACTION_START_LOADING: 'PANE_START_LOADING',
    ACTION_STOP_LOADING: 'PANE_STOP_LOADING',
    ACTION_SET_IMAGE: 'PANE_SET_IMAGE',
    ACTION_SET_MATRIX: 'PANE_SET_MATRIX',
    ACTION_GAME_START: 'PANE_GAME_START',
    ACTION_GAME_ROLLBACK: 'PANE_GAME_ROLLBACK',
    ACTION_SPY_START: 'PANE_SPY_START',
    ACTION_SPY_STOP: 'PANE_SPY_STOP',
};

module.exports = PaneConstants;