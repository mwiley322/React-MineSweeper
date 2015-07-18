import React from 'react';
import Table from './Table.js';

export default class MineSweeper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: "easy",
            mineNum : 10,
            rowNum : 10,
            flagNum : 0,
            openNum : 0,
            time : 0,
            status : 0   // 0:normal, 1:clear, 2:gameover
        };
    }
    componentWillUpdate() {
        if(this.state.status === 0){
            this.judge();
        }
    }
    componentWillMount() {
        this.intervals = [];
    }
    componentWillUnmount() {
        this.intervals.map(clearInterval);
    }
    componentDidMount() {
        this.setInterval(this.tick.bind(this), 1000);
    }
    setInterval() {
        this.intervals.push(setInterval.apply(null, arguments));
    }
    tick() {
        if(this.state.openNum > 0 && this.state.status === 0){
            this.setState({time: this.state.time + 1});
        }
    }
    judge() {
        if(this.state.mineNum + this.state.openNum >= this.state.rowNum * this.state.rowNum){
            this.setState({status: 1});
            alert("Congratulations!!");
        }
    }
    gameOver() {
        this.setState({status: 2});
        alert("Game Over!");
    }
    checkFlagNum(update) {
        this.setState({flagNum: this.state.flagNum + update});
    }
    setMine(){
        var mineTable = this.state.mineTable;
        for(var i = 0; i < this.state.mineNum; i++){
            var cell = mineTable[Math.floor(Math.random()*10)][Math.floor(Math.random()*10)];
            if(cell.hasMine){
                i--;
            } else {
                cell.hasMine = true;
            }
        }
        this.setState({
            mineTable: mineTable
        });
    }
    addOpenNum() {
        this.setState({
            openNum : ++ this.state.openNum
        });
    }
    setEasy() {
        this.setState({level: "easy", mineNum: 10, rowNum: 10, openNum: 0, flagNum: 0, time: 0, status: 0});
    }
    setNormal() {
        this.setState({level: "normal", mineNum: 40, rowNum: 16, openNum: 0, flagNum: 0, time: 0, status: 0});
    }
    setHard() {
        this.setState({level: "hard", mineNum: 100, rowNum: 22, openNum: 0, flagNum: 0, time: 0, status: 0});
    }
    render() {
        var _this = this;
        var level = () => {
            if(_this.state.level === "easy"){
                return (
                    <div className="MineSweeper__level">
                        <label><input type="radio" name="level" onChange={this.setEasy.bind(this)} checked />easy</label>
                        <label><input type="radio" name="level" onChange={this.setNormal.bind(this)} />normal</label>
                        <label><input type="radio" name="level" onChange={this.setHard.bind(this)} />hard</label>
                    </div>
                );
            } else if(_this.state.level === "normal"){
                return (
                    <div className="MineSweeper__level">
                        <label><input type="radio" name="level" onChange={this.setEasy.bind(this)} />easy</label>
                        <label><input type="radio" name="level" onChange={this.setNormal.bind(this)} checked />normal</label>
                        <label><input type="radio" name="level" onChange={this.setHard.bind(this)} />hard</label>
                    </div>
                );
            } else if(_this.state.level === "hard"){
                return (
                    <div className="MineSweeper__level">
                        <label><input type="radio" name="level" onChange={this.setEasy.bind(this)} />easy</label>
                        <label><input type="radio" name="level" onChange={this.setNormal.bind(this)} />normal</label>
                        <label><input type="radio" name="level" onChange={this.setHard.bind(this)} checked />hard</label>
                    </div>
                );
            }
        }();
        return (
            <div>
                {level}
                <div className={"MineSweeper " + this.state.level}>
                    <span className="MineSweeper__flagNum"> {this.state.mineNum - this.state.flagNum}</span>
                    <span className="MineSweeper__time"> {this.state.time}</span>
                    <Table mineNum={this.state.mineNum} rowNum={this.state.rowNum} gameOver={this.gameOver.bind(this)} addOpenNum={this.addOpenNum.bind(this)} checkFlagNum={this.checkFlagNum.bind(this)}/>
                </div>
            </div>
        );
    }
}
