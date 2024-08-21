import { Line } from "rc-progress";

export const StatsBar = ({ percent }) => {
  return <Line percent={percent} strokeWidth="5" strokeColor="#241c9b" />;
};
