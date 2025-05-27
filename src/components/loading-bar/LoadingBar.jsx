import './LoadingBar.css';

export default function LoadingBar({ height = 3, color = '#3a4a6b' }) {
  return (
    <div className="loading-bar-wrapper" style={{ height }}>
      <div className="loading-bar-inner" style={{ backgroundColor: color }} />
    </div>
  );
}
