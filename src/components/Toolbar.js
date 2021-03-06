/** @jsx React.DOM */
'use strict';
var React = require('react'),
    ReactWithAddons = require('../../node_modules/react/addons'),
    HeaderActions = require('../actions/HeaderActions'),
    PaneActions = require('../actions/PaneActions'),
    PaneStore = require('../stores/PaneStore'),
    mui = require('material-ui'),
    PaperButton = mui.PaperButton,
    _500pxConstants = require('../constants/_500pxConstants'),
    _500pxImageProvider = require('../imageProviders/_500pxImageProvider'),
    DropDownMenu = mui.DropDownMenu,
    Dialog = mui.Dialog,
    PaperButton = mui.PaperButton,
    Icon = mui.Icon,
    Header = React.createClass({
        getInitialState : function(){
            return {
                categories: _500pxConstants.CATEGORIES,
                isGame: false
            }
        },
        componentDidMount : function(){
            PaneStore.on('change',this._onPaneChange);
        },
        render : function(){
            var gameIcon = (this.state.isGame) ? 'av-stop' : 'av-play-arrow',
                gameIconClass = (this.state.isGame) ? 'toolbar-portrait__section-btn  mdfi_av_stop' : 'toolbar-portrait__section-btn  mdfi_av_play_arrow',
                _this = this;

            return (<div className="toolbar-container">

                <Dialog ref="matrixDialog" title="Set matrix">
                    <PaperButton label="3x3" href='#' onClick={this._setMatrix33}></PaperButton>
                    <PaperButton label="4x4" href='#' onClick={this._setMatrix44}></PaperButton>
                    <PaperButton label="5x5" href='#' onClick={this._setMatrix55}></PaperButton>
                </Dialog>

                <Dialog ref="categoriesDialog" title="Select category">
                    {this.state.categories.map(function(category){
                        var onclick = _this._onCategoryClick.bind(null,category);
                        return <PaperButton label={category} href='#' onClick={onclick}></PaperButton>;
                    })}
                </Dialog>

                <Dialog ref="gameDialog" title="Do you really want stop the game?">
                    <PaperButton label="Yes" href='#' onClick={this._onGameDialogAcceptMouseDown}></PaperButton>
                    <PaperButton label="No" href='#' onClick={this._onGameDialogDismissMouseDown}></PaperButton>
                </Dialog>

                <div className="toolbar-landscape">
                    <div className="toolbar-landscape__section" style={this._matrixStyle()}>
                        <Icon icon="image-grid-on" onMouseDown={this._onMatrixMouseDown}/>
                    </div>
                    <div className="toolbar-landscape__section" style={this._imageStyle()}>
                        <Icon icon="image-photo-library" onMouseDown={this._onImageMouseDown}/>
                    </div>
                    <div className="toolbar-landscape__section">
                        <Icon icon={gameIcon} onMouseDown={this._onPlayMouseDown}/>
                    </div>
                    <div className="toolbar-landscape__section" style={this._spyStyle()}>
                        <Icon icon="action-visibility" onMouseDown={this._onSpyTouchStart} onTouchStart={this._onSpyTouchStart} onMouseUp={this._onSpyTouchStop} onMouseLeave={this._onSpyTouchStop} onMouseOut={this._onSpyTouchStop} onTouchEnd={this._onSpyTouchStop} onTouchCancel={this._onSpyTouchStop}/>
                    </div>                                        
                </div>

                <div className="toolbar-portrait mui-app-bar">
                    <div className="toolbar-portrait__section" style={this._matrixStyle()}>
                        <span className="toolbar-portrait__section-btn mdfi_image_grid_on" onMouseDown={this._onMatrixMouseDown}></span>
                    </div>

                    <div className="toolbar-portrait__section" style={this._imageStyle()}>
                        <span className="toolbar-portrait__section-btn mdfi_image_photo_library" onMouseDown={this._onImageMouseDown}></span>
                    </div>

                    <div className="toolbar-portrait__section">
                        <span className={gameIconClass} onMouseDown={this._onPlayMouseDown}></span>
                    </div>

                    <div className="toolbar-portrait__section" style={this._spyStyle()}>
                        <span className="toolbar-portrait__section-btn mdfi_action_visibility" onMouseDown={this._onSpyTouchStart} onTouchStart={this._onSpyTouchStart} onMouseUp={this._onSpyTouchStop} onMouseLeave={this._onSpyTouchStop} onMouseOut={this._onSpyTouchStop} onTouchEnd={this._onSpyTouchStop} onTouchCancel={this._onSpyTouchStop}></span>
                    </div>
                </div>
            </div>);
        },

        _onPaneChange : function(){
            this.setState({
                isGame : PaneStore.isGame()
            });
        },
        _onMatrixMouseDown : function(){
            if (!this.state.isGame)
                this.refs.matrixDialog.show();
        },
        _onImageMouseDown : function(){
            if (!this.state.isGame)
                this.refs.categoriesDialog.show();  
        },
        _onPlayMouseDown: function(){
            if (this.state.isGame){
                this.refs.gameDialog.show();
            } else {
                PaneActions.gameStart();
            }
        },
        _onGameDialogAcceptMouseDown: function(){
            this.refs.gameDialog.dismiss();
            PaneActions.gameRollback();
        },
        _onGameDialogDismissMouseDown: function(){
            this.refs.gameDialog.dismiss();
        },
        _setMatrix33 : function() {this._setMatrix(3)},
        _setMatrix44 : function() {this._setMatrix(4)},
        _setMatrix55 : function() {this._setMatrix(5)},
        _setMatrix : function(dim){
            if (this.state.isGame){
                PaneActions.gameRollback();
            }
            PaneActions.setMatrix([dim,dim]);
            this.refs.matrixDialog.dismiss();
        },
        _onCategoryClick: function(category){
            this.refs.categoriesDialog.dismiss();
            _500pxImageProvider.selectCategory(category);
        },
        _onSpyTouchStart: function() {
            if (this.state.isGame)
                PaneActions.spyStart();    
        },
        _onSpyTouchStop: function() {
            if (this.state.isGame)
                PaneActions.spyStop();
        },
        _matrixStyle: function(){
            return this.state.isGame ? {opacity:'0.5'} : {};
        },
        _imageStyle: function(){
            return this.state.isGame ? {opacity:'0.5'} : {};
        },
        _spyStyle: function(){
            return this.state.isGame ? {} : {opacity:'0.5'};
        }
    });

module.exports = Header;

