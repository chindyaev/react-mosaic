/** @jsx React.DOM */
'use strict';
var React = require('react'),
    PaneActions = require('../actions/PaneActions'),
    PaneStore = require('../stores/PaneStore'),
    PaneConstants = require('../constants/PaneConstants'),
    Chunk = require('./Chunk'),
    localImageProvider = require('../imageProviders/localImageProvider'),
    Pane = React.createClass({displayName: 'Pane',
        getInitialState: function()
        {
console.log('getInitialState',localImageProvider);
            var image = localImageProvider.getDefaultImage(),
                isVerticalImage = image.height > image.width;

            image.topOffset = 0;
            image.leftOffset = 0;

            return {
                isGame: false,
                chunks: [],
                image: image,
                matrix: PaneStore.getMatrixData(),
                startHole: PaneConstants.START_HOLE
            };
        },

        componentDidMount: function()
        {
            var isVerticalPage = window.innerWidth / window.innerHeight < 1,
                edge = (isVerticalPage) ? window.innerWidth : window.innerHeight;

            this.setState({
                edge: edge,
                image: this._getImageSpecs(this.state.image,edge)
            });

            PaneStore.on('change',this._onPaneChange);
            PaneStore.on('done',this._onDone);
        },

        componentWillUnmount: function() 
        {
            PaneStore.removeListener('change',this._onPaneChange);
            PaneStore.removeListener('done',this._onDone);
        },

        render: function()
        {
            var chunks = [],
                chunkImage = {
                    src: this.state.image.src,
                    scaledWidth: this.state.image.scaledWidth,
                    scaledHeight: this.state.image.scaledHeight,
                    topOffset: this.state.image.topOffset,
                    leftOffset: this.state.image.leftOffset
                };

            for (var x = 0; x < this.state.matrix[0]; x++)
            {
                for (var y = 0; y < this.state.matrix[1]; y++)
                {
                    if (!(x===this.state.startHole[0] && y===this.state.startHole[1]))
                    {
                        chunks.push({ x:x, y:y });
                    }
                }
            }

            return (React.DOM.div({className: "pane", style: this._style()}, 
                chunks.map(function(chunk){
                    return Chunk({
                        key: 'chunk_'+chunk.x+chunk.y, 
                        point: [chunk.x,chunk.y], 
                        isGame: this.state.isGame, 
                        image: chunkImage, 
                        matrix: this.state.matrix, 
                        paneEdge: this.state.edge});
                },this)
            ));
        },


        _style: function() 
        {
            return {
                width : this.state.edge + 'px',
                height : this.state.edge + 'px',
                backgroundPosition : '-' + this.state.image.leftOffset + 'px ' + '-' + this.state.image.topOffset + 'px',
                backgroundRepeat : 'no-repeat',
                backgroundImage : (!this.state.isGame) ? 'url(' + this.state.image.src + ')' : 'none',
                backgroundSize : 'cover'
            }
        },

        _onPaneChange: function()
        {
            var image = this._getImageSpecs(PaneStore.getImage());
console.log('_onPaneChange',image);
            this.setState({
                image: image,
                matrix: PaneStore.getMatrixData(),
                hole:PaneConstants.START_HOLE,
                isGame: PaneStore.isGame()
            });
        },

        _onDone: function()
        {
            var _this = this;
            setTimeout(function(){
                _this.setState({ isGame : false });
                console.info('YOU WIN!'); // todo
            },PaneConstants.ANIMATION_DURATION);

        },

        _getImageSpecs: function(image,edge)
        {
            var imageKoef = image.height / image.width,
                isVerticalImage = imageKoef > 1;

            if (isVerticalImage) 
            {
                image.scaledWidth = edge;
                image.scaledHeight = image.scaledWidth * imageKoef;
                image.topOffset = (image.scaledHeight - edge) / 2;
                image.leftOffset = 0;
            } else 
            {
                image.scaledHeight = edge;
                image.scaledWidth = image.scaledHeight / imageKoef;
                image.topOffset = 0;
                image.leftOffset = (image.scaledWidth - edge) / 2;
            }

            return image;
        }
});

module.exports = Pane;