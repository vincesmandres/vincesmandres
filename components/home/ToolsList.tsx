import { toolGroups } from "../../data/tools";
export function ToolsList() { return <div className="tools-grid">{toolGroups.map(group => <div className="tool-group" key={group.title}><h3>{group.title}</h3><div>{group.items.map(item => <span key={item}>{item}</span>)}</div></div>)}</div>; }
