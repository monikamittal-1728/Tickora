import "./styles.css";

let Header = ({ doneTask, leftTask, taskProgress }) => {
  return (
    <header>
      <div className="innerSection">
        <div className="logoCon">
          <img className="logo" src="./logo.png" alt="logo" />
          <p className="logoName">
            Tick<span>ora</span>
          </p>
        </div>
        <div className="taskCountCon">
          <div className="taskStat">
            <p className="doneStat">{doneTask}</p>
            <p className="statTag doneTag">DONE</p>
          </div>
          <div className="seprator"></div>
          <div className="taskStat">
            <p className="leftStat">{leftTask}</p>
            <p className="statTag leftTag">LEFT</p>
          </div>
        </div>
      </div>
      <div className="progressBar">
        <div
          className="progressFill"
          style={{ width: `${taskProgress}%` }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
