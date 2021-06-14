export default function X({onClick}) {
  return (
    <svg {...{onClick}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" overflow="visible" stroke="white" strokeWidth="8" strokeLinecap="round">
      <line x2="50" y2="50" />
      <line x1="50" y2="50" />
    </svg>
  )
}