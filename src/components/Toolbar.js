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
            var gameIcon = (this.state.isGame) ? 'av-replay' : 'av-play-arrow',
                gameIconClass = (this.state.isGame) ? 'toolbar-portrait__section-btn  mdfi_av_replay' : 'toolbar-portrait__section-btn  mdfi_av_play_arrow',
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

                <div className="toolbar-landscape">
                    <div className="toolbar-landscape__section">
                        <Icon icon="image-grid-on" onMouseDown={this._onMatrixMouseDown}/>
                    </div>
                    <div className="toolbar-landscape__section">
                        <Icon icon="image-photo-library" onMouseDown={this._onImageMouseDown}/>
                    </div>
                    <div className="toolbar-landscape__section">
                        <Icon icon="action-trending-neutral" onMouseDown={this._onNextMouseDown}/>
                    </div>
                    <div className="toolbar-landscape__section">
                        <Icon icon={gameIcon} onMouseDown={this._onPlayMouseDown}/>
                    </div>
                    <div className="toolbar-landscape__section">
                        <Icon icon="action-visibility" onMouseDown={this._onSpyTouchStart} onTouchStart={this._onSpyTouchStart} onMouseUp={this._onSpyTouchStop} onMouseLeave={this._onSpyTouchStop} onMouseOut={this._onSpyTouchStop} onTouchEnd={this._onSpyTouchStop} onTouchCancel={this._onSpyTouchStop}/>
                    </div>                                        
                </div>

                <div className="toolbar-portrait mui-app-bar">
                    <div className="toolbar-portrait__section">
                        <span className="toolbar-portrait__section-btn mdfi_image_grid_on" onMouseDown={this._onMatrixMouseDown}></span>
                    </div>

                    <div className="toolbar-portrait__section">
                        <span className="toolbar-portrait__section-btn mdfi_image_photo_library" onMouseDown={this._onImageMouseDown}></span>
                    </div>

                    <div className="toolbar-portrait__section">
                        <span className="toolbar-portrait__section-btn mdfi_action_trending_neutral" onMouseDown={this._onNextMouseDown}></span>
                    </div>

                    <div className="toolbar-portrait__section">
                        <span className={gameIconClass} onMouseDown={this._onPlayMouseDown}></span>
                    </div>

                    <div className="toolbar-portrait__section">
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
            this.refs.matrixDialog.show();
        },
        _onImageMouseDown : function(){
            this.refs.categoriesDialog.show();  
        },
        _onNextMouseDown: function(){
            _500pxImageProvider.next();    
        },
        _onPlayMouseDown : function(){
            if (this.state.isGame){
                PaneActions.gameRollback();
            } else {
                PaneActions.gameStart();
            }
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
            PaneActions.spyStart();    
        },
        _onSpyTouchStop: function() {
            PaneActions.spyStop();
        },
    });

module.exports = Header;

