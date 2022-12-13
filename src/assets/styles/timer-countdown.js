import { css } from 'lit';

export default timerCountDownStyle = css`
  :host {
    right: 5px;
    font-size: 14px;
    position: absolute;
  }
  #countdown1 {
    position: relative;
    margin: auto;
    margin-top: 100px;
    height: 40px;
    width: 40px;
    text-align: center;
  }
  
  #countdown-number {
    color: white;
    display: inline-block;
    line-height: 40px;
    margin-right: 12px;
  }
  
  svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    transform: rotateY(-180deg) rotateZ(-90deg);
  }
  
  svg circle {
    stroke-dasharray: 113px;
    stroke-dashoffset: 0px;
    stroke-linecap: round;
    stroke-width: 3px;
    stroke: white;
    fill: none;
    animation: countdown 60s linear infinite forwards;
  }
  
  @keyframes countdown {
    from {
      stroke-dashoffset: 0px;
    }
    to {
      stroke-dashoffset: 113px;
    }
  }
  .hidden {
    display: none;
  }
  .visible {
    display: inline-block;
  }
`;
